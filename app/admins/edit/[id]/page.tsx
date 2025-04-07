"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AlertTriangle, ArrowLeft, Code, FileQuestion, HelpCircle, Plus, Save, Trash } from "lucide-react"
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

// Mock data for skills
const skills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Frontend" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "Python" },
  { id: 6, name: "Data Structures" },
]

export default function EditAssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [isLoading, setIsLoading] = useState(true)

  // Initialize assessment state
  const [assessment, setAssessment] = useState<Assessment | null>(null)

  // State for new question form
  const [newQuestion, setNewQuestion] = useState<Omit<AssessmentQuestion, "id">>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
  })

  // State for new coding challenge form
  const [newCodingChallenge, setNewCodingChallenge] = useState<Omit<CodingChallenge, "id">>({
    title: "",
    description: "",
    initialCode: "// Write your code here",
    testCases: [{ input: "", expectedOutput: "" }],
  })

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
          ],
        }

        setAssessment(mockAssessment)
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

  // Handle assessment details change
  const handleDetailsChange = (field: keyof Assessment, value: any) => {
    if (!assessment) return

    setAssessment({
      ...assessment,
      [field]: value,
    })

    // Update skill name if skillId changes
    if (field === "skillId") {
      const skill = skills.find((s) => s.id === Number.parseInt(value))
      if (skill) {
        setAssessment((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            skillName: skill.name,
          }
        })
      }
    }
  }

  // Handle new question change
  const handleQuestionChange = (field: keyof Omit<AssessmentQuestion, "id">, value: any) => {
    setNewQuestion({
      ...newQuestion,
      [field]: value,
    })
  }

  // Handle option change for new question
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = value
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    })
  }

  // Add new question to assessment
  const handleAddQuestion = () => {
    if (!assessment) return

    // Validate question
    if (!newQuestion.question.trim()) {
      toast({
        title: "Error",
        description: "Question text is required.",
        variant: "destructive",
      })
      return
    }

    // Validate options
    if (newQuestion.options.some((option) => !option.trim())) {
      toast({
        title: "Error",
        description: "All options must have content.",
        variant: "destructive",
      })
      return
    }

    // Add question to assessment
    setAssessment({
      ...assessment,
      questions: [
        ...assessment.questions,
        {
          ...newQuestion,
          id: Date.now(), // Temporary ID for UI purposes
        },
      ],
    })

    // Reset new question form
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    })

    toast({
      title: "Success",
      description: "Question added successfully.",
    })
  }

  // Remove question from assessment
  const handleRemoveQuestion = (id: number) => {
    if (!assessment) return

    setAssessment({
      ...assessment,
      questions: assessment.questions.filter((q) => q.id !== id),
    })

    toast({
      title: "Success",
      description: "Question removed successfully.",
    })
  }

  // Handle coding challenge change
  const handleChallengeChange = (field: keyof Omit<CodingChallenge, "id">, value: any) => {
    setNewCodingChallenge({
      ...newCodingChallenge,
      [field]: value,
    })
  }

  // Handle test case change for coding challenge
  const handleTestCaseChange = (index: number, field: "input" | "expectedOutput", value: string) => {
    const updatedTestCases = [...newCodingChallenge.testCases]
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value,
    }
    setNewCodingChallenge({
      ...newCodingChallenge,
      testCases: updatedTestCases,
    })
  }

  // Add test case to coding challenge
  const handleAddTestCase = () => {
    setNewCodingChallenge({
      ...newCodingChallenge,
      testCases: [...newCodingChallenge.testCases, { input: "", expectedOutput: "" }],
    })
  }

  // Remove test case from coding challenge
  const handleRemoveTestCase = (index: number) => {
    if (newCodingChallenge.testCases.length <= 1) {
      toast({
        title: "Error",
        description: "At least one test case is required.",
        variant: "destructive",
      })
      return
    }

    const updatedTestCases = [...newCodingChallenge.testCases]
    updatedTestCases.splice(index, 1)
    setNewCodingChallenge({
      ...newCodingChallenge,
      testCases: updatedTestCases,
    })
  }

  // Add coding challenge to assessment
  const handleAddChallenge = () => {
    if (!assessment) return

    // Validate challenge
    if (!newCodingChallenge.title.trim() || !newCodingChallenge.description.trim()) {
      toast({
        title: "Error",
        description: "Title and description are required.",
        variant: "destructive",
      })
      return
    }

    // Validate test cases
    if (newCodingChallenge.testCases.some((tc) => !tc.input.trim() || !tc.expectedOutput.trim())) {
      toast({
        title: "Error",
        description: "All test cases must have input and expected output.",
        variant: "destructive",
      })
      return
    }

    // Add challenge to assessment
    setAssessment({
      ...assessment,
      codingChallenges: [
        ...assessment.codingChallenges,
        {
          ...newCodingChallenge,
          id: Date.now(), // Temporary ID for UI purposes
        },
      ],
    })

    // Reset new challenge form
    setNewCodingChallenge({
      title: "",
      description: "",
      initialCode: "// Write your code here",
      testCases: [{ input: "", expectedOutput: "" }],
    })

    toast({
      title: "Success",
      description: "Coding challenge added successfully.",
    })
  }

  // Remove coding challenge from assessment
  const handleRemoveChallenge = (id: number) => {
    if (!assessment) return

    setAssessment({
      ...assessment,
      codingChallenges: assessment.codingChallenges.filter((c) => c.id !== id),
    })

    toast({
      title: "Success",
      description: "Coding challenge removed successfully.",
    })
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!assessment) return

    // Validate assessment details
    if (!assessment.title.trim() || !assessment.description.trim() || assessment.skillId === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields in the Details tab.",
        variant: "destructive",
      })
      setActiveTab("details")
      return
    }

    // Validate questions
    if (assessment.questions.length === 0) {
      toast({
        title: "Error",
        description: "At least one question is required.",
        variant: "destructive",
      })
      setActiveTab("questions")
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/assessments/${assessment.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(assessment),
      // })
      // const data = await response.json()

      // Mock successful response
      console.log("Assessment updated:", assessment)

      toast({
        title: "Success",
        description: "Assessment updated successfully.",
      })

      // Redirect to assessment view
      router.push(`/admin/assessments/${assessment.id}`)
    } catch (error) {
      console.error("Error updating assessment:", error)
      toast({
        title: "Error",
        description: "Failed to update assessment. Please try again.",
        variant: "destructive",
      })
    }
  }

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
            The assessment you're trying to edit doesn't exist or has been removed.
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
        <Link href={`/admin/assessments/${assessment.id}`} className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Assessment</h1>
          <p className="text-muted-foreground">Update assessment details and content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/assessments/${assessment.id}`)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="coding">Coding Challenges</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>Basic information about the assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., JavaScript Fundamentals"
                    value={assessment.title}
                    onChange={(e) => handleDetailsChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this assessment will test..."
                    rows={4}
                    value={assessment.description}
                    onChange={(e) => handleDetailsChange("description", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill">
                      Skill <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={assessment.skillId.toString()}
                      onValueChange={(value) => handleDetailsChange("skillId", Number.parseInt(value))}
                    >
                      <SelectTrigger id="skill">
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill.id} value={skill.id.toString()}>
                            {skill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">
                      Difficulty <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={assessment.difficulty}
                      onValueChange={(value) =>
                        handleDetailsChange("difficulty", value as "Beginner" | "Intermediate" | "Advanced")
                      }
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Duration (minutes) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min={5}
                      max={180}
                      value={assessment.duration}
                      onChange={(e) => handleDetailsChange("duration", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passingScore">
                      Passing Score (%) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="passingScore"
                      type="number"
                      min={1}
                      max={100}
                      value={assessment.passingScore}
                      onChange={(e) => handleDetailsChange("passingScore", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/admin/assessments/${assessment.id}`)}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("questions")}>Continue to Questions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Question</CardTitle>
                <CardDescription>Create multiple-choice questions for the assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">
                    Question <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your question here..."
                    value={newQuestion.question}
                    onChange={(e) => handleQuestionChange("question", e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>
                    Options <span className="text-destructive">*</span>
                  </Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                        <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <Input
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`correct-${index}`}
                          name="correctAnswer"
                          className="mr-2"
                          checked={newQuestion.correctAnswer === index}
                          onChange={() => handleQuestionChange("correctAnswer", index)}
                        />
                        <Label htmlFor={`correct-${index}`} className="text-sm cursor-pointer">
                          Correct
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    placeholder="Explain why the correct answer is right..."
                    value={newQuestion.explanation || ""}
                    onChange={(e) => handleQuestionChange("explanation", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions ({assessment.questions.length})</CardTitle>
                <CardDescription>
                  {assessment.questions.length === 0
                    ? "No questions added yet. Add at least one question."
                    : "Review and manage your questions"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessment.questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <FileQuestion className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Add at least one question to your assessment using the form above.
                    </p>
                  </div>
                ) : (
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

                            <div className="flex justify-end">
                              <Button variant="destructive" size="sm" onClick={() => handleRemoveQuestion(question.id)}>
                                <Trash className="h-4 w-4 mr-2" />
                                Remove Question
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Back to Details
                </Button>
                <Button onClick={() => setActiveTab("coding")}>Continue to Coding Challenges</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coding">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Coding Challenge (Optional)</CardTitle>
                <CardDescription>Create coding challenges for the assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge-title">Title</Label>
                  <Input
                    id="challenge-title"
                    placeholder="e.g., Reverse a String"
                    value={newCodingChallenge.title}
                    onChange={(e) => handleChallengeChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge-description">Description</Label>
                  <Textarea
                    id="challenge-description"
                    placeholder="Describe the coding challenge..."
                    rows={4}
                    value={newCodingChallenge.description}
                    onChange={(e) => handleChallengeChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial-code">Initial Code</Label>
                  <Textarea
                    id="initial-code"
                    placeholder="Provide starter code..."
                    rows={6}
                    className="font-mono text-sm"
                    value={newCodingChallenge.initialCode}
                    onChange={(e) => handleChallengeChange("initialCode", e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Test Cases</Label>
                    <Button variant="outline" size="sm" onClick={handleAddTestCase}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Test Case
                    </Button>
                  </div>

                  {newCodingChallenge.testCases.map((testCase, index) => (
                    <div key={index} className="border rounded-md p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Test Case {index + 1}</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveTestCase(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`input-${index}`}>Input</Label>
                          <Input
                            id={`input-${index}`}
                            placeholder="e.g., hello"
                            value={testCase.input}
                            onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`output-${index}`}>Expected Output</Label>
                          <Input
                            id={`output-${index}`}
                            placeholder="e.g., olleh"
                            value={testCase.expectedOutput}
                            onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddChallenge}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Coding Challenge
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coding Challenges ({assessment.codingChallenges.length})</CardTitle>
                <CardDescription>
                  {assessment.codingChallenges.length === 0
                    ? "No coding challenges added yet. This is optional."
                    : "Review and manage your coding challenges"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessment.codingChallenges.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Code className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No coding challenges yet</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Coding challenges are optional. Add them using the form above if needed.
                    </p>
                  </div>
                ) : (
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

                            <div className="flex justify-end">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveChallenge(challenge.id)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Remove Challenge
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("questions")}>
                  Back to Questions
                </Button>
                <Button onClick={() => setActiveTab("preview")}>Continue to Preview</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Preview</CardTitle>
              <CardDescription>Review your assessment before saving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-1">{assessment.title || "Untitled Assessment"}</h3>
                <p className="text-muted-foreground mb-4">{assessment.description || "No description provided"}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Skill</p>
                    <p className="font-medium">{assessment.skillName || "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{assessment.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{assessment.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Passing Score</p>
                    <p className="font-medium">{assessment.passingScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <FileQuestion className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">Questions ({assessment.questions.length})</h4>
                </div>

                {assessment.questions.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-700 text-sm">No questions added</p>
                        <p className="text-yellow-600 text-sm">
                          You need to add at least one question to your assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ul className="list-disc list-inside mb-4 pl-2">
                    {assessment.questions.map((question, index) => (
                      <li key={index} className="text-muted-foreground mb-1">
                        {question.question.length > 60 ? `${question.question.substring(0, 60)}...` : question.question}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">Coding Challenges ({assessment.codingChallenges.length})</h4>
                </div>

                {assessment.codingChallenges.length === 0 ? (
                  <p className="text-muted-foreground mb-4">No coding challenges added (optional).</p>
                ) : (
                  <ul className="list-disc list-inside mb-4 pl-2">
                    {assessment.codingChallenges.map((challenge, index) => (
                      <li key={index} className="text-muted-foreground mb-1">
                        {challenge.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {assessment.questions.length === 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Assessment is incomplete</p>
                      <p className="text-destructive/80">
                        You need to add at least one question before you can save this assessment.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                        onClick={() => setActiveTab("questions")}
                      >
                        Add Questions
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("coding")}>
                Back to Coding Challenges
              </Button>
              <Button onClick={handleSubmit} disabled={assessment.questions.length === 0}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

