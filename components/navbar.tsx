"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import useAuthStatus from "@/hooks/auth/use-auth-status"
import useAuth from "@/hooks/auth/useAuth"
import useSocketNotification from "@/hooks/notification/use-socket-notification"
import { useNotifications, useUnreadNotificationCount } from "@/hooks/notification/useNotification"
import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import { get, isArray } from "lodash"
import { Bell, CheckCircle, Search, XCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Navbar() {
  const { isLoggedIn, } = useAuthStatus()
  const { userProfileData } = useProfile()
  const { logout } = useAuth()

  const { data: notificationList = [] } = useNotifications()
  const { data: unreadCount = 0 } = useUnreadNotificationCount()
  useSocketNotification(userProfileData?.id)
  const [notifications, setNotifications] = useState(notificationList);



  const handleMarkAsRead = async (notificationId: number) => {
    try {
      // PATCH so'rovini yuborish
      await axiosInstance.patch(`/notifications/${notificationId}/read`);

      // O'qilgan bildirishnomani state'da yangilash
      setNotifications((prevNotifications: any) =>
        prevNotifications.map((notification: any) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Bildirishnomani o'qilgan deb belgilashda xatolik:", error);
    }
  };



  const MAX_NOTIFICATIONS = 50;
  const DEBOUNCE_TIME = 300; // in ms
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    if (isArray(notificationList)) {
      clearTimeout(timeoutId); // Clear previous timeout
      timeoutId = setTimeout(() => {
        setNotifications(notificationList.slice(0, MAX_NOTIFICATIONS));
      }, DEBOUNCE_TIME);
    }
  }, [notificationList]);


  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto flex h-16 items-center justify-between">
        <div className="hidden md:block w-full max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search professionals, projects..." className="w-full pl-8 bg-muted" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-3 cursor-pointer"
                        onMouseEnter={() => {
                          if (!notification.isRead) {
                            // Yurganida o'qilmagan bildirishnoma bo'lsa, ko'rsatish
                          }
                        }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.body}</p>
                            <p className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleTimeString()}</p>
                          </div>
                          {/* O'qilgan va o'qilmagan ikonkalari */}
                          {notification.isRead ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center" asChild>
                    <Link href="/notifications">View all notifications</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={get(userProfileData, "avatar", "/placeholder.svg?height=32&width=32")} alt="@user" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portfolio">Portfolio</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link href="/mentorship">Mentorship</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/skills-verification">Skills Verification</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/jobs">Jobs</Link>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem asChild>
                    <Link href="/integrations">Integrations</Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link href="/learn">Learn</Link>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem asChild>
                    <Link href="/subscription">
                      <div className="flex items-center">
                        Subscription
                        <Badge
                          variant="outline"
                          className="ml-2 bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/50"
                        >
                          Pro
                        </Badge>
                      </div>
                    </Link>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem asChild>
                    <Link href="/videos">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Videos
                      </div>
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hidden md:flex bg-gradient-to-r from-primary/10 to-indigo-500/10 border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-indigo-500/20 hover:border-primary"
                asChild
              >
                <Link href="/pricing">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  Upgrade
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
