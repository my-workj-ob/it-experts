"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import axiosInstance from "@/lib/create-axios"
import { createProject, projectStatuses, uploadFile } from "@/services/project-service"
import { Code, Github, Globe, Image, Tag, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef, useState } from "react"
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
export default function CreateProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create a single state object for all form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    status: "",
    githubUrl: "",
    liveDemoUrl: "",
  })

  // Separate state for tags and other complex fields
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [ownProduct, setOwnProduct] = useState(true)

  // Refs for file inputs
  const coverImageRef = useRef<HTMLInputElement>(null)
  const additionalImagesRef = useRef<HTMLInputElement>(null)
  const codeSnippetsRef = useRef<HTMLInputElement>(null)

  // Preview states
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([])
  const [codeSnippetFiles, setCodeSnippetFiles] = useState<File[]>([])
  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState(0)
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
  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleTagAdd()
    }
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      setAdditionalImageFiles((prev) => [...prev, ...newFiles])

      const newPreviews: string[] = []
      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          newPreviews.push(reader.result as string)
          if (newPreviews.length === newFiles.length) {
            setAdditionalImagePreviews([...additionalImagePreviews, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleCodeSnippetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setCodeSnippetFiles((prev) => [...prev, ...Array.from(files)])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // First, upload all images and get their URLs
      let coverImageUrl = ""
      let additionalImageUrls: string[] = []

      // Upload progress calculation
      const totalFiles = (coverImageFile ? 1 : 0) + additionalImageFiles.length
      let uploadedFiles = 0

      // Upload cover image if exists
      if (coverImageFile) {
        const formData = new FormData()
        formData.append("file", coverImageFile)

        const response = await uploadFile(formData)
        coverImageUrl = response.url

        uploadedFiles++
        setUploadProgress(Math.round((uploadedFiles / totalFiles) * 100))
      }

      // Upload additional images if any
      if (additionalImageFiles.length > 0) {
        const uploadPromises = additionalImageFiles.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await uploadFile(formData)

          uploadedFiles++
          setUploadProgress(Math.round((uploadedFiles / totalFiles) * 100))

          return response.url
        })

        additionalImageUrls = await Promise.all(uploadPromises)
      }

      // Create a simple JSON object with all the form data including image URLs
      const projectData = {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        status: formData.status,
        githubUrl: formData.githubUrl || "",
        liveDemoUrl: formData.liveDemoUrl || "",
        tags: tags,
        ownProduct: ownProduct,
        userId: 1, // You might want to get this from your auth context
        views: 0,
        likesCount: 0,
        commentsCount: 0,
        imageUrl: coverImageUrl, // Add the cover image URL
        images: additionalImageUrls, // Add the additional image URLs
      }

      // Log the data we're sending
      console.log("Sending project data:", projectData)

      // Send the data to the server
      await createProject(projectData)
      router.push("/projects") // Redirect to projects page after successful creation
    } catch (error) {
      console.error("Error creating project:", error)
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Add New Project</h1>
          <p className="text-muted-foreground">Showcase your work to the community and potential employers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Basic information about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your project"
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onValueChange={(value) => handleSelectChange("categoryId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Project Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.name}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Project Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags separated by commas (e.g., React, TypeScript, API)"
                  className="flex-1"
                />
                <Button type="button" onClick={handleTagAdd}>
                  <Tag className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="text-secondary-foreground/70 hover:text-secondary-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="ownProduct" checked={ownProduct} onCheckedChange={setOwnProduct} />
              <Label htmlFor="ownProduct">This is my own product/project</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Links</CardTitle>
            <CardDescription>Add links to your project repositories and demos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <div className="relative">
                  <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/project"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveDemoUrl">Live Demo URL</Label>
                <div className="relative">
                  <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="liveDemoUrl"
                    name="liveDemoUrl"
                    value={formData.liveDemoUrl}
                    onChange={handleInputChange}
                    placeholder="https://your-project.com"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Images</CardTitle>
            <CardDescription>Upload images to showcase your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cover Image */}
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-48">
                  {coverImagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={coverImagePreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setCoverImagePreview(null)
                          setCoverImageFile(null)
                          if (coverImageRef.current) {
                            coverImageRef.current.value = ""
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Image className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-center text-muted-foreground">Cover Image</p>
                      <p className="text-xs text-center text-muted-foreground">(Click to upload)</p>
                    </>
                  )}
                  <input
                    ref={coverImageRef}
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageChange}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => coverImageRef.current?.click()}
                >
                  {coverImagePreview ? "Change Cover Image" : "Upload Cover Image"}
                </Button>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-48"
                  onClick={() => additionalImagesRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">Additional Images</p>
                  <p className="text-xs text-center text-muted-foreground">(Click to upload)</p>
                  <input
                    ref={additionalImagesRef}
                    type="file"
                    id="additionalImages"
                    name="additionalImages"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleAdditionalImagesChange}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => additionalImagesRef.current?.click()}
                >
                  Upload Additional Images
                </Button>
              </div>

              {/* Code Snippets */}
              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-48"
                  onClick={() => codeSnippetsRef.current?.click()}
                >
                  <Code className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-center text-muted-foreground">Code Snippets</p>
                  <p className="text-xs text-center text-muted-foreground">(Click to upload)</p>
                  <input
                    ref={codeSnippetsRef}
                    type="file"
                    id="codeSnippets"
                    name="codeSnippets"
                    accept=".js,.jsx,.ts,.tsx,.html,.css,.json,.md"
                    multiple
                    className="hidden"
                    onChange={handleCodeSnippetsChange}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => codeSnippetsRef.current?.click()}
                >
                  Upload Code Snippets
                </Button>
              </div>
            </div>

            {/* Preview of additional images */}
            {additionalImagePreviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Additional Images Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => {
                          const newPreviews = [...additionalImagePreviews]
                          newPreviews.splice(index, 1)
                          setAdditionalImagePreviews(newPreviews)

                          const newFiles = [...additionalImageFiles]
                          newFiles.splice(index, 1)
                          setAdditionalImageFiles(newFiles)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isSubmitting && uploadProgress > 0 && (
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            <p className="text-sm text-muted-foreground mt-1">Uploading files: {uploadProgress}%</p>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}

