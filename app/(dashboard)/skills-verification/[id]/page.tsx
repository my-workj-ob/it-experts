"use client"

import { ArrowLeft, Award, CheckCircle, Clock, FileText, Info, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SkillVerificationDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the skill assessment data based on the ID
  const skillId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/skills-verification" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">React Developer Assessment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">React Developer Assessment</h2>
                  <p className="text-gray-500 dark:text-gray-400">Verify your React skills and earn a certification</p>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  <TabsTrigger value="sample">Sample Questions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">About This Assessment</h3>
                      <p className="text-sm">
                        This comprehensive assessment evaluates your proficiency in React development, covering
                        everything from basic concepts to advanced patterns. The assessment includes both theoretical
                        questions and practical coding challenges to test your knowledge and problem-solving abilities.
                        <br />
                        <br />
                        Upon successful completion, you'll receive a verified certification that you can showcase on
                        your profile and share with potential employers. This certification is recognized by leading
                        tech companies and can help you stand out in the job market.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Assessment Format</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>90 minutes duration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span>50 multiple-choice questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>2 coding challenges</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span>70% passing score</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Skills Tested</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>React Fundamentals</Badge>
                        <Badge>Hooks</Badge>
                        <Badge>State Management</Badge>
                        <Badge>Component Patterns</Badge>
                        <Badge>Performance Optimization</Badge>
                        <Badge>Testing</Badge>
                        <Badge>React Router</Badge>
                        <Badge>Context API</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="syllabus">
                  <div className="space-y-4">
                    {[
                      {
                        title: "React Fundamentals",
                        topics: ["JSX", "Components", "Props", "State", "Lifecycle Methods"],
                      },
                      {
                        title: "Hooks",
                        topics: ["useState", "useEffect", "useContext", "useReducer", "Custom Hooks"],
                      },
                      {
                        title: "State Management",
                        topics: ["Redux", "MobX", "Zustand", "Recoil", "Context API"],
                      },
                      {
                        title: "Component Patterns",
                        topics: ["HOCs", "Render Props", "Compound Components", "Custom Hooks"],
                      },
                      {
                        title: "Performance Optimization",
                        topics: ["Memoization", "Code Splitting", "Lazy Loading", "Virtualization"],
                      },
                    ].map((section, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-bold">{section.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {section.topics.map((topic) => (
                              <Badge key={topic} variant="outline">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="sample">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Sample Multiple-Choice Question</h3>
                      <Card>
                        <CardContent className="p-4">
                          <p className="font-medium mb-3">
                            Which hook would you use to perform side effects in a function component?
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="radio" id="q1a" name="q1" className="h-4 w-4" />
                              <label htmlFor="q1a">useState</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="radio" id="q1b" name="q1" className="h-4 w-4" />
                              <label htmlFor="q1b">useEffect</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="radio" id="q1c" name="q1" className="h-4 w-4" />
                              <label htmlFor="q1c">useContext</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="radio" id="q1d" name="q1" className="h-4 w-4" />
                              <label htmlFor="q1d">useReducer</label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Sample Coding Challenge</h3>
                      <Card>
                        <CardContent className="p-4">
                          <p className="font-medium mb-3">
                            Create a custom hook called useLocalStorage that persists state to localStorage.
                          </p>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {`function useLocalStorage(key, initialValue) {
  // Your implementation here
  
  // Should persist state to localStorage
  // Should update localStorage when state changes
  // Should retrieve state from localStorage on initial render
}`}
                              </code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <Button className="w-full mb-6">Start Assessment</Button>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Difficulty</span>
                    <span>Intermediate</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Time Required</span>
                    <span>90 minutes</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Pass Rate</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">You can retake this assessment after 30 days if you don't pass.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Certification is valid for 2 years after passing.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Top Performers</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-sm">Alex Thompson</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs ml-1">98%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

