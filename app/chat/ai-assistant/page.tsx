/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Bot, Copy, Loader2, RefreshCw, Send, Sparkles, ThumbsDown, ThumbsUp, User } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// Suggested prompts for the AI assistant\]
import DOMPurify from "isomorphic-dompurify"; // SSR muammosiz ishlaydi

import dynamic from "next/dynamic";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

const suggestedPrompts = [
  "Suggest project ideas based on my skills",
  "Help me write a connection message",
  "What skills should I learn next?",
  "Analyze my profile and suggest improvements",
  "Help me prepare for a technical interview",
  "Generate a professional bio for my profile",
  "How can I improve my networking skills?",
  "What are the latest trends in web development?",
  "Recommend resources to learn AI and machine learning",
  "Tips for remote collaboration on IT projects",
]
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};


// Custom hook for chat functionality
function useCustomChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for DevConnect. I can help you with networking advice, project ideas, technical questions, and career guidance. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // **Yangi user xabari**
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // **AbortController yaratish**
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // **APIga so'rov yuborish**
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // **Assistant xabarini yaratish**
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // **SSE oqimini o‘qish**
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to get reader from response body.");

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (done) break;

        // **Ma’lumotni dekodlash**
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6);

            if (data === "[DONE]") break;

            try {
              const parsed: { text: string } = JSON.parse(data);

              // **Oxirgi xabarni yangilash**
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = parsed.text;
                }
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing SSE data:", e, "Data:", data);
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Error in chat:", err);
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // **So‘rovni to‘xtatish**
  const stop = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };


  const reload = () => {
    // Implement reload functionality if needed
    console.log("Reload functionality not implemented")
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
  }
}


const MessageRenderer: React.FC<{ message: Message }> = ({ message }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSanitizedContent(
        typeof message.content === "object"
          ? DOMPurify.sanitize(JSON.stringify(message.content, null, 2))
          : DOMPurify.sanitize(message.content)
      );
    }
  }, [message.content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => <>{children}</>,
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 text-white px-1 py-0.5 rounded">{children}</code>
          );
        },
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {children}
          </a>
        ),
      }}
    >
      {sanitizedContent}
    </ReactMarkdown>
  );
};

export default function AIChatPage() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState<string | null>(null)

  // Use our custom chat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useCustomChat()

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Handle copying message to clipboard
  const handleCopyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopied(messageId)
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard",
      duration: 2000,
    })

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(null)
    }, 2000)
  }

  // Handle using a suggested prompt
  const handleUsePrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="container w-auto mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 w-[1100px] flex flex-col md:flex-row gap-4 overflow-hidden">
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
                <p className="text-xs text-muted-foreground">Powered by Mistral AI</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => reload()} disabled={isLoading || messages.length <= 1}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message: any) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div className="flex gap-3 max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1 order-last">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "px-4 py-2 rounded-lg",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {/* Markdown render qilingan xabarlar */}
                      <MessageRenderer message={message} />
                      {/* Quyidagi tugmalar faqat assistant xabarlariga qo‘shiladi */}
                      <div className="flex justify-between items-center mt-2">
                        <p
                          className={cn(
                            "text-xs",
                            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                          )}
                        >
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {message.role === "assistant" && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleCopyToClipboard(message.content, message.id)}
                            >
                              <Copy className={cn("h-3 w-3", copied === message.id && "text-green-500")} />
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

              {/* Yozilayotgan xabarni animatsiya qilish */}
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

              {/* Xatolik holati */}
              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                  <p>Error: {error.message || "Something went wrong. Please try again."}</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
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
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto py-2 px-3 text-left"
                      onClick={() => handleUsePrompt(prompt)}
                      disabled={isLoading}
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
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Write a professional connection request message")}
                          >
                            Connection Request
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Write a project invitation message")}
                          >
                            Project Invitation
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Write a follow-up message after a networking event")}
                          >
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
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Generate a professional bio for my IT profile")}
                          >
                            Bio Generator
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Analyze my skills and suggest improvements")}
                          >
                            Skill Analyzer
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Help me format my work experience for maximum impact")}
                          >
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
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Write a compelling project description for a web app")}
                          >
                            Project Description
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("What roles should I include in my project team?")}
                          >
                            Team Roles
                          </Badge>
                          <Badge
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => handleUsePrompt("Recommend a tech stack for my project")}
                          >
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

