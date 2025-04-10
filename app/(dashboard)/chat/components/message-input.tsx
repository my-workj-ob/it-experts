"use client"

import { EmojiPicker } from "@/components/emoji-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mic, Paperclip, Send, Smile } from "lucide-react"
import type { FormEvent } from "react"

interface MessageInputProps {
  message: string
  setMessage: (message: string) => void
  handleSendMessage: (e: FormEvent) => void
  handleAttachment: () => void
  startRecording: () => void
  debouncedEmitTyping: (receiverId: number) => void
  selectedContactId: number
  audioBlob: Blob | null
  handleEmojiSelect: (emoji: string) => void
}

export const MessageInput = ({
  message,
  setMessage,
  handleSendMessage,
  handleAttachment,
  startRecording,
  debouncedEmitTyping,
  selectedContactId,
  audioBlob,
  handleEmojiSelect,
}: MessageInputProps) => {
  return (
    <div className="p-3 border-t border-slate-800">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleAttachment}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startRecording}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="relative flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              // Emit typing event when user is typing
              if (selectedContactId && e.target.value.trim()) {
                debouncedEmitTyping(selectedContactId)
              }
            }}
            placeholder="Type a message..."
            className="pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!message.trim() && !audioBlob}
          className="bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-105 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}
