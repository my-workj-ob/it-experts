"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import axios from "axios"
import { get } from "lodash"
import { Eye, Github, Globe, MessageSquare, Search, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Category {
  id: string | number
  name: string
}

interface FilterParams {
  userId: number
  ownProduct: any
  likesCount: number
  views: number
  category: string
  sortBy: string
}

interface Project {
  id: number
  title: string
  category: string | null
  description: string
  tags: string[]
  imageUrl: string
  user: {
    id: number
    email: string
  }
  profile: {
    id: number
    firstName: string
    name: string
    lastName: string
    email: string
    jobTitle: string
    avatar: string
  }
  userId: number
  views: number
  ownProduct: any
  likesCount: number
  commentsCount: number
  images: {
    fileId: number
    fileUrl: string
  }[]
  githubUrl: string
  liveDemoUrl: string
  ownProject: boolean
}

export default function DiscoverPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [minLikes, setMinLikes] = useState(0)
  const [minViews, setMinViews] = useState(0)
  const [showOwnProducts, setShowOwnProducts] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  const { userProfileData } = useProfile()
  // Fetch all projects initially
  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get("/projects")
        setProjects(response.data || [])
      } catch (error) {
        console.error("Error fetching all projects:", error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllProjects()
  }, [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories")
        setCategories(response.data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        // Fallback categories in case the API fails
        setCategories([
          { id: "web", name: "Web Development" },
          { id: "mobile", name: "Mobile App" },
          { id: "ml", name: "Machine Learning" },
          { id: "blockchain", name: "Blockchain" },
          { id: "iot", name: "IoT" },
          { id: "data", name: "Data Visualization" },
        ])
      }
    }

    fetchCategories()
  }, [])

  // Fetch filtered projects
  const fetchFilteredProjects = async (filters: FilterParams) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/projects/filtered-portfolios", filters)
      setProjects(response.data || [])
    } catch (error) {
      console.error("Error fetching filtered projects:", error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  // Apply filters when any filter changes
  useEffect(() => {
    // Only apply filters if user has changed any filter
    if (isFiltered) {
      const filters: FilterParams = {
        userId: showOwnProducts && get(userProfileData, "id") || 0, // Set to appropriate user ID if needed
        ownProduct: showOwnProducts,
        likesCount: minLikes,
        views: minViews,
        category: categoryFilter === "all" ? "" : categoryFilter,
        sortBy: sortBy,
      }

      fetchFilteredProjects(filters)
    }
  }, [categoryFilter, sortBy, minLikes, minViews, showOwnProducts, isFiltered])

  // Handle filter changes
  const handleFilterChange = (type: string, value: any) => {
    setIsFiltered(true)

    switch (type) {
      case "category":
        setCategoryFilter(value)
        break
      case "sortBy":
        setSortBy(value)
        break
      case "minLikes":
        setMinLikes(value)
        break
      case "minViews":
        setMinViews(value)
        break
      case "ownProducts":
        setShowOwnProducts(value)
        break
      case "search":
        setSearchQuery(value)
        break
    }
  }

  // Debounce search
  useEffect(() => {
    if (searchQuery && !isFiltered) {
      setIsFiltered(true)
    }

    if (isFiltered) {
      const timer = setTimeout(() => {
        const filters: FilterParams = {
          userId: showOwnProducts && get(userProfileData, "id") || 0,
          ownProduct: showOwnProducts,
          likesCount: minLikes,
          views: minViews,
          category: categoryFilter === "all" ? "" : categoryFilter,
          sortBy: sortBy,
        }

        fetchFilteredProjects(filters)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [searchQuery])

  // Reset all filters
  const resetFilters = async () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setSortBy("trending")
    setMinLikes(0)
    setMinViews(0)
    setShowOwnProducts(false)
    setIsFiltered(false)

    // Fetch all projects again
    setIsLoading(true)
    try {
      const response = await axios.get("/projects")
      setProjects(response.data || [])
    } catch (error) {
      console.error("Error fetching all projects:", error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  // Filter projects by search query client-side
  const filteredProjects =
    searchQuery && !isFiltered
      ? projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.tags && project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
          (project.profile &&
            project.profile.name &&
            project.profile.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      : projects

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Projects</h1>
          <p className="text-muted-foreground">Explore amazing projects from the community</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border p-4 space-y-4">
            <h3 className="font-medium">Filters</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="most_liked">Most Liked</SelectItem>
                  <SelectItem value="most_viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Min. Likes</label>
                <span className="text-sm text-muted-foreground">{minLikes}</span>
              </div>
              <Slider
                value={[minLikes]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => handleFilterChange("minLikes", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Min. Views</label>
                <span className="text-sm text-muted-foreground">{minViews}</span>
              </div>
              <Slider
                value={[minViews]}
                min={0}
                max={500}
                step={10}
                onValueChange={(value) => handleFilterChange("minViews", value[0])}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ownProducts"
                checked={showOwnProducts}
                onChange={(e) => handleFilterChange("ownProducts", e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="ownProducts" className="text-sm font-medium">
                Show only own products
              </label>
            </div>

            <Button variant="outline" className="w-full" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
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
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects?.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => router.push(`/portfolio/discover/${project.id}`)}
                >
                  <div className="relative">
                    <img
                      src={get(project, "imageUrl") || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={get(project, "imageUrl") || "/placeholder.svg"}
                        alt={project.profile?.name || "Author"}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{project.profile?.name || "Anonymous"}</span>
                      {project.profile?.jobTitle && (
                        <Badge variant="outline" className="ml-auto">
                          {project.profile.jobTitle}
                        </Badge>
                      )}
                    </div>
                    <CardTitle>{project.title || "Untitled Project"}</CardTitle>
                    <CardDescription>{project.description || "No description provided"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tags || []).map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <div className="flex gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {project.likesCount}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {project.commentsCount}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-1" />
                        {project.views}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No projects found matching your criteria</p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Projects</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

