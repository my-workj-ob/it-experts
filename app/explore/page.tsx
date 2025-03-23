"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserCard from "@/components/user-card"
import { Filter, Search } from "lucide-react"
import { useState } from "react"

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    experience: "5 years",
    matchScore: 95,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UX Designer",
    location: "New York, NY",
    skills: ["Figma", "UI Design", "User Research"],
    experience: "4 years",
    matchScore: 88,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "DevOps Engineer",
    location: "Seattle, WA",
    skills: ["Docker", "Kubernetes", "AWS"],
    experience: "7 years",
    matchScore: 82,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Data Scientist",
    location: "Austin, TX",
    skills: ["Python", "TensorFlow", "Data Analysis"],
    experience: "3 years",
    matchScore: 79,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Backend Developer",
    location: "Chicago, IL",
    skills: ["Node.js", "Express", "MongoDB"],
    experience: "6 years",
    matchScore: 75,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Lisa Patel",
    role: "Product Manager",
    location: "Boston, MA",
    skills: ["Agile", "Product Strategy", "User Stories"],
    experience: "8 years",
    matchScore: 72,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false)
  const [matchThreshold, setMatchThreshold] = useState([70])
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)



  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Explore{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
            IT Professionals
          </span>
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" onClick={() => setFilteredUsers([])} />
            <Input
              type="search"
              placeholder="Search by name, skills, or role..."
              className="pl-8 w-full md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="seattle">Seattle</SelectItem>
                    <SelectItem value="austin">Austin</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Skills</Label>
                <Input placeholder="e.g. React, Python, AWS" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Match Score (min {matchThreshold}%)</Label>
                </div>
                <Slider value={matchThreshold} onValueChange={setMatchThreshold} min={0} max={100} step={1} />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="recommended">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="recent">Recently Active</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers
              .sort((a, b) => b.id - a.id)
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="connections" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t connected with anyone yet</p>
            <Button>Find Connections</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

