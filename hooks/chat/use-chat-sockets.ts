"use client";

import { useCallback, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

// Define types for clarity and type safety
interface Profile {
  firstName: string;
  lastName: string;
  avatar: string;
}

interface User {
  id: number;
  email: string;
  profile: Profile;
  online?: boolean;
  unread?: number;
  lastName?: string;
}

interface Message {
  id: number;
  sender: User;
  receiver: User;
  message: string;
  isRead: boolean;
  isNew?: boolean;
  createdAt?: string;
  timestamp?: number;
}

interface Reaction {
  emoji: string;
  count: number;
  users: number[];
}

interface UseChatSocketProps {
  currentUserId: number;
  selectedContact: User | null;
  setOnlineUsers: (users: number[]) => void;
  setTypingUsers: (users: Record<number, boolean>) => void;
  setLastActive: (active: Record<number, string>) => void;
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setMessageReactions: (
    reactions:
      | Record<number, Reaction[]>
      | ((prev: Record<number, Reaction[]>) => Record<number, Reaction[]>)
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
  const typingTimeoutsRef = useRef<Record<number, NodeJS.Timeout>>({});
  const lastSendRef = useRef<{ timestamp: number; message: string } | null>(
    null
  ); // Track last send attempt
  // Initialize socket connection
  useEffect(() => {
    if (socketInitialized.current || !currentUserId) return;

    socketInitialized.current = true;

    console.log(`Initializing socket for user ${currentUserId}`);

    const socket = io("http://localhost:8888/chat", {
      transports: ["websocket", "polling"],
      withCredentials: true,
      // Removed forceNew to allow Socket.io to manage connection reuse
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log(`Socket connected: ${socket.id}`);
      socket.emit("joinChat", currentUserId);
      socket.emit("getOnlineUsers");
      socket.emit("getUnreadCounts", currentUserId);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setTimeout(() => socket.connect(), 1000);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    return () => {
      console.log(`Cleaning up socket for user ${currentUserId}`);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      socketInitialized.current = false;
      eventHandlersInitialized.current = false;
    };
  }, [currentUserId]);

  // Setup socket event handlers
  useEffect(() => {
    if (
      !socketRef.current ||
      eventHandlersInitialized.current ||
      !currentUserId
    ) {
      return;
    }

    const socket = socketRef.current;
    eventHandlersInitialized.current = true;

    console.log(`Setting up event handlers for socket ${socket.id}`);

    // Remove all existing listeners to prevent duplicates
    const removeAllListeners = async () => {
      socket.off("onlineUsers");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("newMessage");
      socket.off("messagesMarkedAsRead");
      socket.off("unreadCounts");
      socket.off("userTyping");
      socket.off("messageReaction");
      socket.off("reconnect");
      socket.off("reconnect_attempt");
      socket.off("reconnect_error");
      socket.off("reconnect_failed");
    };

    removeAllListeners();

    socket.on("onlineUsers", (onlineUserIds: number[]) => {
      setOnlineUsers(onlineUserIds);
    });

    socket.on("userOnline", (userId: number) => {
      setOnlineUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
      setLastActive((prev) => ({
        ...prev,
        [userId]: new Date().toISOString(),
      }));
    });

    socket.on("userOffline", (userId: number) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
      setLastActive((prev) => ({
        ...prev,
        [userId]: new Date().toISOString(),
      }));
    });

    socket.on("newMessage", (messageData: Message) => {
      if (messageData.sender.id === currentUserId) {
        setMessages((prev) =>
          prev.map((msg) =>
            typeof msg.id === "number" &&
            msg.id > 1000000000000 &&
            msg.sender.id === currentUserId &&
            msg.receiver.id === messageData.receiver.id &&
            msg.message === messageData.message
              ? { ...messageData, isNew: true }
              : msg
          )
        );
        setUsers((prev) =>
          prev.map((user) =>
            user.id === messageData.receiver.id
              ? { ...user, lastMessage: messageData.message }
              : user
          )
        );
        return;
      }

      if (messageData.receiver.id === currentUserId) {
        setUsers((prev) => {
          const isSelected = selectedContact?.id === messageData.sender.id;
          return prev.map((user) =>
            user.id === messageData.sender.id
              ? {
                  ...user,
                  lastMessage: messageData.message,
                  unread: isSelected ? 0 : (user.unread || 0) + 1,
                }
              : user
          );
        });

        if (selectedContact?.id === messageData.sender.id) {
          socket.emit("markMessagesAsRead", {
            senderId: messageData.sender.id,
            receiverId: currentUserId,
          });
          setMessages((prev) =>
            prev.some((msg) => msg.id === messageData.id)
              ? prev
              : [...prev, { ...messageData, isRead: true, isNew: true }]
          );
        } else {
          setUsers((prev) => {
            if (prev.some((user) => user.id === messageData.sender.id))
              return prev;
            const newUser: User = {
              id: messageData.sender.id,
              email: messageData.sender.email,
              profile: {
                firstName: messageData.sender.email.split("@")[0],
                lastName: "",
                avatar: `/placeholder.svg?height=40&width=40&text=${messageData.sender.email
                  .substring(0, 2)
                  .toUpperCase()}`,
              },
              online: true,
              lastMessage: messageData.message,
              unread: 1,
            };
            return [...prev, newUser];
          });
        }
      }
    });

    socket.on(
      "messagesMarkedAsRead",
      ({ senderId, receiverId }: { senderId: number; receiverId: number }) => {
        if (senderId === currentUserId) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.receiver.id === receiverId ? { ...msg, isRead: true } : msg
            )
          );
        }
        if (receiverId === currentUserId) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === senderId ? { ...user, unread: 0 } : user
            )
          );
        }
      }
    );

    socket.on("unreadCounts", () => {
      getUnreadCounts();
    });

    socket.on(
      "userTyping",
      ({ senderId, isTyping }: { senderId: number; isTyping: boolean }) => {
        if (senderId === selectedContact?.id) {
          setTypingUsers((prev) => ({ ...prev, [senderId]: isTyping }));
        }
      }
    );

    socket.on(
      "messageReaction",
      ({
        messageId,
        emoji,
        userId,
        type,
      }: {
        messageId: number;
        emoji: string;
        userId: number;
        type: "add" | "remove";
      }) => {
        setMessageReactions((prev) => {
          const messageReactions = prev[messageId] || [];
          const existingReaction = messageReactions.find(
            (r) => r.emoji === emoji
          );

          if (type === "add") {
            if (existingReaction) {
              return {
                ...prev,
                [messageId]: messageReactions.map((r) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count + 1, users: [...r.users, userId] }
                    : r
                ),
              };
            }
            return {
              ...prev,
              [messageId]: [
                ...messageReactions,
                { emoji, count: 1, users: [userId] },
              ],
            };
          }

          if (type === "remove" && existingReaction) {
            if (existingReaction.count <= 1) {
              return {
                ...prev,
                [messageId]: messageReactions.filter((r) => r.emoji !== emoji),
              };
            }
            return {
              ...prev,
              [messageId]: messageReactions.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: r.count - 1,
                      users: r.users.filter((id) => id !== userId),
                    }
                  : r
              ),
            };
          }
          return prev;
        });
      }
    );

    socket.on("reconnect", () => {
      console.log("Socket reconnected");
      socket.emit("joinChat", currentUserId);
      socket.emit("getOnlineUsers");
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
    });

    socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect");
    });

    return () => {
      console.log(`Cleaning up event handlers for socket ${socket.id}`);
      Object.values(typingTimeoutsRef.current).forEach(clearTimeout);
      typingTimeoutsRef.current = {};
      removeAllListeners();
      eventHandlersInitialized.current = false;
    };
  }, [
    currentUserId,
    selectedContact,
    setOnlineUsers,
    setTypingUsers,
    setLastActive,
    setMessages,
    setUsers,
    setMessageReactions,
    getUnreadCounts,
  ]);

  // Mark messages as read when selecting a contact
  useEffect(() => {
    if (!socketRef.current || !selectedContact?.id || !currentUserId) return;

    socketRef.current.emit("markMessagesAsRead", {
      senderId: selectedContact.id,
      receiverId: currentUserId,
    });
  }, [socketRef, selectedContact?.id, currentUserId]);

  // Memoized socket event emitters
  const emitTyping = useCallback(
    (selectedContactId: number, isTyping: boolean) => {
      if (!socketRef.current || !currentUserId || !selectedContactId) return;

      // Clear any existing timeout for this contact
      if (typingTimeoutsRef.current[selectedContactId]) {
        clearTimeout(typingTimeoutsRef.current[selectedContactId]);
      }

      // Debounce the emission (e.g., wait 300ms before emitting)
      typingTimeoutsRef.current[selectedContactId] = setTimeout(() => {
        socketRef.current!.emit("typing", {
          senderId: currentUserId,
          receiverId: selectedContactId,
          isTyping,
        });
        console.log(
          `Emitting typing event: ${currentUserId} -> ${selectedContactId}, isTyping: ${isTyping}`
        );
      }, 2000);
    },
    [currentUserId]
  );

  const sendMessage = useCallback(
    (
      messageData: any,
      tempId: number,
      onSuccess?: (response: any) => void,
      onError?: () => void
    ) => {
      if (!socketRef.current) return;

      const now = Date.now();
      const debounceInterval = 1000; // 1-second debounce to prevent rapid sends

      // Check if this is a duplicate send within the debounce interval
      if (
        lastSendRef.current &&
        lastSendRef.current.message === messageData.message &&
        now - lastSendRef.current.timestamp < debounceInterval
      ) {
        console.warn("Duplicate send attempt ignored:", messageData);
        return;
      }

      socketRef.current.emit("sendMessage", messageData, (response: any) => {
        if (response?.success && response.message) {
          lastSendRef.current = {
            timestamp: now,
            message: messageData.message,
          }; // Update last send
          onSuccess?.(response);
        } else {
          console.error("Failed to send message:", response);
          onError?.();
        }
      });

      console.log(`Sending message: ${JSON.stringify(messageData)}`);
    },
    [socketRef, currentUserId]
  );

  const editMessage = useCallback(
    (
      messageId: number,
      newContent: string,
      onSuccess?: (response: any) => void
    ) => {
      if (!socketRef.current || !currentUserId) return;
      socketRef.current.emit(
        "editMessage",
        { messageId, newContent, userId: currentUserId },
        (response: any) => {
          if (response?.success) onSuccess?.(response);
        }
      );
    },
    [socketRef, currentUserId]
  );

  const deleteMessage = useCallback(
    (messageId: number, onSuccess?: (response: any) => void) => {
      if (!socketRef.current || !currentUserId) return;
      socketRef.current.emit(
        "deleteMessage",
        { messageId, userId: currentUserId },
        (response: any) => {
          if (response?.success) onSuccess?.(response);
        }
      );
    },
    [socketRef, currentUserId]
  );

  const addReaction = useCallback(
    (messageId: number, emoji: string) => {
      if (!socketRef.current || !currentUserId) return;
      socketRef.current.emit("addReaction", {
        messageId,
        emoji,
        userId: currentUserId,
      });
    },
    [socketRef, currentUserId]
  );

  const removeReaction = useCallback(
    (messageId: number, emoji: string) => {
      if (!socketRef.current || !currentUserId) return;
      socketRef.current.emit("removeReaction", {
        messageId,
        emoji,
        userId: currentUserId,
      });
    },
    [socketRef, currentUserId]
  );

  return {
    socketRef,
    emitTyping,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    removeReaction,
  };
}
