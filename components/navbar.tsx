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
import { Bell, Search, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Set to true for demo

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
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
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">New connection request</p>
                            <p className="text-xs text-muted-foreground">User {i} wants to connect with you</p>
                            <p className="text-xs text-muted-foreground">2 hour{i > 1 ? "s" : ""} ago</p>
                          </div>
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
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
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
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
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
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => setIsLoggedIn(false)}>
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

