"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Download, MessageSquare, Star, ThumbsUp, Users } from 'lucide-react'
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data for charts
const userActivityData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 300 },
  { name: "Mar", users: 500 },
  { name: "Apr", users: 280 },
  { name: "May", users: 590 },
  { name: "Jun", users: 800 },
  { name: "Jul", users: 810 }
]

const skillDistributionData = [
  { name: "Web Dev", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "DevOps", value: 200 },
  { name: "AI/ML", value: 150 },
  { name: "UI/UX", value: 100 }
]

const projectCompletionData = [
  { name: "Jan", completed: 20, ongoing: 30 },
  { name: "Feb", completed: 25, ongoing: 35 },
  { name: "Mar", completed: 30, ongoing: 25 },
  { name: "Apr", completed: 22, ongoing: 40 },
  { name: "May", completed: 35, ongoing: 30 },
  { name: "Jun", completed: 40, ongoing: 20 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer"
    },
    rating: 5,
    content: "This platform has been instrumental in my professional growth. The networking opportunities and learning resources are exceptional!",
    date: "2 days ago",
    likes: 24,
    replies: 3
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UX Designer"
    },
    rating: 4,
    content: "Great community and resources. I've connected with amazing professionals and found collaborative opportunities. Would love to see more design-focused content.",
    date: "1 week ago",
    likes: 18,
    replies: 2
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "DevOps Engineer"
    },
    rating: 5,
    content: "The mentorship program is outstanding. I've learned so much from experienced professionals in my field. The platform interface is intuitive and user-friendly.",
    date: "2 weeks ago",
    likes: 32,
    replies: 5
  }
]

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("statistics")
  const [feedbackContent, setFeedbackContent] = useState("")
  const [feedbackRating, setFeedbackRating] = useState("5")

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    alert("Feedback submitted successfully!")
    setFeedbackContent("")
    setFeedbackRating("5")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Platform Insights</h1>

      <Tabs defaultValue="statistics" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="statistics" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">10,482</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12% this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold">1,245</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8% this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-3xl font-bold">4.8</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.2 this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5% this month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Monthly active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>User skills across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Completion</CardTitle>
                <CardDescription>Completed vs ongoing projects by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                      <Bar dataKey="ongoing" fill="#82ca9d" name="Ongoing" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>
                Help us improve by sharing your experience with the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium mb-1">
                    Rating
                  </label>
                  <Select
                    value={feedbackRating}
                    onValueChange={setFeedbackRating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">★★★★★ (5) Excellent</SelectItem>
                      <SelectItem value="4">★★★★☆ (4) Good</SelectItem>
                      <SelectItem value="3">★★★☆☆ (3) Average</SelectItem>
                      <SelectItem value="2">★★☆☆☆ (2) Below Average</SelectItem>
                      <SelectItem value="1">★☆☆☆☆ (1) Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium mb-1">
                    Your Feedback
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts about the platform..."
                    rows={5}
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Feedback</CardTitle>
              <CardDescription>
                See what others are saying about our platform
              </CardDescription>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-500"
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.8 out of 5</span>
                </div>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedbackData.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={feedback.user.avatar} alt={feedback.user.name} />
                          <AvatarFallback>{feedback.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{feedback.user.name}</div>
                          <div className="text-sm text-muted-foreground">{feedback.user.role}</div>
                          <div className="flex items-center mt-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                                fill={i < feedback.rating ? "currentColor" : "none"}
                              />
                            ))}
                            <span className="ml-2 text-xs text-muted-foreground">{feedback.date}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{feedback.rating}/5</Badge>
                    </div>
                    <p className="mt-4 text-sm">{feedback.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{feedback.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{feedback.replies}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">Reply</Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More Feedback</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
