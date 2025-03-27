"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, Info, Search, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for demonstration
const mockContacts = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, are you available for a new project?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've sent you the design files",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's discuss the deployment strategy",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you help me with the data analysis?",
    time: "Monday",
    unread: 0,
    online: false,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hey, are you available for a new project?",
    time: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi Alex! What kind of project are you working on?",
    time: "10:32 AM",
  },
  {
    id: 3,
    senderId: 1,
    text: "It's a web app for a fintech startup. They need a full-stack developer with React and Node.js experience.",
    time: "10:33 AM",
  },
  {
    id: 4,
    senderId: "me",
    text: "Sounds interesting! I'm currently wrapping up a project, but I should be available next week. Can you share more details?",
    time: "10:35 AM",
  },
  {
    id: 5,
    senderId: 1,
    text: "Great! The project involves building a dashboard for financial analytics. They have a tight deadline - about 2 months for the MVP.",
    time: "10:36 AM",
  },
  {
    id: 6,
    senderId: 1,
    text: "Budget is competitive and they're open to remote work. Are you interested?",
    time: "10:36 AM",
  },
]

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const isMobile = useMobile()
  const [showContacts, setShowContacts] = useState(!isMobile)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      senderId: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const toggleContacts = () => {
    setShowContacts(!showContacts)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Contacts sidebar */}
        {showContacts && (
          <div className="w-full md:w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search conversations..." className="pl-8" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {mockContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors ${
                    selectedContact.id === contact.id ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    setSelectedContact(contact)
                    if (isMobile) setShowContacts(false)
                  }}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleContacts} className="mr-2">
                  {showContacts ? <Search /> : <Search />}
                </Button>
              )}
              <Avatar>
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedContact.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedContact.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

