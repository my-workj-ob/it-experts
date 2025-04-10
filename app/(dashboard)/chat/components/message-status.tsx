"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCheck, Send } from "lucide-react"
import { useEffect, useState } from "react"

interface MessageStatusBarProps {
  messageCount: number
  unreadCount: number
  isOnline: boolean
  lastActive?: string
  isTyping: boolean
}

export const MessageStatusBar = ({
  messageCount,
  unreadCount,
  isOnline,
  lastActive,
  isTyping,
}: MessageStatusBarProps) => {
  const [lastSeen, setLastSeen] = useState<string>("")

  useEffect(() => {
    if (!isOnline && lastActive) {
      const lastActiveDate = new Date(lastActive)
      const now = new Date()
      const diffMinutes = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60))

      if (diffMinutes < 1) {
        setLastSeen("Just now")
      } else if (diffMinutes < 60) {
        setLastSeen(`${diffMinutes}m ago`)
      } else if (diffMinutes < 1440) {
        setLastSeen(`${Math.floor(diffMinutes / 60)}h ago`)
      } else {
        setLastSeen(lastActiveDate.toLocaleDateString())
      }
    }
  }, [isOnline, lastActive])

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-md text-xs">
      {isTyping ? (
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
          Typing...
        </Badge>
      ) : isOnline ? (
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
          Online
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
          {lastSeen}
        </Badge>
      )}

      <div className="flex items-center gap-1 text-slate-400">
        <Send className="h-3 w-3" />
        <span>{messageCount}</span>
      </div>

      {unreadCount > 0 && (
        <div className="flex items-center gap-1 text-green-400">
          <CheckCheck className="h-3 w-3" />
          <span>{unreadCount} unread</span>
        </div>
      )}
    </div>
  )
}
