"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import useProfile from "@/hooks/profile/use-profile"
import { useMobile } from "@/hooks/use-mobile"
import axiosInstance from "@/lib/create-axios"
import { get } from "lodash"
import { ArrowLeft, Check, CheckCheck, Menu, Search, Send } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
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
  const [unreadDataCount, setUnreadDataCount] = useState()
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
      if (currentUserId) {
        socketRef.current?.emit("markMessagesAsRead", {
          senderId: contact.id,
          receiverId: currentUserId,
        })
      }
    },
    [onlineUsers, currentUserId],
  )


  // Socket.io setup - ONLY depend on currentUserId to prevent reconnections
  const getUsers = useCallback(() => {
    // Disconnect previous socket if it exists
    if (socketRef.current) {
      console.log("Disconnecting previous socket")
      socketRef.current.disconnect()
    }




    // Connect to the Socket.io server
    const socket = io("https://tester-nu-two.vercel.app", {
      transports: ["websocket", "polling"],
      withCredentials: true,
      forceNew: true, // Force a new connection
    })

    socketRef.current = socket

    // Handle connection
    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id)

      // Join the user's chat room
      if (currentUserId) {
        socket.emit("joinChat", currentUserId, (response) => {
          console.log("Join chat response:", response)
        })

        // Request the list of online users
        socket.emit("getOnlineUsers")
      }
    })

    // Handle connection error
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
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

    // Handle new messages - IMPORTANT: This should match your backend event name
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
    socket.on("unreadCounts", (unreadData: { userId: number; unreadCount: number }[]) => {
      console.log("Unread counts received:", unreadData);
      const getUnreadCounts = async () => {
        try {
          // Fetch unread counts for each user
          const unreadCounts = await Promise.all(
            users.map(async (user) => {
              const res = await axiosInstance.get(`/unread-count/${user.id}`);

              console.log(res.data);

              return {
                userId: user.id,
                unreadCount: res.data.count, // Assuming `res.data.count` contains the unread count
              };
            })
          );
          console.log("unread: ", unreadCounts);

          // Update the users with the unread counts
          setUsers((prevUsers) =>
            prevUsers.map((user) => {
              const unreadInfo = unreadCounts.find((item) => item.userId === user.id);
              return unreadInfo ? { ...user, unread: unreadInfo.unreadCount } : user;
            })
          );
        } catch (error) {
          console.error('Error fetching unread counts:', error);
        }
      };




      getUnreadCounts();

    });



    // Cleanup on unmount
    return () => {
      console.log("Disconnecting socket")
      socket.disconnect()
    }
  }, [currentUserId, selectedContact]) // ONLY depend on currentUserId

  useEffect(() => {
    getUsers()
  }, [getUsers])

  // Update users with online status whenever onlineUsers changes
  useEffect(() => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        online: onlineUsers.includes(user.id),
      })),
    )

    // Update selected contact if needed, but ONLY if it exists
    if (selectedContact) {
      const isOnline = onlineUsers.includes(selectedContact.id)

      // Only update if the online status has changed
      if (selectedContact.online !== isOnline) {
        setSelectedContact({
          ...selectedContact,
          online: isOnline,
        })
      }
    }
  }, [onlineUsers])

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users")
        // Initialize users with online status based on onlineUsers array
        const usersWithOnlineStatus = response.data.map((user: User) => ({
          ...user,
          online: onlineUsers.includes(user.id),
        }))
        setUsers(usersWithOnlineStatus)

        // Request unread counts after fetching users
        if (currentUserId) {
          socketRef.current?.emit("getUnreadCounts", currentUserId)
        }
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

          // URL manzilini to'g'ri shakllantirish
          const url = `/chat/history/${userId}/${receiverId}`

          const response = await axiosInstance.get(url)
          console.log("Chat history response:", response.data)

          if (response.data && response.data.success) {
            if (Array.isArray(response.data.chatHistory)) {
              setMessages(response.data.chatHistory)

              // Mark messages as read when loading chat history
              socketRef.current?.emit("markMessagesAsRead", {
                senderId: receiverId,
                receiverId: userId,
              })
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
          if (error.response) {
            console.error("Server Response:", error.response.data)
          }
          setMessages([])
        }
      }
    }

    fetchChatHistory()
  }, [selectedContact?.id, currentUserId]) // Only depend on IDs, not the whole objects

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark messages as read when chat area is visible and has focus
  useEffect(() => {
    const markMessagesAsReadWhenVisible = () => {
      if (selectedContact && currentUserId && document.hasFocus() && chatAreaRef.current) {
        socketRef.current?.emit("markMessagesAsRead", {
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

    if (!message.trim() || !selectedContact || !currentUserId) {
      return
    }

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedContact.id,
      message: message.trim(),
    }

    // Clear the input field after sending
    setMessage("")

    try {
      console.log("Sending message:", messageData)

      // Use the socket to send the message directly
      socketRef.current?.emit("sendMessage", messageData, (response: any) => {
        console.log("Message sent response:", response)

        // If the server responds with success and the message data,
        // we can add it to our messages state
        if (response && response.success && response.message) {
          setMessages((prevMessages) => {
            // Check if this message is already in our list (by id)
            if (prevMessages.some((msg) => msg.id === response.message.id)) {
              return prevMessages
            }
            return [...prevMessages, response.message]
          })

          // Update the last message for this contact in the users list
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === selectedContact.id ? { ...user, lastMessage: message.trim() } : user)),
          )
        }
      })
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // Toggle contacts sidebar (for mobile)
  const toggleContacts = () => {
    setShowContacts(!showContacts)
  }

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user?.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background">
      {/* Contacts sidebar */}
      {(showContacts || !isMobile) && (
        <div
          className={`${isMobile ? "absolute inset-0 z-10 bg-background" : "relative"} 
                         w-full md:w-80 border-r flex flex-col`}
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
              filteredUsers.map((contact) => {
                if (contact.id === currentUserId) return null
                return (
                  <div
                    key={contact.id}
                    className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors ${selectedContact?.id === contact.id ? "bg-muted" : ""
                      }`}
                    onClick={() => {
                      selectContact(contact)
                      if (isMobile) setShowContacts(false)
                    }}
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
                        <h3 className={`font-medium truncate ${contact.unread > 0 ? "font-semibold" : ""}`}>
                          {contact.profile.firstName}
                        </h3>
                        <span
                          className={`text-xs ${contact.online ? "text-green-500 font-medium" : "text-muted-foreground"}`}
                        >
                          {contact.online ? "Online" : "Offline"}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${contact.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                      >
                        {contact.lastMessage}
                      </p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="ml-auto bg-primary text-primary-foreground">{contact.unread}</Badge>
                    )}
                  </div>
                )
              })
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
            <div className="p-4 border-b flex items-center gap-3">
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
                  className={`text-xs ${selectedContact?.online ? "text-green-500 font-medium" : "text-muted-foreground"}`}
                >
                  {selectedContact.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((msg) => {
                    const isCurrentUser = msg?.sender?.id === currentUserId

                    return (
                      <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                        >
                          <p>{msg.message}</p>
                          <div
                            className={`flex items-center justify-between mt-1 text-xs ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                          >
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            {isCurrentUser && (
                              <span className="ml-2 flex items-center">
                                {msg.isRead ? (
                                  <CheckCheck className="h-3 w-3 ml-1" />
                                ) : (
                                  <Check className="h-3 w-3 ml-1" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-3">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!message.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
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

