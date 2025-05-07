'use client';

import { debounce, groupMessagesByDate } from '@/lib/chat-utils';
import axiosInstance from '@/lib/create-axios';
import type { Connection, Message, User } from '@/types/chat';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseChatDataProps {
	currentUserId: number | undefined;
	onlineUsers: number[];
}

export function useChatData({ currentUserId, onlineUsers }: UseChatDataProps) {
	// State
	const [selectedContact, setSelectedContact] = useState<User | null>(null);
	const [userDetails, setUserDetails] = useState<User | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [connections, setConnections] = useState<Connection[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [lastActive, setLastActive] = useState<{ [key: number]: string }>({});
	const [searchQuery, setSearchQuery] = useState('');

	const fetchUserDetails = useCallback(
		async (userId: string | number) => {
			try {
				setIsLoading(true);
				const response = await axiosInstance.get(`/profile/${userId}`);

				if (response.data) {
					const userData = response.data;

					const formattedUser: User = {
						id: Number(userId),
						email: userData.email || '',
						profile: {
							firstName:
								userData.firstName || userData.profile?.firstName || '',
							lastName: userData.lastName || userData.profile?.lastName || '',
							avatar:
								userData.avatar ||
								userData.profile?.avatar ||
								`/placeholder.svg?height=80&width=80&text=${
									userData.firstName?.substring(0, 2).toUpperCase() || ''
								}`,
							jobTitle: userData.jobTitle || userData.profile?.jobTitle || '',
							skills: userData.skills || [],
							location: userData.location || '',
							experience: userData.experience || '',
						},
						online: onlineUsers.includes(Number(userId)),
						status: userData.status || 'connect',
						matchPercentage: userData.matchPercentage || null,
						isBlocked: userData.isBlocked || false,
						isSpam: userData.isSpam || false,
					};

					setUserDetails(formattedUser);

					if (!selectedContact) {
						setSelectedContact(formattedUser);
					}

					return formattedUser;
				}
			} catch (error) {
				console.error('Error fetching user details:', error);
			} finally {
				setIsLoading(false);
			}

			return null;
		},
		[onlineUsers, selectedContact, setSelectedContact]
	);

	// Select contact function
	const selectContact = useCallback(
		(contact: User) => {
			// Update the online status before setting the contact
			const isOnline = onlineUsers.includes(contact.id);
			setSelectedContact({
				...contact,
				online: isOnline,
				unread: 0,
			});

			if (!userDetails || userDetails.id !== contact.id) {
				fetchUserDetails(contact.id);
			}
		},
		[onlineUsers, userDetails, fetchUserDetails]
	);

	// Fetch unread counts for users
	const getUnreadCounts = useCallback(async () => {
		if (!users.length || !currentUserId) return;
		try {
			// Fetch unread counts for each user
			const unreadCounts = await Promise.all(
				users.map(async user => {
					const res = await axiosInstance.get(`/unread-count/${user.id}`);
					return {
						userId: user.id,
						unreadCount: res.data.count,
					};
				})
			);

			// Update the users with the unread counts
			setUsers(prevUsers =>
				prevUsers.map(user => {
					const unreadInfo = unreadCounts.find(item => item.userId === user.id);
					return unreadInfo
						? { ...user, unread: unreadInfo.unreadCount }
						: user;
				})
			);
		} catch (error) {
			console.error('Error fetching unread counts:', error);
		}
	}, [users, currentUserId]);

	// Update online status with debounce
	useEffect(() => {
		// Debounced function to update online status
		const updateOnlineStatus = debounce((onlineUsersList: number[]) => {
			setUsers(prevUsers =>
				prevUsers.map(user => ({
					...user,
					online: onlineUsersList.includes(user.id),
				}))
			);

			// Update selected contact if needed
			if (selectedContact) {
				const isOnline = onlineUsersList.includes(selectedContact.id);

				// Only update if the online status has changed
				if (selectedContact.online !== isOnline) {
					setSelectedContact({
						...selectedContact,
						online: isOnline,
					});
				}
			}

			// Update user details if needed
			if (userDetails) {
				const isOnline = onlineUsersList.includes(userDetails.id);

				if (userDetails.online !== isOnline) {
					setUserDetails({
						...userDetails,
						online: isOnline,
					});
				}
			}
		}, 1000); // 1 second delay

		// Call the debounced function
		updateOnlineStatus(onlineUsers);
	}, [onlineUsers, selectedContact, userDetails]);

	// Fetch connections
	// Fetch connections only once when component mounts or when currentUserId changes
	useEffect(() => {
		let isMounted = true;
		let controller: AbortController | null = null;

		const fetchConnectionsOnce = async () => {
			if (!currentUserId) return;

			// Create a new abort controller for this request
			controller = new AbortController();

			try {
				console.log('Fetching connections...');
				const response = await axiosInstance.get<Connection[]>(
					'/connections/me',
					{
						signal: controller.signal,
					}
				);

				// Only update state if component is still mounted
				if (isMounted) {
					setConnections(response.data);

					// Convert connections to users format
					const connectionUsers: User[] = response.data.map(connection => {
						// Determine if the other user is the requester or receiver
						const isRequester = connection.requesterId !== currentUserId;
						const otherUser = isRequester
							? connection.requester
							: connection.receiver;

						return {
							id: otherUser.id,
							email: otherUser.email,
							profile: {
								firstName: otherUser.profile.firstName,
								lastName: otherUser.profile.lastName,
								avatar:
									otherUser.profile.avatar ||
									`/placeholder.svg?height=40&width=40&text=${otherUser.profile.firstName
										.substring(0, 2)
										.toUpperCase()}`,
							},
							online: onlineUsers.includes(otherUser.id),
							lastMessage: 'No messages yet',
							unread: 0,
						};
					});

					setUsers(connectionUsers);

					// If we have a receiverId, select that user automatically
				}
			} catch (error) {
				// Only handle error if it's not an abort error and component is still mounted
				if (
					isMounted &&
					!(error instanceof DOMException && error.name === 'AbortError')
				) {
					console.error('Error fetching connections:', error);
					setConnections([]);

					// If we couldn't find the user in connections but have a receiverId, try to fetch directly
				}
			}
		};

		// Call the function immediately
		fetchConnectionsOnce();

		// Cleanup function
		return () => {
			isMounted = false;
			if (controller) {
				controller.abort();
			}
		};
	}, [currentUserId]); // Only depend on currentUserId

	// Fetch chat history
	const fetchChatHistory = useCallback(async () => {
		if (!selectedContact?.id || !currentUserId) return;

		setIsLoading(true);

		try {
			const userId = currentUserId;
			const receiverId = selectedContact.id;

			console.log('Fetching chat history for:', { userId, receiverId });

			const url = `/chat/history/${userId}/${receiverId}`;
			const response = await axiosInstance.get(url);

			if (response.data && response.data.success) {
				if (Array.isArray(response.data.chatHistory)) {
					// Sort messages by timestamp
					const sortedMessages = [...response.data.chatHistory].sort(
						(a, b) =>
							new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
					);

					console.log(
						'Loaded chat history, messages count:',
						sortedMessages.length
					);

					// Save messages to state
					setMessages(sortedMessages);

					// Update last message in contacts list
					if (sortedMessages.length > 0) {
						const lastMsg = sortedMessages[sortedMessages.length - 1];
						setUsers(prevUsers =>
							prevUsers.map(user =>
								user.id === selectedContact.id
									? { ...user, lastMessage: lastMsg.message, unread: 0 }
									: user
							)
						);
					}
				} else {
					console.error(
						'Error: chat history is not in expected array format',
						response.data
					);
					setMessages([]);
				}
			} else {
				console.error('Error in chat history response', response.data);
				setMessages([]);
			}
		} catch (error) {
			console.error('Error fetching chat history:', error);
			setMessages([]);
		} finally {
			setIsLoading(false);
		}
	}, [selectedContact?.id, currentUserId]);

	// Fetch chat history when selected contact changes
	useEffect(() => {
		if (selectedContact?.id && currentUserId) {
			// Clear messages before fetching new ones
			setMessages([]);
			fetchChatHistory();
		}
	}, [selectedContact?.id, currentUserId, fetchChatHistory]);

	// Connection mutations
	const connection = useMutation({
		mutationKey: ['connections_request', userDetails],
		mutationFn: async (requestConnection: any) => {
			const data = await axiosInstance.post(
				`/connections/request`,
				requestConnection
			);
			return data.data;
		},
	});

	const removeConnection = useMutation({
		mutationKey: ['connections_remove', userDetails],
		mutationFn: async (requestConnection: any) => {
			const data = await axiosInstance.delete(
				`/connections/remove/${requestConnection}`
			);
			return data.data;
		},
	});

	const acceptConnection = useMutation({
		mutationKey: ['connections_accept', userDetails],
		mutationFn: async (requestConnection: any) => {
			const data = await axiosInstance.post(
				`/connections/accept/${requestConnection}`
			);
			return data.data;
		},
	});

	const blockUserMutation = useMutation({
		mutationKey: ['block_user'],
		mutationFn: async (blockedId: number) => {
			const response = await axiosInstance.post(`/block`, { blockedId });
			return response.data;
		},
		onSuccess: data => {
			if (data.success) {
				// Handle success, for example, show a notification or update the UI
				console.log('User blocked successfully');
			}
		},
		onError: error => {
			// Handle error, for example, show an error notification
			console.error('Error blocking user:', error);
		},
	});

	const unblockUserMutation = useMutation({
		mutationKey: ['un_block_user'],
		mutationFn: async (blockedId: number) => {
			const response = await axiosInstance.post(`/block/unblock`, {
				blockedId,
			});
			return response.data;
		},
		onSuccess: data => {
			if (data.success) {
				// Handle success, for example, show a notification or update the UI
				console.log('User blocked successfully');
			}
		},
		onError: error => {
			// Handle error, for example, show an error notification
			console.error('Error blocking user:', error);
		},
	});

	// Connection handlers
	const handleAccept = useCallback(
		(data: any) => {
			acceptConnection.mutate(data, {
				onSuccess: () => {
					console.log('connected');
				},
			});
		},
		[acceptConnection]
	);

	const handleRequest = useCallback(
		(data: any) => {
			connection.mutate(data, {
				onSuccess: () => {
					console.log('requested');
				},
			});
		},
		[connection]
	);

	const handleRemoveConnection = useCallback(
		(data: any) => {
			removeConnection.mutate(data, {
				onSuccess: () => {
					console.log('removed');
				},
			});
		},
		[removeConnection]
	);

	// Block user mutation

	const handleBlockUser = (blockedId: number) => {
		blockUserMutation.mutate(blockedId);
	};

	const handleUnblockUser = (blockedId: number) => {
		unblockUserMutation.mutate(blockedId);
	};

	// Memoize filtered users list
	const filteredUsers = useMemo(
		() =>
			users.filter(
				user =>
					user?.profile?.firstName
						?.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					user?.profile?.lastName
						?.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[users, searchQuery]
	);

	// Group messages by date
	const groupedMessages = useMemo(
		() => groupMessagesByDate(messages),
		[messages]
	);

	return {
		// State
		selectedContact,
		userDetails,
		messages,
		users,
		connections,
		isLoading,
		isLoadingMore,
		lastActive,
		searchQuery,

		// Setters
		setSelectedContact,
		setUserDetails,
		setMessages,
		setUsers,
		setIsLoading,
		setIsLoadingMore,
		setLastActive,
		setSearchQuery,

		// Functions
		fetchUserDetails,
		selectContact,
		getUnreadCounts,
		fetchChatHistory,
		handleAccept,
		handleRequest,
		handleRemoveConnection,
		handleBlockUser,
		handleUnblockUser,

		// Computed values
		filteredUsers,
		groupedMessages,
	};
}
