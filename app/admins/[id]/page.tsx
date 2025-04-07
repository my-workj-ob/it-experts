"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Award,
  BarChart,
  CheckCircle,
  Clock,
  Code,
  Edit,
  Eye,
  FileQuestion,
  HelpCircle,
  User,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Define assessment interfaces
interface AssessmentQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface CodingChallenge {
  id: number
  title: string
  description: string
  initialCode: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
}

interface Assessment {
  id: number
  title: string
  description: string
  skillId: number
  skillName: string
  duration: number
  passingScore: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  questions: AssessmentQuestion[]
  codingChallenges: CodingChallenge[]
}

interface UserResult {
  userId: number
  userName: string
  score: number
  passed: boolean
  completedAt: string
}

export default function ViewAssessmentPage({ params }: { params: { id: string } }) {
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userResults, setUserResults] = useState<UserResult[]>([])
  const router = useRouter()

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/assessments/${params.id}`)
        // const data = await response.json()

        // Mock data for demonstration
        const mockAssessment: Assessment = {
          id: Number.parseInt(params.id),
          title: "JavaScript Fundamentals",
          description: "Test your knowledge of JavaScript basics, including variables, functions, and control flow.",
          skillId: 1,
          skillName: "JavaScript",
          duration: 30,
          passingScore: 70,
          difficulty: "Beginner",
          questions: [
            {
              id: 1,
              question: "Which of the following is NOT a JavaScript data type?",
              options: ["String", "Boolean", "Float", "Symbol"],
              correctAnswer: 2,
              explanation:
                "Float is not a distinct data type in JavaScript. JavaScript has Number type which can represent both integers and floating-point numbers.",
            },
            {
              id: 2,
              question: "What will be the output of: console.log(typeof null)?",
              options: ["null", "undefined", "object", "number"],
              correctAnswer: 2,
              explanation:
                "In JavaScript, typeof null returns 'object', which is considered a historical bug in the language.",
            },
            {
              id: 3,
              question: "Which method is used to add an element to the end of an array?",
              options: ["push()", "pop()", "unshift()", "shift()"],
              correctAnswer: 0,
              explanation:
                "push() adds one or more elements to the end of an array and returns the new length of the array.",
            },
            {
              id: 4,
              question: "What is the correct way to create a function in JavaScript?",
              options: [
                "function = myFunction() {}",
                "function myFunction() {}",
                "function:myFunction() {}",
                "create myFunction() {}",
              ],
              correctAnswer: 1,
              explanation: "The correct syntax for defining a function in JavaScript is: function functionName() {}",
            },
            {
              id: 5,
              question: "What does the '===' operator do?",
              options: [
                "Assigns a value",
                "Compares values for equality, but not type",
                "Compares both value and type for equality",
                "Checks if a value exists",
              ],
              correctAnswer: 2,
              explanation:
                "The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator, it checks both value and type.",
            },
          ],
          codingChallenges: [
            {
              id: 1,
              title: "Reverse a String",
              description:
                "Write a function that reverses a string. The input string is given as an array of characters.",
              initialCode: "function reverseString(str) {\n  // Your code here\n}",
              testCases: [
                {
                  input: "hello",
                  expectedOutput: "olleh",
                },
                {
                  input: "world",
                  expectedOutput: "dlrow",
                },
              ],
            },
            {
              id: 2,
              title: "Find the Largest Number",
              description: "Write a function to find the largest number in an array of integers.",
              initialCode: "function findLargestNumber(arr) {\n  // Your code here\n}",
              testCases: [
                {
                  input: "[1, 5, 3, 9, 2]",
                  expectedOutput: "9",
                },
                {
                  input: "[-1, -5, -3]",
                  expectedOutput: "-1",
                },
              ],
            },
          ],
        }

        // Mock user results
        const mockUserResults: UserResult[] = [
          {
            userId: 1,
            userName: "Alex Johnson",
            score: 85,
            passed: true,
            completedAt: "2025-04-01T14:30:00Z",
          },
          {
            userId: 2,
            userName: "Sarah Williams",
            score: 92,
            passed: true,
            completedAt: "2025-04-02T10:15:00Z",
          },
          {
            userId: 3,
            userName: "Michael Chen",
            score: 65,
            passed: false,
            completedAt: "2025-04-03T16:45:00Z",
          },
          {
            userId: 4,
            userName: "Emily Rodriguez",
            score: 78,
            passed: true,
            completedAt: "2025-04-04T09:20:00Z",
          },
          {
            userId: 5,
            userName: "David Kim",
            score: 60,
            passed: false,
            completedAt: "2025-04-05T11:10:00Z",
          },
        ]

        setAssessment(mockAssessment)
        setUserResults(mockUserResults)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching assessment:", error)
        toast({
          title: "Error",
          description: "Failed to load assessment. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchAssessment()
  }, [params.id])

  // Handle editing the assessment
  const handleEditAssessment = () => {
    router.push(`/admin/assessments/edit/${params.id}`)
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

  // Calculate statistics
  const calculateStats = () => {
    if (userResults.length === 0) {
      return {
        totalAttempts: 0,
        passRate: 0,
        averageScore: 0,
      }
    }

    const passCount = userResults.filter((result) => result.passed).length
    const totalScores = userResults.reduce((sum, result) => sum + result.score, 0)

    return {
      totalAttempts: userResults.length,
      passRate: Math.round((passCount / userResults.length) * 100),
      averageScore: Math.round(totalScores / userResults.length),
    }
  }

  const stats = calculateStats()

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <h3 className="text-lg font-medium mb-2">Assessment not found</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            The assessment you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/admin/assessments">Back to Assessments</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin/assessments" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{assessment.title}</h1>
            <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
          </div>
          <p className="text-muted-foreground">{assessment.description}</p>
        </div>
        <Button onClick={handleEditAssessment}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileQuestion className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-2xl font-bold">{assessment.questions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coding Challenges</p>
                <p className="text-2xl font-bold">{assessment.codingChallenges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-2xl font-bold">{assessment.duration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Assessment Content</TabsTrigger>
          <TabsTrigger value="results">User Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Questions ({assessment.questions.length})</CardTitle>
                <CardDescription>Multiple-choice questions in this assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {assessment.questions.map((question, index) => (
                    <AccordionItem key={question.id} value={`question-${question.id}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Question {index + 1}</span>
                          <span className="text-muted-foreground text-sm truncate max-w-[400px]">
                            {question.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-2">
                          <p className="font-medium">{question.question}</p>

                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded-md ${question.correctAnswer === optIndex
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-muted"
                                  }`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-background">
                                    <span className="text-xs">{String.fromCharCode(65 + optIndex)}</span>
                                  </div>
                                  <span>{option}</span>
                                  {question.correctAnswer === optIndex && (
                                    <span className="text-green-600 text-xs ml-auto">Correct Answer</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {question.explanation && (
                            <div className="bg-blue-50 p-3 rounded-md">
                              <div className="flex items-start gap-2">
                                <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <p className="font-medium text-blue-700 text-sm">Explanation</p>
                                  <p className="text-blue-600 text-sm">{question.explanation}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {assessment.codingChallenges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Coding Challenges ({assessment.codingChallenges.length})</CardTitle>
                  <CardDescription>Programming challenges in this assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {assessment.codingChallenges.map((challenge, index) => (
                      <AccordionItem key={challenge.id} value={`challenge-${challenge.id}`}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Challenge {index + 1}</span>
                            <span className="text-muted-foreground text-sm truncate max-w-[400px]">
                              {challenge.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 p-2">
                            <div>
                              <h4 className="font-medium">{challenge.title}</h4>
                              <p className="text-muted-foreground">{challenge.description}</p>
                            </div>

                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-sm mb-2">Initial Code</p>
                              <pre className="text-xs font-mono overflow-x-auto p-2 bg-background rounded">
                                {challenge.initialCode}
                              </pre>
                            </div>

                            <div>
                              <p className="font-medium text-sm mb-2">Test Cases</p>
                              <div className="space-y-2">
                                {challenge.testCases.map((testCase, tcIndex) => (
                                  <div key={tcIndex} className="bg-muted p-3 rounded-md">
                                    <p className="text-xs font-medium">Test Case {tcIndex + 1}</p>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      <div>
                                        <p className="text-xs text-muted-foreground">Input:</p>
                                        <p className="text-xs font-mono">{testCase.input}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">Expected Output:</p>
                                        <p className="text-xs font-mono">{testCase.expectedOutput}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Assessment Settings</CardTitle>
                <CardDescription>Configuration for this assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Settings</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Skill</span>
                        <span className="font-medium">{assessment.skillName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty</span>
                        <Badge className={getDifficultyColor(assessment.difficulty)}>{assessment.difficulty}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-medium">{assessment.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passing Score</span>
                        <span className="font-medium">{assessment.passingScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Content Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Questions</span>
                        <span className="font-medium">{assessment.questions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coding Challenges</span>
                        <span className="font-medium">{assessment.codingChallenges.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Points</span>
                        <span className="font-medium">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created</span>
                        <span className="font-medium">April 1, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>User Results</CardTitle>
              <CardDescription>Performance of users who have taken this assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {userResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No results yet</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    No users have taken this assessment yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Attempts</p>
                            <p className="text-2xl font-bold">{stats.totalAttempts}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pass Rate</p>
                            <p className="text-2xl font-bold">{stats.passRate}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <BarChart className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="text-2xl font-bold">{stats.averageScore}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium">
                      <div>User</div>
                      <div>Score</div>
                      <div>Status</div>
                      <div>Completed</div>
                      <div className="text-right">Actions</div>
                    </div>

                    {userResults.map((result) => (
                      <div key={result.userId} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                        <div className="font-medium">{result.userName}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{result.score}%</span>
                            <Progress value={result.score} className="h-2 w-16" />
                          </div>
                        </div>
                        <div>
                          {result.passed ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                              Passed
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-500 border-red-200">
                              Failed
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Analytics</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Question Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assessment.questions.map((question, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="truncate max-w-[300px]">
                                Q{index + 1}: {question.question}
                              </span>
                              <span className="font-medium">{Math.floor(Math.random() * 40) + 60}% correct</span>
                            </div>
                            <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Completion Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Average Completion Time</span>
                            <span className="font-medium">{Math.floor(assessment.duration * 0.8)} minutes</span>
                          </div>
                          <Progress
                            value={(Math.floor(assessment.duration * 0.8) / assessment.duration) * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Pass Rate</span>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="text-2xl font-bold">{stats.passRate}%</p>
                            <p className="text-xs text-muted-foreground">
                              {userResults.filter((r) => r.passed).length} out of {userResults.length} users passed
                            </p>
                          </div>

                          <div className="border rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Fail Rate</span>
                              <XCircle className="h-4 w-4 text-red-500" />
                            </div>
                            <p className="text-2xl font-bold">{100 - stats.passRate}%</p>
                            <p className="text-xs text-muted-foreground">
                              {userResults.filter((r) => !r.passed).length} out of {userResults.length} users failed
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Assessment Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Difficulty Rating</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-5 w-5 ${star <= 3 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium">3.0/5</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Content Relevance</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium">4.0/5</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Rating</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium">4.0/5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

