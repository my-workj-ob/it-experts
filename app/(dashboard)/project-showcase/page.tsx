"use client"

import { useState } from "react"
import { Search, Filter, Heart, Bookmark, Github, ExternalLink, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for projects
const projects = [
  {
    id: 1,
    name: "DevConnect Platform",
    description: "A platform for developers to connect, collaborate and share knowledge",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    stack: "MERN Stack",
    githubUrl: "https://github.com/username/devconnect",
    liveUrl: "https://devconnect-demo.vercel.app",
    teamMembers: [
      { id: 1, name: "John Doe", role: "Frontend Developer" },
      { id: 2, name: "Jane Smith", role: "Backend Developer" },
    ],
    likes: 124,
    bookmarks: 45,
    comments: 18,
    category: "Web Development",
  },
  {
    id: 2,
    name: "AI Image Generator",
    description: "Generate unique images using artificial intelligence and machine learning",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    stack: "Python + React",
    githubUrl: "https://github.com/username/ai-image-gen",
    liveUrl: "https://ai-image-gen-demo.vercel.app",
    teamMembers: [
      { id: 3, name: "Alex Johnson", role: "ML Engineer" },
      { id: 4, name: "Sarah Williams", role: "Frontend Developer" },
    ],
    likes: 89,
    bookmarks: 32,
    comments: 7,
    category: "AI & Machine Learning",
  },
  {
    id: 3,
    name: "Crypto Tracker",
    description: "Real-time cryptocurrency tracking and portfolio management application",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Vue.js", "Firebase", "Chart.js", "Tailwind CSS"],
    stack: "Vue + Firebase",
    githubUrl: "https://github.com/username/crypto-tracker",
    liveUrl: "https://crypto-tracker-demo.vercel.app",
    teamMembers: [{ id: 5, name: "Michael Brown", role: "Full Stack Developer" }],
    likes: 56,
    bookmarks: 21,
    comments: 9,
    category: "Finance",
  },
  {
    id: 4,
    name: "Health Monitoring App",
    description: "Mobile application for tracking health metrics and fitness goals",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React Native", "Firebase", "Node.js", "Express"],
    stack: "React Native + Node.js",
    githubUrl: "https://github.com/username/health-app",
    liveUrl: "https://health-app-demo.vercel.app",
    teamMembers: [
      { id: 6, name: "Emily Davis", role: "Mobile Developer" },
      { id: 7, name: "David Wilson", role: "Backend Developer" },
      { id: 8, name: "Lisa Taylor", role: "UI/UX Designer" },
    ],
    likes: 112,
    bookmarks: 48,
    comments: 23,
    category: "Health & Fitness",
  },
]

// Available technology filters
const technologies = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Vue.js",
  "Angular",
  "Python",
  "TensorFlow",
  "Flask",
  "Firebase",
  "React Native",
  "Chart.js",
  "Tailwind CSS",
  "Next.js",
  "TypeScript",
]

// Available categories
const categories = [
  "Web Development",
  "Mobile Development",
  "AI & Machine Learning",
  "Data Science",
  "DevOps",
  "Finance",
  "Health & Fitness",
  "Education",
  "E-commerce",
  "Social Media",
  "Gaming",
]

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Filter projects based on search, technologies, and category
  const filteredProjects = projects.filter((project) => {
    // Search filter
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Technology filter
    const matchesTech =
      selectedTechnologies.length === 0 || selectedTechnologies.some((tech) => project.technologies.includes(tech))

    // Category filter
    const matchesCategory = !selectedCategory || project.category === selectedCategory

    return matchesSearch && matchesTech && matchesCategory
  })

  // Toggle technology selection
  const toggleTechnology = (tech: string) => {
    if (selectedTechnologies.includes(tech)) {
      setSelectedTechnologies(selectedTechnologies.filter((t) => t !== tech))
    } else {
      setSelectedTechnologies([...selectedTechnologies, tech])
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Project Showcase</h1>
          <p className="text-muted-foreground mt-1">Discover and share amazing IT projects</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Your Project</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2 flex-1">
              <h3 className="text-sm font-medium">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 10).map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTechnology(tech)}
                  >
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 10 && (
                  <Badge variant="outline" className="cursor-pointer">
                    +{technologies.length - 10} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="w-full md:w-64">
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-3 pb-2">
                  <div>
                    <p className="text-sm font-medium mb-1">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">Stack:</p>
                      <p className="text-sm">{project.stack}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Team:</p>
                      <p className="text-sm">{project.teamMembers.length} members</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Github className="h-3.5 w-3.5 mr-1" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Demo
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <div className="flex items-center">
                      <Heart className="h-3.5 w-3.5 mr-1" />
                      {project.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {project.comments}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

