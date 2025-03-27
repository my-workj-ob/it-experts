"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import CourseCard from "@/components/course-card"

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 345,
    students: 1245,
    duration: "8 weeks",
    level: "Beginner",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript"],
    isBestseller: true,
    isNew: false,
  },
  {
    id: "2",
    title: "Advanced React & Redux",
    description: "Master React hooks, context API, and Redux for complex applications.",
    instructor: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 79.99,
    rating: 4.9,
    reviewCount: 892,
    students: 892,
    duration: "10 weeks",
    level: "Advanced",
    category: "Web Development",
    tags: ["React", "Redux", "JavaScript"],
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning concepts.",
    instructor: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 69.99,
    rating: 4.7,
    reviewCount: 1567,
    students: 1567,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Statistics", "Machine Learning"],
  },
  {
    id: "4",
    title: "UX/UI Design Principles",
    description: "Learn user-centered design approaches and create stunning interfaces.",
    instructor: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 59.99,
    rating: 4.6,
    reviewCount: 723,
    students: 723,
    duration: "6 weeks",
    level: "Beginner",
    category: "Design",
    tags: ["Figma", "Design Thinking", "Prototyping"],
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications with Flutter and Dart.",
    instructor: {
      name: "Jessica Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 69.99,
    rating: 4.8,
    reviewCount: 1089,
    students: 1089,
    duration: "9 weeks",
    level: "Intermediate",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    id: "6",
    title: "DevOps Engineering",
    description: "Master CI/CD pipelines, containerization, and cloud infrastructure.",
    instructor: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 89.99,
    rating: 4.9,
    reviewCount: 645,
    students: 645,
    duration: "14 weeks",
    level: "Advanced",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "AWS"],
  },
]

// Mock data for upcoming live sessions
const liveSessions = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Michael Chen",
    date: "May 15, 2023",
    time: "2:00 PM - 4:00 PM EST",
    image: "/placeholder.svg?height=100&width=180",
  },
  {
    id: 2,
    title: "Data Visualization Techniques",
    instructor: "Emily Rodriguez",
    date: "May 18, 2023",
    time: "1:00 PM - 3:00 PM EST",
    image: "/placeholder.svg?height=100&width=180",
  },
  {
    id: 3,
    title: "Responsive Design Workshop",
    instructor: "David Kim",
    date: "May 20, 2023",
    time: "11:00 AM - 1:00 PM EST",
    image: "/placeholder.svg?height=100&width=180",
  },
]

// Mock data for forum discussions
const discussions = [
  {
    id: 1,
    title: "How to optimize React performance?",
    author: "Jason Miller",
    replies: 24,
    lastActivity: "2 hours ago",
    tags: ["React", "Performance"],
  },
  {
    id: 2,
    title: "Best practices for data visualization",
    author: "Sophia Lee",
    replies: 18,
    lastActivity: "5 hours ago",
    tags: ["Data Science", "Visualization"],
  },
  {
    id: 3,
    title: "Flutter vs React Native - pros and cons",
    author: "Carlos Mendez",
    replies: 32,
    lastActivity: "1 day ago",
    tags: ["Flutter", "React Native", "Mobile"],
  },
]

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all-courses")

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learn & Grow</h1>
        <p className="text-muted-foreground">Expand your IT skills with our comprehensive courses and resources</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="all-courses" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all-courses">All Courses</TabsTrigger>
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="all-courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="my-courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.slice(0, 3).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.slice(3, 5).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {activeTab === "all-courses" && filteredCourses.length > 6 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline">Load More Courses</Button>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Upcoming Live Sessions</h3>
              <div className="space-y-4">
                {liveSessions.map((session) => (
                  <div key={session.id} className="flex gap-3">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{session.title}</h4>
                      <p className="text-xs text-muted-foreground">{session.instructor}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {session.date}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{session.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/live-sessions">View All Sessions</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Popular Discussions</h3>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <Link href={`/forum/${discussion.id}`} className="font-medium text-sm hover:text-primary">
                      {discussion.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                        <AvatarFallback>{discussion.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{discussion.author}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{discussion.replies} replies</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{discussion.lastActivity}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/forum">Visit Forum</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

