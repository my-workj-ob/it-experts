"use client"

import {
  BarChart,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Menu,
  PlayCircle,
  Send,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function LessonPage() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("content")
  const [comment, setComment] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)

  // Sample data - in a real app, this would come from your API
  const course = {
    id: "1",
    title: "Introduction to Web Development",
    thumbnail: "/placeholder.svg?height=720&width=1280",
  }

  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { title: "Course Overview", duration: "5 min", type: "video", isCompleted: true },
        { title: "Setting Up Your Environment", duration: "10 min", type: "video", isCompleted: true },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Document Structure", duration: "15 min", type: "video", isCompleted: true },
        { title: "Working with Text", duration: "12 min", type: "video", isCompleted: false },
        { title: "HTML Quiz", duration: "10 min", type: "quiz", isCompleted: false },
      ],
    },
    {
      title: "CSS Basics",
      lessons: [
        { title: "Introduction to CSS", duration: "18 min", type: "video", isCompleted: false },
        { title: "CSS Selectors", duration: "15 min", type: "video", isCompleted: false },
        { title: "Box Model", duration: "20 min", type: "video", isCompleted: false },
        { title: "CSS Assignment", duration: "45 min", type: "assignment", isCompleted: false },
      ],
    },
  ]

  // Flatten lessons for navigation
  const allLessons = curriculum.flatMap((section) => section.lessons)
  const currentLesson = allLessons[currentLessonIndex]

  // Calculate progress
  const completedLessons = allLessons.filter((lesson) => lesson.isCompleted).length
  const progress = Math.round((completedLessons / allLessons.length) * 100)

  // Sample comments
  const comments = [
    {
      id: 1,
      user: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      text: "This lesson was really helpful! I was struggling with understanding the concept but now it makes sense.",
      time: "2 days ago",
      likes: 12,
      replies: [
        {
          id: 101,
          user: { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40", isInstructor: true },
          text: "Glad to hear that, Alex! If you have any more questions, feel free to ask.",
          time: "1 day ago",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      user: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
      text: "I'm having trouble with the practical example. When I try to run the code, I get an error. Can someone help?",
      time: "1 day ago",
      likes: 2,
      replies: [],
    },
  ]

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    // In a real app, you would save the comment to your database
    setComment("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/courses/${course.id}`}>
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="hidden md:block">
              <h1 className="font-medium truncate max-w-md">{course.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePreviousLesson} disabled={currentLessonIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextLesson}
                disabled={currentLessonIndex === allLessons.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h2 className="text-lg font-bold mb-4">Course Content</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Your Progress</span>
                      <span>{progress}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {curriculum.map((section, sectionIndex) => (
                      <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex justify-between w-full pr-4">
                            <span className="font-medium">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1">
                            {section.lessons.map((lesson, lessonIndex) => {
                              const globalLessonIndex =
                                curriculum
                                  .slice(0, sectionIndex)
                                  .reduce((acc, section) => acc + section.lessons.length, 0) + lessonIndex

                              return (
                                <li
                                  key={lessonIndex}
                                  className={`py-2 px-2 rounded-md ${globalLessonIndex === currentLessonIndex
                                      ? "bg-primary/10 text-primary"
                                      : "hover:bg-muted/50"
                                    }`}
                                  onClick={() => {
                                    setCurrentLessonIndex(globalLessonIndex)
                                    setShowSidebar(false)
                                  }}
                                >
                                  <div className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center">
                                      {lesson.isCompleted ? (
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                      ) : (
                                        <>
                                          {lesson.type === "video" && (
                                            <PlayCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                                          )}
                                          {lesson.type === "text" && (
                                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                          )}
                                          {lesson.type === "quiz" && (
                                            <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                                          )}
                                          {lesson.type === "assignment" && (
                                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                          )}
                                        </>
                                      )}
                                      <span className="text-sm">{lesson.title}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Course Content */}
        <div className="hidden md:block w-80 border-r overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Course Content</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Your Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Accordion type="single" collapsible className="w-full">
              {curriculum.map((section, sectionIndex) => (
                <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between w-full pr-4">
                      <span className="font-medium">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => {
                        const globalLessonIndex =
                          curriculum.slice(0, sectionIndex).reduce((acc, section) => acc + section.lessons.length, 0) +
                          lessonIndex

                        return (
                          <li
                            key={lessonIndex}
                            className={`py-2 px-2 rounded-md ${globalLessonIndex === currentLessonIndex
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted/50"
                              }`}
                            onClick={() => setCurrentLessonIndex(globalLessonIndex)}
                          >
                            <div className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center">
                                {lesson.isCompleted ? (
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                ) : (
                                  <>
                                    {lesson.type === "video" && (
                                      <PlayCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                                    )}
                                    {lesson.type === "text" && (
                                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                    )}
                                    {lesson.type === "quiz" && (
                                      <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                                    )}
                                    {lesson.type === "assignment" && (
                                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                    )}
                                  </>
                                )}
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className="aspect-video bg-black relative">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="ghost" className="text-white">
                <PlayCircle className="h-20 w-20" />
              </Button>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>
                      Lesson {currentLessonIndex + 1} of {allLessons.length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousLesson}
                    disabled={currentLessonIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === allLessons.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="py-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <h2>Lesson Overview</h2>
                    <p>
                      In this lesson, we'll cover the fundamentals of {currentLesson.title}. This is an important
                      concept that will serve as a foundation for more advanced topics later in the course.
                    </p>

                    <h3>Key Points</h3>
                    <ul>
                      <li>Understanding the basic principles</li>
                      <li>How to apply these concepts in real-world scenarios</li>
                      <li>Common pitfalls and how to avoid them</li>
                      <li>Best practices for implementation</li>
                    </ul>

                    <h3>Detailed Explanation</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                      ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget
                      aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </p>
                    <p>
                      Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis
                      nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                      ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </p>

                    <h3>Practical Example</h3>
                    <p>Let's look at a practical example of how to apply these concepts:</p>
                    <pre>
                      <code>{`function example() {
  // This is a sample code block
  const result = performOperation();
  return result;
}

// Usage
const output = example();
console.log(output);`}</code>
                    </pre>

                    <h3>Summary</h3>
                    <p>
                      In this lesson, we've covered the fundamentals of {currentLesson.title}. You should now have a
                      good understanding of the basic principles and how to apply them in practice.
                    </p>

                    <div className="flex items-center mt-8 p-4 bg-muted rounded-lg">
                      <Checkbox id="mark-complete" className="mr-2" />
                      <label htmlFor="mark-complete" className="text-sm font-medium cursor-pointer">
                        Mark as completed
                      </label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="py-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">Discussion</h2>

                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="space-y-4">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="mt-1">{comment.text}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-10 pl-6 border-l space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                    <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{reply.user.name}</span>
                                      {reply.user.isInstructor && (
                                        <Badge variant="outline" className="text-xs">
                                          Instructor
                                        </Badge>
                                      )}
                                      <span className="text-xs text-muted-foreground">{reply.time}</span>
                                    </div>
                                    <p className="mt-1">{reply.text}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <Button variant="ghost" size="sm" className="h-6 px-2">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        {reply.likes}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmitComment} className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Add a Comment</h3>
                      <Textarea
                        placeholder="Share your thoughts or ask a question..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={!comment.trim()}>
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="py-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">My Notes</h2>

                    <Textarea placeholder="Take notes for this lesson..." className="min-h-[300px]" />

                    <div className="flex justify-end">
                      <Button>Save Notes</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="py-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">Resources</h2>

                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">Lesson Slides</p>
                              <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">Code Examples</p>
                              <p className="text-sm text-muted-foreground">ZIP, 1.8 MB</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">Additional Reading</p>
                              <p className="text-sm text-muted-foreground">External Link</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              Visit
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

