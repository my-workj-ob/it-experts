"use client"

import { MentorshipRequestModal } from "@/components/mentor-ship-request-moda"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import { get } from "lodash"
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Info,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react"
import Link from "next/link"
import {
  type JSXElementConstructor,
  type Key,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
  useEffect, useState
} from "react"

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState("find-mentor")
  const { userProfileData } = useProfile()
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    skills: [],
    experienceYears: 5,
    hourlyRate: 50,
    expertise: "",
    bio: "",
    expectations: "",
    weeklyAvailability: 10,
    pricingOption: "Hourly",
    termsAgreed: false,
    userId: get(userProfileData, 'id'), // Assuming current user ID is 1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // State for mentorship request modal
  const [requestModalOpen, setRequestModalOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState({ id: 0, name: "" })

  // Fetch mentors using axios
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true)
      setError("")

      try {
        const response = await axiosInstance.get("/mentors")
        setMentors(response.data)
      } catch (err) {
        console.error("Error fetching mentors:", err)
        setError("Failed to load mentors. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSkillsChange = (e: { target: { value: string } }) => {
    const skillsArray = e.target.value.split(",").map((skill: string) => skill.trim())

    setFormData({
      ...formData,
      skills: skillsArray,
    })
  }

  const handleSubmit = async () => {
    // Reset states
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError("")

    try {
      // Use the correct API endpoint as shown in the image
      await axiosInstance.post("/mentors", {
        title: formData.title || "Senior Developer",
        company: formData.company || "TechCorp",
        skills: formData.skills.length > 0 ? formData.skills : ["React", "Node.js"],
        experienceYears: formData.experienceYears,
        hourlyRate: formData.hourlyRate,
        expertise: formData.expertise || "Frontend Development",
        bio: formData.bio || "Senior frontend dev",
        expectations: formData.expectations || "Looking for JS mentees",
        weeklyAvailability: formData.weeklyAvailability,
        pricingOption: formData.pricingOption,
        termsAgreed: formData.termsAgreed,
        userId: formData.userId || get(userProfileData, 'id'),
      })

      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error submitting mentor data:", error)
      setSubmitError(error.response?.data?.message || "Failed to submit mentor data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to open the request modal with the selected mentor
  const openRequestModal = (mentor) => {
    setSelectedMentor({
      id: mentor.id,
      name: mentor?.user?.profile?.firstName || "this mentor",
    })
    setRequestModalOpen(true)
  }

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
          <Button variant="outline" asChild>
            <Link href="/mentorship/requests">
              <MessageSquare className="h-4 w-4 mr-2" />
              View Requests
              <Badge variant="secondary" className="ml-2">
                3
              </Badge>
            </Link>
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

          {loading ? (
            <div className="text-center py-8">Loading mentors...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <Card key={mentor.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentor?.user?.profile?.avatar} alt={mentor?.user?.profile?.firstName} />
                            <AvatarFallback>{(mentor?.user?.profile?.firstName, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{mentor?.user?.profile?.firstName}</CardTitle>
                              {mentor.verified ? (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  not verified
                                </Badge>
                              )}
                            </div>
                            <CardDescription>{mentor.title}</CardDescription>
                            <CardDescription>{mentor.company}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills &&
                          mentor.skills.map(
                            (
                              skill:
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactElement<unknown, string | JSXElementConstructor<any>>
                                | Iterable<ReactNode>
                                | ReactPortal
                                | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                                | null
                                | undefined,
                              i: Key | null | undefined,
                            ) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ),
                          )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-emerald-500" />
                          <span>{mentor.experienceYears}+ years</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <span>{mentor.weeklyAvailability} hours/week</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Expertise</p>
                        <p className="text-sm">{mentor.expertise}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Bio</p>
                        <p className="text-sm">{mentor.bio}</p>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="font-medium">
                          {mentor.hourlyRate === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            <span>${mentor.hourlyRate}/hour</span>
                          )}
                        </div>
                        <Button onClick={() => openRequestModal(mentor)}>Request Mentorship</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">No mentors found</div>
              )}
            </div>
          )}

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
              {submitError && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{submitError}</div>}

              <div className="space-y-2">
                <Label htmlFor="mentor-title">Professional Title</Label>
                <Input
                  id="mentor-title"
                  placeholder="Senior Developer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-company">Company</Label>
                <Input
                  id="mentor-company"
                  placeholder="TechCorp"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-expertise">Areas of Expertise</Label>
                <Select onValueChange={(value) => handleInputChange("expertise", value)}>
                  <SelectTrigger id="mentor-expertise">
                    <SelectValue placeholder="Select your primary expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Backend Development">Backend Development</SelectItem>
                    <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Product Management">Product Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-skills">Skills & Technologies</Label>
                <Input
                  id="mentor-skills"
                  placeholder="Add skills separated by commas (e.g., React, Node.js, AWS)"
                  onChange={handleSkillsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-experience">Years of Experience</Label>
                <Select onValueChange={(value) => handleInputChange("experienceYears", Number.parseInt(value))}>
                  <SelectTrigger id="mentor-experience">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1-3 years</SelectItem>
                    <SelectItem value="5">3-5 years</SelectItem>
                    <SelectItem value="8">5-10 years</SelectItem>
                    <SelectItem value="12">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-bio">Bio</Label>
                <Textarea
                  id="mentor-bio"
                  placeholder="Tell potential mentees about yourself, your experience, and your mentoring style"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor-expectations">What Mentees Can Expect</Label>
                <Textarea
                  id="mentor-expectations"
                  placeholder="Describe what mentees can expect from your mentorship"
                  rows={3}
                  value={formData.expectations}
                  onChange={(e) => handleInputChange("expectations", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor-availability">Weekly Availability (hours)</Label>
                  <Select onValueChange={(value) => handleInputChange("weeklyAvailability", Number.parseInt(value))}>
                    <SelectTrigger id="mentor-availability">
                      <SelectValue placeholder="Select hours per week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">1-2 hours</SelectItem>
                      <SelectItem value="4">2-4 hours</SelectItem>
                      <SelectItem value="6">4-6 hours</SelectItem>
                      <SelectItem value="10">6+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentor-price">Pricing</Label>
                  <Select
                    onValueChange={(value) => {
                      handleInputChange("pricingOption", "Hourly")
                      handleInputChange("hourlyRate", Number.parseInt(value))
                    }}
                  >
                    <SelectTrigger id="mentor-price">
                      <SelectValue placeholder="Select pricing option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Free</SelectItem>
                      <SelectItem value="25">$25/hour</SelectItem>
                      <SelectItem value="50">$50/hour</SelectItem>
                      <SelectItem value="75">$75/hour</SelectItem>
                      <SelectItem value="100">$100/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="mentor-terms"
                  checked={formData.termsAgreed}
                  onCheckedChange={(checked) => handleInputChange("termsAgreed", checked)}
                />
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
              <Button onClick={handleSubmit} disabled={isSubmitting || !formData.termsAgreed}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </Card>
          {submitSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Your mentor application has been submitted successfully!
            </div>
          )}
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

      {/* Mentorship Request Modal */}
      <MentorshipRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        mentorId={selectedMentor.id}
        mentorName={selectedMentor.name}
      />
    </div>
  )
}

