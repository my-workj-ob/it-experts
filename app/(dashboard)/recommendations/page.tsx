import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Briefcase, Code, Sparkles } from "lucide-react"

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Personalized recommendations based on your profile and interests
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Sparkles size={16} />
          Refresh Recommendations
        </Button>
      </div>

      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="people" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((person) => (
              <Card key={person}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div>
                      <CardTitle>Alex Johnson</CardTitle>
                      <CardDescription>Senior Frontend Developer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-2 py-1 rounded-full text-xs">
                      TypeScript
                    </span>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                      Node.js
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Recommended because you both share interests in React and TypeScript.
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <UserPlus size={16} />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <Card key={project}>
                <CardHeader>
                  <CardTitle>E-commerce Platform</CardTitle>
                  <CardDescription>Looking for contributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    An open-source e-commerce platform built with Next.js, Prisma, and Stripe. Looking for developers to
                    help with frontend and backend features.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                      Next.js
                    </span>
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-2 py-1 rounded-full text-xs">
                      Prisma
                    </span>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                      Stripe
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Code size={16} />
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((job) => (
              <Card key={job}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Senior Full Stack Developer</CardTitle>
                      <CardDescription>TechCorp Inc. • Remote • Full-time</CardDescription>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-12 h-12 rounded flex items-center justify-center">
                      TC
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We're looking for an experienced Full Stack Developer to join our team. You'll be working on our
                    main product using React, Node.js, and MongoDB.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                      Node.js
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded-full text-xs">
                      MongoDB
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Sparkles size={16} className="text-yellow-500" />
                    <span>98% match with your skills and experience</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Briefcase size={16} />
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

