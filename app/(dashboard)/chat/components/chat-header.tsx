"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { get } from "lodash"
import { Menu, Search, Settings, UserPlus } from "lucide-react"
import { TypingIndicator } from "./typing-indicator"

interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
  }
  email: string
  online: boolean
  status?: string
}

interface ChatHeaderProps {
  selectedContact: User | null
  isMobile: boolean
  toggleContacts: () => void
  toggleUserProfile: () => void
  toggleSettingsModal: () => void
  typingUsers: { [key: number]: boolean }
  handleRequest: (data: any) => void
  handleAccept: (data: any) => void
  handleRemoveConnection: (data: any) => void
  userDetails: User | null
}

export const ChatHeader = ({
  selectedContact,
  isMobile,
  toggleContacts,
  toggleUserProfile,
  toggleSettingsModal,
  typingUsers,
  handleRequest,
  handleAccept,
  handleRemoveConnection,
  userDetails,
}: ChatHeaderProps) => {
  if (!selectedContact) return null

  return (
    <div className="p-4 border-b border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleContacts}
            className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="border-2 border-slate-700">
          <AvatarImage src={selectedContact.profile.avatar} alt={selectedContact?.profile?.firstName} />
          <AvatarFallback className="bg-slate-700 text-slate-200">
            {selectedContact?.profile?.firstName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium text-white">
            {selectedContact?.profile?.firstName} {selectedContact?.profile?.lastName}
          </h2>
          <p className={cn("text-xs", selectedContact?.online ? "text-green-500 font-medium" : "text-slate-400")}>
            {typingUsers[selectedContact.id] ? <TypingIndicator /> : selectedContact.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={toggleUserProfile}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={toggleSettingsModal}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search in conversation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                size="default"
                className="text-slate-400 hover:text-white bg-green-500 hover:bg-green-600"
                onClick={() => {
                  if (get(userDetails, "status") === "connect") {
                    handleRequest({
                      receiverId: get(userDetails, "id"),
                    })
                  } else if (get(userDetails, "status") === "pending") {
                    handleAccept(get(userDetails, "id"))
                  } else {
                    handleRemoveConnection(get(userDetails, "id"))
                  }
                }}
              >
                {get(userDetails, "status") === "connect"
                  ? "Connect"
                  : get(userDetails, "status") === "pending"
                    ? "Pending"
                    : "Remove"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Connection status</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
