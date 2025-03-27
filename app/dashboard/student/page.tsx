"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  PlayCircle,
  BarChart,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { popularCourses } from "@/lib/data"

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock enrolled courses data
  const enrolledCourses = popularCourses.slice(0, 4).map((course) => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: ["Yesterday", "2 days ago", "Last week", "3 days ago"][Math.floor(Math.random() * 4)],
    nextLesson: {
      title: [
        "Introduction to React Hooks",
        "Advanced CSS Techniques",
        "Building RESTful APIs",
        "Database Design Principles",
      ][Math.floor(Math.random() * 4)],
      duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
    },
  }))

  // Mock upcoming events
  const upcomingEvents = [
    {
      title: "Web Development Workshop",
      date: "Tomorrow, 3:00 PM",
      instructor: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Q&A Session: React Fundamentals",
      date: "Friday, 5:00 PM",
      instructor: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Live Coding: Building a REST API",
      date: "Next Monday, 4:00 PM",
      instructor: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock recent activities
  const recentActivities = [
    {
      type: "course_progress",
      course: "Complete Web Development Bootcamp",
      details: "Completed Module 3: CSS Fundamentals",
      time: "2 hours ago",
    },
    {
      type: "certificate",
      course: "Python Programming for Beginners",
      details: "Earned course completion certificate",
      time: "Yesterday",
    },
    {
      type: "quiz",
      course: "Data Science and Machine Learning Bootcamp",
      details: "Scored 92% on 'Introduction to NumPy' quiz",
      time: "2 days ago",
    },
    {
      type: "comment",
      course: "UI/UX Design Masterclass",
      details: "Commented on lesson 'Color Theory Basics'",
      time: "3 days ago",
    },
    {
      type: "enrollment",
      course: "Financial Accounting Fundamentals",
      details: "Enrolled in new course",
      time: "1 week ago",
    },
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Alex</span>
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your learning journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/my-courses">My Learning</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Courses in Progress</p>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />2 new this month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hours Learned</p>
              <p className="text-3xl font-bold">42.5</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2 this week
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <p className="text-3xl font-bold">{upcomingEvents.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Next: Tomorrow</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Certificates Earned</p>
              <p className="text-3xl font-bold">2</p>
              <p className="text-xs text-muted-foreground mt-1">View all certificates</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-courses">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors">
                        <Button variant="ghost" className="text-white">
                          <PlayCircle className="h-12 w-12" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <Link href={`/courses/${course.id}`} className="hover:underline">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">Instructor: {course.instructor.name}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Next: {course.nextLesson.title}</p>
                          <p className="text-xs text-muted-foreground">{course.nextLesson.duration}</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.id}/learn`}>Continue</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={event.avatar} alt={event.instructor} />
                      <AvatarFallback>{event.instructor.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground">by {event.instructor}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {activity.type === "course_progress" && <PlayCircle className="h-4 w-4 text-primary" />}
                      {activity.type === "certificate" && <Award className="h-4 w-4 text-yellow-500" />}
                      {activity.type === "quiz" && <BarChart className="h-4 w-4 text-indigo-500" />}
                      {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-green-500" />}
                      {activity.type === "enrollment" && <BookOpen className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary">{activity.course}</span> • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Learning Goal</span>
                    <span>5/8 hours</span>
                  </div>
                  <Progress value={62.5} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Course Completion</span>
                    <span>1/2 courses</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <Button variant="outline" className="w-full mt-2">
                  Update Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/courses">
              Browse All Courses <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.slice(4, 8).map((course, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.isBestseller && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-white border-yellow-500">Bestseller</Badge>
                )}
                {course.isNew && (
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white border-green-500">New</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <Link href={`/courses/${course.id}`}>
                  <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{course.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{course.instructor.name}</p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-500 mr-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current"
                          fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                        />
                      ))}
                  </div>
                  <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${course.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function Star({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

