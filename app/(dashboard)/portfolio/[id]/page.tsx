"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { get } from "lodash"
import { ArrowLeft, Bookmark, Eye, Github, Globe, Heart, MessageSquare, Share2, ThumbsUp } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock function to get project details
const getProjectDetails = async (id: string) => {
  // This would be replaced with an actual API call
  return {
    id,
    title: "E-Commerce Platform Redesign",
    author: "Your Name",
    authorId: "your-user-id", // To check if this is the user's own project
    authorAvatar: "/placeholder.svg?height=60&width=60&text=User",
    description: "A complete redesign of an e-commerce platform focusing on user experience and conversion optimization. The project included user research, wireframing, prototyping, and implementation.",
    longDescription: `This project was a comprehensive redesign of an existing e-commerce platform that was struggling with low conversion rates and poor user engagement. The goal was to create a more intuitive, visually appealing, and conversion-focused design while maintaining the brand identity.

The redesign process involved extensive user research, including interviews, surveys, and usability testing. Based on the insights gathered, I created wireframes and interactive prototypes that were tested with real users before implementation.

The final design features a clean, modern aesthetic with a focus on product imagery, simplified navigation, and a streamlined checkout process. The result was a 35% increase in conversion rate and a 42% increase in average session duration.`,
    imageUrl: JSON.stringify({ fileUrl: "/placeholder.svg?height=500&width=800" }),
    images: [
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image1" }),
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image2" }),
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image3" })
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "Figma", "Framer Motion", "TypeScript"],
    likesCount: 35,
    commentsCount: 8,
    views: 156,
    categoryId: "web",
    status: "Completed",
    createdAt: "2023-06-15T00:00:00.000Z",
    client: "TechRetail Inc.",
    duration: "3 months",
    githubUrl: "https://github.com/example/project",
    liveDemoUrl: "https://example.com",
    challenges: [
      "Balancing aesthetic design with performance optimization",
      "Creating a responsive design that works across all device sizes",
      "Implementing complex filtering and search functionality",
      "Optimizing the checkout flow to reduce abandonment",
      "Integrating with existing backend systems"
    ],
    comments: [
      {
        id: "1",
        author: "User Name",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User1",
        content: "Great work! I really like the attention to detail in the checkout process.",
        createdAt: "2023-06-17T00:00:00.000Z"
      },
      {
        id: "2",
        author: "Another User",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User2",
        content: "The UI is very clean and intuitive. How did you handle the product filtering?",
        createdAt: "2023-06-18T00:00:00.000Z"
      },
      {
        id: "3",
        author: "Third User",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User3",
        content: "This is exactly what I've been looking for as a reference for my own project. Thanks for sharing!",
        createdAt: "2023-06-19T00:00:00.000Z"
      }
    ]
  }
}

// Mock function to get related projects
const getRelatedProjects = async (userId: string) => {
  // This would be replaced with an actual API call
  return [
    {
      id: "related1",
      title: "Mobile App Design",
      category: "UI/UX Design",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P1"
    },
    {
      id: "related2",
      title: "Dashboard Analytics",
      category: "Web Development",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P2"
    },
    {
      id: "related3",
      title: "E-learning Platform",
      category: "Full Stack",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P3"
    }
  ]
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [relatedProjects, setRelatedProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")

  const projectId = params.id

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProjectDetails(projectId)
        setProject(projectData)

        // Fetch related projects by the same author
        if (projectData.authorId) {
          const related = await getRelatedProjects(projectData.authorId)
          setRelatedProjects(related)
        }
      } catch (error) {
        console.error("Error fetching project details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId])

  const handleLike = () => {
    setIsLiked(!isLiked)
    // In a real app, you would call an API to update the like status
    if (!isLiked) {
      setProject({ ...project, likesCount: project.likesCount + 1 })
    } else {
      setProject({ ...project, likesCount: project.likesCount - 1 })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In a real app, you would call an API to update the bookmark status
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, you would call an API to add the comment
    const newCommentObj = {
      id: `temp-${Date.now()}`,
      author: "You",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=You",
      content: newComment,
      createdAt: new Date().toISOString()
    }

    setProject({
      ...project,
      comments: [newCommentObj, ...project.comments],
      commentsCount: project.commentsCount + 1
    })

    setNewComment("")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-muted rounded-full mr-4" />
          <div className="h-8 bg-muted rounded w-48" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <div className="h-[400px] bg-muted rounded-t-lg" />
              <div className="p-6">
                <div className="h-8 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-5/6 mb-6" />

                <div className="h-10 bg-muted rounded w-full mb-4" />
                <div className="h-32 bg-muted rounded w-full" />
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 bg-muted rounded-full" />
                  <div>
                    <div className="h-6 bg-muted rounded w-32 mb-1" />
                    <div className="h-4 bg-muted rounded w-24" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-20" />
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/portfolio">
          <Button>Back to Portfolio</Button>
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return formatDate(dateString)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/portfolio" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="ml-auto flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // Copy the current URL to clipboard
              navigator.clipboard.writeText(window.location.href)
              // In a real app, you would show a toast notification
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant={isLiked ? "default" : "outline"}
            size="icon"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="icon"
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img
                src={get(JSON.parse(get(project, "imageUrl")), "fileUrl") || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {project.description}
                </p>

                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    {project.images && project.images.length > 0 && (
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value="description">
                    <p className="text-sm whitespace-pre-line">
                      {project.longDescription || project.description}
                    </p>
                  </TabsContent>
                  <TabsContent value="technologies">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.tags.map((tech: string) => (
                        <div key={tech} className="bg-secondary p-3 rounded-md text-center">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges">
                    <ul className="list-disc pl-5 space-y-2">
                      {project.challenges?.map((challenge: string, index: number) => (
                        <li key={index}>{challenge}</li>
                      )) || (
                          <li>No specific challenges documented for this project.</li>
                        )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="gallery">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.images?.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={get(JSON.parse(image), "fileUrl") || "/placeholder.svg"}
                          alt={`Project image ${index + 1}`}
                          className="rounded-md object-cover w-full h-40"
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Comments ({project.commentsCount})</h3>

              <form onSubmit={handleCommentSubmit} className="mb-6">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                  rows={3}
                />
                <Button type="submit" disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </form>

              <div className="space-y-4">
                {project.comments?.map((comment: any) => (
                  <div key={comment.id} className="flex gap-4 pb-4 border-b">
                    <img
                      src={comment.authorAvatar || "/placeholder.svg"}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{comment.author}</h4>
                        <span className="text-xs text-gray-500 ml-2">{timeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm mt-1">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={project.authorAvatar || "/placeholder.svg"}
                  alt={project.author}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="font-bold">{project.author}</h3>
                  <p className="text-sm text-gray-500">Project Creator</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm">Created</span>
                  <span className="text-sm">{formatDate(project.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Category</span>
                  <span className="text-sm">{project.categoryId === "web" ? "Web Development" :
                    project.categoryId === "mobile" ? "Mobile App" :
                      project.categoryId === "ml" ? "Machine Learning" :
                        project.categoryId}</span>
                </div>
                {project.client && (
                  <div className="flex justify-between">
                    <span className="text-sm">Client</span>
                    <span className="text-sm">{project.client}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex justify-between">
                    <span className="text-sm">Duration</span>
                    <span className="text-sm">{project.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <span className="text-sm">{project.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Contact Creator</Button>
                {project.githubUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
                {project.liveDemoUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {relatedProjects.length > 0 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">More Projects by {project.author}</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/portfolio/${relatedProject.id}`}
                      className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <img
                        src={relatedProject.thumbnail || "/placeholder.svg"}
                        alt={relatedProject.title}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{relatedProject.title}</h4>
                        <p className="text-xs text-gray-500">{relatedProject.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Project Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project.views}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project.likesCount}</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project.commentsCount}</div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
