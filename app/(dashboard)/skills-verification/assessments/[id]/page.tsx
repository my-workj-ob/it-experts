"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

import { Assessment, AssessmentQuestion, CodingChallenge, assessmentService } from "@/services/assessment-service"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, FileText, HelpCircle, Info, Loader2, Save, X } from 'lucide-react'
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AssessmentPage() {

  const router = useRouter()
  const { id } = useParams<number | any>()
  const assessmentId = parseInt(id)

  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0) // 0 = intro, 1+ = questions, last = summary
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [codingSubmissions, setCodeSubmissions] = useState<Record<number, string>>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<any>(null)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await assessmentService.getAssessmentById(assessmentId)
        if (data) {
          setAssessment(data)
          setTimeRemaining(data.duration * 60) // Convert minutes to seconds
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching assessment:", error)
        setIsLoading(false)
      }
    }

    fetchAssessment()
  }, [assessmentId])

  useEffect(() => {
    if (currentStep > 0 && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleSubmitAssessment()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentStep, timeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleStartAssessment = () => {
    setCurrentStep(1)
  }

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
  }

  const handleUpdateCode = (challengeId: number, code: string) => {
    setCodeSubmissions((prev) => ({
      ...prev,
      [challengeId]: code,
    }))
  }

  const handleNextQuestion = () => {
    if (!assessment) return

    const totalItems = assessment.questions.length + assessment.codingChallenges.length
    if (currentStep < totalItems) {
      setCurrentStep(currentStep + 1)
    } else {
      // Show summary
      setCurrentStep(totalItems + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitAssessment = async () => {
    if (!assessment) return

    setIsSubmitting(true)

    try {
      // Prepare answers
      const answers = Object.entries(selectedAnswers).map(([questionId, selectedOption]) => {
        const question = assessment.questions.find(q => q.id === parseInt(questionId))
        return {
          questionId: parseInt(questionId),
          selectedOption,
          isCorrect: question ? selectedOption === question.correctAnswer : false
        }
      })

      // Prepare coding submissions
      const codingSubmissionsList = Object.entries(codingSubmissions).map(([challengeId, code]) => {
        return {
          challengeId: parseInt(challengeId),
          code,
          passed: true // In a real app, you would evaluate the code
        }
      })

      // Submit assessment
      const result = await assessmentService.submitAssessment({
        assessmentId: assessment.id,
        userId: 1, // In a real app, this would be the current user's ID
        score: 0, // This will be calculated by the server
        passed: false, // This will be determined by the server
        answers,
        codingSubmissions: codingSubmissionsList
      })

      setAssessmentResult(result)
      setShowResults(true)
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCurrentQuestion = (): AssessmentQuestion | CodingChallenge | null => {
    if (!assessment) return null

    const questionIndex = currentStep - 1
    if (questionIndex < assessment.questions.length) {
      return assessment.questions[questionIndex]
    } else {
      const challengeIndex = questionIndex - assessment.questions.length
      if (challengeIndex < assessment.codingChallenges.length) {
        return assessment.codingChallenges[challengeIndex]
      }
    }

    return null
  }

  const getProgress = (): number => {
    if (!assessment) return 0

    const totalItems = assessment.questions.length + assessment.codingChallenges.length
    if (currentStep === 0) return 0
    if (currentStep > totalItems) return 100

    return Math.round((currentStep / totalItems) * 100)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <X className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Assessment not found. Please try again or select a different assessment.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild>
            <Link href="/skills-verification/assessments">Back to Assessments</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Assessment Results</CardTitle>
            <CardDescription>
              {assessment.title} - {assessment.skillName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className={`rounded-full p-6 mb-4 ${assessmentResult.passed
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}>
                {assessmentResult.passed
                  ? <CheckCircle className="h-12 w-12" />
                  : <X className="h-12 w-12" />
                }
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {assessmentResult.passed ? "Congratulations!" : "Not Passed"}
              </h2>
              <p className="text-muted-foreground text-center mb-4">
                {assessmentResult.passed
                  ? "You have successfully passed the assessment."
                  : "You did not meet the passing score for this assessment."
                }
              </p>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl font-bold">{assessmentResult.score}%</span>
                <Progress value={assessmentResult.score} className="w-40 h-3" />
                <span className="text-sm text-muted-foreground">
                  (Passing: {assessment.passingScore}%)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {assessmentResult.answers.filter((a: any) => a.isCorrect).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {assessmentResult.answers.length - assessmentResult.answers.filter((a: any) => a.isCorrect).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Incorrect Answers</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {assessmentResult.codingSubmissions.filter((s: any) => s.passed).length}/
                    {assessmentResult.codingSubmissions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Coding Challenges</div>
                </div>
              </div>
            </div>

            {assessmentResult.passed && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Certification Earned
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Your certification for {assessment.skillName} has been added to your profile.
                      This certification is valid for 2 years.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline">
              <Link href="/skills-verification/assessments">Back to Assessments</Link>
            </Button>
            <Button asChild>
              <Link href="/skills-verification">View My Skills</Link>
            </Button>
            {!assessmentResult.passed && (
              <Button variant="outline" asChild>
                <Link href={`/skills-verification/assessments/${assessment.id}`}>Retry Assessment</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {currentStep === 0 ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{assessment.title}</CardTitle>
                <CardDescription className="mt-1">{assessment.skillName}</CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                {assessment.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">About This Assessment</h3>
              <p className="text-muted-foreground">{assessment.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Assessment Format</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{assessment.duration} minutes duration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>{assessment.questions.length} multiple-choice questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{assessment.codingChallenges.length} coding challenges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{assessment.passingScore}% passing score</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Skills Tested</h3>
                <div className="flex flex-wrap gap-2">
                  {assessment.skillName === "JavaScript" && (
                    <>
                      <Badge variant="outline">Variables & Data Types</Badge>
                      <Badge variant="outline">Functions</Badge>
                      <Badge variant="outline">Arrays & Objects</Badge>
                      <Badge variant="outline">DOM Manipulation</Badge>
                      <Badge variant="outline">ES6+ Features</Badge>
                      <Badge variant="outline">Asynchronous JS</Badge>
                    </>
                  )}
                  {assessment.skillName === "React" && (
                    <>
                      <Badge variant="outline">Components</Badge>
                      <Badge variant="outline">Props & State</Badge>
                      <Badge variant="outline">Hooks</Badge>
                      <Badge variant="outline">Context API</Badge>
                      <Badge variant="outline">Performance</Badge>
                      <Badge variant="outline">React Router</Badge>
                    </>
                  )}
                  {assessment.skillName === "Node.js" && (
                    <>
                      <Badge variant="outline">Express</Badge>
                      <Badge variant="outline">Middleware</Badge>
                      <Badge variant="outline">REST APIs</Badge>
                      <Badge variant="outline">Authentication</Badge>
                      <Badge variant="outline">Database Integration</Badge>
                      <Badge variant="outline">Error Handling</Badge>
                    </>
                  )}
                  {assessment.skillName === "Algorithms" && (
                    <>
                      <Badge variant="outline">Arrays</Badge>
                      <Badge variant="outline">Linked Lists</Badge>
                      <Badge variant="outline">Trees & Graphs</Badge>
                      <Badge variant="outline">Sorting</Badge>
                      <Badge variant="outline">Searching</Badge>
                      <Badge variant="outline">Dynamic Programming</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Before You Begin
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Make sure you have enough time to complete the assessment without interruptions.
                    Once started, the timer cannot be paused. You can retake this assessment after 30 days
                    if you don't pass.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/skills-verification/assessments">Back to Assessments</Link>
            </Button>
            <Button onClick={handleStartAssessment}>
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{assessment.title}</h1>
              <p className="text-muted-foreground">{assessment.skillName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Progress value={getProgress()} className="h-2 flex-1" />
            <span className="text-sm font-medium">
              {currentStep} of {assessment.questions.length + assessment.codingChallenges.length}
            </span>
          </div>

          <Card>
            <CardContent className="pt-6">
              {(() => {
                const currentItem = getCurrentQuestion()

                if (!currentItem) {
                  // Summary screen
                  return (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold">Assessment Summary</h2>
                      <p className="text-muted-foreground">
                        You've reached the end of the assessment. Review your answers before submitting.
                      </p>

                      <div className="space-y-4">
                        <h3 className="font-medium">Multiple Choice Questions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {assessment.questions.map((question, index) => (
                            <div
                              key={question.id}
                              className={`border rounded-lg p-3 text-center ${selectedAnswers[question.id] !== undefined
                                ? "bg-green-50 border-green-200"
                                : "bg-amber-50 border-amber-200"
                                }`}
                            >
                              <div className="text-sm font-medium">Question {index + 1}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {selectedAnswers[question.id] !== undefined
                                  ? "Answered"
                                  : "Not answered"}
                              </div>
                            </div>
                          ))}
                        </div>

                        {assessment.codingChallenges.length > 0 && (
                          <>
                            <h3 className="font-medium mt-6">Coding Challenges</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {assessment.codingChallenges.map((challenge, index) => (
                                <div
                                  key={challenge.id}
                                  className={`border rounded-lg p-3 ${codingSubmissions[challenge.id]
                                    ? "bg-green-50 border-green-200"
                                    : "bg-amber-50 border-amber-200"
                                    }`}
                                >
                                  <div className="font-medium">{challenge.title}</div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {codingSubmissions[challenge.id]
                                      ? "Submitted"
                                      : "Not submitted"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                              Ready to Submit?
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                              Once submitted, you won't be able to change your answers. Make sure you've answered all questions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                // Check if it's a question or coding challenge
                if ('options' in currentItem) {
                  // It's a multiple choice question
                  const question = currentItem as AssessmentQuestion
                  return (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Question {currentStep}</h2>
                        <p className="text-lg">{question.question}</p>
                      </div>

                      <div className="space-y-3">
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors ${selectedAnswers[question.id] === index ? "border-primary bg-primary/5" : ""
                              }`}
                            onClick={() => handleSelectAnswer(question.id, index)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${selectedAnswers[question.id] === index
                                ? "border-primary bg-primary text-white"
                                : "border-muted-foreground"
                                }`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                } else {
                  // It's a coding challenge
                  const challenge = currentItem as CodingChallenge
                  return (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{challenge.title}</h2>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>

                      <div className="border rounded-lg">
                        <div className="bg-muted p-3 border-b font-medium">Code Editor</div>
                        <Textarea
                          className="font-mono text-sm min-h-[300px] rounded-none border-0 focus-visible:ring-0"
                          value={codingSubmissions[challenge.id] || challenge.initialCode}
                          onChange={(e) => handleUpdateCode(challenge.id, e.target.value)}
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium">Test Cases</h3>
                        {challenge.testCases.map((testCase, index) => (
                          <div key={index} className="border rounded-lg p-3 bg-muted">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-medium mb-1">Input:</div>
                                <div className="text-sm font-mono bg-background p-2 rounded">{testCase.input}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Expected Output:</div>
                                <div className="text-sm font-mono bg-background p-2 rounded">{testCase.expectedOutput}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              })()}
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep === assessment.questions.length + assessment.codingChallenges.length + 1 ? (
                <>
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitAssessment}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Submit Assessment
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNextQuestion}>
                    {currentStep === assessment.questions.length + assessment.codingChallenges.length ? (
                      <>
                        Review
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>

  )
}
