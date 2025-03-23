"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload } from "lucide-react"

export default function CreateProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleNextTab = () => {
    if (activeTab === "basic") setActiveTab("skills")
    else if (activeTab === "skills") setActiveTab("experience")
    else if (activeTab === "experience") setActiveTab("education")
  }

  const handlePrevTab = () => {
    if (activeTab === "education") setActiveTab("experience")
    else if (activeTab === "experience") setActiveTab("skills")
    else if (activeTab === "skills") setActiveTab("basic")
  }

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Your Profile</CardTitle>
          <CardDescription className="text-center">
            Complete your profile to connect with other professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input id="headline" placeholder="e.g. Senior Frontend Developer at Tech Co." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell others about yourself" className="min-h-[120px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-2"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">Add your skills to help others find you</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Work Experience</Label>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="Company name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input id="position" placeholder="Your job title" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input id="startDate" type="month" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input id="endDate" type="month" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your responsibilities and achievements"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Education</Label>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="school">School/University</Label>
                          <Input id="school" placeholder="School name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="degree">Degree</Label>
                          <Input id="degree" placeholder="e.g. Bachelor of Science" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fieldOfStudy">Field of Study</Label>
                          <Input id="fieldOfStudy" placeholder="e.g. Computer Science" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="eduStartDate">Start Date</Label>
                            <Input id="eduStartDate" type="month" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="eduEndDate">End Date</Label>
                            <Input id="eduEndDate" type="month" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Profile..." : "Complete Profile"}
                  </Button>
                </div>
              </TabsContent>

              <div className="flex justify-between mt-6">
                {activeTab !== "basic" && (
                  <Button type="button" variant="outline" onClick={handlePrevTab}>
                    Previous
                  </Button>
                )}
                {activeTab !== "education" ? (
                  <Button type="button" className="ml-auto" onClick={handleNextTab}>
                    Next
                  </Button>
                ) : null}
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

