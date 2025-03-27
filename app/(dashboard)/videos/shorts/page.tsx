"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ThumbsUp, ThumbsDown, MessageSquare, Share2, Music, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockShorts = [
  {
    id: 101,
    title: "Quick CSS Trick",
    description: "Learn this amazing CSS trick in under a minute!",
    video: "/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:58",
    views: 125000,
    likes: 15600,
    comments: 342,
    createdAt: "5 days ago",
    creator: {
      name: "CSSWizard",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "120K",
    },
    song: "Lofi Beats - Chill Study Music",
  },
  {
    id: 102,
    title: "JavaScript One-Liner",
    description: "This JavaScript one-liner will save you hours of coding!",
    video: "/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:45",
    views: 98000,
    likes: 12400,
    comments: 256,
    createdAt: "1 week ago",
    creator: {
      name: "JSMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "85K",
    },
    song: "Coding Vibes - Electronic Mix",
  },
  {
    id: 103,
    title: "React State Tip",
    description: "Master React state management with this quick tip!",
    video: "/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:52",
    views: 87500,
    likes: 9800,
    comments: 198,
    createdAt: "3 days ago",
    creator: {
      name: "ReactPro",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "210K",
    },
    song: "Tech House - Developer Anthem",
  },
  {
    id: 104,
    title: "VS Code Shortcut",
    description: "This VS Code shortcut will boost your productivity!",
    video: "/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:38",
    views: 76200,
    likes: 8500,
    comments: 145,
    createdAt: "2 days ago",
    creator: {
      name: "CodeTips",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "95K",
    },
    song: "Productivity Beats - Focus Mix",
  },
  {
    id: 105,
    title: "Git Command Trick",
    description: "Save time with this Git command trick every developer should know!",
    video: "/placeholder.mp4",
    thumbnail: "/placeholder.svg?height=400&width=225",
    duration: "0:42",
    views: 65800,
    likes: 7200,
    comments: 112,
    createdAt: "1 day ago",
    creator: {
      name: "GitMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: "65K",
    },
    song: "Developer Lofi - Coding Session",
  },
]

export default function ShortsPage() {
  const [currentShortIndex, setCurrentShortIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const currentShort = mockShorts[currentShortIndex]

  const handleNextShort = () => {
    if (currentShortIndex < mockShorts.length - 1) {
      setCurrentShortIndex(currentShortIndex + 1)
    }
  }

  const handlePrevShort = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex(currentShortIndex - 1)
    }
  }

  const handleVideoClick = () => {
    const video = videoRefs.current[currentShortIndex]
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    } else {
      return num.toString()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Link href="/videos" className="text-xl font-bold">
          Shorts
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white" asChild>
            <Link href="/videos/upload">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Player */}
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative h-full max-h-[calc(100vh-80px)] aspect-[9/16] mx-auto" onClick={handleVideoClick}>
            <video
              ref={(el) => (videoRefs.current[currentShortIndex] = el)}
              src={currentShort.video}
              poster={currentShort.thumbnail}
              className="h-full w-full object-cover"
              loop
              autoPlay
              playsInline
              muted
            />

            {/* Video Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <h2 className="text-lg font-bold">{currentShort.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{currentShort.description}</p>

              {/* Creator Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={currentShort.creator.avatar} alt={currentShort.creator.name} />
                  <AvatarFallback>{currentShort.creator.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">@{currentShort.creator.name}</p>
                  <p className="text-xs text-gray-300">{currentShort.creator.followers} followers</p>
                </div>
                <Button size="sm" className="ml-auto bg-white text-black hover:bg-white/90">
                  Follow
                </Button>
              </div>

              {/* Music Info */}
              <div className="flex items-center gap-2 mb-4">
                <Music className="h-4 w-4 animate-spin" />
                <div className="overflow-hidden flex-1">
                  <p className="text-sm whitespace-nowrap animate-marquee">{currentShort.song}</p>
                </div>
              </div>
            </div>

            {/* Side Actions */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-800/50 text-white">
                  <ThumbsUp className="h-6 w-6" />
                </Button>
                <span className="text-sm mt-1">{formatNumber(currentShort.likes)}</span>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-800/50 text-white">
                  <ThumbsDown className="h-6 w-6" />
                </Button>
                <span className="text-sm mt-1">Dislike</span>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-800/50 text-white">
                  <MessageSquare className="h-6 w-6" />
                </Button>
                <span className="text-sm mt-1">{formatNumber(currentShort.comments)}</span>
              </div>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-800/50 text-white">
                  <Share2 className="h-6 w-6" />
                </Button>
                <span className="text-sm mt-1">Share</span>
              </div>
            </div>

            {/* Navigation Buttons (hidden but functional for swipe-like behavior) */}
            <button
              className="absolute top-0 left-0 h-full w-1/2 opacity-0"
              onClick={handlePrevShort}
              disabled={currentShortIndex === 0}
            />
            <button
              className="absolute top-0 right-0 h-full w-1/2 opacity-0"
              onClick={handleNextShort}
              disabled={currentShortIndex === mockShorts.length - 1}
            />
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white opacity-50 hover:opacity-100"
            onClick={handlePrevShort}
            disabled={currentShortIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white opacity-50 hover:opacity-100"
            onClick={handleNextShort}
            disabled={currentShortIndex === mockShorts.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-16 left-0 right-0 flex justify-center gap-1 px-4">
          {mockShorts.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${index === currentShortIndex ? "bg-white" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

