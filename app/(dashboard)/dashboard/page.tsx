"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotifications } from "@/hooks/notification/use-notification"
import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import {
  Bell,
  Calendar,
  Crown,
  Eye,
  Gem,
  Loader2,
  MapPin,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Define types for the API response
interface ProfileStats {
  id: number
  user?: {
    user: {
      id: number
      email: string
      profile: {
        id: number
        firstName: string
        name: string
        lastName: string
        email: string
        jobTitle: string
        avatar: string
      }
      profileViews: number
    }
  }
  connections: {
    sentConnections: number
    totalConnections: number
    getIncomingConnection: number
    getOutgoingConnection: number
    getConnectionsMe: number
    getRecentActivities: Array<{
      type: string
      user: {
        id: number
        email: string
        profile: {
          id: number
          firstName: string
          name: string | null
          lastName: string
          email: string
          jobTitle: string
          avatar: string
        }
      }
      date: string
      text: string
      newMessagesCount?: number
      oldMessagesCount?: number
    }>
  }
  profileViews: {
    profileViews: number
  }
  messages: {
    messageCount: number
    unreadCount: number
  }
}

// Function to format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now"
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  }

  // Less than 2 days
  if (diffInSeconds < 172800) {
    return "Yesterday"
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} days ago`
  }

  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  }

  // Format as date
  return date.toLocaleDateString()
}

export default function DashboardPage() {
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState(5) // Keeping events hardcoded as it's not in the API
  const { userProfileData } = useProfile()
  const userId = userProfileData?.id
  const { registerWebPush } = useNotifications({ userId })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/profile/stats")
        if (!response.data) {
          throw new Error("Failed to fetch profile stats")
        }
        const data = await response.data
        setStats(data)
      } catch (err) {
        setError("Error loading profile data. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Get user's first name for personalized greeting
  const firstName = stats?.user?.user?.profile?.firstName || ""

  // For demo purposes, we'll use the provided JSON data directly
  // In a real app, this would come from the API call above
  useEffect(() => {
    if (!stats && !loading) {
      // This is just for demonstration - normally this would come from the API
      const mockData: ProfileStats = {
        id: 1,
        connections: {
          sentConnections: 1,
          totalConnections: 1,
          getIncomingConnection: 0,
          getOutgoingConnection: 0,
          getConnectionsMe: 1,
          getRecentActivities: [
            {
              type: "connection",
              user: {
                id: 4,
                email: "tester@gmail.com",
                password: "$2b$10$J/o3KdKzs9iaMaNoEpMTU.S/bZhYDePqDbzlm76THHSGAf6Abe9e6",
                profile: {
                  id: 4,
                  firstName: "tester",
                  name: null,
                  lastName: "tester",
                  email: "tester@gmail.com",
                  jobTitle: "Tester",
                  avatar: "",
                },
                isTwoFactorEnabled: false,
                twoFactorSecret: null,
                profileViews: 1,
                updatedAt: "2025-04-08T17:33:23.351Z",
              },
              date: "2025-04-11T05:35:27.233Z",
              text: "You connected with tester",
            },
            {
              type: "message",
              user: {
                id: 3,
                email: "test@gmail.com",
                password: "$2b$10$jUrS6m9EDEvXYN76qPlbkO/diY5DfZ0q/r6T.DPh3oGojq0VOcfTm",
                profile: {
                  id: 3,
                  firstName: "test",
                  name: null,
                  lastName: "test",
                  email: "test@gmail.com",
                  jobTitle: "Developer",
                  avatar:
                    "https://hl2g4vy0jzwrnhdy.public.blob.vercel-storage.com/Screenshot%202025-03-25%20at%2014.43.40-B02Vl3HPyFu5RYwJ6iCExvx0x0PB4O.png",
                },
                isTwoFactorEnabled: false,
                twoFactorSecret: null,
                profileViews: 3,
                updatedAt: "2025-04-08T08:29:31.737Z",
              },
              date: "2025-04-11T03:54:33.470Z",
              text: "test sent you 11 new messages (+42 older)",
              newMessagesCount: 11,
              oldMessagesCount: 42,
            },
            {
              type: "message",
              user: {
                id: 2,
                email: "admin@gmail.com",
                password: "$2b$10$xURD4dxJy67NYeFzKsgIe.z20q5PaDH1oNpFXsKz8kJxSQtoJG8CG",
                profile: {
                  id: 2,
                  firstName: "Baxtiyor",
                  name: null,
                  lastName: "Qurbonnazarov",
                  email: "admin@gmail.com",
                  jobTitle: " Frontend Developer",
                  avatar:
                    "https://hl2g4vy0jzwrnhdy.public.blob.vercel-storage.com/Screenshot%202025-03-27%20at%2019.54.31-rmDJrXeZPfeE5oYL7EtRInBtbyeycG.png",
                },
                isTwoFactorEnabled: false,
                twoFactorSecret: null,
                profileViews: 2,
                updatedAt: "2025-04-08T08:29:31.737Z",
              },
              date: "2025-04-10T14:48:27.134Z",
              text: "Baxtiyor sent you 5 new messages (+19 older)",
              newMessagesCount: 5,
              oldMessagesCount: 19,
            },
            {
              type: "message",
              user: {
                id: 4,
                email: "tester@gmail.com",
                password: "$2b$10$J/o3KdKzs9iaMaNoEpMTU.S/bZhYDePqDbzlm76THHSGAf6Abe9e6",
                profile: {
                  id: 4,
                  firstName: "tester",
                  name: null,
                  lastName: "tester",
                  email: "tester@gmail.com",
                  jobTitle: "Tester",
                  avatar: "",
                },
                isTwoFactorEnabled: false,
                twoFactorSecret: null,
                profileViews: 1,
                updatedAt: "2025-04-08T17:33:23.351Z",
              },
              date: "2025-04-10T11:11:22.197Z",
              text: "tester sent you 2 new messages",
              newMessagesCount: 2,
              oldMessagesCount: 0,
            },
          ],
        },
        profileViews: {
          profileViews: 0,
        },
        messages: {
          messageCount: 79,
          unreadCount: 0,
        },
      }
      setStats(mockData)
    }
  }, [stats, loading])

  // Generate activity items based on recent activities
  const getActivityItems = () => {
    const recentActivities = stats?.connections?.getRecentActivities || []

    // Map all activities to our display format
    return recentActivities.map((activity) => {
      const userName = `${activity.user.profile.firstName} ${activity.user.profile.lastName}`.trim()
      const avatar = activity.user.profile.avatar || "/placeholder.svg?height=40&width=40"
      const time = formatRelativeTime(activity.date)

      // Different display based on activity type
      if (activity.type === "connection") {
        return {
          avatar,
          name: userName,
          action: "connected with you",
          time,
          icon: <Users className="h-4 w-4" />,
          color:
            "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
        }
      } else if (activity.type === "message") {
        // Format message action based on new and old message counts
        let messageAction = ""
        if (activity.newMessagesCount && activity.oldMessagesCount) {
          messageAction = `sent you ${activity.newMessagesCount} new message${activity.newMessagesCount > 1 ? "s" : ""} (+${activity.oldMessagesCount} older)`
        } else if (activity.newMessagesCount) {
          messageAction = `sent you ${activity.newMessagesCount} new message${activity.newMessagesCount > 1 ? "s" : ""}`
        } else {
          messageAction = "sent you a message"
        }

        return {
          avatar,
          name: userName,
          action: messageAction,
          time,
          icon: <MessageSquare className="h-4 w-4" />,
          color: "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300",
        }
      }

      // Default fallback (shouldn't happen with the current data structure)
      return {
        avatar,
        name: userName,
        action: activity.text,
        time,
        icon: <Bell className="h-4 w-4" />,
        color: "bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300",
      }
    })

  }





  return (
    <div className="container mx-auto space-y-6 py-6">
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : error ? (
        <Card className="p-6 text-center">
          <p className="text-red-500">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-3xl font-bold">
              Welcome{firstName ? `, ${firstName}` : ""} to your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400">
                Dashboard
              </span>
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/30"
              >
                <Link href="/profile">
                  <Crown className="h-4 w-4 mr-2 text-amber-500" />
                  View Profile
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 dark:from-amber-500 dark:to-rose-500"
                onClick={() => {
                  registerWebPush(userId)
                }}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notification
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-950/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600/80 dark:text-amber-400/80 font-medium">Profile Views</p>
                  <p className="text-3xl font-bold">{stats?.profileViews?.profileViews || 0}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% this week
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-rose-50 dark:from-gray-900 dark:to-rose-950/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-600/80 dark:text-rose-400/80 font-medium">Connections</p>
                  <p className="text-3xl font-bold">{stats?.connections?.getConnectionsMe || 0}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />+{stats?.connections?.getIncomingConnection || 0} new
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                  <Users className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-teal-950/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600/80 dark:text-teal-400/80 font-medium">Messages</p>
                  <p className="text-3xl font-bold">{stats?.messages?.messageCount || 0}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stats?.messages?.unreadCount || 0} unread
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-fuchsia-50 dark:from-gray-900 dark:to-fuchsia-950/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-fuchsia-600/80 dark:text-fuchsia-400/80 font-medium">Upcoming Events</p>
                  <p className="text-3xl font-bold">{events}</p>
                  <p className="text-xs text-muted-foreground mt-1">Next: Tomorrow</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/50 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <Card className="lg:col-span-2 border-0 shadow-md bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getActivityItems().map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="border-2 border-amber-100 dark:border-amber-900">
                        <AvatarImage src={activity.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-amber-500 to-rose-500 text-white">
                          {activity.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{activity.name}</span>
                          <Badge variant="outline" className={`font-normal ${activity.color}`}>
                            {activity.icon}
                            <span className="ml-1">{activity.action}</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400">
                  <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Web Development Hackathon",
                      date: "Apr 15, 2025",
                      time: "09:00 AM",
                      location: "San Francisco, CA",
                      icon: <Zap className="h-4 w-4 text-amber-500" />,
                      gradient: "from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30",
                    },
                    {
                      title: "AI & Machine Learning Workshop",
                      date: "Apr 20, 2025",
                      time: "10:00 AM",
                      location: "Online",
                      icon: <Shield className="h-4 w-4 text-rose-500" />,
                      gradient: "from-rose-50 to-fuchsia-50 dark:from-rose-950/30 dark:to-fuchsia-950/30",
                    },
                    {
                      title: "DevOps Networking Mixer",
                      date: "Apr 25, 2025",
                      time: "06:00 PM",
                      location: "New York, NY",
                      icon: <Gem className="h-4 w-4 text-teal-500" />,
                      gradient: "from-teal-50 to-amber-50 dark:from-teal-950/30 dark:to-amber-950/30",
                    },
                  ].map((event, index) => (
                    <Card key={index} className={`bg-gradient-to-r ${event.gradient} border-0 shadow-sm`}>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          {event.icon}
                          <h3 className="font-medium text-amber-900 dark:text-amber-300 ml-2">{event.title}</h3>
                        </div>
                        <div className="flex items-center text-sm text-amber-700/70 dark:text-amber-400/70 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-amber-700/70 dark:text-amber-400/70 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                    asChild
                  >
                    <Link href="/events">
                      <Star className="h-4 w-4 mr-2 text-amber-500" />
                      View All Events
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}