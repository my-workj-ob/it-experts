import { ArrowLeft, Calendar, Clock, MessageSquare, Star, Users, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function MentorshipDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the mentorship data based on the ID
  const mentorshipId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/mentorship" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Mentorship Program</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Mentor"
                  alt="Mentor"
                  className="w-40 h-40 rounded-full object-cover mx-auto md:mx-0"
                />
                <div>
                  <h2 className="text-2xl font-bold">Advanced Web Development Mentorship</h2>
                  <div className="flex items-center mt-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm ml-2">(48 reviews)</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Mentored by <span className="font-medium text-primary">Sarah Johnson</span> • Senior Software
                    Engineer at TechCorp
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>GraphQL</Badge>
                    <Badge>AWS</Badge>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">About This Mentorship</h3>
                      <p className="text-sm">
                        This 12-week mentorship program is designed for intermediate developers looking to advance their
                        web development skills. You'll work directly with Sarah, a senior software engineer with 8+
                        years of experience building scalable web applications.
                        <br />
                        <br />
                        Through weekly 1-on-1 sessions, coding challenges, and a capstone project, you'll gain practical
                        experience in modern web development practices, architecture patterns, and deployment
                        strategies.
                        <br />
                        <br />
                        By the end of this mentorship, you'll have built a production-ready web application and gained
                        the skills needed to tackle complex development challenges in your career.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">What You'll Learn</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Advanced React patterns and performance optimization</li>
                        <li>Building scalable backend services with Node.js</li>
                        <li>TypeScript best practices for large applications</li>
                        <li>GraphQL API design and implementation</li>
                        <li>Serverless architecture and AWS deployment</li>
                        <li>Testing strategies for frontend and backend</li>
                        <li>CI/CD pipelines and DevOps practices</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Program Structure</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>12 weeks duration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>1-hour weekly sessions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-primary" />
                          <span>Video calls via Zoom</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <span>Unlimited chat support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="curriculum">
                  <div className="space-y-4">
                    {[
                      "Week 1-2: Modern JavaScript & TypeScript Fundamentals",
                      "Week 3-4: Advanced React & State Management",
                      "Week 5-6: Backend Development with Node.js",
                      "Week 7-8: GraphQL API Design & Implementation",
                      "Week 9-10: Testing & Performance Optimization",
                      "Week 11-12: Deployment & Capstone Project",
                    ].map((week, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-bold">{week}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Includes practical exercises, code reviews, and personalized feedback.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="pb-6 border-b">
                        <div className="flex items-start gap-4">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                            alt="User"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">Alex Thompson</h4>
                              <span className="text-xs text-gray-500 ml-2">3 months ago</span>
                            </div>
                            <div className="flex mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-sm mt-2">
                              This mentorship was exactly what I needed to level up my skills. Sarah is an excellent
                              mentor who provided clear guidance and challenged me to think outside the box. The
                              curriculum was well-structured and the feedback on my code was invaluable.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">$499</div>
                <p className="text-sm text-gray-500">for the 12-week program</p>
              </div>

              <Button className="w-full mb-4">Apply for Mentorship</Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Mentor
              </Button>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Applications close</span>
                  <span className="font-medium">June 30, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Program starts</span>
                  <span className="font-medium">July 15, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Spots available</span>
                  <span className="font-medium">3 of 10</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Who is this for?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Intermediate developers with 1+ years of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Those looking to advance to senior-level positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>Developers wanting to build production-ready applications</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">About the Mentor</h3>
              <p className="text-sm mb-4">
                Sarah Johnson is a Senior Software Engineer with 8+ years of experience building web applications at
                scale. She specializes in React, Node.js, and cloud architecture.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>Mentored 48 developers</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

