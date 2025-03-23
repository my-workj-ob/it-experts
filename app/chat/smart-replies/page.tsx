"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, Send, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Mock data for demonstration
const mockContact = {
  id: 1,
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=40&width=40",
  role: "Frontend Developer",
  online: true,
}

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hey, I saw your profile and I'm impressed with your React experience. Are you available for a new project?",
    time: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi Alex! Thanks for reaching out. I'm currently wrapping up a project, but I should be available next week. What kind of project are you working on?",
    time: "10:32 AM",
  },
  {
    id: 3,
    senderId: 1,
    text: "It's a web app for a fintech startup. They need a full-stack developer with React and Node.js experience. The project involves building a dashboard for financial analytics.",
    time: "10:33 AM",
  },
  {
    id: 4,
    senderId: 1,
    text: "Budget is competitive and they're open to remote work. Would you be interested in discussing further?",
    time: "10:34 AM",
  },
]

// Smart reply suggestions based on the last message
const getSmartReplies = (lastMessage: string) => {
  if (lastMessage.includes("interested")) {
    return [
      "Yes, I'm definitely interested! When would be a good time to discuss the details?",
      "Sounds interesting! Could you share more about the tech stack and timeline?",
      "I'd like to learn more. Do you have a job description you could share?",
    ]
  } else if (lastMessage.includes("budget")) {
    return [
      "That sounds promising. What's the expected timeline for the project?",
      "I'm interested. Could we schedule a call to discuss the details?",
      "Sounds like a good fit for my skills. What's the next step?",
    ]
  } else if (lastMessage.includes("experience")) {
    return [
      "Yes, I have 3+ years of experience with React and Node.js.",
      "I've worked on several similar projects in the fintech space.",
      "I'd be happy to share my portfolio with relevant projects.",
    ]
  } else {
    return [
      "Thanks for reaching out! I'd be interested in learning more.",
      "That sounds like an interesting opportunity.",
      "I'm available to discuss this further. When works for you?",
    ]
  }
}

export default function SmartRepliesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState("")
  const [smartReplies, setSmartReplies] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate smart replies based on the last message
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.senderId !== "me") {
        setSmartReplies(getSmartReplies(lastMessage.text))
      } else {
        setSmartReplies([])
      }
    }

    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      id: messages.length + 1,
      senderId: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")
    setSmartReplies([])

    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        senderId: 1,
        text: "Great! Let's schedule a call next week to discuss the details. How does Tuesday at 2 PM sound?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 3000)
  }

  const handleSmartReply = (reply: string) => {
    const newMessage = {
      id: messages.length + 1,
      senderId: "me",
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setSmartReplies([])

    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        senderId: 1,
        text: "Great! Let's schedule a call next week to discuss the details. How does Tuesday at 2 PM sound?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 3000)
  }

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
        {/* Chat header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={mockContact.avatar} alt={mockContact.name} />
              <AvatarFallback>{mockContact.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{mockContact.name}</h2>
              <p className="text-xs text-muted-foreground">{mockContact.role}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Smart Replies Enabled
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                {msg.senderId !== "me" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={mockContact.avatar} alt={mockContact.name} />
                    <AvatarFallback>{mockContact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${msg.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${msg.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Smart replies */}
        {smartReplies.length > 0 && (
          <div className="p-2 border-t bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Smart Replies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {smartReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={() => handleSmartReply(reply)}
                >
                  {reply}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Message input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

