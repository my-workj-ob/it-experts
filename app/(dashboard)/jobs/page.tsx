"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import axiosInstance from "@/lib/create-axios"
import {
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  LineChart,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Star,
  StarHalf,
  Trash2,
  Upload,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"

// API client setup


export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const [candidates, setCandidates] = useState([])
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    viewRate: 0,
    applicationRate: 0,
    topPerformingJob: null,
  })
  const [companyProfile, setCompanyProfile] = useState({
    name: "Tech Innovations Inc.",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://techinnovations.com",
    industry: "Information Technology",
    size: "51-200 employees",
    founded: "2015",
    headquarters: "San Francisco, CA",
    description: "We are a technology company focused on creating innovative solutions for businesses and consumers.",
    socialLinks: {
      linkedin: "https://linkedin.com/company/techinnovations",
      twitter: "https://twitter.com/techinnovations",
      facebook: "https://facebook.com/techinnovations",
    },
  })

  // New job form state
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    companyName: companyProfile.name,
    companyWebsite: companyProfile.website,
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    locationType: "Remote",
    location: "",
    salaryMin: 50000,
    salaryMax: 100000,
    salaryPeriod: "yearly",
    applicationDeadline: "",
    requiredSkills: [],
    jobDescription: "",
    applicationInstructions: "",
    enableEasyApply: true,
  })

  // Fetch employer's jobs
  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/jobs/me/listings")
      setJobs(response.data)

      // Update stats based on jobs
      if (response.data.length > 0) {
        const activeJobsCount = response.data.filter(
          (job) => job.applicationDeadline && new Date(job.applicationDeadline) > new Date(),
        ).length

        const totalApps = response.data.reduce((sum, job) => sum + (job.applicants || 0), 0)
        const totalViews = response.data.reduce((sum, job) => sum + (job.views || 0), 0)

        // Find top performing job (most applications)
        const topJob = [...response.data].sort((a, b) => (b.applicants || 0) - (a.applicants || 0))[0]

        setStats({
          activeJobs: activeJobsCount,
          totalApplications: totalApps,
          viewRate: totalViews > 0 ? Math.round((totalApps / totalViews) * 100) : 0,
          applicationRate: response.data.length > 0 ? Math.round(totalApps / response.data.length) : 0,
          topPerformingJob: topJob,
        })
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch your job listings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Create a new job
  const createJob = async () => {
    setLoading(true)
    try {
      // Format skills as array if it's a string
      const formattedJob = { ...newJob }
      if (typeof formattedJob.requiredSkills === "string") {
        formattedJob.requiredSkills = formattedJob.requiredSkills.split(",").map((skill) => skill.trim())
      }

      const response = await axiosInstance.post("/jobs", formattedJob)
      toast({
        title: "Success",
        description: "Job posted successfully!",
      })

      // Reset form
      setNewJob({
        jobTitle: "css",
        companyName: companyProfile.name,
        companyWebsite: companyProfile.website,
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        locationType: "Remote",
        location: "",
        salaryMin: 50000,
        salaryMax: 100000,
        salaryPeriod: "yearly",
        applicationDeadline: "",
        requiredSkills: [],
        jobDescription: "",
        applicationInstructions: "",
        enableEasyApply: true,
      })

      // Refresh jobs list
      fetchJobs()

      // Switch to jobs tab
      setActiveTab("jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: "Failed to post job. Please check your inputs and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Delete a job
  const deleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return

    setLoading(true)
    try {
      await axiosInstance.delete(`/jobs/${jobId}`)
      toast({
        title: "Success",
        description: "Job deleted successfully!",
      })
      fetchJobs()
    } catch (error) {
      console.error("Error deleting job:", error)
      toast({
        title: "Error",
        description: "Failed to delete job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Update a job
  const updateJob = async (jobId, updatedData) => {
    setLoading(true)
    try {
      await axiosInstance.put(`/jobs/${jobId}`, updatedData)
      toast({
        title: "Success",
        description: "Job updated successfully!",
      })
      fetchJobs()
    } catch (error) {
      console.error("Error updating job:", error)
      toast({
        title: "Error",
        description: "Failed to update job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewJob((prev) => ({
      ...prev,
      [id.replace("job-", "").replace("-", "")]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (id, value) => {
    setNewJob((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Format salary display
  const formatSalary = (min, max, period) => {
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}k`
      }
      return `${num}`
    }

    const periodMap = {
      yearly: "per year",
      monthly: "per month",
      hourly: "per hour",
    }

    return `${formatNumber(min)} - ${formatNumber(max)} ${periodMap[period] || ""}`
  }

  // Load data when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "jobs" || activeTab === "dashboard") {
      fetchJobs()
    }

    // Mock candidate data - in a real app, this would be fetched from an API
    if (activeTab === "candidates") {
      setCandidates([
        {
          id: 1,
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "alex.johnson@example.com",
          phone: "+1 (555) 123-4567",
          appliedFor: "Senior Frontend Developer",
          appliedDate: "2025-04-01",
          status: "Screening",
          resume: "#",
          skills: ["React", "TypeScript", "Node.js", "GraphQL"],
          experience: "5 years",
          education: "BS Computer Science, Stanford University",
          rating: 4.5,
          notes: "Strong technical skills, good cultural fit.",
        },
        {
          id: 2,
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "sarah.williams@example.com",
          phone: "+1 (555) 987-6543",
          appliedFor: "DevOps Engineer",
          appliedDate: "2025-04-03",
          status: "Interview",
          resume: "#",
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
          experience: "7 years",
          education: "MS Computer Engineering, MIT",
          rating: 5,
          notes: "Excellent experience with cloud infrastructure.",
        },
        {
          id: 3,
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "michael.chen@example.com",
          phone: "+1 (555) 456-7890",
          appliedFor: "Full Stack Developer",
          appliedDate: "2025-04-05",
          status: "Offer",
          resume: "#",
          skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
          experience: "3 years",
          education: "BS Software Engineering, UC Berkeley",
          rating: 4,
          notes: "Great problem-solving skills, enthusiastic about our mission.",
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "emily.rodriguez@example.com",
          phone: "+1 (555) 234-5678",
          appliedFor: "UX/UI Designer",
          appliedDate: "2025-04-02",
          status: "Rejected",
          resume: "#",
          skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
          experience: "4 years",
          education: "BFA Design, Rhode Island School of Design",
          rating: 3.5,
          notes: "Good portfolio but not enough experience with mobile design.",
        },
        {
          id: 5,
          name: "David Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "david.kim@example.com",
          phone: "+1 (555) 876-5432",
          appliedFor: "Data Scientist",
          appliedDate: "2025-04-04",
          status: "New",
          resume: "#",
          skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Visualization"],
          experience: "2 years",
          education: "MS Data Science, NYU",
          rating: 4,
          notes: "Promising candidate with strong analytical skills.",
        },
      ])
    }
  }, [activeTab])

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job listings and candidates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Company Profile
          </Button>
          <Button onClick={() => setActiveTab("post-job")}>
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="dashboard">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="jobs">
            <Briefcase className="h-4 w-4 mr-2" />
            Jobs
          </TabsTrigger>
          <TabsTrigger value="candidates">
            <Users className="h-4 w-4 mr-2" />
            Candidates
          </TabsTrigger>
          <TabsTrigger value="post-job">
            <Plus className="h-4 w-4 mr-2" />
            Post Job
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Building className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeJobs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.activeJobs > 0 ? "Jobs currently accepting applications" : "No active job listings"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.applicationRate > 0
                    ? `Average ${stats.applicationRate} applications per job`
                    : "No applications received yet"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">View to Apply Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.viewRate}%</div>
                <div className="mt-2">
                  <Progress value={stats.viewRate} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.viewRate > 0
                    ? `${stats.viewRate}% of viewers apply to your jobs`
                    : "Not enough data to calculate"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Performing Job</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topPerformingJob ? (
                  <>
                    <div className="font-medium line-clamp-1">{stats.topPerformingJob.jobTitle}</div>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{stats.topPerformingJob.applicants || 0} applicants</span>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">No job data available</div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Applications received over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Application trend data visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where your applicants come from</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="text-center mt-8">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Candidate source distribution would appear here</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm">Direct Applications</span>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Job Boards</span>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Referrals</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Social Media</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest candidates who applied to your jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.slice(0, 3).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.appliedFor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          candidate.status === "New"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : candidate.status === "Screening"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : candidate.status === "Interview"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : candidate.status === "Offer"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {candidate.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("candidates")}>
                View All Candidates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Input placeholder="Search jobs..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                        <div className="flex-shrink-0">
                          <Avatar className="h-16 w-16 rounded-md">
                            <AvatarImage
                              src={job.companyLogo || "/placeholder.svg?height=60&width=60"}
                              alt={job.companyName}
                            />
                            <AvatarFallback className="rounded-md bg-primary/10 text-primary font-bold">
                              {job.companyName?.substring(0, 2) || "JB"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                              <div className="flex items-center text-muted-foreground">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{job.companyName}</span>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                job.applicationDeadline && new Date(job.applicationDeadline) > new Date()
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {job.applicationDeadline && new Date(job.applicationDeadline) > new Date()
                                ? "Active"
                                : "Expired"}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 my-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location || "Remote"}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.jobType}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Posted</p>
                              <p className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Deadline</p>
                              <p className="font-medium">
                                {job.applicationDeadline
                                  ? new Date(job.applicationDeadline).toLocaleDateString()
                                  : "No deadline"}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Applicants</p>
                              <p className="font-medium">{job.applicants || 0}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Views</p>
                              <p className="font-medium">{job.views || 0}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-muted/50 p-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          {job.applicationDeadline && new Date(job.applicationDeadline) < new Date() && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Renew
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Set the form data for editing
                              setNewJob({
                                jobTitle: job.jobTitle,
                                companyName: job.companyName,
                                companyWebsite: job.companyWebsite,
                                jobType: job.jobType,
                                experienceLevel: job.experienceLevel,
                                locationType: job.locationType,
                                location: job.location,
                                salaryMin: job.salaryMin,
                                salaryMax: job.salaryMax,
                                salaryPeriod: job.salaryPeriod,
                                applicationDeadline: job.applicationDeadline?.split("T")[0],
                                requiredSkills: job.requiredSkills,
                                jobDescription: job.jobDescription,
                                applicationInstructions: job.applicationInstructions,
                                enableEasyApply: job.enableEasyApply,
                              })
                              setActiveTab("post-job")
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteJob(job.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                          <Button size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            View Applicants
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <Briefcase className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No job listings yet</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    You haven't posted any job listings yet. Create your first job posting to find the perfect
                    candidates.
                  </p>
                  <Button onClick={() => setActiveTab("post-job")}>Post a Job</Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Input placeholder="Search candidates..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Candidates</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{candidate.name}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="h-4 w-4 mr-1" />
                            <span>{candidate.email}</span>
                            <span className="mx-2">•</span>
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{candidate.phone}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            candidate.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : candidate.status === "Screening"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : candidate.status === "Interview"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : candidate.status === "Offer"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Applied for: {candidate.appliedFor}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Applied on {new Date(candidate.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 my-3">
                        {candidate.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: Math.floor(candidate.rating) }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        {candidate.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-current" />}
                        <span className="ml-1 text-sm font-medium">{candidate.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-muted/50 p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue={candidate.status.toLowerCase()}>
                        <SelectTrigger className="w-[140px] h-9">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="screening">Screening</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
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
        </TabsContent>

        {/* Post Job Tab */}
        <TabsContent value="post-job" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post a Job</CardTitle>
              <CardDescription>Reach thousands of qualified IT professionals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g., Senior Frontend Developer"
                  value={newJob.jobTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-companyName">Company Name</Label>
                  <Input
                    id="job-companyName"
                    placeholder="Your company name"
                    value={newJob.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-companyWebsite">Company Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input
                      id="job-companyWebsite"
                      placeholder="https://yourcompany.com"
                      className="rounded-l-none"
                      value={newJob.companyWebsite}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={newJob.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={newJob.experienceLevel}
                    onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                  >
                    <SelectTrigger id="experience-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry-level">Entry Level</SelectItem>
                      <SelectItem value="Mid-level">Mid Level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationType">Location Type</Label>
                  <Select
                    value={newJob.locationType}
                    onValueChange={(value) => handleSelectChange("locationType", value)}
                  >
                    <SelectTrigger id="location-type">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-location">Location</Label>
                <Input
                  id="job-location"
                  placeholder="e.g., San Francisco, CA (Remote Option)"
                  value={newJob.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary-min">Salary Range</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <Input
                        id="job-salaryMin"
                        placeholder="Min"
                        className="rounded-l-none rounded-r-none w-24"
                        type="number"
                        value={newJob.salaryMin}
                        onChange={handleInputChange}
                      />
                    </div>
                    <span>to</span>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <Input
                        id="job-salaryMax"
                        placeholder="Max"
                        className="rounded-l-none w-24"
                        type="number"
                        value={newJob.salaryMax}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Select
                      defaultValue="yearly"
                      value={newJob.salaryPeriod}
                      onValueChange={(value) => handleSelectChange("salaryPeriod", value)}
                    >
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
                  <Label htmlFor="job-applicationDeadline">Application Deadline</Label>
                  <Input
                    id="job-applicationDeadline"
                    type="date"
                    value={newJob.applicationDeadline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-requiredSkills">Required Skills</Label>
                <Input
                  id="job-requiredSkills"
                  placeholder="Add skills separated by commas (e.g., React, Node.js, AWS)"
                  value={
                    typeof newJob.requiredSkills === "string" ? newJob.requiredSkills : newJob.requiredSkills.join(", ")
                  }
                  onChange={(e) => {
                    setNewJob((prev) => ({
                      ...prev,
                      requiredSkills: e.target.value.split(",").map((skill) => skill.trim()),
                    }))
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-jobDescription">Job Description</Label>
                <Textarea
                  id="job-jobDescription"
                  className="min-h-[200px]"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={newJob.jobDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-applicationInstructions">Application Instructions</Label>
                <Textarea
                  id="job-applicationInstructions"
                  className="min-h-[100px]"
                  placeholder="Provide instructions for applicants..."
                  value={newJob.applicationInstructions}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="easy-apply-option"
                    checked={newJob.enableEasyApply}
                    onCheckedChange={(checked) => {
                      setNewJob((prev) => ({
                        ...prev,
                        enableEasyApply: checked,
                      }))
                    }}
                  />
                  <Label htmlFor="easy-apply-option">Enable Easy Apply</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow candidates to apply directly through DevConnect with their profile information.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={createJob} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Company Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Manage your company information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-32 w-32 rounded-md">
                    <AvatarImage src={companyProfile.logo || "/placeholder.svg"} alt={companyProfile.name} />
                    <AvatarFallback className="rounded-md text-2xl font-bold">
                      {companyProfile.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={companyProfile.name}
                      onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="company-website"
                        className="rounded-l-none"
                        value={companyProfile.website}
                        onChange={(e) => setCompanyProfile({ ...companyProfile, website: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-industry">Industry</Label>
                      <Select
                        value={companyProfile.industry}
                        onValueChange={(value) => setCompanyProfile({ ...companyProfile, industry: value })}
                      >
                        <SelectTrigger id="company-industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size</Label>
                      <Select
                        value={companyProfile.size}
                        onValueChange={(value) => setCompanyProfile({ ...companyProfile, size: value })}
                      >
                        <SelectTrigger id="company-size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                          <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                          <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                          <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                          <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                          <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-founded">Founded Year</Label>
                  <Input
                    id="company-founded"
                    value={companyProfile.founded}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, founded: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-headquarters">Headquarters</Label>
                  <Input
                    id="company-headquarters"
                    value={companyProfile.headquarters}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, headquarters: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  className="min-h-[150px]"
                  value={companyProfile.description}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin-url">LinkedIn</Label>
                    <Input
                      id="linkedin-url"
                      placeholder="https://linkedin.com/company/..."
                      value={companyProfile.socialLinks.linkedin}
                      onChange={(e) =>
                        setCompanyProfile({
                          ...companyProfile,
                          socialLinks: { ...companyProfile.socialLinks, linkedin: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter-url">Twitter</Label>
                    <Input
                      id="twitter-url"
                      placeholder="https://twitter.com/..."
                      value={companyProfile.socialLinks.twitter}
                      onChange={(e) =>
                        setCompanyProfile({
                          ...companyProfile,
                          socialLinks: { ...companyProfile.socialLinks, twitter: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook-url">Facebook</Label>
                    <Input
                      id="facebook-url"
                      placeholder="https://facebook.com/..."
                      value={companyProfile.socialLinks.facebook}
                      onChange={(e) =>
                        setCompanyProfile({
                          ...companyProfile,
                          socialLinks: { ...companyProfile.socialLinks, facebook: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications about your job listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-application">New Application Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when a candidate applies to your job
                  </p>
                </div>
                <Switch id="new-application" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="job-expiry">Job Expiry Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when your job posting is about to expire
                  </p>
                </div>
                <Switch id="job-expiry" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-summary">Weekly Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your job posting performance
                  </p>
                </div>
                <Switch id="weekly-summary" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
