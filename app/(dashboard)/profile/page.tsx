"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useProfile from "@/hooks/profile/use-profile"
import { get } from "lodash"
import { Briefcase, Edit, Github, Globe, Linkedin, Mail, MapPin, Plus } from "lucide-react"
import { useState } from "react"

// Mock data for demonstration
const mockUser = {
  name: "John Doe",
  role: "Senior Frontend Developer",
  location: "San Francisco, CA",
  email: "john.doe@example.com",
  website: "https://johndoe.dev",
  github: "johndoe",
  linkedin: "johndoe",
  bio: "Passionate frontend developer with 5+ years of experience building modern web applications. Specialized in React, TypeScript, and Next.js. Always eager to learn new technologies and collaborate on innovative projects.",
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 70 },
    { name: "CSS/Tailwind", level: 95 },
    { name: "GraphQL", level: 65 },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      duration: "2022 - Present",
      description:
        "Leading the frontend development team, implementing new features, and improving performance of the company's main SaaS product.",
    },
    {
      company: "WebDev Agency",
      position: "Frontend Developer",
      duration: "2019 - 2022",
      description: "Developed responsive web applications for various clients using React and related technologies.",
    },
    {
      company: "Startup XYZ",
      position: "Junior Developer",
      duration: "2017 - 2019",
      description: "Worked on both frontend and backend development for an e-commerce platform.",
    },
  ],
  education: [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      duration: "2013 - 2017",
    },
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio website showcasing my projects and skills.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "#",
    },
    {
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      technologies: ["React", "Firebase", "Material UI"],
      link: "#",
    },
  ],
}


export default function ProfilePage() {
  const [profileCompletion, setProfileCompletion] = useState(85)
  const { userProfileData } = useProfile()
  return (
    <div className="container mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={get(userProfileData, "avatar", "/placeholder.svg?height=128&width=128")} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
              <div className="flex flex-col items-center md:items-start space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{String(get(userProfileData, "email")).split(" ", 5).join("...")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={mockUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {mockUser.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://github.com/${mockUser.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {mockUser.github}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://linkedin.com/in/${mockUser.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {mockUser.linkedin}
                  </a>
                </div>
              </div>
              <div className="w-full md:max-w-[200px] space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile completion</span>
                  <span>{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary space-x-2 to-indigo-600">
                    <span>{get(userProfileData, "firstName")}</span>
                    <span>{get(userProfileData, "lastName")}</span>
                  </h1>
                  <p className="text-xl text-indigo-500 dark:text-indigo-400">{get(userProfileData, "jobTitle", "FullStack Developer")}</p>
                </div>
                <p className="text-muted-foreground">{mockUser.bio}</p>

                <div>
                  <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                    Skills
                  </h2>
                  <div className="space-y-3">
                    {mockUser.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="experience">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="mt-6 space-y-6">
          {mockUser.experience.map((exp, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.duration}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-6 space-y-6">
          {mockUser.education.map((edu, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockUser.projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t connected with anyone yet</p>
            <Button asChild>
              <a href="/explore">Find Connections</a>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

