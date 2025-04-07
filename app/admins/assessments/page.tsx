"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { useAllAssessments, useDeleteAssessment } from "@/hooks/use-assessments"
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  HelpCircle,
  Plus,
  Search,
  Trash,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mock data for skills
const skills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Frontend" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "Python" },
  { id: 6, name: "Data Structures" },
]

export default function AssessmentManagementPage() {
  const [filteredAssessments, setFilteredAssessments] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedSkill, setSelectedSkill] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [assessmentToDelete, setAssessmentToDelete] = useState<number | null>(null)

  const router = useRouter()

  // Use our custom hook to fetch assessments
  const { data: assessments = [], isLoading, error, refetch } = useAllAssessments()

  // Use our custom hook for deleting assessments
  const { mutate: deleteAssessment, isPending: isDeleting } = useDeleteAssessment()

  // Filter assessments based on search query and filters
  useEffect(() => {
    if (!assessments) return

    let filtered = [...assessments]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (assessment) =>
          assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          assessment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          assessment.skillName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((assessment) => assessment.difficulty === selectedDifficulty)
    }

    // Apply skill filter
    if (selectedSkill !== "all") {
      filtered = filtered.filter((assessment) => assessment.skillId === Number(selectedSkill))
    }

    setFilteredAssessments(filtered)
  }, [searchQuery, selectedDifficulty, selectedSkill, assessments])

  // Handle creating a new assessment
  const handleCreateAssessment = () => {
    router.push("/admin/assessments/create")
  }

  // Handle editing an assessment
  const handleEditAssessment = (id: number) => {
    router.push(`/admin/assessments/edit/${id}`)
  }

  // Handle viewing an assessment
  const handleViewAssessment = (id: number) => {
    router.push(`/admin/assessments/${id}`)
  }

  // Handle deleting an assessment
  const handleDeleteAssessment = async (id: number) => {
    deleteAssessment(id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Assessment deleted successfully.",
        })
        setDeleteDialogOpen(false)
        setAssessmentToDelete(null)
      },
      onError: (error) => {
        console.error("Error deleting assessment:", error)
        toast({
          title: "Error",
          description: "Failed to delete assessment. Please try again.",
          variant: "destructive",
        })
      },
    })
  }

  // Handle resetting filters
  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedDifficulty("all")
    setSelectedSkill("all")
  }

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Assessment Management</h1>
          <p className="text-muted-foreground">Create and manage skill assessments</p>
        </div>
        <Button onClick={handleCreateAssessment}>
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <CardTitle>Assessments</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assessments..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button>Apply</Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-medium mb-2">Error Loading Assessments</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                There was a problem loading the assessments. Please try again later.
              </p>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : filteredAssessments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-3 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No assessments found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {searchQuery || selectedDifficulty !== "all" || selectedSkill !== "all"
                  ? "We couldn't find any assessments matching your search criteria. Try adjusting your filters."
                  : "You haven't created any assessments yet. Create your first assessment to get started."}
              </p>
              {searchQuery || selectedDifficulty !== "all" || selectedSkill !== "all" ? (
                <Button variant="outline" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={handleCreateAssessment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assessment
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Passing Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{assessment.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{assessment.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{assessment.skillName}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{assessment.duration} min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        <span>{assessment.questions.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>{assessment.passingScore}%</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Open menu</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <path
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewAssessment(assessment.id!)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAssessment(assessment.id!)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setAssessmentToDelete(assessment.id!)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => assessmentToDelete && handleDeleteAssessment(assessmentToDelete)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

