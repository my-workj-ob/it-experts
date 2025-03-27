"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, Clock, Filter, LayoutGrid, LayoutList } from "lucide-react"
import VideoCard from "@/components/video-card"

// Mock data for demonstration
const mockVideos = [
  {
    id: 1,
    title: "How to Build a Next.js Application",
    description: "Learn how to create a modern web application using Next.js and React",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "12:34",
    views: 45600,
    likes: 3200,
    createdAt: "2 weeks ago",
    creator: {
      name: "TechTutorials",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "Advanced CSS Techniques for 2025",
    description: "Master the latest CSS features and techniques for modern web design",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "18:22",
    views: 32100,
    likes: 2800,
    createdAt: "3 days ago",
    creator: {
      name: "WebDesignPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "React Hooks Explained",
    description: "A comprehensive guide to React Hooks and how to use them effectively",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "15:45",
    views: 28900,
    likes: 2400,
    createdAt: "1 month ago",
    creator: {
      name: "ReactMasters",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    title: "Building a REST API with Node.js",
    description: "Step-by-step tutorial on creating a RESTful API using Node.js and Express",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "22:18",
    views: 19500,
    likes: 1700,
    createdAt: "2 months ago",
    creator: {
      name: "BackendDev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Learn the fundamental principles of effective UI/UX design",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "14:52",
    views: 35200,
    likes: 2900,
    createdAt: "3 weeks ago",
    creator: {
      name: "DesignMasters",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 6,
    title: "TypeScript for Beginners",
    description: "Get started with TypeScript and learn how it improves your JavaScript code",
    thumbnail: "/placeholder.svg?height=200&width=360",
    duration: "16:40",
    views: 22800,
    likes: 1900,
    createdAt: "1 week ago",
    creator: {
      name: "CodeWithJohn",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

const mockShorts = [
  {
    id: 101,
    title: "Quick CSS Trick",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:58",
    views: 125000,
    likes: 15600,
    createdAt: "5 days ago",
    creator: {
      name: "CSSWizard",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 102,
    title: "JavaScript One-Liner",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:45",
    views: 98000,
    likes: 12400,
    createdAt: "1 week ago",
    creator: {
      name: "JSMaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 103,
    title: "React State Tip",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:52",
    views: 87500,
    likes: 9800,
    createdAt: "3 days ago",
    creator: {
      name: "ReactPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 104,
    title: "VS Code Shortcut",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:38",
    views: 76200,
    likes: 8500,
    createdAt: "2 days ago",
    creator: {
      name: "CodeTips",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 105,
    title: "Git Command Trick",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:42",
    views: 65800,
    likes: 7200,
    createdAt: "1 day ago",
    creator: {
      name: "GitMaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Videos</span>
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search videos..." className="pl-8 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/videos/upload">
              <Plus className="h-4 w-4 mr-2" />
              Upload
            </Link>
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
                <label className="text-sm font-medium">Duration</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="all">Any Length</option>
                  <option value="short">Short ({"<"} 5 min)</option>
                  <option value="medium">Medium (5-20 min)</option>
                  <option value="long">Long ({">"} 20 min)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Date</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="all">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="relevance">Relevance</option>
                  <option value="date">Upload Date</option>
                  <option value="views">View Count</option>
                  <option value="likes">Likes</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="watched">Recently Watched</TabsTrigger>
          </TabsList>
          <div className="hidden md:flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} layout={viewMode} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Trending Now</h2>
          </div>
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {mockVideos
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((video) => (
                <VideoCard key={video.id} video={video} layout={viewMode} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shorts" className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Shorts
            </Badge>
            <h2 className="text-xl font-semibold">Short Videos</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockShorts.map((short) => (
              <Link
                key={short.id}
                href={`/videos/${short.id}`}
                className="group relative rounded-xl overflow-hidden aspect-[9/16]"
              >
                <img
                  src={short.thumbnail || "/placeholder.svg"}
                  alt={short.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white font-medium text-sm line-clamp-2">{short.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/80 text-xs">{short.views.toLocaleString()} views</span>
                    <span className="bg-black/50 text-white text-xs px-1 rounded">{short.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watched" className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Recently Watched</h2>
          </div>
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {mockVideos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} layout={viewMode} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

