"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusCircle,
  Upload,
  Github,
  Globe,
  ImageIcon,
  FileCode,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("my-portfolio")

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Showcase your work and discover amazing projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Portfolio
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-portfolio" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="my-portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="add-project">Add Project</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "E-commerce Website",
                description: "A fully responsive e-commerce platform built with Next.js and Tailwind CSS",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["Next.js", "React", "Tailwind CSS", "Stripe"],
                likes: 24,
                comments: 8,
                views: 156,
                links: {
                  live: "https://example.com",
                  github: "https://github.com/username/project",
                },
              },
              {
                title: "Task Management App",
                description: "A Kanban-style task management application with drag and drop functionality",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["React", "TypeScript", "Firebase", "DnD"],
                likes: 18,
                comments: 5,
                views: 102,
                links: {
                  live: "https://example.com",
                  github: "https://github.com/username/project",
                },
              },
              {
                title: "AI Image Generator",
                description: "An AI-powered image generation tool using OpenAI's DALL-E API",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["Python", "Flask", "OpenAI", "React"],
                likes: 42,
                comments: 12,
                views: 230,
                links: {
                  live: "https://example.com",
                  github: "https://github.com/username/project",
                },
              },
            ].map((project, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {project.links.github && (
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" asChild>
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.links.live && (
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" asChild>
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-3">
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {project.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {project.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Eye className="h-4 w-4 mr-1" />
                      {project.views}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add-project" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>Showcase your work to the community and potential employers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input id="project-title" placeholder="Enter project title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="Describe your project" rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-category">Category</Label>
                  <Select>
                    <SelectTrigger id="project-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="ui-design">UI/UX Design</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="machine-learning">Machine Learning</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-status">Project Status</Label>
                  <Select>
                    <SelectTrigger id="project-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="concept">Concept</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Tags</Label>
                <Input placeholder="Add tags separated by commas (e.g., React, TypeScript, API)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github-url">GitHub URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Github className="h-4 w-4" />
                    </span>
                    <Input
                      id="github-url"
                      placeholder="https://github.com/username/project"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="live-url">Live Demo URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input id="live-url" placeholder="https://your-project.com" className="rounded-l-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Images</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-32">
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Cover Image</p>
                      <p className="text-xs text-muted-foreground">(Click to upload)</p>
                    </div>
                  </div>
                  <div className="border border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-32">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Additional Images</p>
                      <p className="text-xs text-muted-foreground">(Click to upload)</p>
                    </div>
                  </div>
                  <div className="border border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-32">
                      <FileCode className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Code Snippets</p>
                      <p className="text-xs text-muted-foreground">(Click to upload)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Project</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search projects..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <Select defaultValue="trending">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="ui-design">UI/UX Design</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="machine-learning">Machine Learning</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Recommendation Engine",
                author: "Emily Rodriguez",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "A recommendation system using machine learning algorithms to suggest products",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["Python", "TensorFlow", "Machine Learning"],
                likes: 87,
                comments: 23,
                views: 412,
              },
              {
                title: "Blockchain Voting System",
                author: "Michael Chen",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "A secure voting system built on blockchain technology",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["Solidity", "Ethereum", "Web3.js"],
                likes: 65,
                comments: 18,
                views: 320,
              },
              {
                title: "Augmented Reality Shopping App",
                author: "Sarah Williams",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "An AR app that allows users to visualize products in their space before purchasing",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["Swift", "ARKit", "iOS", "3D Modeling"],
                likes: 92,
                comments: 31,
                views: 540,
              },
              {
                title: "Real-time Collaboration Tool",
                author: "David Kim",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "A platform for teams to collaborate on documents and code in real-time",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["React", "Socket.io", "Node.js", "MongoDB"],
                likes: 78,
                comments: 27,
                views: 385,
              },
              {
                title: "Smart Home Automation System",
                author: "Jessica Patel",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "An IoT-based system for controlling and automating home devices",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["IoT", "Raspberry Pi", "Python", "MQTT"],
                likes: 56,
                comments: 14,
                views: 290,
              },
              {
                title: "Sustainable Energy Dashboard",
                author: "Robert Wilson",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                description: "A dashboard for monitoring and optimizing energy consumption",
                image: "/placeholder.svg?height=200&width=350",
                tags: ["D3.js", "React", "Node.js", "Time-series DB"],
                likes: 43,
                comments: 11,
                views: 215,
              },
            ].map((project, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={project.authorAvatar || "/placeholder.svg"}
                      alt={project.author}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{project.author}</span>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-3">
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {project.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {project.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Eye className="h-4 w-4 mr-1" />
                      {project.views}
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Projects</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

