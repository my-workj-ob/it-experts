'use client';

import type { Message, User } from '@/types/chat';
import { useCallback, useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

interface UseChatSocketProps {
	currentUserId: number;
	selectedContact: User | null;
	setOnlineUsers: (users: number[]) => void;
	setTypingUsers: (users: { [key: number]: boolean }) => void;
	setLastActive: (active: { [key: number]: string }) => void;
	setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
	setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
	setMessageReactions: (
		reactions:
			| { [key: number]: { emoji: string; count: number; users: number[] }[] }
			| ((prev: {
					[key: number]: { emoji: string; count: number; users: number[] }[];
			  }) => {
					[key: number]: { emoji: string; count: number; users: number[] }[];
			  })
	) => void;
	getUnreadCounts: () => Promise<void>;
}

export function useChatSocket({
	currentUserId,
	selectedContact,
	setOnlineUsers,
	setTypingUsers,
	setLastActive,
	setMessages,
	setUsers,
	setMessageReactions,
	getUnreadCounts,
}: UseChatSocketProps) {
	const socketRef = useRef<Socket | null>(null);
	const socketInitialized = useRef(false);
	const eventHandlersInitialized = useRef(false);
	const typingTimeoutsRef = useRef<{ [key: number]: NodeJS.Timeout }>({});

	// Initialize socket connection
	useEffect(() => {
		// Only initialize socket once
		if (socketInitialized.current || !currentUserId) return;

		socketInitialized.current = true;

		// Connect to the Socket.io server
		const socket = io('http://localhost:3030/chat', {
			transports: ['websocket', 'polling'],
			withCredentials: true,
			forceNew: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			timeout: 10000,
		});

		socketRef.current = socket;

		// Handle connection
		socket.on('connect', () => {
			// Join the user's chat room
			socket.emit('joinChat', currentUserId, response => {
				console.log('Join chat response:');
			});

			// Request the list of online users
			socket.emit('getOnlineUsers');

			// Request unread counts
			socket.emit('getUnreadCounts', currentUserId);
		});

		// Handle connection error
		socket.on('connect_error', error => {
			// Try to reconnect on error
			setTimeout(() => {
				socket.connect();
			}, 1000);
		});

		// Cleanup on unmount
		return () => {
			socket.disconnect();
			socketInitialized.current = false;
			eventHandlersInitialized.current = false;
		};
	}, [currentUserId]);

	// Setup event handlers
	useEffect(() => {
		if (
			!socketRef.current ||
			eventHandlersInitialized.current ||
			!currentUserId
		)
			return;

		const socket = socketRef.current;
		eventHandlersInitialized.current = true;

		// Handle online users list
		socket.on('onlineUsers', (onlineUserIds: number[]) => {
			setOnlineUsers(onlineUserIds);
		});

		// Handle individual user coming online
		socket.on('userOnline', (userId: number) => {
			setOnlineUsers(prev => {
				if (prev.includes(userId)) return prev;
				return [...prev, userId];
			});

			// Update last active time
			setLastActive(prev => ({
				...prev,
				[userId]: new Date().toISOString(),
			}));
		});

		// Handle individual user going offline
		socket.on('userOffline', (userId: number) => {
			setOnlineUsers(prev => prev.filter(id => id !== userId));

			// Update last active time
			setLastActive(prev => ({
				...prev,
				[userId]: new Date().toISOString(),
			}));
		});

		// Handle new messages
		socket.on('newMessage', (messageData: Message) => {
			console.log('New message received:', messageData);

			// Check if message already exists
			const messageExists = (messages: Message[], id: number) => {
				return messages.some(msg => msg.id === id);
			};

			// If this is a message we sent, don't add it again
			if (messageData.sender.id === currentUserId) {
				// Only replace temporary message with server message
				setMessages(prevMessages =>
					prevMessages.map(msg => {
						// If this is a temporary message (id is a large timestamp)
						if (
							typeof msg.id === 'number' &&
							msg.id > 1000000000000 &&
							msg.sender.id === currentUserId &&
							msg.receiver.id === messageData.receiver.id &&
							msg.message === messageData.message
						) {
							return { ...messageData, isNew: true }; // Replace temporary message with server message and mark as new
						}
						return msg;
					})
				);

				// Update last message in contacts list
				setUsers(prevUsers =>
					prevUsers.map(user =>
						user.id === messageData.receiver.id
							? { ...user, lastMessage: messageData.message }
							: user
					)
				);

				return; // No further processing needed
			}

			// Update last message and unread count in contacts list
			if (messageData.receiver.id === currentUserId) {
				setUsers(prevUsers => {
					return prevUsers.map(user => {
						if (user.id === messageData.sender.id) {
							// If this user is currently selected, don't increment unread count
							const isSelected =
								selectedContact && selectedContact.id === user.id;
							return {
								...user,
								lastMessage: messageData.message,
								unread: isSelected ? 0 : (user.unread || 0) + 1,
							};
						}
						return user;
					});
				});

				// If message is for current chat, add it to messages state
				if (selectedContact && selectedContact.id === messageData.sender.id) {
					// Mark messages as read
					socket.emit('markMessagesAsRead', {
						senderId: messageData.sender.id,
						receiverId: currentUserId,
					});

					// Add message to messages state
					setMessages(prevMessages => {
						// If message already exists, don't add it again
						if (messageExists(prevMessages, messageData.id)) {
							return prevMessages;
						}
						return [
							...prevMessages,
							{ ...messageData, isRead: true, isNew: true },
						];
					});
				} else {
					// If the sender is not in our users list, we need to add them
					setUsers(prevUsers => {
						// Check if the sender is already in our users list
						const senderExists = prevUsers.some(
							user => user.id === messageData.sender.id
						);

						if (!senderExists) {
							// Create a new user object for the sender
							const newUser: User = {
								id: messageData.sender.id,
								email: messageData.sender.email,
								profile: {
									firstName: messageData.sender.email.split('@')[0], // Use email as fallback
									lastName: '',
									avatar: `/placeholder.svg?height=40&width=40&text=${messageData.sender.email
										.substring(0, 2)
										.toUpperCase()}`,
								},
								online: true, // Assume online since they just sent a message
								lastMessage: messageData.message,
								unread: 1,
							};

							return [...prevUsers, newUser];
						}

						return prevUsers;
					});
				}
			}
		});

		// Handle messages marked as read
		socket.on(
			'messagesMarkedAsRead',
			(data: { senderId: number; receiverId: number }) => {
				// If we're the sender, update our messages to show they've been read
				if (data.senderId === currentUserId) {
					setMessages(prevMessages =>
						prevMessages.map(msg =>
							msg.receiver.id === data.receiverId
								? { ...msg, isRead: true }
								: msg
						)
					);
				}

				// Update the unread count for the contact
				if (data.receiverId === currentUserId) {
					setUsers(prevUsers =>
						prevUsers.map(user =>
							user.id === data.senderId ? { ...user, unread: 0 } : user
						)
					);
				}
			}
		);

		// Handle unread counts update
		socket.on('unreadCounts', () => {
			getUnreadCounts();
		});

		// Handle unread counts update

		// Handle typing indicator
		socket.on('userTyping', (data: { senderId: number; isTyping: boolean }) => {
			const { senderId, isTyping } = data;
			if (senderId === selectedContact?.id) {
				setTypingUsers(prev => {
					const updated = { ...prev, [senderId]: isTyping };
					return updated;
				});
			}
		});

		// Handle message reactions
		socket.on(
			'messageReaction',
			(data: {
				messageId: number;
				emoji: string;
				userId: number;
				type: 'add' | 'remove';
			}) => {
				const { messageId, emoji, userId, type } = data;

				if (type === 'add') {
					setMessageReactions(prev => {
						const messageReactions = prev[messageId] || [];
						const existingReaction = messageReactions.find(
							r => r.emoji === emoji
						);

						if (existingReaction) {
							return {
								...prev,
								[messageId]: messageReactions.map(r =>
									r.emoji === emoji
										? { ...r, count: r.count + 1, users: [...r.users, userId] }
										: r
								),
							};
						} else {
							return {
								...prev,
								[messageId]: [
									...messageReactions,
									{ emoji, count: 1, users: [userId] },
								],
							};
						}
					});
				} else if (type === 'remove') {
					setMessageReactions(prev => {
						const messageReactions = prev[messageId] || [];
						const existingReaction = messageReactions.find(
							r => r.emoji === emoji
						);

						if (!existingReaction) return prev;

						if (existingReaction.count <= 1) {
							return {
								...prev,
								[messageId]: messageReactions.filter(r => r.emoji !== emoji),
							};
						} else {
							return {
								...prev,
								[messageId]: messageReactions.map(r =>
									r.emoji === emoji
										? {
												...r,
												count: r.count - 1,
												users: r.users.filter(id => id !== userId),
										  }
										: r
								),
							};
						}
					});
				}
			}
		);

		// Reconnection events
		socket.on('reconnect', attemptNumber => {
			// Rejoin chat room after reconnection
			socket.emit('joinChat', currentUserId);
			socket.emit('getOnlineUsers');
		});

		socket.on('reconnect_attempt', attemptNumber => {
			console.log(`Reconnection attempt ${attemptNumber}`);
		});

		socket.on('reconnect_error', error => {
			console.error('Reconnection error:', error);
		});

		socket.on('reconnect_failed', () => {
			console.error('Failed to reconnect');
		});

		return () => {
			// Clean up typing timeouts
			Object.values(typingTimeoutsRef.current).forEach(timeout => {
				clearTimeout(timeout);
			});
			typingTimeoutsRef.current = {};

			// Remove all event listeners when component unmounts or dependencies change
			socket.off('onlineUsers');
			socket.off('userOnline');
			socket.off('userOffline');
			socket.off('newMessage');
			socket.off('messagesMarkedAsRead');
			socket.off('unreadCounts');
			socket.off('userTyping');
			socket.off('messageReaction');
			socket.off('reconnect');
			socket.off('reconnect_attempt');
			socket.off('reconnect_error');
			socket.off('reconnect_failed');
			eventHandlersInitialized.current = false;
		};
	}, [currentUserId, getUnreadCounts, selectedContact]);

	// Mark messages as read when selecting a contact
	useEffect(() => {
		if (!socketRef.current || !selectedContact || !currentUserId) return;

		// Mark messages as read when selecting a contact
		socketRef.current.emit('markMessagesAsRead', {
			senderId: selectedContact.id,
			receiverId: currentUserId,
		});
	}, [selectedContact, currentUserId]);
	const emitTyping = useCallback(
		(selectedContactId: number, isTyping: boolean) => {
			if (!socketRef.current || !currentUserId || !selectedContact?.id) return;

			socketRef.current.emit('typing', {
				senderId: currentUserId,
				receiverId: selectedContactId,
				isTyping, // isTyping holatini yuboramiz
			});
		},
		[currentUserId, selectedContact]
	);

	const sendMessage = useCallback(
		(
			messageData: any,
			tempId: number,
			onSuccess?: (response: any) => void,
			onError?: () => void
		) => {
			if (!socketRef.current) return;

			try {
				socketRef.current.emit('sendMessage', messageData, (response: any) => {
					if (response && response.success && response.message) {
						if (onSuccess) onSuccess(response);
					} else {
						if (onError) onError();
					}
				});
			} catch (error) {
				console.error('Error sending message:', error);
				if (onError) onError();
			}
		},
		[]
	);

	const editMessage = useCallback(
		(
			messageId: number,
			newContent: string,
			onSuccess?: (response: any) => void
		) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit(
				'editMessage',
				{
					messageId,
					newContent,
					userId: currentUserId,
				},
				(response: any) => {
					if (response && response.success && onSuccess) {
						onSuccess(response);
					}
				}
			);
		},
		[currentUserId]
	);

	// Delete message function
	const deleteMessage = useCallback(
		(messageId: number, onSuccess?: (response: any) => void) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit(
				'deleteMessage',
				{
					messageId,
					userId: currentUserId,
				},
				(response: any) => {
					if (response && response.success && onSuccess) {
						onSuccess(response);
					}
				}
			);
		},
		[currentUserId]
	);

	// Add reaction function
	const addReaction = useCallback(
		(messageId: number, emoji: string) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit('addReaction', {
				messageId,
				emoji,
				userId: currentUserId,
			});
		},
		[currentUserId]
	);

	// Remove reaction function
	const removeReaction = useCallback(
		(messageId: number, emoji: string) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit('removeReaction', {
				messageId,
				emoji,
				userId: currentUserId,
			});
		},
		[currentUserId]
	);

	// Block user function
	const blockUser = useCallback(
		(blockedId: number, onSuccess?: (response: any) => void) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit(
				'blockUser',
				{
					blockerId: currentUserId,
					blockedId,
				},
				(response: any) => {
					if (response && response.success && onSuccess) {
						onSuccess(response);
					}
				}
			);
		},
		[currentUserId]
	);

	// Unblock user function
	const unblockUser = useCallback(
		(blockedId: number, onSuccess?: (response: any) => void) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit(
				'unblockUser',
				{
					blockerId: currentUserId,
					blockedId,
				},
				(response: any) => {
					if (response && response.success && onSuccess) {
						onSuccess(response);
					}
				}
			);
		},
		[currentUserId]
	);

	// Mark as spam function
	const markAsSpam = useCallback(
		(reportedId: number, onSuccess?: (response: any) => void) => {
			if (!socketRef.current || !currentUserId) return;

			socketRef.current.emit(
				'markAsSpam',
				{
					reporterId: currentUserId,
					reportedId,
				},
				(response: any) => {
					if (response && response.success && onSuccess) {
						onSuccess(response);
					}
				}
			);
		},
		[currentUserId]
	);

	return {
		socketRef,
		emitTyping,
		sendMessage,
		editMessage,
		deleteMessage,
		addReaction,
		removeReaction,
		blockUser,
		unblockUser,
		markAsSpam,
	};
}
