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
import { ArrowLeft, Check, CheckCheck, Menu, Mic, Paperclip, Search, Send, Smile, X } from "lucide-react"
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
}

// User type definition
interface User {
  id: number
  profile: {
    firstName: string
    avatar: string
  }
  online: boolean
  lastMessage: string
  unread: number
}

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

    return (
      <div className={cn("flex", isCurrentUser ? "justify-end" : "justify-start", !isLastInGroup && "mb-1")}>
        <div
          className={cn(
            "max-w-[80%] rounded-lg p-3",
            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
            isCurrentUser ? "rounded-br-none" : "rounded-bl-none",
          )}
        >
          <p className="break-words">{message.message}</p>
          <div
            className={`flex items-center justify-between mt-1 text-xs ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
          >
            <span>{time}</span>
            {isCurrentUser && (
              <span className="ml-2 flex items-center">
                {message.isRead ? <CheckCheck className="h-3 w-3 ml-1" /> : <Check className="h-3 w-3 ml-1" />}
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
      <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{formattedDate}</div>
    </div>
  )
}

// Use React.memo to prevent unnecessary re-renders of contact items
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
    if (contact.id === currentUserId) return null

    return (
      <div
        className={cn(
          "p-3 flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors",
          isSelected ? "bg-muted" : "",
          contact.unread > 0 ? "bg-muted/50" : "",
        )}
        onClick={() => onSelect(contact)}
      >
        <div className="relative">
          <Avatar>
            <AvatarImage src={contact.profile.avatar} alt={contact.profile.firstName} />
            <AvatarFallback>{contact.profile.firstName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {contact.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className={cn("font-medium truncate", contact.unread > 0 ? "font-semibold" : "")}>
              {contact.profile.firstName}
            </h3>
            <span className="text-xs text-muted-foreground">
              {contact.online ? <span className="text-green-500 font-medium">Online</span> : "Offline"}
            </span>
          </div>
          <p
            className={cn(
              "text-sm truncate",
              contact.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground",
            )}
          >
            {contact.lastMessage}
          </p>
        </div>
        {contact.unread > 0 && <Badge className="ml-auto bg-primary text-primary-foreground">{contact.unread}</Badge>}
      </div>
    )
  },
)

export default function ChatPage() {
  const { userProfileData } = useProfile()
  const [selectedContact, setSelectedContact] = useState<User | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
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

  // Function to select a contact - this prevents the infinite loop
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

  // Setup socket connection - FIXED INFINITE LOOP
  useEffect(() => {
    // Only initialize socket once
    if (socketInitialized.current || !currentUserId) return

    socketInitialized.current = true

    // Connect to the Socket.io server
    const socket = io("http://localhost:3030", {
      transports: ["websocket", "polling"], // Use both for better compatibility
      withCredentials: true,
      forceNew: true,
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

      // Add the new message to the messages state if it's relevant to the current chat
      setMessages((prevMessages) => {
        // Check if this message is already in our list (by id)
        if (prevMessages.some((msg) => msg.id === messageData.id)) {
          return prevMessages
        }

        // Check if the message is relevant to the current chat
        if (
          selectedContact &&
          ((messageData.sender.id === currentUserId && messageData.receiver.id === selectedContact.id) ||
            (messageData.receiver.id === currentUserId && messageData.sender.id === selectedContact.id))
        ) {
          // If we're the receiver and the chat is open, mark as read immediately
          if (messageData.receiver.id === currentUserId && selectedContact.id === messageData.sender.id) {
            socket.emit("markMessagesAsRead", {
              senderId: messageData.sender.id,
              receiverId: currentUserId,
            })

            // Return with isRead set to true
            return [...prevMessages, { ...messageData, isRead: true }]
          }

          return [...prevMessages, messageData]
        }

        // If the message is for us but not from the currently selected contact,
        // increment the unread count for that contact
        if (messageData.receiver.id === currentUserId) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === messageData.sender.id
                ? { ...user, unread: (user.unread || 0) + 1, lastMessage: messageData.message }
                : user,
            ),
          )
        }

        return prevMessages
      })
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

    // Cleanup on unmount
    return () => {
      console.log("Disconnecting socket")
      socket.disconnect()
      socketInitialized.current = false
    }
  }, [currentUserId]) // Remove selectedContact and getUnreadCounts from dependencies

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
    const debounce = (func, delay) => {
      let timeoutId
      return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func(...args)
        }, delay)
      }
    }

    // Debounced function to update online status
    const updateOnlineStatus = debounce((onlineUsersList) => {
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

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users")
        // Initialize users with online status
        const usersWithOnlineStatus = response.data.map((user: User) => ({
          ...user,
          online: onlineUsers.includes(user.id),
        }))
        setUsers(usersWithOnlineStatus)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, []) // Only run once on mount

  // Fetch chat history when selected contact changes
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (selectedContact?.id && currentUserId) {
        try {
          const userId = currentUserId
          const receiverId = selectedContact.id

          console.log("Fetching chat history for:", { userId, receiverId })

          const url = `/chat/history/${userId}/${receiverId}`
          const response = await axiosInstance.get(url)

          if (response.data && response.data.success) {
            if (Array.isArray(response.data.chatHistory)) {
              // Sort messages by timestamp to ensure correct order
              const sortedMessages = [...response.data.chatHistory].sort(
                (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
              )

              setMessages(sortedMessages)

              // Mark messages as read when loading chat history
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
                    user.id === selectedContact.id ? { ...user, lastMessage: lastMsg.message } : user,
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
        }
      }
    }

    fetchChatHistory()
  }, [selectedContact?.id, currentUserId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

    // Create a temporary message for optimistic UI update
    const tempId = Date.now()
    const tempMessage = {
      id: tempId,
      sender: {
        id: currentUserId,
        email: userProfileData?.email || "current@user.com",
      },
      receiver: {
        id: selectedContact.id,
        email: "receiver@user.com",
      },
      message: message.trim(),
      isRead: false,
      timestamp: new Date().toISOString(),
    }

    // Add temporary message to UI
    setMessages((prev) => [...prev, tempMessage])

    // Clear the input field
    setMessage("")

    try {
      // Send the message via socket
      socketRef.current.emit("sendMessage", messageData, (response: any) => {
        console.log("Message sent response:", response)

        if (response && response.success && response.message) {
          // Replace temporary message with real one from server
          setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === tempId ? response.message : msg)))

          // Update last message in contacts list
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === selectedContact.id ? { ...user, lastMessage: message.trim() } : user)),
          )
        } else {
          // Remove temporary message if sending failed
          setMessages((prev) => prev.filter((msg) => msg.id !== tempId))
          console.error("Failed to send message:", response)
          alert("Xabar yuborilmadi. Iltimos, qayta urinib ko'ring.")
        }
      })
    } catch (error) {
      console.error("Error sending message:", error)
      // Remove temporary message if error occurred
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId))
      alert("Xabar yuborilmadi. Iltimos, qayta urinib ko'ring.")
    }
  }

  // Toggle contacts sidebar (for mobile)
  const toggleContacts = () => {
    setShowContacts(!showContacts)
  }

  // Memoize filtered users list
  const filteredUsers = useMemo(
    () => users.filter((user) => user?.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())),
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
    <div className="h-[calc(100vh-10rem)] flex bg-background">
      {/* Contacts sidebar */}
      {(showContacts || !isMobile) && (
        <div
          className={cn(
            isMobile ? "absolute inset-0 z-10 bg-background" : "relative",
            "w-full md:w-80 border-r flex flex-col",
          )}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Messages</h2>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleContacts}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
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
              <div className="p-4 text-center text-muted-foreground">No contacts found</div>
            )}
          </ScrollArea>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 flex flex-col" ref={chatAreaRef}>
        {/* Chat header */}
        {selectedContact ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button variant="ghost" size="icon" onClick={toggleContacts} className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                )}
                <Avatar>
                  <AvatarImage src={selectedContact.profile.avatar} alt={selectedContact?.profile?.firstName} />
                  <AvatarFallback>{selectedContact?.profile?.firstName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedContact?.profile?.firstName}</h2>
                  <p
                    className={cn(
                      "text-xs",
                      selectedContact?.online ? "text-green-500 font-medium" : "text-muted-foreground",
                    )}
                  >
                    {selectedContact.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
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
              {groupedMessages.length > 0 ? (
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
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">No messages yet</p>
                    <p className="text-sm text-muted-foreground">
                      Start a conversation with {selectedContact.profile.firstName}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-3 border-t">
              {isRecording && (
                <div className="bg-muted p-2 mb-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-sm">Recording...</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsRecording(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" onClick={handleAttachment}>
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
                        <Button type="button" variant="ghost" size="icon" onClick={handleVoiceRecording}>
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
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" align="end">
                        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button type="submit" disabled={!message.trim() && !isRecording}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col p-4">
            {isMobile && (
              <Button variant="outline" onClick={toggleContacts} className="mb-4">
                <Menu className="h-5 w-5 mr-2" />
                Select a conversation
              </Button>
            )}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Welcome to Chat</h3>
              <p className="text-muted-foreground">
                {isMobile ? "Tap the button above to" : "Please"} select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
