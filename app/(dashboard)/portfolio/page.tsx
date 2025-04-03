"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjects } from "@/services/project-service"
import { get, isNil } from "lodash"
import { Eye, Github, Globe, MessageSquare, Plus, Search, Share2, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PortfolioPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data || [])
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  console.log(projects);


  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Portfolio</h1>
          <p className="text-muted-foreground">Showcase your projects and work experience</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => router.push("/portfolio/discover")}>
            Discover Projects
          </Button>
          <Button onClick={() => router.push("/portfolio/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="web">Web Development</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
          <TabsTrigger value="design">UI/UX Design</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden group">
                  <div className="relative">
                    <img
                      src={get(project, "imageUrl") || "/placeholder.svg"}
                      alt={get(project, "title")}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {!isNil(get(project, "githubUrl")) && (
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" asChild>
                          <a href={get(project, "githubUrl")} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {!isNil(get(project, "liveDemoUrl")) && (
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" asChild>
                          <a href={get(project, "liveDemoUrl")} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{get(project, "title")}</CardTitle>
                    <CardDescription>{get(project, "description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project?.tags.map((tag, i) => (
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
                        {get(project, "likesCount")}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {get(project, "commentsCount")}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Eye className="h-4 w-4 mr-1" />
                        {get(project, "views")}
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
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven&apos;t added any projects yet</p>
              <Button onClick={() => router.push("/portfolio/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would filter by category */}
        <TabsContent value="web" className="mt-6">
          {/* Similar content as "all" but filtered for web projects */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No web development projects found</p>
            <Button onClick={() => router.push("/portfolio/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Web Project
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No mobile app projects found</p>
            <Button onClick={() => router.push("/portfolio/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Mobile Project
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="design" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No UI/UX design projects found</p>
            <Button onClick={() => router.push("/portfolio/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Design Project
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

