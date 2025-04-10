"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, Edit, Reply, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
}

interface MessageContextMenuProps {
  position: { x: number; y: number }
  message: Message
  currentUserId: number
  onClose: () => void
  onEdit: (messageId: number, newContent: string) => void
  onDelete: (messageId: number) => void
  onReply: (message: Message) => void
}

export const MessageContextMenu = ({
  position,
  message,
  currentUserId,
  onClose,
  onEdit,
  onDelete,
  onReply,
}: MessageContextMenuProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedMessage, setEditedMessage] = useState(message.message)
  const menuRef = useRef<HTMLDivElement>(null)
  const isCurrentUser = message.sender.id === currentUserId

  // Adjust position to ensure menu stays within viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 200),
    y: Math.min(position.y, window.innerHeight - 200),
  }

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Handle edit submit
  const handleEditSubmit = () => {
    if (editedMessage.trim()) {
      onEdit(message.id, editedMessage)
    }
  }

  return (
    <Card
      ref={menuRef}
      className="absolute z-50 bg-slate-800 border-slate-700 shadow-lg rounded-md overflow-hidden w-48"
      style={{
        top: `${adjustedPosition.y - 100}px`,
        left: `${adjustedPosition.x - 180}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {isEditing ? (
        <div className="p-2">
          <Input
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            className="mb-2 bg-slate-700 border-slate-600 text-white"
            autoFocus
          />
          <div className="flex justify-between">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="h-7 px-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleEditSubmit} className="h-7 px-2 text-xs bg-green-500 hover:bg-green-600">
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(message)}
            className="w-full justify-start rounded-none px-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>

          {isCurrentUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="w-full justify-start rounded-none px-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(message.id)}
                className="w-full justify-start rounded-none px-3 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(message.message)
              onClose()
            }}
            className="w-full justify-start rounded-none px-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy text
          </Button>
        </div>
      )}
    </Card>
  )
}
