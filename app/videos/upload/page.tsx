"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Globe, ImageIcon, Lock, Tag, Upload, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UploadVideoPage() {
  const router = useRouter()
  const [isShort, setIsShort] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      // Create a preview URL for the video
      const videoUrl = URL.createObjectURL(file)
      setVideoPreview(videoUrl)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      // Create a preview URL for the thumbnail
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Redirect to videos page after "processing"
      setTimeout(() => {
        setIsUploading(false)
        router.push("/videos")
      }, 1500)
    }, 6000)
  }

  console.log(thumbnailFile);


  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/videos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Videos
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Upload Video</CardTitle>
          <CardDescription>Share your video with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Video Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Video</h2>
              </div>

              {!videoFile ? (
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors">
                  <input type="file" id="video" className="hidden" accept="video/*" onChange={handleVideoChange} />
                  <label htmlFor="video" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Drag and drop or click to upload</h3>
                      <p className="text-sm text-muted-foreground mb-2">MP4, WebM, or MOV (max. 2GB)</p>
                      <Button type="button">Select Video</Button>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden bg-muted/30 p-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    {videoPreview && <video src={videoPreview} controls className="w-full h-full object-contain" />}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setVideoFile(null)
                        setVideoPreview(null)
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Details</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Add a title that describes your video" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Tell viewers about your video" className="min-h-[120px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  {thumbnailPreview ? (
                    <div className="relative w-full max-w-[360px] aspect-video rounded-lg overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          setThumbnailFile(null)
                          setThumbnailPreview(null)
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                      <input
                        type="file"
                        id="thumbnail"
                        className="hidden"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                      <label htmlFor="thumbnail" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a thumbnail image (16:9 ratio recommended)
                          </p>
                          <Button type="button" variant="outline" size="sm">
                            Select Image
                          </Button>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tags to help viewers find your video"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                          <button
                            type="button"
                            className="ml-2 text-muted-foreground hover:text-foreground"

                            onClick={() => handleRemoveTag(tag)}
                          >
                            &times;
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="vlog">Vlog</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ru">Russian</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="ko">Korean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="isShort" checked={isShort} onCheckedChange={setIsShort} />
                  <Label htmlFor="isShort">This is a short video (under 60 seconds)</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Visibility Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Visibility</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <div className="flex h-5 w-5 items-center justify-center">
                      <input type="radio" id="public" name="visibility" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="public" className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Public
                        </div>
                      </label>
                      <p className="text-sm text-muted-foreground">Everyone can watch your video</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <div className="flex h-5 w-5 items-center justify-center">
                      <input type="radio" id="unlisted" name="visibility" className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="unlisted" className="font-medium">
                        <div className="flex items-center gap-2">
                          <Link href={'#'} className="h-4 w-4" />
                          Unlisted
                        </div>
                      </label>
                      <p className="text-sm text-muted-foreground">Anyone with the link can watch your video</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <div className="flex h-5 w-5 items-center justify-center">
                      <input type="radio" id="private" name="visibility" className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="private" className="font-medium">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Private
                        </div>
                      </label>
                      <p className="text-sm text-muted-foreground">Only you can watch your video</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="comments" defaultChecked />
                  <Label htmlFor="comments">Allow comments</Label>
                </div>
              </div>
            </div>

            {isUploading ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {uploadProgress < 100
                      ? "Your video is being uploaded. Please don't close this page."
                      : "Upload complete! Processing your video..."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/videos">Cancel</Link>
                </Button>
                <Button type="submit" disabled={!videoFile}>
                  Upload Video
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

