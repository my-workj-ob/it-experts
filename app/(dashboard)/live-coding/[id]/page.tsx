import { ArrowLeft, Calendar, Clock, Code, Copy, Share2, Users, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiveCodingDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the live coding session data based on the ID
  const sessionId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/live-coding" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Live Coding Session</h1>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-900 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-500 mx-auto" />
                  <p className="text-gray-400 mt-4">Live session will start here</p>
                  <Button className="mt-4">Join Session</Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=JS" alt="@user" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">Building a Real-time Chat Application with Socket.io</h2>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="font-medium text-primary">John Smith</span>
                      <span className="mx-2">•</span>
                      <span>Scheduled for June 20, 2023 at 2:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>Socket.io</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>React</Badge>
                  <Badge>Real-time</Badge>
                </div>

                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
                    <TabsTrigger value="chat">Live Chat</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        Join me for a live coding session where we'll build a real-time chat application from scratch
                        using Socket.io, Node.js, and React. This hands-on session will cover everything from setting up
                        the server to implementing real-time features like typing indicators and read receipts.
                      </p>
                      <p>During this session, you'll learn:</p>
                      <ul>
                        <li>How to set up a Socket.io server with Node.js and Express</li>
                        <li>Implementing real-time communication between clients</li>
                        <li>Building a responsive chat UI with React</li>
                        <li>Adding advanced features like typing indicators and online status</li>
                        <li>Handling connection errors and reconnection strategies</li>
                        <li>Best practices for scaling real-time applications</li>
                      </ul>
                      <p>
                        This session is perfect for intermediate developers who have basic knowledge of JavaScript,
                        React, and Node.js. You'll be able to follow along with the coding in real-time, ask questions,
                        and get immediate feedback.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="agenda">
                    <div className="space-y-4">
                      {[
                        {
                          time: "2:00 PM - 2:15 PM",
                          title: "Introduction and Setup",
                          description: "Overview of the project and setting up the development environment",
                        },
                        {
                          time: "2:15 PM - 2:45 PM",
                          title: "Backend Implementation",
                          description: "Setting up the Socket.io server with Node.js and Express",
                        },
                        {
                          time: "2:45 PM - 3:15 PM",
                          title: "Frontend Implementation",
                          description: "Building the React client and connecting to the Socket.io server",
                        },
                        {
                          time: "3:15 PM - 3:45 PM",
                          title: "Advanced Features",
                          description: "Adding typing indicators, read receipts, and online status",
                        },
                        {
                          time: "3:45 PM - 4:00 PM",
                          title: "Q&A and Wrap-up",
                          description: "Answering questions and discussing next steps",
                        },
                      ].map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="mb-2 md:mb-0">
                                <h4 className="font-bold">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                              <Badge variant="outline">{item.time}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="prerequisites">
                    <div className="space-y-4">
                      <p className="text-sm">To get the most out of this live coding session, you should have:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Basic knowledge of JavaScript (ES6+)</li>
                        <li>Familiarity with React (hooks, components, state management)</li>
                        <li>Understanding of Node.js and Express</li>
                        <li>A code editor (VS Code recommended)</li>
                        <li>Node.js installed on your computer</li>
                      </ul>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-4">
                        <h4 className="font-bold mb-2">Starter Code</h4>
                        <p className="text-sm mb-2">You can clone the starter repository to follow along:</p>
                        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
                          <code className="text-sm">
                            git clone https://github.com/johnsmith/realtime-chat-starter.git
                          </code>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="chat">
                    <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-y-auto mb-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=JS" alt="@user" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">
                              Welcome everyone! The session will start in about 30 minutes. Feel free to introduce
                              yourselves in the chat.
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-primary rounded-lg p-3 text-white max-w-[80%]">
                            <p className="text-sm">
                              Hi John! Looking forward to the session. I've been wanting to learn Socket.io for a while.
                            </p>
                            <span className="text-xs text-primary-foreground/70 mt-1 block">10:32 AM</span>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=ME" alt="@user" />
                            <AvatarFallback>ME</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-md dark:bg-gray-800"
                        placeholder="Type a message..."
                      />
                      <Button>Send</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Session Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Date</h4>
                    <p className="text-sm text-gray-500">June 20, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Time</h4>
                    <p className="text-sm text-gray-500">2:00 PM - 4:00 PM (EST)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Participants</h4>
                    <p className="text-sm text-gray-500">42 registered</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Difficulty</h4>
                    <p className="text-sm text-gray-500">Intermediate</p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6">Register for Session</Button>
              <Button variant="outline" className="w-full mt-2">
                Add to Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">About the Host</h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=60&width=60&text=JS" alt="@user" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">John Smith</h4>
                  <p className="text-sm text-gray-500">Senior Software Engineer</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                John is a senior software engineer with 8+ years of experience in building real-time applications. He
                has worked with Socket.io for over 5 years and has built several production applications using this
                technology.
              </p>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                {[
                  "Building a GraphQL API with Apollo Server",
                  "React Performance Optimization Techniques",
                  "Introduction to WebRTC for Video Calls",
                ].map((title, index) => (
                  <div key={index} className="group">
                    <Link href="#" className="text-sm font-medium group-hover:text-primary">
                      {title}
                    </Link>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>June 25, 2023</span>
                      <span className="mx-2">•</span>
                      <span>2:00 PM</span>
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

