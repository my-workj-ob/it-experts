"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useProfile from "@/hooks/profile/use-profile"
import { useUserAssessments } from "@/hooks/use-assessments"
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Book,
  Clock,
  FileText,
  HelpCircle,
  Info,
  Search,
  Shield,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Define assessment metadata
const assessmentMetadata = {
  "JavaScript Proficiency": {
    description: "Test your knowledge of JavaScript fundamentals, ES6+, and advanced concepts.",
    duration: 45,
    difficulty: "Intermediate",
    skills: [
      "Variables & Data Types",
      "Functions",
      "Arrays & Objects",
      "DOM Manipulation",
      "ES6+ Features",
      "Asynchronous JS",
    ],
  },
  "React Development": {
    description: "Demonstrate your skills in building React applications, hooks, and state management.",
    duration: 60,
    difficulty: "Advanced",
    skills: ["Components", "Props & State", "Hooks", "Context API", "Performance", "React Router"],
  },
  "Node.js Backend": {
    description: "Prove your ability to build server-side applications with Node.js and Express.",
    duration: 50,
    difficulty: "Intermediate",
    skills: ["Express", "Middleware", "REST APIs", "Authentication", "Database Integration", "Error Handling"],
  },
  "Data Structures & Algorithms": {
    description: "Solve coding challenges to demonstrate your problem-solving abilities.",
    duration: 90,
    difficulty: "Advanced",
    skills: ["Arrays", "Linked Lists", "Trees & Graphs", "Sorting", "Searching", "Dynamic Programming"],
  },
  "HTML & CSS Fundamentals": {
    description: "Test your knowledge of HTML elements, CSS styling, and responsive design.",
    duration: 40,
    difficulty: "Beginner",
    skills: ["HTML Elements", "CSS Selectors", "Box Model", "Flexbox", "Grid", "Responsive Design"],
  },
  "Git & Version Control": {
    description: "Demonstrate your understanding of Git workflows and version control concepts.",
    duration: 30,
    difficulty: "Beginner",
    skills: ["Basic Commands", "Branching", "Merging", "Pull Requests", "Conflict Resolution", "Git Workflows"],
  },
}

export default function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAssessments, setFilteredAssessments] = useState([])
  const router = useRouter()
  const { userProfileData } = useProfile()

  // Use our custom hook to fetch user assessments
  const { data: userAssessments, isLoading, error } = useUserAssessments(userProfileData?.id || 0)

  // Filter available assessments based on search query
  useEffect(() => {
    if (!userAssessments) return

    const availableAssessments = userAssessments.available || []

    if (searchQuery.trim() === "") {
      setFilteredAssessments(availableAssessments)
    } else {
      const filtered = availableAssessments.filter(
        (assessment) =>
          assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          assessment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          assessment.skillName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredAssessments(filtered)
    }
  }, [searchQuery, userAssessments])

  const handleStartAssessment = (id: number) => {
    router.push(`/skills-verification/assessments/${id}`)
  }

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

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
      case "Advanced":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
      case "Intermediate":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      case "Beginner":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/skills-verification" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Skill Assessments</h1>
          <p className="text-muted-foreground">Verify your skills and earn certifications</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search assessments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
        </div>
        <Button variant="outline">
          <Book className="h-4 w-4 mr-2" />
          Learning Resources
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-destructive/20 p-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-medium mb-2">Error loading assessments</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  There was a problem loading the assessments. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </CardContent>
            </Card>
          ) : filteredAssessments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No assessments found</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  We couldn't find any assessments matching your search criteria. Try adjusting your search or check
                  back later.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.map((assessment) => {
                const isCompleted = userAssessments?.completed?.some((a) => a.id === assessment.id)

                return (
                  <Card key={assessment.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assessment.title}</CardTitle>
                          <CardDescription className="mt-1">{assessment.skillName}</CardDescription>
                        </div>
                        <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{assessment.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          <span>{assessment.questions.length} questions</span>
                        </div>
                      </div>

                      {isCompleted && (
                        <div className="mt-4 p-2 bg-green-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Already completed</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleStartAssessment(assessment.id)}>
                        <Shield className="h-4 w-4 mr-2" />
                        {isCompleted ? "Retake Assessment" : "Start Assessment"}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(userAssessments?.available || [])
                .filter((_, index) => index % 2 === 0) // Just a simple filter for demo purposes
                .map((assessment) => {
                  const isCompleted = userAssessments?.completed?.some((a) => a.id === assessment.id)

                  return (
                    <Card key={assessment.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{assessment.title}</CardTitle>
                            <CardDescription className="mt-1">{assessment.skillName}</CardDescription>
                          </div>
                          <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-4">{assessment.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{assessment.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            <span>{assessment.questions.length} questions</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">Recommended for your profile</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Based on your skills and career interests</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartAssessment(assessment.id)}>
                          <Shield className="h-4 w-4 mr-2" />
                          {isCompleted ? "Retake Assessment" : "Start Assessment"}
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !userAssessments?.completed || userAssessments.completed.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No completed assessments</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    You haven't completed any assessments yet. Start an assessment to test your skills and earn
                    certifications.
                  </p>
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="all"]')?.click()}>
                    View Available Assessments
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userAssessments.completed.map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-3 bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{assessment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Completed on {new Date(assessment.completionDate).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getLevelColor(assessment.level)}>{assessment.level}</Badge>
                            <Badge variant="outline">Score: {assessment.score}%</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 self-end">
                        {assessment.certificateUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={assessment.certificateUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4 mr-2" />
                              View Certificate
                            </a>
                          </Button>
                        )}
                        <Button size="sm" onClick={() => handleStartAssessment(assessment.id)}>
                          Retake Assessment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Assessment Information</CardTitle>
          <CardDescription>Learn more about our skill assessment process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">About Our Assessment Process</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Our assessments are designed by industry experts to test your knowledge and practical skills. Each
                  assessment includes multiple-choice questions. Upon successful completion, you'll receive a
                  certification that you can showcase on your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Industry-Standard Tests</h3>
                <p className="text-sm text-muted-foreground">
                  Our assessments are designed by industry experts to match real-world job requirements.
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Recognized Certifications</h3>
                <p className="text-sm text-muted-foreground">
                  Earn badges and certificates that are recognized by top employers in the industry.
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Timed Assessments</h3>
                <p className="text-sm text-muted-foreground">
                  Assessments have time limits to simulate real-world pressure and test your efficiency.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

