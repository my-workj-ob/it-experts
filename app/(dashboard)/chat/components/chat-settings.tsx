"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Bell, BellOff, Flag, ShieldAlert, Volume2, VolumeX } from "lucide-react"
import React from "react"

interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
  }
  email: string
  isBlocked?: boolean
  isSpam?: boolean
}

interface ChatSettingsModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  onBlock: () => void
  onUnblock: () => void
  onMarkAsSpam: () => void
  isBlocked: boolean
  isSpam: boolean
}

export const ChatSettingsModal = ({
  user,
  isOpen,
  onClose,
  onBlock,
  onUnblock,
  onMarkAsSpam,
  isBlocked,
  isSpam,
}: ChatSettingsModalProps) => {
  const [notifications, setNotifications] = React.useState(true)
  const [sounds, setSounds] = React.useState(true)
  const [mediaAutoDownload, setMediaAutoDownload] = React.useState(true)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">Chat Settings</DialogTitle>
          <DialogDescription>
            Configure your chat settings with {user.profile.firstName} {user.profile.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-300">Notifications</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {notifications ? (
                  <Bell className="h-4 w-4 text-green-500" />
                ) : (
                  <BellOff className="h-4 w-4 text-slate-500" />
                )}
                <Label htmlFor="notifications" className="text-sm text-slate-300">
                  Enable notifications
                </Label>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {sounds ? (
                  <Volume2 className="h-4 w-4 text-green-500" />
                ) : (
                  <VolumeX className="h-4 w-4 text-slate-500" />
                )}
                <Label htmlFor="sounds" className="text-sm text-slate-300">
                  Message sounds
                </Label>
              </div>
              <Switch id="sounds" checked={sounds} onCheckedChange={setSounds} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="media-download" className="text-sm text-slate-300">
                  Auto-download media
                </Label>
              </div>
              <Switch id="media-download" checked={mediaAutoDownload} onCheckedChange={setMediaAutoDownload} />
            </div>
          </div>

          <Separator className="bg-slate-800" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-yellow-500" />
              Privacy & Safety
            </h3>

            <div className="rounded-md bg-slate-800 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Block this user
                </Label>
                <Button
                  variant={isBlocked ? "destructive" : "outline"}
                  size="sm"
                  onClick={isBlocked ? onUnblock : onBlock}
                  className={isBlocked ? "bg-red-500 hover:bg-red-600" : "border-slate-700 text-slate-300"}
                >
                  {isBlocked ? "Unblock" : "Block"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-300 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-yellow-500" />
                  Report as spam
                </Label>
                <Button
                  variant={isSpam ? "destructive" : "outline"}
                  size="sm"
                  onClick={onMarkAsSpam}
                  disabled={isSpam}
                  className={
                    isSpam
                      ? "bg-yellow-500 hover:bg-yellow-600 text-slate-900 opacity-50 cursor-not-allowed"
                      : "border-slate-700 text-slate-300"
                  }
                >
                  {isSpam ? "Reported" : "Report"}
                </Button>
              </div>
            </div>

            {isBlocked && (
              <p className="text-xs text-red-400 mt-1">You've blocked this user. You won't receive their messages.</p>
            )}

            {isSpam && (
              <p className="text-xs text-yellow-400 mt-1">
                You've reported this user as spam. Our team will review this case.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="border border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
