"use client"

import type React from "react"

import { EmojiPicker } from "@/components/emoji-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mic, Paperclip, Send, Smile } from "lucide-react"
import type { FormEvent } from "react"
import { useEffect, useRef, useState } from "react"

interface MessageInputProps {
  message: string
  setMessage: (message: string) => void
  handleSendMessage: (e: FormEvent) => void
  handleAttachment: () => void
  startRecording: () => void
  debouncedEmitTyping: (receiverId: number, isTyping: boolean) => void
  selectedContactId: number
  audioBlob: Blob | null
  handleEmojiSelect: (emoji: string) => void
  emitTyping: (isTyping: boolean) => void;
}

export const MessageInput = ({
  message,
  setMessage,
  handleSendMessage,
  handleAttachment,
  startRecording,
  debouncedEmitTyping,
  emitTyping,
  selectedContactId,
  audioBlob,
  handleEmojiSelect,
}: MessageInputProps) => {
  // Track typing state
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastTypingEmitRef = useRef<number>(0)

  // Clear typing timeout and set typing to false
  const clearTypingTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }

  const stopTyping = () => {
    clearTypingTimeout();
    if (isTyping) {
      setIsTyping(false);
      debouncedEmitTyping(selectedContactId, false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    const now = Date.now();

    if (!newValue.trim()) {
      debouncedEmitTyping(selectedContactId, false);
      stopTyping();
      return;
    }

    if (!isTyping || now - lastTypingEmitRef.current > 2000) {
      setIsTyping(true);
      debouncedEmitTyping(selectedContactId, true);
      lastTypingEmitRef.current = now;
    }

    clearTypingTimeout();
    typingTimeoutRef.current = setTimeout(() => {
      debouncedEmitTyping(selectedContactId, false);
      stopTyping();
      clearTypingTimeout();
      setIsTyping(false);
    }, 2000);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    stopTyping();
    handleSendMessage(e);

  }

  // Handle form submission

  // Clean up when component unmounts or selected contact changes
  useEffect(() => {
    // Stop typing when contact changes
    stopTyping()

    // Clean up on unmount
    return () => {
      stopTyping()
    }
  }, [selectedContactId, debouncedEmitTyping,])


  useEffect(() => {
    const handleBeforeUnload = () => {
      debouncedEmitTyping(selectedContactId, false)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [debouncedEmitTyping, selectedContactId])

  return (
    <div className="p-3 border-t border-slate-800">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
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
            onChange={handleInputChange}
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
