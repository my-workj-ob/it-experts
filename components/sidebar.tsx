"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import {
  Award,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  Code,
  FileCode,
  FolderKanban,
  Home,
  Layers,
  LinkIcon,
  MessageSquare,
  Settings,
  Sparkles,
  Trophy,
  Users,
  Video
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    premium: false,
  })

  // Don't render sidebar on landing page
  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null
  }

  const mainRoutes = [
    {
      label: "Home",
      icon: Home,
      href: "/home",
      active: pathname === "/home",
      premium: false,
    },
    {
      label: "Explore",
      icon: Users,
      href: "/explore",
      active: pathname === "/explore",
      premium: false,
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: "/chat",
      active: pathname?.includes("/chat"),
      premium: false,
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/events",
      active: pathname?.includes("/events"),
      premium: false,
    },
    // {
    //   label: "Find a Team",
    //   icon: Search,
    //   href: "/find-team",
    //   active: pathname === "/find-team",
    //   premium: false,
    // },
    {
      label: "Project Showcase",
      icon: Layers,
      href: "/project-showcase",
      active: pathname?.includes("/project-showcase"),
      premium: false,
    },
    // {
    //   label: "Videos",
    //   icon: Video,
    //   href: "/videos",
    //   active: pathname?.includes("/videos"),
    //   premium: false,
    // },
    {
      label: "Statistics",
      icon: BarChart2,
      href: "/statistics",
      active: pathname === "/statistics",
      premium: false,
    },

    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
      premium: false,
    },
  ]

  const premiumRoutes = [
    {
      label: "Learn",
      icon: BookOpen,
      href: "/learn",
      active: pathname?.includes("/learn"),
      premium: true,
    },
    {
      label: "Portfolio",
      icon: Briefcase,
      href: "/portfolio",
      active: pathname?.includes("/portfolio"),
      premium: true,
    },
    {
      label: "Mentorship",
      icon: Users,
      href: "/mentorship",
      active: pathname?.includes("/mentorship"),
      premium: true,
    },
    {
      label: "Skills",
      icon: Award,
      href: "/skills-verification",
      active: pathname?.includes("/skills-verification"),
      premium: true,
    },
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/jobs",
      active: pathname?.includes("/jobs"),
      premium: true,
    },
    {
      label: "Integrations",
      icon: LinkIcon,
      href: "/integrations",
      active: pathname?.includes("/integrations"),
      premium: true,
    },
    {
      href: "/forum",
      label: "Forum",
      icon: MessageSquare,
      active: pathname?.includes("/forum"),
      premium: true,
    },
    {
      href: "/recommendations",
      label: "AI Recommendations",
      icon: Sparkles,
      active: pathname?.includes("/recommendations"),
      premium: true,
    },
    {
      href: "/code-review",
      label: "Code Review",
      icon: FileCode,
      active: pathname?.includes("/code-review"),
      premium: true,
    },
    {
      href: "/chat-video",
      label: "Chat & Video",
      icon: Video,
      active: pathname?.includes("/chat-video"),
      premium: true,
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: FolderKanban,
      active: pathname?.includes("/tasks"),
      premium: true,
    },
    {
      href: "/live-coding",
      label: "Live Coding",
      icon: Code,
      active: pathname?.includes("/live-coding"),
      premium: true,
    },
    {
      href: "/hackathons",
      label: "Hackathons",
      icon: Trophy,
      active: pathname?.includes("/hackathons"),
      premium: true,
    },
  ]

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t flex items-center justify-around px-3">
        {mainRoutes.slice(0, 5).map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col h-14 w-14 items-center justify-center rounded-lg gap-1 p-0",
                route.active && "bg-muted",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active && "text-primary")} />
              <span className="text-xs">{route.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-background dark:bg-[#0a0d14] h-[calc(100vh-4rem)] sticky top-16">
      <ScrollArea className="flex-1 pt-3">
        <nav className="grid gap-2 px-2">
          {/* Main Section Header */}
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted/80 dark:hover:bg-gray-800/50 rounded-md"
            onClick={() => toggleSection("main")}
          >
            <span className="font-semibold text-sm text-foreground dark:text-gray-200">MAIN NAVIGATION</span>
            {expandedSections.main ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            )}
          </div>

          {/* Main Routes */}
          {expandedSections.main && (
            <div className="grid gap-1 ml-1">
              {mainRoutes.map((route) => (
                <Link key={route.href} href={route.href} passHref>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-4 px-3 hover:bg-muted/80 text-foreground/80 dark:hover:bg-gray-800/70 dark:text-gray-300",
                      route.active && "bg-muted/90 dark:bg-gray-800/90 dark:text-white",
                    )}
                  >
                    <route.icon
                      className={cn(
                        "h-5 w-5",
                        route.active ? "text-white" : "text-muted-foreground dark:text-gray-400",
                      )}
                    />
                    <span>{route.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Premium Section Header - Smaller as requested */}
          {/* <div
            className="flex items-center justify-between px-3 py-2 mt-3 cursor-pointer hover:bg-gray-800/50 rounded-md"
            onClick={() => toggleSection("premium")}
          >
            <span className="font-medium text-sm text-purple-400">PREMIUM FEATURES</span>
            {expandedSections.premium ? (
              <ChevronDown className="h-4 w-4 text-purple-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-purple-400" />
            )}
          </div> */}

          {/* Premium Routes - Smaller with icon instead of PRO text */}
          {/* expandedSections.premium && (
            <div className="grid gap-1 ml-1 mt-1">
              {premiumRoutes.map((route) => (
                <Link key={route.href} href={route.href} passHref>
                  <div className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-800/50 rounded-md group">
                    <div className="flex items-center gap-3">
                      <route.icon className="h-4 w-4 text-purple-400" />
                      <span className="font-medium text-purple-400 text-sm">{route.label}</span>
                    </div>
                    <Gem className="h-4 w-4 text-purple-300" />
                  </div>
                </Link>
              ))}
            </div>
          )*/}
        </nav>
      </ScrollArea>
    </div>
  )
}

