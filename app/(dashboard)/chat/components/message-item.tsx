"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Copy, Edit, Reply, Trash } from "lucide-react"
import React, { useState } from "react"
import { formatMessageDate } from "./../../../../lib/chat-utils"

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
  isNew?: boolean // Flag for new messages to animate them
  audioUrl?: string // For voice messages
}

// Memoize the message component to prevent re-renders
export const MessageItem = React.memo(
  ({
    message,
    currentUserId,
    isLastInGroup,
    onEdit,
    onDelete,
    onReply,
  }: {
    message: Message
    currentUserId: number
    isLastInGroup: boolean
    onEdit?: (newContent: string) => void
    onDelete?: () => void
    onReply?: () => void
  }) => {
    const isCurrentUser = message?.sender?.id === currentUserId
    const time = formatMessageDate(message.timestamp)
    const [isEditing, setIsEditing] = useState(false)
    const [editedMessage, setEditedMessage] = useState(message.message)
    const [showActions, setShowActions] = useState(false)

    // Animation classes based on whether the message is new and who sent it
    const animationClasses = message.isNew ? (isCurrentUser ? "animate-message-send" : "animate-message-receive") : ""

    // Handle edit submit
    const handleEditSubmit = () => {
      if (editedMessage.trim() && onEdit) {
        onEdit(editedMessage)
        setIsEditing(false)
      }
    }

    // Handle audio playback
    const isAudioMessage = !!message.audioUrl

    return (
      <div
        className={cn("flex", isCurrentUser ? "justify-end" : "justify-start", !isLastInGroup && "mb-1", "group")}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {!isCurrentUser && (
          <div className="mr-2 self-end mb-1">
            <Avatar className="h-6 w-6 border border-slate-700">
              <AvatarImage
                src={`/placeholder.svg?height=24&width=24&text=${message.sender.email.substring(0, 2).toUpperCase()}`}
              />
              <AvatarFallback className="text-xs bg-slate-700">
                {message.sender.email.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div
          className={cn(
            "max-w-[80%] rounded-lg p-3 transition-all relative",
            isCurrentUser ? "bg-green-500 text-white" : "bg-slate-800 text-white",
            isCurrentUser ? "rounded-br-none" : "rounded-bl-none",
            animationClasses,
          )}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Input
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="h-7 px-2 text-xs">
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleEditSubmit}
                  className="h-7 px-2 text-xs bg-slate-700 hover:bg-slate-600"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              {isAudioMessage ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm opacity-80 mb-1">🎤 Voice message</p>
                  <audio controls className="max-w-full" src={message.audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <p className="break-words">{message.message}</p>
              )}

              <div
                className={`flex items-center justify-between mt-1 text-xs ${isCurrentUser ? "text-white/70" : "text-slate-400"
                  }`}
              >
                <span>{time}</span>
                {isCurrentUser && (
                  <span className="ml-2 flex items-center">
                    {message.isRead ? (
                      <CheckCheck className="h-3 w-3 ml-1 animate-read-receipt" />
                    ) : (
                      <Check className="h-3 w-3 ml-1" />
                    )}
                  </span>
                )}
              </div>

              {/* Message actions - shown on hover */}
              {showActions && (
                <div
                  className={cn(
                    "absolute -top-3 bg-slate-800 rounded-full shadow-lg flex items-center gap-1 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                    isCurrentUser ? "left-0" : "right-0",
                  )}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
                    onClick={onReply}
                  >
                    <Reply className="h-3 w-3" />
                  </Button>

                  {isCurrentUser && (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
                        onClick={onDelete}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
                    onClick={() => navigator.clipboard.writeText(message.message)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  },
)
