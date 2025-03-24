"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  FileCode,
  Github,
  Globe,
  Send,
  Share2,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Mock project data
const mockProject = {
  id: 1,
  title: "E-commerce Platform",
  description:
    "Building a modern e-commerce platform with React, Node.js, and MongoDB. The platform will include features such as product listings, shopping cart, user authentication, payment processing, and an admin dashboard for managing products and orders.",
  longDescription: `
    <p>We're building a comprehensive e-commerce solution that will serve as a template for online stores. The platform is designed to be highly customizable, scalable, and user-friendly.</p>
    
    <h3>Key Features:</h3>
    <ul>
      <li>Responsive product catalog with advanced filtering and search</li>
      <li>User authentication and profile management</li>
      <li>Shopping cart and wishlist functionality</li>
      <li>Secure checkout process with multiple payment options</li>
      <li>Order tracking and history</li>
      <li>Admin dashboard for inventory and order management</li>
      <li>Analytics and reporting tools</li>
      <li>API integration capabilities</li>
    </ul>
    
    <h3>Technical Stack:</h3>
    <p>We're using a modern MERN stack (MongoDB, Express, React, Node.js) with TypeScript for type safety. The frontend is built with Next.js for server-side rendering and optimal performance. For styling, we're using Tailwind CSS.</p>
    
    <h3>Project Timeline:</h3>
    <p>The project is expected to take 3 months to complete, with the first month focused on core functionality, the second month on advanced features, and the third month on testing, optimization, and deployment.</p>
  `,
  skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  category: "Web Development",
  status: "In Progress",
  progress: 65,
  openPositions: [
    { title: "Frontend Developer", filled: false, applicants: 4 },
    { title: "UX Designer", filled: false, applicants: 2 },
    { title: "Backend Developer", filled: true, applicants: 6 },
  ],
  teamSize: 4,
  currentTeam: [
    { id: 1, name: "Alex Johnson", role: "Project Lead", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Sarah Williams", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Michael Chen", role: "DevOps Engineer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Emily Rodriguez", role: "Frontend Developer", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  deadline: "2025-06-30",
  startDate: "2025-03-15",
  links: {
    github: "https://github.com/example/ecommerce-platform",
    website: "https://example-ecommerce.vercel.app",
    figma: "https://figma.com/file/example",
  },
  image: "/placeholder.svg?height=400&width=800",
  comments: [
    {
      id: 1,
      user: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40" },
      text: "This project looks interesting! I'm a frontend developer with experience in React and Next.js. Would love to contribute.",
      date: "2 days ago",
      likes: 3,
    },
    {
      id: 2,
      user: { name: "Lisa Patel", avatar: "/placeholder.svg?height=40&width=40" },
      text: "I have some questions about the UX Designer role. What kind of experience are you looking for?",
      date: "1 day ago",
      likes: 1,
    },
  ],
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)

  // In a real app, you would fetch the project data based on the ID
  const project = mockProject

  const handleApply = (position: string) => {
    setSelectedPosition(position)
    setIsApplying(true)

    // In a real app, you would submit the application to your backend
    setTimeout(() => {
      setIsApplying(false)
      // Show success message or redirect
    }, 1500)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the comment to your backend
    setComment("")
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      {/* Project header */}
      <div className="relative">
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge className="bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/30">
            {project.category}
          </Badge>
          <Badge
            className={
              project.status === "In Progress"
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                : project.status === "Recruiting"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            }
          >
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              {project.title}
            </h1>
            <p className="text-muted-foreground mt-2">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Start Date: {new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{project.progress}% Complete</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                    className="prose dark:prose-invert max-w-none"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.links.github && (
                      <div className="flex items-center">
                        <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub Repository
                        </a>
                      </div>
                    )}
                    {project.links.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Project Website
                        </a>
                      </div>
                    )}
                    {project.links.figma && (
                      <div className="flex items-center">
                        <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={project.links.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Design Files
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Team</CardTitle>
                  <CardDescription>{project.currentTeam.length} team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.currentTeam.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Open Positions</CardTitle>
                  <CardDescription>
                    {project.openPositions.filter((p) => !p.filled).length} positions available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.openPositions.map((position) => (
                      <div key={position.title} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{position.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {position.applicants} applicant{position.applicants !== 1 ? "s" : ""}
                          </p>
                        </div>
                        {position.filled ? (
                          <Badge variant="outline" className="bg-muted">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                            Filled
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleApply(position.title)}
                            disabled={isApplying && selectedPosition === position.title}
                          >
                            {isApplying && selectedPosition === position.title ? "Applying..." : "Apply"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Discussion</CardTitle>
                  <CardDescription>
                    {project.comments.length} comment{project.comments.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{comment.user.name}</p>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!comment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90">
                Apply to Project
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="text-sm font-medium">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium">{project.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Team Size</span>
                <span className="text-sm font-medium">{project.teamSize} members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Open Positions</span>
                <span className="text-sm font-medium">{project.openPositions.filter((p) => !p.filled).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Project thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/projects/${i + 1}`} className="font-medium hover:text-primary">
                      {i === 0
                        ? "Mobile Fitness App"
                        : i === 1
                          ? "AI Recommendation Engine"
                          : "DevOps Automation Platform"}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "Mobile Development" : i === 1 ? "AI & Machine Learning" : "DevOps"}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">Have questions about this project?</p>
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Contact Project Lead
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

