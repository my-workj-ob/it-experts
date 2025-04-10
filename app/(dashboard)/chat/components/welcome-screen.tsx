"use client"

import { Button } from "@/components/ui/button"
import { Menu, MessageSquare, UserPlus } from "lucide-react"

interface WelcomeScreenProps {
  isMobile: boolean
  toggleContacts: () => void
}

export const WelcomeScreen = ({ isMobile, toggleContacts }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col p-4">
      {isMobile && (
        <Button
          variant="outline"
          onClick={toggleContacts}
          className="mb-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white animate-pulse"
        >
          <Menu className="h-5 w-5 mr-2" />
          Select a conversation
        </Button>
      )}
      <div className="text-center animate-fade-in">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center animate-pulse">
            <MessageSquare className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-white">Welcome to Chat</h3>
          <p className="text-slate-400">
            {isMobile ? "Tap the button above to" : "Please"} select a conversation to start messaging
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2 mx-auto">
              <MessageSquare className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-sm text-slate-300 font-medium">Real-time Chat</p>
            <p className="text-xs text-slate-400">Instant messaging with your connections</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2 mx-auto">
              <UserPlus className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-sm text-slate-300 font-medium">Connections</p>
            <p className="text-xs text-slate-400">Chat with your professional network</p>
          </div>
        </div>
      </div>
    </div>
  )
}
