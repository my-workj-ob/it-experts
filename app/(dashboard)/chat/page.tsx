"use client"

import { EmojiPicker } from "@/components/emoji-picker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useProfile from "@/hooks/profile/use-profile"
import { useMobile } from "@/hooks/use-mobile"
import axiosInstance from "@/lib/create-axios"
import { cn } from "@/lib/utils"
import { get } from "lodash"
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Menu,
  Mic,
  Paperclip,
  Search,
  Send,
  Smile,
  UserPlus,
  X,
  MessageSquare,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"

// Message type definition
interface Message {
  id: number
  sender: {
    id: number
    email: string
  }
  receiver: {
    id: number
    email: string
  }
  message: string
  isRead: boolean
  timestamp: string
  isNew?: boolean // Flag for new messages to animate them
}

// Connection interface from API
interface Connection {
  id: number
  requesterId: number
  requester: {
    id: number
    email: string
    password: string
    profile: {
      id: number
      firstName: string
      name: string | null
      lastName: string
      email: string
      jobTitle: string
      avatar: string
    }
    isTwoFactorEnabled: boolean
    twoFactorSecret: string | null
    profileViews: number
    updatedAt: string
  }
  receiverId: number
  receiver: {
    id: number
    email: string
    password: string
    profile: {
      id: number
      firstName: string
      name: string | null
      lastName: string
      email: string
      jobTitle: string
      avatar: string
    }
    isTwoFactorEnabled: boolean
    twoFactorSecret: string | null
    profileViews: number
    updatedAt: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

// User interface
interface User {
  conversationId?: {
    id: number
    user1: {
      id: number
      email: string
      password: string
      isTwoFactorEnabled: boolean
      twoFactorSecret: string | null
      profileViews: number
      updatedAt: string
    }
    user2: {
      id: number
      email: string
      password: string
      isTwoFactorEnabled: boolean
      twoFactorSecret: string | null
      profileViews: number
      updatedAt: string
    }
    createdAt: string
  }
  otherUserId?: number
  otherUserName?: {
    id: number
    email: string
    password: string
    isTwoFactorEnabled: boolean
    twoFactorSecret: string | null
    profileViews: number
    updatedAt: string
  }
  createdAt?: string
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
  }
  email: string
  online: boolean
  lastMessage?: string
  unread?: number
}

// Debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const messageAnimations = `
  @keyframes message-send {
    0% { transform: translateX(10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes message-receive {
    0% { transform: translateX(-10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes read-receipt {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`

// Format date for messages
const formatMessageDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()

  if (isYesterday) {
    return "Yesterday"
  }

  // If it's within the last week, show the day name
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  if (date > oneWeekAgo) {
    return date.toLocaleDateString([], { weekday: "long" })
  }

  // Otherwise show the date
  return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
}

// Group messages by date
const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {}

  messages.forEach((message) => {
    const date = new Date(message.timestamp).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })

  return Object.entries(groups).map(([date, messages]) => ({
    date,
    messages,
  }))
}

// Typing indicator animation component
const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-green-500 font-medium">Typing</span>
      <span className="flex space-x-1">
        <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span
          className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="h-1.5 w-1.5 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </span>
    </div>
  )
}

// Memoize the message component to prevent re-renders
const MessageItem = React.memo(
  ({
    message,
    currentUserId,
    isLastInGroup,
  }: {
    message: Message
    currentUserId: number
    isLastInGroup: boolean
  }) => {
    const isCurrentUser = message?.sender?.id === currentUserId
    const time = new Date(message.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Animation classes based on whether the message is new and who sent it
    const animationClasses = message.isNew ? (isCurrentUser ? "animate-message-send" : "animate-message-receive") : ""

    return (
      <div className={cn("flex", isCurrentUser ? "justify-end" : "justify-start", !isLastInGroup && "mb-1")}>
        <div
          className={cn(
            "max-w-[80%] rounded-lg p-3 transition-all",
            isCurrentUser ? "bg-green-500 text-white" : "bg-slate-800 text-white",
            isCurrentUser ? "rounded-br-none" : "rounded-bl-none",
            animationClasses,
          )}
        >
          <p className="break-words">{message.message}</p>
          <div
            className={`flex items-center justify-between mt-1 text-xs ${
              isCurrentUser ? "text-white/70" : "text-slate-400"
            }`}
          >
            <span>{time}</span>
            {isCurrentUser && (
              <span className="ml-2 flex items-center">
                {message.isRead ? (
                  <CheckCheck className="h-3 w-3 ml-1 animate-read-receipt" />
                ) : (
                  <Check className="h-3 w-3 ml-1" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  },
)

// Date separator component
const DateSeparator = ({ date }: { date: string }) => {
  const formattedDate = formatMessageDate(date)

  return (
    <div className="flex justify-center my-4">
      <div className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-400 animate-fade-in">{formattedDate}</div>
    </div>
  )
}

// Update the ContactItem component to match the dark theme design
const ContactItem = React.memo(
  ({
    contact,
    isSelected,
    currentUserId,
    onSelect,
  }: {
    contact: User
    isSelected: boolean
    currentUserId: number
    onSelect: (contact: User) => void
  }) => {
    // Skip if this is the current user
    if (contact.id === currentUserId) return null

    return (
      <div
        className={cn(
          "p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors",
          isSelected ? "bg-slate-800" : "",
          contact.unread > 0 ? "bg-slate-800/50" : "",
        )}
        onClick={() => onSelect(contact)}
      >
        <div className="relative">
          <Avatar className="border-2 border-slate-700">
            <AvatarImage src={contact.profile.avatar} alt={contact.profile.firstName} />
            <AvatarFallback className="bg-slate-700 text-slate-200">
              {contact.profile.firstName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {contact.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900 animate-pulse"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className={cn("font-medium truncate text-white", contact.unread > 0 ? "font-semibold" : "")}>
              {contact.profile.firstName} {contact.profile.lastName}
            </h3>
            <span className="text-xs text-slate-400">
              {contact.online ? <span className="text-green-500 font-medium">Online</span> : "Offline"}
            </span>
          </div>
          <p className={cn("text-sm truncate", contact.unread > 0 ? "text-white font-medium" : "text-slate-400")}>
            {contact.lastMessage || "No messages yet"}
          </p>
        </div>
        {contact.unread > 0 && (
          <Badge className="ml-auto bg-green-500 text-white animate-bounce-subtle">{contact.unread}</Badge>
        )}
      </div>
    )
  },
)

// Update the main component to use dark theme
export default function ChatInterface({ initialReceiverId = null }: { initialReceiverId?: string | null }) {
  // Keep all the existing state and refs
  const { userProfileData } = useProfile()
  const searchParams = useSearchParams()
  // Check for both formats - query param and path segment
  const urlReceiverId = searchParams.get("receiverId") || window.location.pathname.split("/").pop()
  const effectiveReceiverId = initialReceiverId || urlReceiverId

  const [selectedContact, setSelectedContact] = useState<User | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMobile()
  const [showContacts, setShowContacts] = useState(!isMobile)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket | null>(null)
  const currentUserId = get(userProfileData, "id") // This should come from authentication
  const [onlineUsers, setOnlineUsers] = useState<number[]>([])
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const socketInitialized = useRef(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isAttaching, setIsAttaching] = useState(false)
  const eventHandlersInitialized = useRef(false)
  const [typingUsers, setTypingUsers] = useState<{ [key: number]: boolean }>({})
  const typingTimeoutsRef = useRef<{ [key: number]: NodeJS.Timeout }>({})
  const [isLoading, setIsLoading] = useState(false)

  const selectContact = useCallback(
    (contact: User) => {
      // Update the online status before setting the contact
      const isOnline = onlineUsers.includes(contact.id)
      setSelectedContact({
        ...contact,
        online: isOnline,
        unread: 0, // Reset unread count when selecting a contact
      })

      // Mark all messages from this contact as read
      if (currentUserId && socketRef.current) {
        socketRef.current.emit("markMessagesAsRead", {
          senderId: contact.id,
          receiverId: currentUserId,
        })
      }
    },
    [onlineUsers, currentUserId],
  )

  // Fetch unread counts for users
  const getUnreadCounts = useCallback(async () => {
    if (!users.length) return
    try {
      // Fetch unread counts for each user
      const unreadCounts = await Promise.all(
        users.map(async (user) => {
          const res = await axiosInstance.get(`/unread-count/${user.id}`)
          return {
            userId: user.id,
            unreadCount: res.data.count,
          }
        }),
      )

      // Update the users with the unread counts
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const unreadInfo = unreadCounts.find((item) => item.userId === user.id)
          return unreadInfo ? { ...user, unread: unreadInfo.unreadCount } : user
        }),
      )
    } catch (error) {
      console.error("Error fetching unread counts:", error)
    }
  }, [users])

  // Setup socket connection
  useEffect(() => {
    // Only initialize socket once
    if (socketInitialized.current || !currentUserId) return

    socketInitialized.current = true
    console.log("Initializing socket connection...")

    // Connect to the Socket.io server
    const socket = io("http://localhost:8888/chat", {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    })

    socketRef.current = socket

    // Handle connection
    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id)

      // Join the user's chat room
      socket.emit("joinChat", currentUserId, (response) => {
        console.log("Join chat response:", response)
      })

      // Request the list of online users
      socket.emit("getOnlineUsers")

      // Request unread counts
      socket.emit("getUnreadCounts", currentUserId)
    })

    // Handle connection error
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
      // Try to reconnect on error
      setTimeout(() => {
        socket.connect()
      }, 1000)
    })

    // Cleanup on unmount
    return () => {
      console.log("Disconnecting socket")
      socket.disconnect()
      socketInitialized.current = false
      eventHandlersInitialized.current = false
    }
  }, [currentUserId]) // Only depend on currentUserId

  // Setup event handlers separately to avoid re-registering them
  useEffect(() => {
    if (!socketRef.current || eventHandlersInitialized.current || !currentUserId) return

    const socket = socketRef.current
    eventHandlersInitialized.current = true
    console.log("Setting up socket event handlers...")

    // Handle online users list
    socket.on("onlineUsers", (onlineUserIds: number[]) => {
      console.log("Online users:", onlineUserIds)
      setOnlineUsers(onlineUserIds)
    })

    // Handle individual user coming online
    socket.on("userOnline", (userId: number) => {
      console.log("User came online:", userId)
      setOnlineUsers((prev) => {
        if (prev.includes(userId)) return prev
        return [...prev, userId]
      })
    })

    // Handle individual user going offline
    socket.on("userOffline", (userId: number) => {
      console.log("User went offline:", userId)
      setOnlineUsers((prev) => prev.filter((id) => id !== userId))
    })

    // Handle new messages
    socket.on("newMessage", (messageData: Message) => {
      console.log("New message received:", messageData)

      // Check if message already exists
      const messageExists = (messages: Message[], id: number) => {
        return messages.some((msg) => msg.id === id)
      }

      // If this is a message we sent, don't add it again
      if (messageData.sender.id === currentUserId) {
        // Only replace temporary message with server message
        setMessages((prevMessages) =>
          prevMessages.map((msg) => {
            // If this is a temporary message (id is a large timestamp)
            if (
              typeof msg.id === "number" &&
              msg.id > 1000000000000 &&
              msg.sender.id === currentUserId &&
              msg.receiver.id === messageData.receiver.id &&
              msg.message === messageData.message
            ) {
              return { ...messageData, isNew: true } // Replace temporary message with server message and mark as new
            }
            return msg
          }),
        )

        // Update last message in contacts list
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === messageData.receiver.id ? { ...user, lastMessage: messageData.message } : user,
          ),
        )

        return // No further processing needed
      }

      // Update last message and unread count in contacts list
      if (messageData.receiver.id === currentUserId) {
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === messageData.sender.id) {
              // If this user is currently selected, don't increment unread count
              const isSelected = selectedContact && selectedContact.id === user.id
              return {
                ...user,
                lastMessage: messageData.message,
                unread: isSelected ? 0 : (user.unread || 0) + 1,
              }
            }
            return user
          })
        })

        // If message is for current chat, add it to messages state
        if (selectedContact && selectedContact.id === messageData.sender.id) {
          // Mark messages as read
          socket.emit("markMessagesAsRead", {
            senderId: messageData.sender.id,
            receiverId: currentUserId,
          })

          // Add message to messages state
          setMessages((prevMessages) => {
            // If message already exists, don't add it again
            if (messageExists(prevMessages, messageData.id)) {
              return prevMessages
            }
            return [...prevMessages, { ...messageData, isRead: true, isNew: true }]
          })
        }
      }
    })

    // Handle messages marked as read
    socket.on("messagesMarkedAsRead", (data: { senderId: number; receiverId: number }) => {
      console.log("Messages marked as read:", data)

      // If we're the sender, update our messages to show they've been read
      if (data.senderId === currentUserId) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.sender.id === currentUserId && msg.receiver.id === data.receiverId ? { ...msg, isRead: true } : msg,
          ),
        )
      }

      // Update the unread count for the contact
      if (data.receiverId === currentUserId) {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === data.senderId ? { ...user, unread: 0 } : user)))
      }
    })

    // Handle unread counts update
    socket.on("unreadCounts", () => {
      getUnreadCounts()
    })

    // Handle typing indicator
    socket.on("userTyping", (data: { senderId: number }) => {
      const { senderId } = data
      console.log("User typing:", senderId)

      // Set the user as typing
      setTypingUsers((prev) => ({ ...prev, [senderId]: true }))

      // Clear previous timeout if exists
      if (typingTimeoutsRef.current[senderId]) {
        clearTimeout(typingTimeoutsRef.current[senderId])
      }

      // Set a timeout to clear the typing indicator after 3 seconds
      typingTimeoutsRef.current[senderId] = setTimeout(() => {
        setTypingUsers((prev) => ({ ...prev, [senderId]: false }))
      }, 3000)
    })

    // Reconnection events
    socket.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected after ${attemptNumber} attempts`)

      // Rejoin chat room after reconnection
      socket.emit("joinChat", currentUserId)
      socket.emit("getOnlineUsers")
    })

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`)
    })

    socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error)
    })

    socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect")
    })

    return () => {
      // Clean up typing timeouts
      Object.values(typingTimeoutsRef.current).forEach((timeout) => {
        clearTimeout(timeout)
      })
      typingTimeoutsRef.current = {}

      // Remove all event listeners when component unmounts or dependencies change
      socket.off("onlineUsers")
      socket.off("userOnline")
      socket.off("userOffline")
      socket.off("newMessage")
      socket.off("messagesMarkedAsRead")
      socket.off("unreadCounts")
      socket.off("userTyping")
      socket.off("reconnect")
      socket.off("reconnect_attempt")
      socket.off("reconnect_error")
      socket.off("reconnect_failed")
      eventHandlersInitialized.current = false
    }
  }, [currentUserId, selectedContact, getUnreadCounts])

  // Handle selected contact changes
  useEffect(() => {
    if (!socketRef.current || !selectedContact || !currentUserId) return

    // Mark messages as read when selecting a contact
    socketRef.current.emit("markMessagesAsRead", {
      senderId: selectedContact.id,
      receiverId: currentUserId,
    })
  }, [selectedContact, currentUserId])

  // Update online status with debounce
  useEffect(() => {
    // Debounce function
    const debounce = (func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout
      return (...args: any[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func(...args)
        }, delay)
      }
    }

    // Debounced function to update online status
    const updateOnlineStatus = debounce((onlineUsersList: number[]) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          online: onlineUsersList.includes(user.id),
        })),
      )

      // Update selected contact if needed
      if (selectedContact) {
        const isOnline = onlineUsersList.includes(selectedContact.id)

        // Only update if the online status has changed
        if (selectedContact.online !== isOnline) {
          setSelectedContact({
            ...selectedContact,
            online: isOnline,
          })
        }
      }
    }, 1000) // 1 second delay

    // Call the debounced function
    updateOnlineStatus(onlineUsers)
  }, [onlineUsers, selectedContact])

  // Fetch connections
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axiosInstance.get<Connection[]>("/connections/me")
        setConnections(response.data)

        // Convert connections to users format
        const connectionUsers: User[] = response.data.map((connection) => {
          // Determine if the other user is the requester or receiver
          const isRequester = connection.requesterId !== currentUserId
          const otherUser = isRequester ? connection.requester : connection.receiver

          return {
            id: otherUser.id,
            email: otherUser.email,
            profile: {
              firstName: otherUser.profile.firstName,
              lastName: otherUser.profile.lastName,
              avatar:
                otherUser.profile.avatar ||
                `/placeholder.svg?height=40&width=40&text=${otherUser.profile.firstName.substring(0, 2).toUpperCase()}`,
            },
            online: onlineUsers.includes(otherUser.id),
            lastMessage: "No messages yet",
            unread: 0,
          }
        })

        setUsers(connectionUsers)

        // If we have a receiverId, select that user automatically
        if (effectiveReceiverId && connectionUsers.length > 0) {
          const userToSelect = connectionUsers.find((u) => u.id === Number(effectiveReceiverId))

          if (userToSelect) {
            selectContact(userToSelect)
          }
        }
      } catch (error) {
        console.error("Error fetching connections:", error)
        setConnections([])
      }
    }

    if (currentUserId) {
      fetchConnections()
    }
  }, [currentUserId, effectiveReceiverId, onlineUsers, selectContact])

  // Fetch chat history when selected contact changes
  const fetchChatHistory = async () => {
    if (!selectedContact?.id || !currentUserId) return

    setIsLoading(true)

    try {
      const userId = currentUserId
      const receiverId = selectedContact.id

      console.log("Fetching chat history for:", { userId, receiverId })

      const url = `/chat/history/${userId}/${receiverId}`
      const response = await axiosInstance.get(url)

      if (response.data && response.data.success) {
        if (Array.isArray(response.data.chatHistory)) {
          // Sort messages by timestamp
          const sortedMessages = [...response.data.chatHistory].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
          )

          console.log("Loaded chat history, messages count:", sortedMessages.length)

          // Save messages to state
          setMessages(sortedMessages)

          // Mark messages as read
          if (socketRef.current) {
            socketRef.current.emit("markMessagesAsRead", {
              senderId: receiverId,
              receiverId: userId,
            })
          }

          // Update last message in contacts list
          if (sortedMessages.length > 0) {
            const lastMsg = sortedMessages[sortedMessages.length - 1]
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === selectedContact.id ? { ...user, lastMessage: lastMsg.message, unread: 0 } : user,
              ),
            )
          }
        } else {
          console.error("Error: chat history is not in expected array format", response.data)
          setMessages([])
        }
      } else {
        console.error("Error in chat history response", response.data)
        setMessages([])
      }
    } catch (error) {
      console.error("Error fetching chat history:", error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedContact?.id && currentUserId) {
      // Clear messages before fetching new ones
      setMessages([])
      fetchChatHistory()
    }
  }, [selectedContact?.id, currentUserId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, messagesEndRef])

  // Mark messages as read when chat area is visible and has focus
  useEffect(() => {
    const markMessagesAsReadWhenVisible = () => {
      if (selectedContact && currentUserId && document.hasFocus() && chatAreaRef.current && socketRef.current) {
        socketRef.current.emit("markMessagesAsRead", {
          senderId: selectedContact.id,
          receiverId: currentUserId,
        })
      }
    }

    // Check when window gets focus
    window.addEventListener("focus", markMessagesAsReadWhenVisible)

    // Initial check
    markMessagesAsReadWhenVisible()

    return () => {
      window.removeEventListener("focus", markMessagesAsReadWhenVisible)
    }
  }, [selectedContact, currentUserId])

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !selectedContact || !currentUserId || !socketRef.current) {
      return
    }

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedContact.id,
      message: message.trim(),
    }

    // Create temporary message (for optimistic UI update)
    const tempId = Date.now() // Timestamp ID - this will be a very large number
    const tempMessage = {
      id: tempId,
      sender: {
        id: currentUserId,
        email: userProfileData?.email || "current@user.com",
      },
      receiver: {
        id: selectedContact.id,
        email: selectedContact.email || "receiver@user.com",
      },
      message: message.trim(),
      isRead: false,
      timestamp: new Date().toISOString(),
      isNew: true, // Mark as new for animation
    }

    // Add temporary message to UI
    setMessages((prev) => [...prev, tempMessage])
    console.log("Added temporary message to UI:", tempMessage)

    // Update last message in contacts list
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === selectedContact.id ? { ...user, lastMessage: message.trim() } : user)),
    )

    // Clear input field
    setMessage("")

    try {
      // Send message via socket
      socketRef.current.emit("sendMessage", messageData, (response: any) => {
        console.log("Message sent response:", response)

        if (response && response.success && response.message) {
          // Replace temporary message with server message
          setMessages((prevMessages) =>
            prevMessages.map((msg) => (msg.id === tempId ? { ...response.message, isNew: true } : msg)),
          )
          console.log("Replaced temporary message with server message:", response.message)
        } else {
          // If sending failed, remove temporary message
          setMessages((prev) => prev.filter((msg) => msg.id !== tempId))
          console.error("Failed to send message:", response)
          alert("Failed to send message. Please try again.")
        }
      })
    } catch (error) {
      console.error("Error sending message:", error)
      // Remove temporary message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId))
      alert("Failed to send message. Please try again.")
    }
  }

  // Handle typing indicator with debounce
  const debouncedEmitTyping = useCallback(
    debounce((receiverId: number) => {
      if (socketRef.current && currentUserId) {
        socketRef.current.emit("typing", {
          senderId: currentUserId,
          receiverId: receiverId,
        })
      }
    }, 500),
    [currentUserId],
  )

  // Toggle contacts sidebar (for mobile)
  const toggleContacts = () => {
    setShowContacts(!showContacts)
  }

  // Memoize filtered users list
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user?.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.profile?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [users, searchQuery],
  )

  // Group messages by date
  const groupedMessages = useMemo(() => groupMessagesByDate(messages), [messages])

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji)
  }

  // Handle voice recording
  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic here
    if (isRecording) {
      // Stop recording
      console.log("Stopping voice recording")
    } else {
      // Start recording
      console.log("Starting voice recording")
    }
  }

  // Handle file attachment
  const handleAttachment = () => {
    setIsAttaching(!isAttaching)
    // Implement file attachment logic here
    console.log("Attaching file")
  }

  return (
    <>
      <style jsx global>
        {messageAnimations}
      </style>
      <div className="h-[calc(100vh-15rem)] flex bg-slate-900 text-white rounded-lg border border-slate-800 overflow-hidden">
        {/* Contacts sidebar */}
        {(showContacts || !isMobile) && (
          <div
            className={cn(
              isMobile ? "absolute inset-0 z-10 bg-slate-900" : "relative",
              "w-full md:w-80 border-r border-slate-800 flex flex-col",
            )}
          >
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg text-white">Messages</h2>
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleContacts}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    isSelected={selectedContact?.id === contact.id}
                    currentUserId={currentUserId}
                    onSelect={(contact) => {
                      selectContact(contact)
                      if (isMobile) setShowContacts(false)
                    }}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-slate-400">No contacts found</div>
              )}
            </ScrollArea>
          </div>
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-slate-900" ref={chatAreaRef}>
          {/* Chat header */}
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleContacts}
                      className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  )}
                  <Avatar className="border-2 border-slate-700">
                    <AvatarImage src={selectedContact.profile.avatar} alt={selectedContact?.profile?.firstName} />
                    <AvatarFallback className="bg-slate-700 text-slate-200">
                      {selectedContact?.profile?.firstName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium text-white">
                      {selectedContact?.profile?.firstName} {selectedContact?.profile?.lastName}
                    </h2>
                    <p
                      className={cn(
                        "text-xs",
                        selectedContact?.online ? "text-green-500 font-medium" : "text-slate-400",
                      )}
                    >
                      {typingUsers[selectedContact.id] ? (
                        <TypingIndicator />
                      ) : selectedContact.online ? (
                        "Online"
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search in conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-4">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-2 mb-3">
                        <div
                          className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                      <p className="text-slate-400">Loading messages...</p>
                    </div>
                  </div>
                ) : groupedMessages.length > 0 ? (
                  <div className="space-y-4">
                    {groupedMessages.map((group, groupIndex) => (
                      <div key={group.date}>
                        <DateSeparator date={group.date} />
                        <div className="space-y-2">
                          {group.messages.map((msg, msgIndex) => (
                            <MessageItem
                              key={msg.id}
                              message={msg}
                              currentUserId={currentUserId}
                              isLastInGroup={msgIndex === group.messages.length - 1}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center animate-fade-in max-w-md">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                        <MessageSquare className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="text-slate-300 mb-2 font-medium">No messages yet</p>
                      <p className="text-sm text-slate-500 mb-4">
                        Start a conversation with {selectedContact.profile.firstName}
                      </p>
                      <div className="bg-slate-800/50 p-3 rounded-lg text-left text-sm text-slate-400 mb-4">
                        <p className="mb-2">Conversation starter ideas:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Ask about their professional experience</li>
                          <li>Discuss industry trends or technologies</li>
                          <li>Share an interesting article or resource</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message input */}
              <div className="p-3 border-t border-slate-800">
                {isRecording && (
                  <div className="bg-slate-800 p-2 mb-2 rounded-lg flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-sm text-white">Recording...</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsRecording(false)}
                      className="text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleAttachment}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            <Paperclip className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleVoiceRecording}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            <Mic className={cn("h-5 w-5", isRecording && "text-red-500")} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voice message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        // Emit typing event when user is typing
                        if (selectedContact && e.target.value.trim()) {
                          debouncedEmitTyping(selectedContact.id)
                        }
                      }}
                      placeholder="Type a message..."
                      className="pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Smile className="h-5 w-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!message.trim() && !isRecording}
                    className="bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-4">
              {isMobile && (
                <Button
                  variant="outline"
                  onClick={toggleContacts}
                  className="mb-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white animate-pulse"
                >
                  <Menu className="h-5 w-5 mr-2" />
                  Select a conversation
                </Button>
              )}
              <div className="text-center animate-fade-in">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center animate-pulse">
                    <MessageSquare className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Welcome to Chat</h3>
                  <p className="text-slate-400">
                    {isMobile ? "Tap the button above to" : "Please"} select a conversation to start messaging
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2 mx-auto">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm text-slate-300 font-medium">Real-time Chat</p>
                    <p className="text-xs text-slate-400">Instant messaging with your connections</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2 mx-auto">
                      <UserPlus className="h-4 w-4 text-indigo-500" />
                    </div>
                    <p className="text-sm text-slate-300 font-medium">Connections</p>
                    <p className="text-xs text-slate-400">Chat with your professional network</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
