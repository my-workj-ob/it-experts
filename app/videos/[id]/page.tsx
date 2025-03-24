"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import VideoCard from "@/components/video-card"
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

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
]

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "This was incredibly helpful! I've been struggling with Next.js routing and this cleared everything up. Thanks for the great tutorial!",
    likes: 24,
    createdAt: "2 days ago",
    replies: [
      {
        id: 101,
        user: {
          name: "TechTutorials",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Glad it helped you, Alex! Let me know if you have any other questions.",
        likes: 5,
        createdAt: "1 day ago",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Could you make a follow-up video on how to deploy Next.js applications to Vercel? That would be super useful!",
    likes: 18,
    createdAt: "3 days ago",
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Great explanation of the concepts. I especially liked the section on API routes. Very clear and concise!",
    likes: 12,
    createdAt: "1 week ago",
    replies: [],
  },
]

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // In a real app, you would fetch the video data based on the ID
  const videoId = Number(params.id)
  const video = mockVideos.find((v) => v.id === videoId) || mockVideos[0]

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
      setIsDisliked(false)
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      setIsDisliked(true)
      setIsLiked(false)
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the comment to your backend
    setComment("")
  }

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    } else {
      return views.toString()
    }
  }

  return (

    <>
      <div className="container mx-auto py-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video src="/placeholder.mp4" poster={video.thumbnail} controls className="w-full h-full object-contain" />
            </div>

            {/* Video Info */}
            <div>
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{formatViews(video.views)} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 py-4 border-y">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant={isLiked ? "default" : "ghost"}
                    size="sm"
                    onClick={handleLike}
                    className="rounded-r-none"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {formatViews(video.likes)}
                  </Button>
                  <Button
                    variant={isDisliked ? "default" : "ghost"}
                    size="sm"
                    onClick={handleDislike}
                    className="rounded-l-none border-l"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant={isSaved ? "default" : "ghost"} size="sm" onClick={handleSave}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isSaved ? "Saved" : "Save"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex flex-wrap justify-between items-center gap-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
                  <AvatarFallback>{video.creator.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{video.creator.name}</h3>
                  <p className="text-sm text-muted-foreground">42.5K subscribers</p>
                </div>
              </div>
              <Button variant={isSubscribed ? "outline" : "default"} onClick={handleSubscribe}>
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>

            {/* Description */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="whitespace-pre-line">{video.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">#nextjs</Badge>
                <Badge variant="secondary">#react</Badge>
                <Badge variant="secondary">#webdevelopment</Badge>
                <Badge variant="secondary">#tutorial</Badge>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Comments ({mockComments.length})</h2>
              </div>

              <form onSubmit={handleSubmitComment} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 min-h-[60px]"
                  />
                  <Button type="submit" size="icon" disabled={!comment.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              <div className="space-y-6 mt-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user.name}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-10 pl-6 border-l space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                              <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{reply.user.name}</span>
                                <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                              </div>
                              <p className="mt-1">{reply.text}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {reply.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Videos */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Recommended Videos</h2>
            <div className="space-y-4">
              {mockVideos
                .filter((v) => v.id !== videoId)
                .map((video) => (
                  <VideoCard key={video.id} video={video} layout="list" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

