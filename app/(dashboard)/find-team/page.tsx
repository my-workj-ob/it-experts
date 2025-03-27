"use client"

import { useState } from "react"
import { Search, Filter, Users, Calendar, Code, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for team opportunities
const teamOpportunities = [
  {
    id: 1,
    title: "Full Stack Developer for E-commerce Platform",
    description:
      "Looking for a full stack developer to join our team building a modern e-commerce platform with React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    duration: "3-6 months",
    teamSize: "4-6 people",
    remote: true,
    postedBy: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Project Lead",
    },
    postedDate: "2 days ago",
    applicants: 12,
    category: "Web Development",
  },
  {
    id: 2,
    title: "Mobile App Developer for Health Tracking App",
    description:
      "Seeking a React Native developer to help build a health tracking mobile application. Experience with health APIs is a plus.",
    skills: ["React Native", "Firebase", "Redux", "REST APIs"],
    duration: "2-3 months",
    teamSize: "3-4 people",
    remote: true,
    postedBy: {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Mobile Team Lead",
    },
    postedDate: "5 days ago",
    applicants: 8,
    category: "Mobile Development",
  },
  {
    id: 3,
    title: "UI/UX Designer for SaaS Dashboard",
    description:
      "Looking for a UI/UX designer to help redesign our SaaS dashboard. Experience with Figma and design systems required.",
    skills: ["Figma", "UI Design", "UX Research", "Design Systems"],
    duration: "1-2 months",
    teamSize: "2-3 people",
    remote: true,
    postedBy: {
      id: 3,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Product Manager",
    },
    postedDate: "1 week ago",
    applicants: 15,
    category: "Design",
  },
  {
    id: 4,
    title: "Backend Developer for AI-powered Analytics Platform",
    description:
      "Seeking a backend developer with experience in Python and machine learning to help build an analytics platform.",
    skills: ["Python", "Django", "Machine Learning", "PostgreSQL", "Docker"],
    duration: "4-6 months",
    teamSize: "5-7 people",
    remote: false,
    postedBy: {
      id: 4,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "CTO",
    },
    postedDate: "3 days ago",
    applicants: 7,
    category: "AI & Machine Learning",
  },
]

// Available skills for filtering
const skills = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Redux",
  "React Native",
  "Firebase",
  "REST APIs",
  "Figma",
  "UI Design",
  "UX Research",
  "Design Systems",
  "Python",
  "Django",
  "Machine Learning",
  "PostgreSQL",
  "Docker",
  "JavaScript",
  "TypeScript",
]

// Available categories
const categories = [
  "Web Development",
  "Mobile Development",
  "Design",
  "AI & Machine Learning",
  "DevOps",
  "Data Science",
  "Blockchain",
  "Game Development",
  "IoT",
]

export default function FindTeam() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [remoteOnly, setRemoteOnly] = useState(false)

  // Filter opportunities based on search, skills, category, and remote preference
  const filteredOpportunities = teamOpportunities.filter((opportunity) => {
    // Search filter
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Skills filter
    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some((skill) => opportunity.skills.includes(skill))

    // Category filter
    const matchesCategory = !selectedCategory || opportunity.category === selectedCategory

    // Remote filter
    const matchesRemote = !remoteOnly || opportunity.remote

    return matchesSearch && matchesSkills && matchesCategory && matchesRemote
  })

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find a Team</h1>
          <p className="text-muted-foreground mt-1">Discover collaboration opportunities and join exciting projects</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Post a Team Opportunity</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2 flex-1">
              <h3 className="text-sm font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 10).map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
                {skills.length > 10 && (
                  <Badge variant="outline" className="cursor-pointer">
                    +{skills.length - 10} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2 w-full md:w-64">
              <h3 className="text-sm font-medium">Category</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="remote-only"
                  checked={remoteOnly}
                  onChange={() => setRemoteOnly(!remoteOnly)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="remote-only" className="text-sm">
                  Remote only
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{opportunity.title}</h3>
                    <Badge variant={opportunity.remote ? "default" : "outline"}>
                      {opportunity.remote ? "Remote" : "On-site"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pb-2">
                  <p className="text-muted-foreground">{opportunity.description}</p>

                  <div>
                    <p className="text-sm font-medium mb-1">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.category}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={opportunity.postedBy.avatar} alt={opportunity.postedBy.name} />
                      <AvatarFallback>{opportunity.postedBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{opportunity.postedBy.name}</p>
                      <p className="text-xs text-muted-foreground">{opportunity.postedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Apply
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

