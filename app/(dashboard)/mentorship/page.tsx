"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  Users,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Info,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState("find-mentor")

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Program</h1>
          <p className="text-muted-foreground">Connect with mentors and mentees to grow together</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Become a Mentor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="find-mentor" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-[600px]">
          <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
          <TabsTrigger value="become-mentor">Become a Mentor</TabsTrigger>
          <TabsTrigger value="my-mentorships">My Mentorships</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentor" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search mentors by name, skills, or expertise..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.9,
                reviews: 28,
                mentees: 12,
                experience: "8+ years",
                skills: ["React", "TypeScript", "UI/UX", "Performance Optimization"],
                availability: "2-3 hours/week",
                price: "Free",
                verified: true,
              },
              {
                name: "Michael Chen",
                role: "DevOps Engineer",
                company: "CloudSystems",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.8,
                reviews: 34,
                mentees: 15,
                experience: "10+ years",
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
                availability: "4-5 hours/week",
                price: "$50/hour",
                verified: true,
              },
              {
                name: "Emily Rodriguez",
                role: "Data Scientist",
                company: "DataInsights",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.7,
                reviews: 22,
                mentees: 8,
                experience: "6+ years",
                skills: ["Python", "Machine Learning", "Data Visualization", "Statistical Analysis"],
                availability: "3-4 hours/week",
                price: "$45/hour",
                verified: true,
              },
              {
                name: "David Kim",
                role: "Full Stack Developer",
                company: "WebSolutions",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.9,
                reviews: 41,
                mentees: 20,
                experience: "12+ years",
                skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
                availability: "5-6 hours/week",
                price: "$60/hour",
                verified: true,
              },
              {
                name: "Jessica Patel",
                role: "UX/UI Designer",
                company: "DesignStudio",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.8,
                reviews: 19,
                mentees: 10,
                experience: "7+ years",
                skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
                availability: "2-3 hours/week",
                price: "$55/hour",
                verified: true,
              },
              {
                name: "Robert Wilson",
                role: "Mobile App Developer",
                company: "AppWorks",
                avatar: "/placeholder.svg?height=100&width=100",
                rating: 4.6,
                reviews: 15,
                mentees: 7,
                experience: "5+ years",
                skills: ["Flutter", "React Native", "iOS", "Android", "Mobile UI"],
                availability: "3-4 hours/week",
                price: "$40/hour",
                verified: false,
              },
            ].map((mentor, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{mentor.name}</CardTitle>
                          {mentor.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{mentor.role}</CardDescription>
                        <CardDescription>{mentor.company}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span>
                        {mentor.rating} ({mentor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-500" />
                      <span>{mentor.mentees} mentees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-emerald-500" />
                      <span>{mentor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{mentor.availability}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="font-medium">
                      {mentor.price === "Free" ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>{mentor.price}</span>
                      )}
                    </div>
                    <Button>Request Mentorship</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Mentors</Button>
          </div>
        </TabsContent>

        <TabsContent value="become-mentor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Become a Mentor</CardTitle>
              <CardDescription>Share your expertise and help others grow in their careers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mentor-expertise">Areas of Expertise</Label>
                <Select>
                  <SelectTrigger id="mentor-expertise">
                    <SelectValue placeholder="Select your primary expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="fullstack">Full Stack Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    <SelectItem value="product-management">Product Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-skills">Skills & Technologies</Label>
                <Input id="mentor-skills" placeholder="Add skills separated by commas (e.g., React, Node.js, AWS)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-experience">Years of Experience</Label>
                <Select>
                  <SelectTrigger id="mentor-experience">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-bio">Bio</Label>
                <Textarea
                  id="mentor-bio"
                  placeholder="Tell potential mentees about yourself, your experience, and your mentoring style"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-expectations">What Mentees Can Expect</Label>
                <Textarea
                  id="mentor-expectations"
                  placeholder="Describe what mentees can expect from your mentorship"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor-availability">Weekly Availability</Label>
                  <Select>
                    <SelectTrigger id="mentor-availability">
                      <SelectValue placeholder="Select hours per week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 hours</SelectItem>
                      <SelectItem value="2-4">2-4 hours</SelectItem>
                      <SelectItem value="4-6">4-6 hours</SelectItem>
                      <SelectItem value="6+">6+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentor-price">Pricing</Label>
                  <Select>
                    <SelectTrigger id="mentor-price">
                      <SelectValue placeholder="Select pricing option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="25">$25/hour</SelectItem>
                      <SelectItem value="50">$50/hour</SelectItem>
                      <SelectItem value="75">$75/hour</SelectItem>
                      <SelectItem value="100">$100/hour</SelectItem>
                      <SelectItem value="custom">Custom pricing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="mentor-terms" />
                <Label htmlFor="mentor-terms">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Mentorship Terms & Conditions
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Application</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-mentorships" className="space-y-6">
          <Tabs defaultValue="as-mentee">
            <TabsList>
              <TabsTrigger value="as-mentee">As Mentee</TabsTrigger>
              <TabsTrigger value="as-mentor">As Mentor</TabsTrigger>
            </TabsList>

            <TabsContent value="as-mentee" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    mentor: "David Kim",
                    role: "Full Stack Developer",
                    avatar: "/placeholder.svg?height=100&width=100",
                    startDate: "March 15, 2025",
                    nextSession: "April 10, 2025, 3:00 PM",
                    progress: 65,
                    goals: ["Master React Hooks", "Build a full-stack application", "Improve code quality"],
                    completedGoals: 2,
                    totalGoals: 3,
                  },
                  {
                    mentor: "Jessica Patel",
                    role: "UX/UI Designer",
                    avatar: "/placeholder.svg?height=100&width=100",
                    startDate: "February 20, 2025",
                    nextSession: "April 8, 2025, 2:00 PM",
                    progress: 40,
                    goals: ["Learn Figma advanced features", "Create a design system", "Conduct user research"],
                    completedGoals: 1,
                    totalGoals: 3,
                  },
                ].map((mentorship, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={mentorship.avatar} alt={mentorship.mentor} />
                            <AvatarFallback>{mentorship.mentor.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{mentorship.mentor}</CardTitle>
                            <CardDescription>{mentorship.role}</CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Started</p>
                          <p className="font-medium">{mentorship.startDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Session</p>
                          <p className="font-medium">{mentorship.nextSession}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{mentorship.progress}%</span>
                        </div>
                        <Progress value={mentorship.progress} className="h-2" />
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">
                          Goals ({mentorship.completedGoals}/{mentorship.totalGoals})
                        </p>
                        <ul className="space-y-1">
                          {mentorship.goals.map((goal, i) => (
                            <li key={i} className="flex items-center text-sm">
                              {i < mentorship.completedGoals ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-muted-foreground mr-2" />
                              )}
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Find More Mentors</Button>
              </div>
            </TabsContent>

            <TabsContent value="as-mentor" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>You're not a mentor yet</CardTitle>
                  <CardDescription>Share your knowledge and help others grow by becoming a mentor</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-6">
                  <div className="mb-6 p-6 bg-muted rounded-full">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-center max-w-md mb-6">
                    As a mentor, you'll have the opportunity to guide others, share your expertise, and make a positive
                    impact on someone's career journey.
                  </p>
                  <Button onClick={() => setActiveTab("become-mentor")}>Become a Mentor</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Guides</CardTitle>
                <CardDescription>Resources to help you get the most out of mentorship</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Link href="#" className="flex items-center text-primary hover:underline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    How to Find the Right Mentor
                  </Link>
                  <Link href="#" className="flex items-center text-primary hover:underline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Setting Effective Mentorship Goals
                  </Link>
                  <Link href="#" className="flex items-center text-primary hover:underline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Making the Most of Mentorship Sessions
                  </Link>
                  <Link href="#" className="flex items-center text-primary hover:underline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Giving and Receiving Feedback
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Guides
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Workshops</CardTitle>
                <CardDescription>Free workshops to enhance your mentorship experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Effective Communication in Mentorship</p>
                    <p className="text-sm text-muted-foreground mb-2">April 15, 2025 • 2:00 PM</p>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="font-medium">Career Growth Strategies</p>
                    <p className="text-sm text-muted-foreground mb-2">April 22, 2025 • 3:00 PM</p>
                    <Badge variant="outline">Free</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Workshops
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Real stories from our mentorship community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">From Junior to Senior in 18 Months</p>
                      <p className="text-sm text-muted-foreground">John Doe, Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">How Mentorship Helped Me Switch Careers</p>
                      <p className="text-sm text-muted-foreground">Alice Smith, UX Designer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read More Stories
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mentorship FAQ</CardTitle>
              <CardDescription>Common questions about our mentorship program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    How does the mentorship program work?
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Our mentorship program connects mentees with experienced professionals in their field. You can
                    browse mentors, request mentorship, and schedule sessions based on mutual availability.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    Is mentorship free?
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Some mentors offer free sessions, while others charge for their time. Each mentor sets their own
                    rates, which are clearly displayed on their profile.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    How long does a mentorship last?
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Mentorships can be short-term (a few sessions) or long-term (several months), depending on your
                    goals and the agreement with your mentor.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    Can I be both a mentor and a mentee?
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Yes! Many professionals on our platform both receive mentorship in areas they're growing in and
                    provide mentorship in their areas of expertise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

