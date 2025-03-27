"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  Globe,
  BarChart,
  PlayCircle,
  FileText,
  Download,
  MessageSquare,
  ThumbsUp,
  Share2,
  ShoppingCart,
  CheckCircle,
} from "lucide-react"
import { popularCourses } from "@/lib/data"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Find the course by ID
  const course = popularCourses.find((c) => c.id === params.id) || popularCourses[0]

  // Mock course curriculum data
  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        { title: "Introduction to the Course", duration: "5:20", type: "video", isPreview: true },
        { title: "Course Overview", duration: "8:15", type: "video", isPreview: true },
        { title: "Setting Up Your Environment", duration: "12:40", type: "video" },
        { title: "Course Resources", duration: "3:50", type: "text" },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Understanding the Basics", duration: "15:30", type: "video" },
        { title: "Key Principles", duration: "18:45", type: "video" },
        { title: "Practical Examples", duration: "22:10", type: "video" },
        { title: "Quiz: Core Concepts", duration: "10:00", type: "quiz" },
      ],
    },
    {
      title: "Advanced Techniques",
      lessons: [
        { title: "Advanced Strategy 1", duration: "20:15", type: "video" },
        { title: "Advanced Strategy 2", duration: "17:30", type: "video" },
        { title: "Case Study", duration: "25:40", type: "video" },
        { title: "Practical Assignment", duration: "30:00", type: "assignment" },
      ],
    },
    {
      title: "Final Project",
      lessons: [
        { title: "Project Overview", duration: "10:20", type: "video" },
        { title: "Step-by-Step Implementation", duration: "45:30", type: "video" },
        { title: "Troubleshooting Common Issues", duration: "15:45", type: "video" },
        { title: "Final Project Submission", duration: "N/A", type: "assignment" },
      ],
    },
  ]

  // Calculate total course duration
  const totalMinutes = curriculum.reduce((total, section) => {
    return (
      total +
      section.lessons.reduce((sectionTotal, lesson) => {
        if (lesson.duration !== "N/A") {
          const [minutes, seconds] = lesson.duration.split(":").map(Number)
          return sectionTotal + minutes + seconds / 60
        }
        return sectionTotal
      }, 0)
    )
  }, 0)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  // Calculate total lessons
  const totalLessons = curriculum.reduce((total, section) => {
    return total + section.lessons.length
  }, 0)

  return (
    <div className="container mx-auto py-8">
      {/* Course Header */}
      <div className="bg-muted/30 py-8 px-4 rounded-lg mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">{course.category}</Badge>
                  {course.isBestseller && (
                    <Badge className="bg-yellow-500 text-white border-yellow-500">Bestseller</Badge>
                  )}
                  {course.isNew && <Badge className="bg-green-500 text-white border-green-500">New</Badge>}
                  <Badge variant="outline">{course.level}</Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>

                <p className="text-lg text-muted-foreground">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500 mr-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-current"
                            fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                    <span className="font-medium ml-1">{course.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">({course.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>
                      {hours}h {minutes}m total length
                    </span>
                  </div>

                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>{totalLessons} lessons</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>
                    Created by{" "}
                    <Link
                      href={`/instructors/${course.instructor.name.toLowerCase().replace(" ", "-")}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {course.instructor.name}
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-card border rounded-lg overflow-hidden sticky top-20">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors">
                    <Button variant="ghost" className="text-white">
                      <PlayCircle className="h-16 w-16" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-primary text-white">Preview</Badge>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">${course.price.toFixed(2)}</div>
                    {course.originalPrice && (
                      <div className="text-xl text-muted-foreground line-through">
                        ${course.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {course.originalPrice && (
                    <div className="text-sm text-muted-foreground">
                      <span className="text-red-500 font-medium">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                      </span>{" "}
                      • 2 days left at this price!
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full">
                      Buy Now
                    </Button>
                  </div>

                  <div className="text-sm text-center text-muted-foreground">30-Day Money-Back Guarantee</div>

                  <div className="space-y-4">
                    <h3 className="font-medium">This course includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <PlayCircle className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{hours} hours on-demand video</span>
                      </li>
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>25 articles and resources</span>
                      </li>
                      <li className="flex items-start">
                        <Download className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>15 downloadable resources</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-start">
                        <Smartphone className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Access on mobile and TV</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Gift className="h-4 w-4 mr-2" />
                      Gift
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 py-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Build professional web applications with HTML, CSS, and JavaScript",
                      "Create responsive and dynamic user interfaces with React",
                      "Develop backend APIs with Node.js and Express",
                      "Work with databases like MongoDB and MySQL",
                      "Implement authentication and authorization",
                      "Deploy your applications to production",
                      "Write clean, maintainable, and efficient code",
                      "Apply best practices and design patterns",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                  <div className="space-y-4">
                    <p>
                      This comprehensive course is designed to take you from beginner to professional in web
                      development. Whether you're just starting out or looking to enhance your skills, this course
                      covers everything you need to know to build modern, responsive, and dynamic web applications.
                    </p>
                    <p>
                      You'll start with the fundamentals of HTML, CSS, and JavaScript, and then progress to more
                      advanced topics like React for frontend development, Node.js for backend development, and working
                      with databases. By the end of the course, you'll have built several real-world projects that you
                      can add to your portfolio.
                    </p>
                    <p>
                      The course is constantly updated to ensure you're learning the latest technologies and best
                      practices in the industry. You'll also have access to a supportive community of fellow students
                      and instructors to help you along the way.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Basic computer skills and familiarity with using the internet</li>
                    <li>No prior programming experience required - we'll start from the basics</li>
                    <li>A computer with internet access (Windows, Mac, or Linux)</li>
                    <li>Enthusiasm and willingness to learn!</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Who this course is for</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Beginners with no prior programming experience</li>
                    <li>Students looking to build a career in web development</li>
                    <li>Professionals transitioning to a career in tech</li>
                    <li>Experienced developers looking to refresh their skills</li>
                    <li>Anyone interested in learning how to build web applications</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="py-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <div className="text-sm text-muted-foreground">
                      {curriculum.length} sections • {totalLessons} lectures • {hours}h {minutes}m total length
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {curriculum.map((section, sectionIndex) => (
                      <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex justify-between w-full pr-4">
                            <span className="font-medium">{section.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {section.lessons.length} lectures •{(() => {
                                const sectionMinutes = section.lessons.reduce((total, lesson) => {
                                  if (lesson.duration !== "N/A") {
                                    const [minutes, seconds] = lesson.duration.split(":").map(Number)
                                    return total + minutes + seconds / 60
                                  }
                                  return total
                                }, 0)
                                const sectionHours = Math.floor(sectionMinutes / 60)
                                const remainingMinutes = Math.round(sectionMinutes % 60)
                                return sectionHours > 0
                                  ? ` ${sectionHours}h ${remainingMinutes}m`
                                  : ` ${remainingMinutes}m`
                              })()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="py-2 px-2 hover:bg-muted/50 rounded-md">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
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
                                    <span>{lesson.title}</span>
                                    {lesson.isPreview && (
                                      <Badge variant="outline" className="ml-2">
                                        Preview
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="py-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{course.instructor.name}</h2>
                      <p className="text-muted-foreground">Senior Web Developer & Instructor</p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">4.8 Instructor Rating</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">2,347 Reviews</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">42,589 Students</span>
                        </div>
                        <div className="flex items-center">
                          <PlayCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">12 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p>
                      John Smith is a senior web developer with over 10 years of experience in the industry. He has
                      worked with numerous startups and Fortune 500 companies, helping them build scalable and
                      maintainable web applications.
                    </p>
                    <p>
                      As an instructor, John has taught over 40,000 students worldwide, sharing his knowledge and
                      expertise in web development. His teaching style is practical and hands-on, focusing on real-world
                      applications rather than just theory.
                    </p>
                    <p>
                      John is passionate about helping others learn and grow in their careers. He regularly updates his
                      courses to ensure they reflect the latest technologies and best practices in the industry.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="py-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 space-y-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold">{course.rating.toFixed(1)}</div>
                        <div className="flex items-center justify-center text-yellow-500 my-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-current"
                                fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                              />
                            ))}
                        </div>
                        <div className="text-muted-foreground">Course Rating</div>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          // Calculate percentage based on rating
                          const percentage =
                            rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1

                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex items-center">
                                <span className="text-sm">{rating}</span>
                                <Star className="h-4 w-4 text-yellow-500 ml-1" fill="currentColor" />
                              </div>
                              <Progress value={percentage} className="h-2 flex-1" />
                              <span className="text-sm text-muted-foreground">{percentage}%</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                      {[
                        {
                          name: "Alex Johnson",
                          avatar: "/placeholder.svg?height=40&width=40",
                          rating: 5,
                          date: "2 weeks ago",
                          content:
                            "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand, and the projects are practical and relevant. I've already started applying what I've learned in my job.",
                          helpful: 42,
                        },
                        {
                          name: "Sarah Williams",
                          avatar: "/placeholder.svg?height=40&width=40",
                          rating: 4,
                          date: "1 month ago",
                          content:
                            "Great course with lots of valuable information. The only reason I'm giving 4 stars instead of 5 is that some sections could use more examples. Otherwise, it's excellent and I've learned a lot.",
                          helpful: 28,
                        },
                        {
                          name: "Michael Chen",
                          avatar: "/placeholder.svg?height=40&width=40",
                          rating: 5,
                          date: "2 months ago",
                          content:
                            "As someone with no prior programming experience, I found this course to be the perfect starting point. The instructor breaks down complex topics into manageable chunks, and the hands-on projects really help reinforce the concepts.",
                          helpful: 35,
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b pb-6 last:border-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={review.avatar} alt={review.name} />
                                <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center text-yellow-500">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <Star
                                          key={i}
                                          className="h-4 w-4 fill-current"
                                          fill={i < review.rating ? "currentColor" : "none"}
                                        />
                                      ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 ml-13">
                            <p>{review.content}</p>

                            <div className="flex items-center gap-4 mt-3">
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8">
                                Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="text-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/3">
            {/* This space is intentionally left empty for desktop view 
                since the course purchase card is sticky in the header section */}
          </div>
        </div>
      </div>
    </div>
  )
}

function Smartphone({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  )
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function Gift({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

