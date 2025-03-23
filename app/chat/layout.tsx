"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Bot, Sparkles, Users, Search, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [showSidebar, setShowSidebar] = useState(!isMobile)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const chatTabs = [
    {
      value: "/chat",
      label: "Messages",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
    {
      value: "/chat/ai-assistant",
      label: "AI Assistant",
      icon: <Bot className="h-4 w-4 mr-2" />,
    },
    {
      value: "/chat/smart-replies",
      label: "Smart Replies",
      icon: <Sparkles className="h-4 w-4 mr-2" />,
    },
  ]

  const getCurrentTabValue = () => {
    const tab = chatTabs.find((tab) => pathname === tab.value || pathname.startsWith(`${tab.value}/`))
    return tab ? tab.value : "/chat"
  }

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-4rem)]">
      <div className="flex h-full gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden"
            onClick={toggleSidebar}
          >
            {showSidebar ? <X /> : <Menu />}
          </Button>
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "w-full md:w-64 border rounded-lg overflow-hidden transition-all duration-300",
            isMobile ? (showSidebar ? "fixed inset-0 z-40 bg-background" : "hidden") : "block",
          )}
        >
          <Tabs
            value={getCurrentTabValue()}
            className="h-full flex flex-col"
            onValueChange={(value) => {
              if (isMobile) {
                setShowSidebar(false)
              }
            }}
          >
            <div className="p-4 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search messages..."
                  className="w-full pl-8 pr-4 py-2 text-sm bg-background border rounded-md"
                />
              </div>
            </div>
            <TabsList className="flex p-0 h-12">
              {chatTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 rounded-none data-[state=active]:bg-muted"
                  asChild
                >
                  <Link href={tab.value} className="flex items-center justify-center">
                    {tab.icon}
                    <span className={isMobile ? "inline" : "hidden md:inline"}>{tab.label}</span>
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>

            {getCurrentTabValue() === "/chat" && (
              <div className="flex-1 overflow-auto">
                {/* Contact list would go here */}
                <div className="p-4 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                  <p>Select a chat or start a new conversation</p>
                  <Button className="mt-4" size="sm">
                    New Message
                  </Button>
                </div>
              </div>
            )}
          </Tabs>
        </div>

        {/* Main content */}
        <div className={cn("flex-1", isMobile && showSidebar ? "hidden" : "block")}>{children}</div>
      </div>
    </div>
  )
}

