import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  createdAt: string
  creator: {
    name: string
    avatar: string
  }
}

interface VideoCardProps {
  video: Video
  layout: "grid" | "list"
}

export default function VideoCard({ video, layout }: VideoCardProps) {
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

  if (layout === "list") {
    return (
      <Link href={`/videos/${video.id}`} className="block">
        <div className="flex gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
          <div className="relative w-60 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2">{video.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{video.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
                <AvatarFallback>{video.creator.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{video.creator.name}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{formatViews(video.views)} views</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{formatViews(video.likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{video.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/videos/${video.id}`} className="block group">
      <div className="space-y-2">
        <div className="relative rounded-lg overflow-hidden aspect-video">
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 mt-1">
            <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
            <AvatarFallback>{video.creator.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{video.creator.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{video.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

