"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Plus,
  BookmarkPlus,
  Share2,
  Building,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Zap,
  Globe,
  MessageSquare,
  RefreshCw,
  Pencil,
  Users,
} from "lucide-react"

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [showFilters, setShowFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState([50])

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <p className="text-muted-foreground">Find your next opportunity or post a job</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Saved Jobs
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>
      </div>

      <Tabs defaultValue="browse" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-[600px]">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search jobs by title, company, or keywords..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter Jobs</CardTitle>
                <CardDescription>Refine your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <div className="space-y-2">
                        {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={`job-type-${type.toLowerCase()}`} />
                            <Label htmlFor={`job-type-${type.toLowerCase()}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <div className="space-y-2">
                        {["Entry Level", "Mid Level", "Senior", "Lead", "Manager"].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox id={`exp-level-${level.toLowerCase().replace(" ", "-")}`} />
                            <Label htmlFor={`exp-level-${level.toLowerCase().replace(" ", "-")}`}>{level}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Salary Range (${salaryRange}k+)</Label>
                      <Slider defaultValue={[50]} max={200} step={10} onValueChange={setSalaryRange} />
                    </div>

                    <div className="space-y-2">
                      <Label>Posted Within</Label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="day">Past 24 hours</SelectItem>
                          <SelectItem value="week">Past week</SelectItem>
                          <SelectItem value="month">Past month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "React", "Node.js", "Python", "AWS", "DevOps"].map((skill) => (
                          <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-primary/10">
                            {skill}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="easy-apply" />
                        <Label htmlFor="easy-apply">Easy Apply Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="remote-only" />
                        <Label htmlFor="remote-only">Remote Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="include-salary" />
                        <Label htmlFor="include-salary">Salary Disclosed Only</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset Filters</Button>
                <Button>Apply Filters</Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                logo: "/placeholder.svg?height=60&width=60",
                location: "San Francisco, CA (Remote Option)",
                type: "Full-time",
                salary: "$120k - $150k",
                posted: "2 days ago",
                skills: ["React", "TypeScript", "Redux", "CSS-in-JS"],
                description:
                  "We're looking for a Senior Frontend Developer to join our team and help build our next-generation web applications. You'll be working with a team of experienced developers to create responsive and performant user interfaces.",
                easyApply: true,
              },
              {
                title: "DevOps Engineer",
                company: "CloudSystems",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Remote",
                type: "Full-time",
                salary: "$130k - $160k",
                posted: "1 week ago",
                skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
                description:
                  "Join our DevOps team to build and maintain our cloud infrastructure. You'll be responsible for automating deployment processes, managing our Kubernetes clusters, and ensuring high availability of our services.",
                easyApply: false,
              },
              {
                title: "Data Scientist",
                company: "DataInsights",
                logo: "/placeholder.svg?height=60&width=60",
                location: "New York, NY (Hybrid)",
                type: "Full-time",
                salary: "$110k - $140k",
                posted: "3 days ago",
                skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
                description:
                  "We're seeking a Data Scientist to help us extract insights from our data. You'll work with large datasets, build predictive models, and communicate findings to stakeholders.",
                easyApply: true,
              },
              {
                title: "Full Stack Developer",
                company: "WebSolutions",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Chicago, IL (On-site)",
                type: "Full-time",
                salary: "$100k - $130k",
                posted: "5 days ago",
                skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
                description:
                  "Join our team as a Full Stack Developer to build and maintain web applications. You'll be involved in all aspects of development, from database design to frontend implementation.",
                easyApply: true,
              },
              {
                title: "UX/UI Designer",
                company: "DesignStudio",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Remote",
                type: "Contract",
                salary: "$80k - $100k",
                posted: "1 day ago",
                skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
                description:
                  "We're looking for a UX/UI Designer to create beautiful and intuitive user interfaces. You'll work closely with our product team to understand user needs and translate them into effective designs.",
                easyApply: false,
              },
            ].map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="rounded-md">{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 my-3">
                        {job.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{job.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-muted/50 p-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {job.posted}</span>
                      {job.easyApply && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          <Zap className="h-3 w-3 mr-1" />
                          Easy Apply
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm">
                        {job.easyApply ? (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Easy Apply
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Apply
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Jobs</Button>
          </div>
        </TabsContent>

        <TabsContent value="applied" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                logo: "/placeholder.svg?height=60&width=60",
                location: "San Francisco, CA",
                type: "Full-time",
                salary: "$120k - $150k",
                applied: "2 weeks ago",
                status: "Application Review",
                statusColor: "blue",
              },
              {
                title: "Full Stack Engineer",
                company: "WebSolutions",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Remote",
                type: "Full-time",
                salary: "$100k - $130k",
                applied: "1 month ago",
                status: "Interview Scheduled",
                statusColor: "green",
              },
              {
                title: "DevOps Specialist",
                company: "CloudSystems",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Chicago, IL (Hybrid)",
                type: "Contract",
                salary: "$130k - $160k",
                applied: "3 weeks ago",
                status: "Technical Assessment",
                statusColor: "amber",
              },
            ].map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="rounded-md">{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Applied {job.applied}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                            ${job.statusColor === "green" ? "bg-green-50 text-green-700 border-green-200" : ""}
                            ${job.statusColor === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                            ${job.statusColor === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                          `}
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-muted/50 p-4 border-t">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Briefcase className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No applications yet</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                You haven't applied to any jobs yet. Start browsing and applying to find your next opportunity.
              </p>
              <Button onClick={() => setActiveTab("browse")}>Browse Jobs</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="post" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post a Job</CardTitle>
              <CardDescription>Reach thousands of qualified IT professionals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g., Senior Frontend Developer" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Company Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input id="company-website" placeholder="https://yourcompany.com" className="rounded-l-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select>
                    <SelectTrigger id="experience-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-type">Location Type</Label>
                  <Select>
                    <SelectTrigger id="location-type">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., San Francisco, CA (Remote Option)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary-min">Salary Range</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <Input id="salary-min" placeholder="Min" className="rounded-l-none rounded-r-none w-24" />
                    </div>
                    <span>to</span>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <Input id="salary-max" placeholder="Max" className="rounded-l-none w-24" />
                    </div>
                    <Select defaultValue="yearly">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearly">per year</SelectItem>
                        <SelectItem value="monthly">per month</SelectItem>
                        <SelectItem value="hourly">per hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application-deadline">Application Deadline</Label>
                  <Input id="application-deadline" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="required-skills">Required Skills</Label>
                <Input id="required-skills" placeholder="Add skills separated by commas (e.g., React, Node.js, AWS)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description</Label>
                <textarea
                  id="job-description"
                  className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application-instructions">Application Instructions</Label>
                <textarea
                  id="application-instructions"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Provide instructions for applicants..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="easy-apply-option" />
                  <Label htmlFor="easy-apply-option">Enable Easy Apply</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow candidates to apply directly through DevConnect with their profile information.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Post Job</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-listings" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Frontend Developer",
                company: "Your Company",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Remote",
                type: "Full-time",
                salary: "$80k - $100k",
                posted: "2 weeks ago",
                expires: "in 2 weeks",
                applicants: 24,
                views: 156,
                status: "Active",
              },
              {
                title: "Backend Engineer",
                company: "Your Company",
                logo: "/placeholder.svg?height=60&width=60",
                location: "New York, NY (Hybrid)",
                type: "Full-time",
                salary: "$90k - $110k",
                posted: "1 month ago",
                expires: "in 2 days",
                applicants: 18,
                views: 132,
                status: "Active",
              },
              {
                title: "UI/UX Designer",
                company: "Your Company",
                logo: "/placeholder.svg?height=60&width=60",
                location: "Remote",
                type: "Contract",
                salary: "$70k - $90k",
                posted: "2 months ago",
                expires: "Expired",
                applicants: 12,
                views: 98,
                status: "Expired",
              },
            ].map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="rounded-md">{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            job.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 my-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {job.salary}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Posted</p>
                          <p className="font-medium">{job.posted}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p className="font-medium">{job.expires}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Applicants</p>
                          <p className="font-medium">{job.applicants}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-medium">{job.views}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-muted/50 p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      {job.status === "Expired" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Renew
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        View Applicants
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Briefcase className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No job listings yet</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                You haven't posted any job listings yet. Create your first job posting to find the perfect candidates.
              </p>
              <Button onClick={() => setActiveTab("post")}>Post a Job</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

