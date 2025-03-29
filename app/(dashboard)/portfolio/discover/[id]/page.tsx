"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { get } from "lodash"
import { ArrowLeft, Bookmark, Eye, Github, Globe, Heart, MessageSquare, Share2, ThumbsUp } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock function to get project details - same as the one in [id]/page.tsx but with different author
const getDiscoverProjectDetails = async (id: string) => {
  // This would be replaced with an actual API call
  return {
    id,
    title: "AI-Powered Recommendation Engine",
    author: "Emily Rodriguez",
    authorId: "emily-rodriguez",
    authorAvatar: "/placeholder.svg?height=60&width=60&text=Emily",
    description: "A recommendation system using machine learning algorithms to suggest products based on user behavior and preferences.",
    longDescription: `This project implements a sophisticated recommendation engine that analyzes user behavior, purchase history, and preferences to suggest relevant products. The system uses a combination of collaborative filtering and content-based filtering techniques to provide accurate and personalized recommendations.

The collaborative filtering component identifies patterns among users with similar preferences, while the content-based filtering analyzes product attributes to find items similar to those the user has shown interest in previously.

Key features include:
- Real-time recommendation updates based on user interactions
- A/B testing framework to optimize recommendation algorithms
- Scalable architecture capable of handling millions of users and products
- Detailed analytics dashboard to track recommendation performance`,
    imageUrl: JSON.stringify({ fileUrl: "/placeholder.svg?height=500&width=800" }),
    images: [
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image1" }),
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image2" }),
      JSON.stringify({ fileUrl: "/placeholder.svg?height=200&width=200&text=Image3" })
    ],
    tags: ["Python", "TensorFlow", "Machine Learning", "Data Science", "API"],
    likesCount: 87,
    commentsCount: 23,
    views: 412,
    categoryId: "ml",
    status: "Completed",
    createdAt: "2023-05-10T00:00:00.000Z",
    client: "E-commerce Corp",
    duration: "4 months",
    githubUrl: "https://github.com/example/project",
    liveDemoUrl: "https://example.com",
    challenges: [
      "Processing and analyzing large datasets efficiently",
      "Balancing recommendation accuracy with system performance",
      "Handling the cold start problem for new users and products",
      "Implementing real-time updates without affecting user experience",
      "Ensuring privacy and data security compliance"
    ],
    comments: [
      {
        id: "1",
        author: "Tech Enthusiast",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User1",
        content: "This is an impressive implementation! How did you handle the cold start problem?",
        createdAt: "2023-05-12T00:00:00.000Z"
      },
      {
        id: "2",
        author: "Data Scientist",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User2",
        content: "Great work on the hybrid approach. Have you considered using deep learning for feature extraction?",
        createdAt: "2023-05-15T00:00:00.000Z"
      },
      {
        id: "3",
        author: "Product Manager",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=User3",
        content: "The A/B testing framework is particularly interesting. Would love to hear more about how you measure success metrics.",
        createdAt: "2023-05-18T00:00:00.000Z"
      }
    ]
  }
}

// Mock function to get related projects by the same author
const getAuthorProjects = async (userId: string) => {
  // This would be replaced with an actual API call
  return [
    {
      id: "related1",
      title: "Sentiment Analysis Tool",
      category: "Natural Language Processing",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P1"
    },
    {
      id: "related2",
      title: "Image Recognition API",
      category: "Computer Vision",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P2"
    },
    {
      id: "related3",
      title: "Predictive Analytics Dashboard",
      category: "Data Visualization",
      thumbnail: "/placeholder.svg?height=60&width=60&text=P3"
    }
  ]
}

export default function DiscoverProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [authorProjects, setAuthorProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")

  const projectId = params.id

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getDiscoverProjectDetails(projectId)
        setProject(projectData)

        // Fetch other projects by the same author
        if (projectData.authorId) {
          const authorProjects = await getAuthorProjects(projectData.authorId)
          setAuthorProjects(authorProjects)
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
        <Link href="/portfolio/discover">
          <Button>Back to Discover</Button>
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
        <Link href="/portfolio/discover" className="mr-4">
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

          {authorProjects.length > 0 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">More Projects by {project.author}</h3>
                <div className="space-y-4">
                  {authorProjects.map((authorProject) => (
                    <Link
                      key={authorProject.id}
                      href={`/portfolio/discover/${authorProject.id}`}
                      className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <img
                        src={authorProject.thumbnail || "/placeholder.svg"}
                        alt={authorProject.title}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{authorProject.title}</h4>
                        <p className="text-xs text-gray-500">{authorProject.category}</p>
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
