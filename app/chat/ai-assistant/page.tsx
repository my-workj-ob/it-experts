"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, Sparkles, RefreshCw, ThumbsUp, ThumbsDown, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock AI assistant responses
const aiResponses = {
  greeting:
    "Hello! I'm your AI assistant. I can help you with networking, finding projects, writing messages, and more. How can I assist you today?",
  projectIdeas:
    "Based on your profile and skills in React and TypeScript, here are some project ideas you might be interested in:\n\n1. A real-time collaboration tool for developers\n2. A dashboard for monitoring API performance\n3. A portfolio website builder for tech professionals",
  messageTemplate:
    "Hi [Name],\n\nI noticed your profile and I'm impressed with your experience in [Skill]. I'm currently working on a project that requires expertise in this area, and I'd love to connect to discuss potential collaboration opportunities.\n\nLooking forward to your response!\n\nBest regards,\n[Your Name]",
  skillSuggestion:
    "Based on your current skills, I recommend learning these complementary technologies:\n\n• GraphQL - Pairs well with your React experience\n• Docker - Essential for modern DevOps\n• TypeScript - Would enhance your JavaScript skills",
}

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: aiResponses.greeting,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("project") || lowercaseInput.includes("idea")) {
        aiResponse = aiResponses.projectIdeas
      } else if (lowercaseInput.includes("message") || lowercaseInput.includes("template")) {
        aiResponse = aiResponses.messageTemplate
      } else if (lowercaseInput.includes("skill") || lowercaseInput.includes("learn")) {
        aiResponse = aiResponses.skillSuggestion
      } else {
        aiResponse =
          "I understand you're asking about " + input + ". Could you provide more details so I can assist you better?"
      }

      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary/10">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-sm">DevConnect AI Assistant</h2>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMessages([messages[0]])}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex gap-3 max-w-[80%]">
                    {message.sender === "ai" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p
                          className={`text-xs ${
                            message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                        {message.sender === "ai" && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleCopyToClipboard(message.text)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="px-4 py-2 rounded-lg bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce delay-75"></div>
                        <div className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Suggestions panel */}
        <div className="w-full md:w-80 border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-medium">AI Suggestions</h2>
          </div>
          <Tabs defaultValue="prompts">
            <TabsList className="w-full">
              <TabsTrigger value="prompts" className="flex-1">
                Prompts
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex-1">
                Tools
              </TabsTrigger>
            </TabsList>
            <TabsContent value="prompts" className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                  {[
                    "Suggest project ideas based on my skills",
                    "Help me write a connection message",
                    "What skills should I learn next?",
                    "Analyze my profile and suggest improvements",
                    "Help me prepare for a technical interview",
                    "Generate a professional bio for my profile",
                  ].map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto py-2 px-3 text-left"
                      onClick={() => {
                        setInput(prompt)
                      }}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{prompt}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="tools" className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Message Writer</h3>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">Generate professional messages for:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer" variant="outline">
                            Connection Request
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Project Invitation
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Follow-up
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Profile Enhancer</h3>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">Improve your profile with:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer" variant="outline">
                            Bio Generator
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Skill Analyzer
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Experience Formatter
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Project Tools</h3>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">Tools for your projects:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer" variant="outline">
                            Project Description
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Team Roles
                          </Badge>
                          <Badge className="cursor-pointer" variant="outline">
                            Tech Stack Advisor
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

