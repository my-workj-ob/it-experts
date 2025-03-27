"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Calendar, Briefcase, TrendingUp, Eye, ThumbsUp, Bell, MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DashboardPage() {
  const [profileViews, setProfileViews] = useState(124)
  const [connections, setConnections] = useState(37)
  const [messages, setMessages] = useState(12)
  const [events, setEvents] = useState(5)

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Welcome to your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Dashboard</span>
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-primary/80 font-medium">Profile Views</p>
              <p className="text-3xl font-bold">{profileViews}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this week
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 font-medium">Connections</p>
              <p className="text-3xl font-bold">{connections}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 new
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600/80 dark:text-purple-400/80 font-medium">Messages</p>
              <p className="text-3xl font-bold">{messages}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />3 unread
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium">Upcoming Events</p>
              <p className="text-3xl font-bold">{events}</p>
              <p className="text-xs text-muted-foreground mt-1">Next: Tomorrow</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  avatar: "/placeholder.svg?height=40&width=40",
                  name: "Alex Johnson",
                  action: "connected with you",
                  time: "2 hours ago",
                  icon: <Users className="h-4 w-4" />,
                },
                {
                  avatar: "/placeholder.svg?height=40&width=40",
                  name: "Sarah Williams",
                  action: "sent you a message",
                  time: "Yesterday",
                  icon: <MessageSquare className="h-4 w-4" />,
                },
                {
                  avatar: "/placeholder.svg?height=40&width=40",
                  name: "Michael Chen",
                  action: "invited you to a project",
                  time: "2 days ago",
                  icon: <Briefcase className="h-4 w-4" />,
                },
                {
                  avatar: "/placeholder.svg?height=40&width=40",
                  name: "Web Development Hackathon",
                  action: "event is starting soon",
                  time: "in 3 days",
                  icon: <Calendar className="h-4 w-4" />,
                },
                {
                  avatar: "/placeholder.svg?height=40&width=40",
                  name: "Emily Rodriguez",
                  action: "liked your profile",
                  time: "1 week ago",
                  icon: <ThumbsUp className="h-4 w-4" />,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.name}</span>
                      <Badge variant="outline" className="font-normal">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
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
                },
                {
                  title: "AI & Machine Learning Workshop",
                  date: "Apr 20, 2025",
                  time: "10:00 AM",
                  location: "Online",
                },
                {
                  title: "DevOps Networking Mixer",
                  date: "Apr 25, 2025",
                  time: "06:00 PM",
                  location: "New York, NY",
                },
              ].map((event, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Connections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              Recommended Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "David Kim",
                  role: "Backend Developer",
                  avatar: "/placeholder.svg?height=40&width=40",
                  matchScore: 92,
                },
                {
                  name: "Lisa Patel",
                  role: "Product Manager",
                  avatar: "/placeholder.svg?height=40&width=40",
                  matchScore: 87,
                },
                {
                  name: "Robert Chen",
                  role: "UX Designer",
                  avatar: "/placeholder.svg?height=40&width=40",
                  matchScore: 85,
                },
              ].map((connection, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={connection.avatar} />
                    <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{connection.name}</div>
                    <div className="text-sm text-muted-foreground">{connection.role}</div>
                  </div>
                  <Badge variant="outline">{connection.matchScore}% Match</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/explore">View More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              Project Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "E-commerce Platform",
                  category: "Web Development",
                  skills: ["React", "Node.js", "MongoDB"],
                  matchScore: 95,
                },
                {
                  title: "Mobile Fitness App",
                  category: "Mobile Development",
                  skills: ["React Native", "Firebase"],
                  matchScore: 88,
                },
                {
                  title: "AI-powered Recommendation Engine",
                  category: "AI & Machine Learning",
                  skills: ["Python", "TensorFlow"],
                  matchScore: 82,
                },
              ].map((project, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge>{project.matchScore}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              {[
                { name: "Basic Info", value: 100 },
                { name: "Skills", value: 90 },
                { name: "Experience", value: 100 },
                { name: "Education", value: 100 },
                { name: "Projects", value: 70 },
                { name: "Connections", value: 50 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}

              <Button className="w-full" asChild>
                <Link href="/profile">Complete Your Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

