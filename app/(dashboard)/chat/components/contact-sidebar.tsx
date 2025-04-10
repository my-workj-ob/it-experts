"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowLeft, Search } from "lucide-react"
import { ContactItem } from "./contact-item"

interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
  }
  email: string
  online: boolean
  lastMessage?: string
  unread?: number
  status?: string
  isBlocked?: boolean
  isSpam?: boolean
}

interface ContactsSidebarProps {
  showContacts: boolean
  isMobile: boolean
  toggleContacts: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredUsers: User[]
  selectedContact: User | null
  currentUserId: number
  selectContact: (contact: User) => void
  userDetails: User | null
}

export const ContactsSidebar = ({
  isMobile,
  toggleContacts,
  searchQuery,
  setSearchQuery,
  filteredUsers,
  selectedContact,
  currentUserId,
  selectContact,
  userDetails,
}: ContactsSidebarProps) => {
  return (
    <div
      className={cn(
        isMobile ? "absolute inset-0 z-10 bg-slate-900" : "relative",
        "w-full md:w-80 border-r border-slate-800 flex flex-col",
      )}
    >
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-white">Messages</h2>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleContacts}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              currentUserId={currentUserId}
              onSelect={(contact) => {
                selectContact(contact)
                if (isMobile) toggleContacts()
              }}
            />
          ))
        ) : (
          <div className="p-4 text-center text-slate-400">No contacts found</div>
        )}
        {userDetails &&
          userDetails.id !== currentUserId &&
          !filteredUsers.some((user) => user.id === userDetails.id) && (
            <div>
              <div
                className={cn(
                  "p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors",
                  selectedContact?.id === userDetails.id ? "bg-slate-800" : "",
                  userDetails.unread > 0 ? "bg-slate-800/50" : "",
                )}
                onClick={() => selectContact(userDetails)}
              >
                <div className="relative">
                  <Avatar className="border-2 border-slate-700">
                    <AvatarImage src={userDetails.profile.avatar} alt={userDetails.profile.firstName} />
                    <AvatarFallback className="bg-slate-700 text-slate-200">
                      {userDetails.profile.firstName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {userDetails.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900 animate-pulse"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3
                      className={cn("font-medium truncate text-white", userDetails.unread > 0 ? "font-semibold" : "")}
                    >
                      {userDetails.profile.firstName} {userDetails.profile.lastName}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {userDetails.online ? <span className="text-green-500 font-medium">Online</span> : "Offline"}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm truncate",
                      userDetails.unread > 0 ? "text-white font-medium" : "text-slate-400",
                    )}
                  >
                    {userDetails.lastMessage || "No messages yet"}
                  </p>
                </div>
                {userDetails.unread > 0 && (
                  <Badge className="ml-auto bg-green-500 text-white animate-bounce-subtle">{userDetails.unread}</Badge>
                )}
              </div>
            </div>
          )}
      </ScrollArea>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

