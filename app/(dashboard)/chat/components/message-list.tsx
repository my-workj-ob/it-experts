"use client"

import type React from "react"
import { DateSeparator } from "./date-separator"
import { MessageItem } from "./message-item"

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
  isNew?: boolean
  audioUrl?: string
}

interface MessageGroup {
  date: string
  messages: Message[]
}

interface MessageListProps {
  isLoading: boolean
  isLoadingMore: boolean
  groupedMessages: MessageGroup[]
  currentUserId: number
  handleMessageContextMenu: (e: React.MouseEvent, msg: Message) => void
  handleEditMessage: (id: number, content: string) => void
  handleDeleteMessage: (id: number) => void
  handleReplyMessage: (msg: Message) => void
  messagesEndRef: React.RefObject<HTMLDivElement>
  messagesStartRef: React.RefObject<HTMLDivElement>
}

export const MessageList = ({
  isLoading,
  isLoadingMore,
  groupedMessages,
  currentUserId,
  handleMessageContextMenu,
  handleEditMessage,
  handleDeleteMessage,
  handleReplyMessage,
  messagesEndRef,
  messagesStartRef,
}: MessageListProps) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
          <p className="text-slate-400">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (groupedMessages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-slate-300 mb-2 font-medium">No messages yet</p>
          <p className="text-sm text-slate-500 mb-4">Start a conversation</p>
          <div className="bg-slate-800/50 p-3 rounded-lg text-left text-sm text-slate-400 mb-4">
            <p className="mb-2">Conversation starter ideas:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ask about their professional experience</li>
              <li>Discuss industry trends or technologies</li>
              <li>Share an interesting article or resource</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Loading indicator for infinite scroll */}
      {isLoadingMore && (
        <div className="flex justify-center py-2">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}

      {/* Observer element for infinite scroll */}
      <div ref={messagesStartRef} className="h-1" />

      {groupedMessages.map((group, groupIndex) => (
        <div key={group.date}>
          <DateSeparator date={group.date} />
          <div className="space-y-2">
            {group.messages.map((msg, msgIndex) => (
              <div key={msg.id} onContextMenu={(e) => handleMessageContextMenu(e, msg)}>
                <MessageItem
                  message={msg}
                  currentUserId={currentUserId}
                  isLastInGroup={msgIndex === group.messages.length - 1}
                  onEdit={(newContent) => handleEditMessage(msg.id, newContent)}
                  onDelete={() => handleDeleteMessage(msg.id)}
                  onReply={() => handleReplyMessage(msg)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

import { MessageSquare } from "lucide-react"
