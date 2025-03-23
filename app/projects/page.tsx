"use client"

import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    category: "Web Development",
    status: "In Progress",
    openPositions: ["Frontend Developer", "UX Designer"],
    teamSize: 4,
    deadline: "2025-06-30",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "AI-powered Recommendation Engine",
    description: "Developing a recommendation system using machine learning algorithms.",
    skills: ["Python", "TensorFlow", "Data Science", "API Development"],
    category: "AI & Machine Learning",
    status: "Recruiting",
    openPositions: ["Data Scientist", "Backend Developer", "DevOps Engineer"],
    teamSize: 2,
    deadline: "2025-07-15",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Creating a fitness tracking app for iOS and Android with React Native.",
    skills: ["React Native", "Firebase", "UI/UX Design"],
    category: "Mobile Development",
    status: "Planning",
    openPositions: ["Mobile Developer", "UI Designer", "Backend Developer"],
    teamSize: 1,
    deadline: "2025-08-01",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "DevOps Automation Platform",
    description: "Building tools to automate deployment and infrastructure management.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    category: "DevOps",
    status: "In Progress",
    openPositions: ["DevOps Engineer", "Backend Developer"],
    teamSize: 3,
    deadline: "2025-05-30",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Developing a secure voting system using blockchain technology.",
    skills: ["Blockchain", "Solidity", "Web3", "Security"],
    category: "Blockchain",
    status: "Recruiting",
    openPositions: ["Blockchain Developer", "Security Expert", "Frontend Developer"],
    teamSize: 2,
    deadline: "2025-09-15",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Data Visualization Dashboard",
    description: "Creating an interactive dashboard for visualizing complex datasets.",
    skills: ["D3.js", "React", "Data Analysis", "UI Design"],
    category: "Data Visualization",
    status: "Planning",
    openPositions: ["Frontend Developer", "Data Analyst", "UX Designer"],
    teamSize: 0,
    deadline: "2025-07-30",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function ProjectsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState(mockProjects)

  useEffect(() => {
    if (filteredProjects) {
      setFilteredProjects(mockProjects)
    }
  }, [])

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Projects</span> &
          Collaborations
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search projects..." className="pl-8 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="ai">AI & Machine Learning</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="recruiting">Recruiting</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input placeholder="e.g. React, Python, AWS" />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="discover">
        <TabsList>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>
        <TabsContent value="discover" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-projects" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t created any projects yet</p>
            <Button>Create Project</Button>
          </div>
        </TabsContent>
        <TabsContent value="applied" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t applied to any projects yet</p>
            <Button variant="outline">Browse Projects</Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

