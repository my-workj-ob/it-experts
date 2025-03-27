"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Activity,
  PieChart,
  LineChart,
  Search,
  Filter,
  Download,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminPage() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4 mr-2" />
            System Status
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">10,482</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
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
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% this month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <p className="text-3xl font-bold">87</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% this month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reported Issues</p>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 new
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search users..." className="pl-8 w-full md:w-[300px]" />
                  </div>
                  <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Join Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply</Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Alex Johnson",
                      avatar: "/placeholder.svg?height=40&width=40",
                      email: "alex.johnson@example.com",
                      type: "Developer",
                      status: "Active",
                      joined: "Apr 12, 2025",
                    },
                    {
                      name: "Sarah Williams",
                      avatar: "/placeholder.svg?height=40&width=40",
                      email: "sarah.williams@example.com",
                      type: "Designer",
                      status: "Active",
                      joined: "Mar 28, 2025",
                    },
                    {
                      name: "Michael Chen",
                      avatar: "/placeholder.svg?height=40&width=40",
                      email: "michael.chen@example.com",
                      type: "DevOps",
                      status: "Inactive",
                      joined: "Feb 15, 2025",
                    },
                    {
                      name: "Emily Rodriguez",
                      avatar: "/placeholder.svg?height=40&width=40",
                      email: "emily.rodriguez@example.com",
                      type: "Data Scientist",
                      status: "Active",
                      joined: "Jan 05, 2025",
                    },
                    {
                      name: "David Kim",
                      avatar: "/placeholder.svg?height=40&width=40",
                      email: "david.kim@example.com",
                      type: "Developer",
                      status: "Suspended",
                      joined: "Dec 10, 2024",
                    },
                  ].map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "default"
                              : user.status === "Inactive"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      title: "E-commerce Platform",
                      category: "Web Development",
                      status: "In Progress",
                      teamSize: 4,
                      created: "Apr 05, 2025",
                    },
                    {
                      title: "AI-powered Recommendation Engine",
                      category: "AI & Machine Learning",
                      status: "Recruiting",
                      teamSize: 2,
                      created: "Mar 20, 2025",
                    },
                    {
                      title: "Mobile Fitness App",
                      category: "Mobile Development",
                      status: "Planning",
                      teamSize: 1,
                      created: "Mar 15, 2025",
                    },
                    {
                      title: "DevOps Automation Platform",
                      category: "DevOps",
                      status: "In Progress",
                      teamSize: 3,
                      created: "Feb 28, 2025",
                    },
                    {
                      title: "Blockchain Voting System",
                      category: "Blockchain",
                      status: "Recruiting",
                      teamSize: 2,
                      created: "Feb 10, 2025",
                    },
                  ].map((project, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "In Progress"
                              ? "default"
                              : project.status === "Recruiting"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.teamSize}</TableCell>
                      <TableCell>{project.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      title: "Web Development Hackathon",
                      type: "Hackathon",
                      date: "Apr 15, 2025",
                      location: "San Francisco, CA",
                      attendees: 120,
                    },
                    {
                      title: "AI & Machine Learning Workshop",
                      type: "Workshop",
                      date: "Apr 20, 2025",
                      location: "Online",
                      attendees: 250,
                    },
                    {
                      title: "DevOps Networking Mixer",
                      type: "Networking",
                      date: "Apr 25, 2025",
                      location: "New York, NY",
                      attendees: 75,
                    },
                    {
                      title: "UX Design Conference",
                      type: "Conference",
                      date: "May 05, 2025",
                      location: "Chicago, IL",
                      attendees: 300,
                    },
                    {
                      title: "Open Source Contributor Day",
                      type: "Workshop",
                      date: "May 10, 2025",
                      location: "Online",
                      attendees: 150,
                    },
                  ].map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.attendees}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reported Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      issue: "Inappropriate content in profile",
                      reportedBy: "Alex Johnson",
                      type: "Content",
                      date: "Apr 10, 2025",
                      status: "Pending",
                    },
                    {
                      issue: "Spam messages from user",
                      reportedBy: "Sarah Williams",
                      type: "Spam",
                      date: "Apr 08, 2025",
                      status: "Investigating",
                    },
                    {
                      issue: "Fake profile information",
                      reportedBy: "Michael Chen",
                      type: "Profile",
                      date: "Apr 05, 2025",
                      status: "Resolved",
                    },
                    {
                      issue: "Harassment in chat",
                      reportedBy: "Emily Rodriguez",
                      type: "Harassment",
                      date: "Apr 02, 2025",
                      status: "Pending",
                    },
                    {
                      issue: "Technical issue with messaging",
                      reportedBy: "David Kim",
                      type: "Technical",
                      date: "Mar 30, 2025",
                      status: "Resolved",
                    },
                  ].map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.issue}</p>
                        </div>
                      </TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "Resolved"
                              ? "default"
                              : report.status === "Investigating"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <LineChart className="h-64 w-64 text-muted-foreground" />
            <p className="text-center text-muted-foreground">User growth chart visualization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <PieChart className="h-64 w-64 text-muted-foreground" />
            <p className="text-center text-muted-foreground">User distribution by role</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

