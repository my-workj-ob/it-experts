"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeft,
  Settings,
  User,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explore", href: "/explore", icon: Users },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-background border-r transition-all duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-[70px]" : "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            {!isCollapsed && (
              <Link
                href="/"
                className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600"
              >
                DevConnect
              </Link>
            )}
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleCollapse}>
              <PanelLeft className={cn("h-5 w-5", isCollapsed && "rotate-180")} />
            </Button>
          </div>

          <nav className="flex-1 py-4 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                  isCollapsed && "justify-center",
                )}
              >
                <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}

            <Link
              href="/pricing"
              className={cn(
                "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/pricing"
                  ? "bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground"
                  : "text-foreground hover:bg-muted",
                isCollapsed && "justify-center",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full",
                  pathname !== "/pricing" && "bg-gradient-to-r from-primary/20 to-indigo-600/20",
                  !isCollapsed && "mr-3",
                )}
              >
                <Zap className={cn("h-4 w-4", pathname === "/pricing" ? "text-primary-foreground" : "text-primary")} />
              </div>
              {!isCollapsed && <span>Upgrade</span>}
            </Link>

            <Link
              href="/subscription"
              className={cn(
                "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/subscription"
                  ? "bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground"
                  : "text-foreground hover:bg-muted",
                isCollapsed && "justify-center",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full",
                  pathname !== "/subscription" && "bg-gradient-to-r from-primary/20 to-indigo-600/20",
                  !isCollapsed && "mr-3",
                )}
              >
                <CreditCard
                  className={cn("h-4 w-4", pathname === "/subscription" ? "text-primary-foreground" : "text-primary")}
                />
              </div>
              {!isCollapsed && <span>Subscription</span>}
            </Link>
          </nav>

          <div className="p-4 border-t">
            <div className="space-y-1">
              <Link
                href="/settings"
                className={cn(
                  "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                  isCollapsed && "justify-center",
                )}
              >
                <Settings className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>Settings</span>}
              </Link>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600",
                  isCollapsed && "justify-center",
                )}
              >
                <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

