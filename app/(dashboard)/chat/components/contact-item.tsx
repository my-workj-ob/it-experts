"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import React from "react"

interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
    jobTitle?: string
    skills?: string[]
    location?: string
    experience?: string
  }
  email: string
  online: boolean
  lastMessage?: string
  unread?: number
  status?: string
  matchPercentage?: number
  isBlocked?: boolean
  isSpam?: boolean
}

export const ContactItem = React.memo(
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
          contact.isBlocked ? "opacity-60" : "",
          contact.isSpam ? "border-l-2 border-yellow-500" : "",
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
        {contact.isBlocked && (
          <Badge variant="outline" className="ml-auto bg-red-500/10 text-red-400 border-red-500/20">
            Blocked
          </Badge>
        )}
      </div>
    )
  },
)
