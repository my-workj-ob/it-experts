"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { MessageSquare } from "lucide-react"
import type React from "react"
import { useState } from "react"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMobile()
  const [showSidebar, setShowSidebar] = useState(!isMobile)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background">
      {/* Sidebar */}


      {/* Main content */}
      <div className="flex-1 relative">
        {/* Mobile toggle button */}
        {isMobile && !showSidebar && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 z-10 rounded-full shadow-lg"
            onClick={toggleSidebar}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}

        {children}
      </div>
    </div>
  )
}
