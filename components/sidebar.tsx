"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Award, BarChart2, BookOpen, Briefcase, Calendar, ChevronDown, ChevronRight, Code, FileCode, FolderKanban, Home, Layers, LinkIcon, MessageSquare, Settings, Sparkles, Trophy, Users, Video } from 'lucide-react'
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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
                "flex flex-col h-14 w-14 items-center justify-center rounded-lg gap-1 p-0 transition-all duration-300",
                route.active &&
                "bg-gradient-to-r from-amber-50/20 via-amber-100/30 to-amber-50/20 dark:from-amber-900/30 dark:via-amber-800/40 dark:to-amber-900/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]",
              )}
            >
              <div className={cn(
                "relative flex items-center justify-center",
                route.active && "after:absolute after:w-6 after:h-6 after:rounded-full after:bg-amber-400/10 after:animate-ping after:duration-1000"
              )}>
                <route.icon className={cn(
                  "h-5 w-5 transition-all duration-300",
                  route.active ? "text-amber-600 dark:text-amber-400 scale-110" : "text-gray-500 dark:text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-xs transition-all duration-300",
                route.active ? "text-amber-600 dark:text-amber-400 font-medium" : "text-gray-500 dark:text-gray-400"
              )}>
                {route.label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-gradient-to-b from-background via-background to-amber-50/5 dark:from-[#0a0d14] dark:via-[#0a0d14] dark:to-amber-900/5 h-[calc(100vh-4rem)] sticky top-16 backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-amber-200/0 via-amber-200/20 to-amber-200/0 dark:from-amber-700/0 dark:via-amber-700/10 dark:to-amber-700/0"></div>

      <ScrollArea className="flex-1 pt-3">
        <nav className="grid gap-2 px-2">
          {/* Main Section Header */}
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-amber-50/10 dark:hover:bg-amber-900/10 rounded-md transition-all duration-300 group"
            onClick={() => toggleSection("main")}
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-amber-500 dark:bg-amber-400 group-hover:scale-125 transition-all duration-300"></div>
              <span className="font-semibold text-sm text-amber-700 dark:text-amber-300 tracking-wider">MAIN NAVIGATION</span>
            </div>
            {expandedSections.main ? (
              <ChevronDown className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-all duration-300" />
            ) : (
              <ChevronRight className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-all duration-300" />
            )}
          </div>

          {/* Main Routes */}
          {expandedSections.main && (
            <div className="grid gap-1 ml-1">
              {mainRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  passHref
                  onMouseEnter={() => setHoveredItem(route.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-4 px-3 text-foreground/80 dark:text-gray-300 transition-all duration-300 overflow-hidden relative",
                      route.active
                        ? "bg-gradient-to-r from-amber-50/30 via-amber-100/40 to-amber-50/30 dark:from-amber-900/40 dark:via-amber-800/50 dark:to-amber-900/40 dark:text-white border-l-2 border-amber-500 dark:border-amber-400 shadow-[0_2px_10px_rgba(251,191,36,0.15)]"
                        : "hover:bg-amber-50/10 dark:hover:bg-amber-900/20",
                      hoveredItem === route.href && !route.active && "border-l-2 border-amber-300/50 dark:border-amber-700/50"
                    )}
                  >
                    {route.active && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.1),transparent_70%)]"></div>
                    )}
                    <div
                      className={cn(
                        "flex items-center justify-center h-9 w-9 rounded-xl transition-all duration-300",
                        route.active
                          ? "bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 dark:from-amber-400/30 dark:via-amber-500/20 dark:to-amber-600/30 shadow-[0_0_10px_rgba(251,191,36,0.2)] dark:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                          : hoveredItem === route.href
                            ? "bg-gradient-to-br from-amber-100/10 via-amber-200/10 to-amber-300/10 dark:from-amber-700/20 dark:via-amber-800/20 dark:to-amber-900/20"
                            : "bg-gradient-to-br from-gray-100 to-gray-200/50 dark:from-gray-800/30 dark:to-gray-700/30",
                      )}
                    >
                      <route.icon
                        className={cn(
                          "h-4.5 w-4.5 transition-all duration-300",
                          route.active
                            ? "text-amber-600 dark:text-amber-400"
                            : hoveredItem === route.href
                              ? "text-amber-500 dark:text-amber-400"
                              : "text-gray-500 dark:text-gray-400",
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-medium transition-all duration-300",
                        route.active
                          ? "text-amber-700 dark:text-amber-300"
                          : hoveredItem === route.href
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-600 dark:text-gray-300 font-normal"
                      )}
                    >
                      {route.label}
                    </span>
                    {route.active && (
                      <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Premium Section Header */}
          {/* <div
            className="flex items-center justify-between px-3 py-2 mt-3 cursor-pointer hover:bg-amber-50/10 dark:hover:bg-amber-900/10 rounded-md transition-all duration-300 group"
            onClick={() => toggleSection("premium")}
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-amber-500 dark:bg-amber-400 group-hover:scale-125 transition-all duration-300"></div>
              <span className="font-semibold text-sm text-amber-500 dark:text-amber-400 tracking-wider">PREMIUM FEATURES</span>
            </div>
            {expandedSections.premium ? (
              <ChevronDown className="h-4 w-4 text-amber-500 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-all duration-300" />
            ) : (
              <ChevronRight className="h-4 w-4 text-amber-500 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-all duration-300" />
            )}
          </div> */}

          {/* Premium Routes */}
          {/* {expandedSections.premium && (
            <div className="grid gap-1 ml-1 mt-1">
              {premiumRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  passHref
                  onMouseEnter={() => setHoveredItem(route.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md transition-all duration-300 group relative overflow-hidden",
                    route.active
                      ? "bg-gradient-to-r from-amber-50/20 via-amber-100/30 to-amber-50/20 dark:from-amber-900/30 dark:via-amber-800/40 dark:to-amber-900/30 border-l-2 border-amber-500 dark:border-amber-400 shadow-[0_2px_8px_rgba(251,191,36,0.15)]"
                      : "hover:bg-amber-50/10 dark:hover:bg-amber-900/20",
                    hoveredItem === route.href && !route.active && "border-l-2 border-amber-300/50 dark:border-amber-700/50"
                  )}>
                    {route.active && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.1),transparent_70%)]"></div>
                    )}
                    <div className="flex items-center gap-3 z-10">
                      <div className={cn(
                        "flex items-center justify-center h-7 w-7 rounded-lg transition-all duration-300",
                        route.active
                          ? "bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 dark:from-amber-400/30 dark:via-amber-500/20 dark:to-amber-600/30"
                          : hoveredItem === route.href
                            ? "bg-gradient-to-br from-amber-100/10 via-amber-200/10 to-amber-300/10 dark:from-amber-700/20 dark:via-amber-800/20 dark:to-amber-900/20"
                            : "bg-transparent"
                      )}>
                        <route.icon className={cn(
                          "h-3.5 w-3.5 transition-all duration-300",
                          route.active
                            ? "text-amber-600 dark:text-amber-400"
                            : hoveredItem === route.href
                              ? "text-amber-500 dark:text-amber-400"
                              : "text-amber-500 dark:text-amber-400"
                        )} />
                      </div>
                      <span className={cn(
                        "font-medium text-sm transition-all duration-300",
                        route.active
                          ? "text-amber-600 dark:text-amber-300"
                          : hoveredItem === route.href
                            ? "text-amber-600 dark:text-amber-300"
                            : "text-amber-600 dark:text-amber-400"
                      )}>
                        {route.label}
                      </span>
                    </div>
                    <div className="flex items-center z-10">
                      <Sparkles className={cn(
                        "h-3.5 w-3.5 transition-all duration-300",
                        route.active
                          ? "text-amber-500 dark:text-amber-400 animate-pulse"
                          : hoveredItem === route.href
                            ? "text-amber-500 dark:text-amber-400"
                            : "text-amber-500/70 dark:text-amber-400/70"
                      )} />
                    </div>
                    {route.active && (
                      <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )} */}
        </nav>
      </ScrollArea>
    </div>
  )
}
