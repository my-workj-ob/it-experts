"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import VideoCard from "@/components/video-card"
import { BarChart3, Calendar, Clock, Filter, Flame, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for demonstration
const mockTrendingVideos = [
  {
    id: 1,
    title: "How to Build a Next.js Application",
    description: "Learn how to create a modern web application using Next.js and React",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "12:34",
    views: 145600,
    likes: 13200,
    createdAt: "2 days ago",
    creator: {
      name: "TechTutorials",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 1,
  },
  {
    id: 2,
    title: "Advanced CSS Techniques for 2025",
    description: "Master the latest CSS features and techniques for modern web design",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "18:22",
    views: 132100,
    likes: 12800,
    createdAt: "3 days ago",
    creator: {
      name: "WebDesignPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 2,
  },
  {
    id: 3,
    title: "React Hooks Explained",
    description: "A comprehensive guide to React Hooks and how to use them effectively",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "15:45",
    views: 128900,
    likes: 12400,
    createdAt: "1 day ago",
    creator: {
      name: "ReactMasters",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 3,
  },
  {
    id: 4,
    title: "Building a REST API with Node.js",
    description: "Step-by-step tutorial on creating a RESTful API using Node.js and Express",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "22:18",
    views: 119500,
    likes: 11700,
    createdAt: "4 days ago",
    creator: {
      name: "BackendDev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 4,
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Learn the fundamental principles of effective UI/UX design",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "14:52",
    views: 115200,
    likes: 10900,
    createdAt: "2 days ago",
    creator: {
      name: "DesignMasters",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 5,
  },
  {
    id: 6,
    title: "TypeScript for Beginners",
    description: "Get started with TypeScript and learn how it improves your JavaScript code",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "16:40",
    views: 112800,
    likes: 10500,
    createdAt: "5 days ago",
    creator: {
      name: "CodeWithJohn",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 6,
  },
  {
    id: 7,
    title: "Docker Containers Explained",
    description: "Learn how to use Docker containers for your development workflow",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "19:27",
    views: 98700,
    likes: 9200,
    createdAt: "1 week ago",
    creator: {
      name: "DevOpsGuru",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 7,
  },
  {
    id: 8,
    title: "GraphQL vs REST API",
    description: "A comparison of GraphQL and REST API approaches for your backend",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "17:15",
    views: 92400,
    likes: 8800,
    createdAt: "6 days ago",
    creator: {
      name: "APIExpert",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 8,
  },
  {
    id: 9,
    title: "Responsive Design Best Practices",
    description: "Learn how to create responsive designs that work on all devices",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "13:42",
    views: 87600,
    likes: 8100,
    createdAt: "1 week ago",
    creator: {
      name: "FrontendMaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 9,
  },
  {
    id: 10,
    title: "Git Workflow for Teams",
    description: "Learn the best Git workflow practices for team collaboration",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "20:18",
    views: 82300,
    likes: 7600,
    createdAt: "8 days ago",
    creator: {
      name: "GitMaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    trending: 10,
  },
]

export default function TrendingPage() {
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("today")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-red-500" />
          <h1 className="text-3xl font-bold">Trending Videos</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search trending videos..." className="pl-8 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="all">All Categories</option>
                  <option value="tutorials">Tutorials</option>
                  <option value="coding">Coding</option>
                  <option value="design">Design</option>
                  <option value="tech">Technology</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="global">Global</option>
                  <option value="us">United States</option>
                  <option value="eu">Europe</option>
                  <option value="asia">Asia</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Date</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="all">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="trending">Trending Score</option>
                  <option value="views">View Count</option>
                  <option value="likes">Likes</option>
                  <option value="date">Upload Date</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant={timeframe === "today" ? "default" : "outline"} onClick={() => setTimeframe("today")}>
            <Clock className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant={timeframe === "week" ? "default" : "outline"} onClick={() => setTimeframe("week")}>
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant={timeframe === "month" ? "default" : "outline"} onClick={() => setTimeframe("month")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            This Month
          </Button>
        </div>
        <Link href="/videos" className="text-primary hover:underline flex items-center">
          <span>View all videos</span>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Top 3 trending videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTrendingVideos.slice(0, 3).map((video) => (
            <div key={video.id} className="relative">
              <VideoCard video={video} layout="grid" />
              <div className="absolute top-2 left-2 bg-red-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                #{video.trending}
              </div>
            </div>
          ))}
        </div>

        {/* Rest of trending videos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            More Trending Videos
          </h2>
          <div className="space-y-4">
            {mockTrendingVideos.slice(3).map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} layout="list" />
                <div className="absolute top-2 left-2 bg-red-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  #{video.trending}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

