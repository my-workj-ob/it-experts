"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Globe,
  MapPin,
  Send,
  Share2,
  ThumbsUp,
  User,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// Mock event data
const mockEvent = {
  id: 1,
  title: "Web Development Hackathon",
  description: "Join us for a 48-hour hackathon focused on building innovative web applications.",
  longDescription: `
    <p>Get ready for an exciting 48-hour hackathon where developers, designers, and innovators come together to build cutting-edge web applications!</p>
    
    <h3>Event Details:</h3>
    <p>This hackathon is open to participants of all skill levels, from beginners to experienced professionals. You'll have the opportunity to form teams, brainstorm ideas, and build functional prototypes over the course of the weekend.</p>
    
    <h3>Prizes:</h3>
    <ul>
      <li>1st Place: $5,000 and mentorship opportunities with leading tech companies</li>
      <li>2nd Place: $2,500 and premium software subscriptions</li>
      <li>3rd Place: $1,000 and tech gadgets</li>
      <li>People's Choice: $500 and swag packages</li>
    </ul>
    
    <h3>Schedule:</h3>
    <p><strong>Day 1 (April 15):</strong></p>
    <ul>
      <li>9:00 AM - 10:00 AM: Registration and Breakfast</li>
      <li>10:00 AM - 11:00 AM: Opening Ceremony and Theme Announcement</li>
      <li>11:00 AM - 12:00 PM: Team Formation</li>
      <li>12:00 PM: Hacking Begins!</li>
      <li>6:00 PM: Dinner</li>
    </ul>
    
    <p><strong>Day 2 (April 16):</strong></p>
    <ul>
      <li>9:00 AM: Breakfast</li>
      <li>12:00 PM: Lunch</li>
      <li>3:00 PM - 4:00 PM: Mentorship Sessions</li>
      <li>6:00 PM: Dinner</li>
    </ul>
    
    <p><strong>Day 3 (April 17):</strong></p>
    <ul>
      <li>9:00 AM: Breakfast</li>
      <li>12:00 PM: Hacking Ends</li>
      <li>12:00 PM - 2:00 PM: Project Presentations</li>
      <li>2:00 PM - 3:00 PM: Judging</li>
      <li>3:00 PM - 4:00 PM: Awards Ceremony</li>
    </ul>
    
    <h3>What to Bring:</h3>
    <ul>
      <li>Laptop and charger</li>
      <li>Any hardware you plan to use</li>
      <li>Comfortable clothes</li>
      <li>Toiletries (if you plan to stay overnight)</li>
      <li>Your creativity and enthusiasm!</li>
    </ul>
    
    <h3>Judging Criteria:</h3>
    <ul>
      <li>Innovation and Creativity (25%)</li>
      <li>Technical Complexity (25%)</li>
      <li>Design and User Experience (25%)</li>
      <li>Practicality and Impact (25%)</li>
    </ul>
  `,
  date: "2025-04-15",
  endDate: "2025-04-17",
  time: "09:00 AM - 06:00 PM",
  location: "Tech Conference Center, 123 Innovation St, San Francisco, CA",
  type: "In-person",
  category: "Hackathon",
  capacity: 150,
  attendees: 120,
  organizer: {
    name: "Tech Innovators Association",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "A non-profit organization dedicated to promoting technology education and innovation.",
  },
  speakers: [
    { id: 1, name: "Alex Johnson", role: "CTO at TechCorp", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Sarah Williams", role: "Senior Developer Advocate", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Michael Chen", role: "Founder of DevStartup", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  sponsors: [
    { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=40&width=100" },
    { id: 2, name: "DevStartup", logo: "/placeholder.svg?height=40&width=100" },
    { id: 3, name: "InnovateTech", logo: "/placeholder.svg?height=40&width=100" },
  ],
  image: "/placeholder.svg?height=400&width=800",
  comments: [
    {
      id: 1,
      user: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40" },
      text: "I attended this event last year and it was amazing! Highly recommend it to anyone interested in web development.",
      date: "2 days ago",
      likes: 5,
    },
    {
      id: 2,
      user: { name: "Lisa Patel", avatar: "/placeholder.svg?height=40&width=40" },
      text: "Will there be any pre-event workshops for beginners?",
      date: "1 day ago",
      likes: 2,
    },
  ],
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  // In a real app, you would fetch the event data based on the ID
  const event = mockEvent

  const handleRegister = () => {
    setIsRegistering(true)

    // In a real app, you would submit the registration to your backend
    setTimeout(() => {
      setIsRegistering(false)
      // Show success message or redirect
    }, 1500)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the comment to your backend
    setComment("")
  }

  // Format date range
  const formatDateRange = () => {
    const startDate = new Date(event.date)
    const endDate = new Date(event.endDate)

    if (event.endDate && startDate.toDateString() !== endDate.toDateString()) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    }

    return startDate.toLocaleDateString()
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>

      {/* Event header */}
      <div className="relative">
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge className="bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/30">
            {event.category}
          </Badge>
          <Badge
            className={
              event.type === "In-person"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
            }
          >
            {event.type}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
              {event.title}
            </h1>
            <p className="text-muted-foreground mt-2">{event.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <span>{formatDateRange()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              {event.type === "In-person" ? (
                <MapPin className="h-5 w-5 mr-2 text-primary" />
              ) : (
                <Globe className="h-5 w-5 mr-2 text-primary" />
              )}
              <span>{event.location}</span>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: event.longDescription }}
                    className="prose dark:prose-invert max-w-none"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                      <AvatarFallback>{event.organizer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{event.organizer.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.organizer.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sponsors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6">
                    {event.sponsors.map((sponsor) => (
                      <div key={sponsor.id} className="text-center">
                        <div className="h-12 bg-muted rounded-md p-2 flex items-center justify-center">
                          <img src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} className="max-h-full" />
                        </div>
                        <p className="text-sm mt-2">{sponsor.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speakers" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Speakers</CardTitle>
                  <CardDescription>Learn from industry experts and thought leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker) => (
                      <div key={speaker.id} className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={speaker.avatar} alt={speaker.name} />
                          <AvatarFallback>{speaker.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{speaker.name}</h3>
                          <p className="text-sm text-muted-foreground">{speaker.role}</p>
                          <Button variant="link" className="h-auto p-0 text-primary text-sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Speaker Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        time: "10:00 AM - 11:00 AM",
                        title: "Opening Keynote: The Future of Web Development",
                        speaker: "Alex Johnson",
                      },
                      {
                        time: "1:00 PM - 2:00 PM",
                        title: "Building Scalable Web Applications",
                        speaker: "Sarah Williams",
                      },
                      {
                        time: "3:00 PM - 4:00 PM",
                        title: "From Idea to Startup: A Developer's Journey",
                        speaker: "Michael Chen",
                      },
                    ].map((session, index) => (
                      <div key={index} className="flex gap-4 p-3 rounded-md hover:bg-muted">
                        <div className="w-32 flex-shrink-0">
                          <p className="text-sm font-medium">{session.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">{session.title}</p>
                          <p className="text-sm text-muted-foreground">by {session.speaker}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendees" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendees</CardTitle>
                  <CardDescription>{event.attendees} people are attending this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                            <AvatarFallback>U{i + 1}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                          +{event.attendees - 5}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.capacity - event.attendees} spots remaining
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Capacity</span>
                        <span>
                          {event.attendees}/{event.capacity}
                        </span>
                      </div>
                      <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-medium">People you may know who are attending</h3>
                    {[
                      { name: "David Kim", role: "Frontend Developer", mutual: 3 },
                      { name: "Lisa Patel", role: "UX Designer", mutual: 5 },
                      { name: "Robert Chen", role: "Product Manager", mutual: 2 },
                    ].map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${index}`} />
                            <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-xs text-muted-foreground">{person.role}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {person.mutual} mutual connection{person.mutual !== 1 ? "s" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Discussion</CardTitle>
                  <CardDescription>
                    {event.comments.length} comment{event.comments.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{comment.user.name}</p>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <Textarea
                      placeholder="Ask a question or leave a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!comment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <span>
                    {event.attendees}/{event.capacity}
                  </span>
                </div>
                <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground">{event.capacity - event.attendees} spots remaining</p>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
                onClick={handleRegister}
                disabled={isRegistering}
              >
                {isRegistering ? "Registering..." : "Register for Event"}
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">{formatDateRange()}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {event.type === "In-person" ? (
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Video className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  {event.type === "In-person" && (
                    <Button variant="link" className="h-auto p-0 text-primary text-sm">
                      View Map
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Attendees</p>
                  <p className="text-sm text-muted-foreground">{event.attendees} attending</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-sm text-muted-foreground">{event.organizer.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Event thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/events/${i + 1}`} className="font-medium hover:text-primary">
                      {i === 0
                        ? "AI & Machine Learning Workshop"
                        : i === 1
                          ? "DevOps Networking Mixer"
                          : "UX Design Conference"}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "Apr 20, 2025" : i === 1 ? "Apr 25, 2025" : "May 5, 2025"}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">Have questions about this event?</p>
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

