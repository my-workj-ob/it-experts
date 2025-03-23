"use client"

import EventCard from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Web Development Hackathon",
    description: "Join us for a 48-hour hackathon focused on building innovative web applications.",
    date: "2025-04-15",
    time: "09:00 AM - 06:00 PM",
    location: "San Francisco, CA",
    type: "In-person",
    category: "Hackathon",
    attendees: 120,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    description: "Learn about the latest advancements in AI and machine learning from industry experts.",
    date: "2025-04-20",
    time: "10:00 AM - 04:00 PM",
    location: "Online",
    type: "Virtual",
    category: "Workshop",
    attendees: 250,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "DevOps Networking Mixer",
    description: "Connect with DevOps professionals and discuss best practices over drinks and appetizers.",
    date: "2025-04-25",
    time: "06:00 PM - 09:00 PM",
    location: "New York, NY",
    type: "In-person",
    category: "Networking",
    attendees: 75,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "UX Design Conference",
    description: "A full-day conference featuring talks from leading UX designers and interactive workshops.",
    date: "2025-05-05",
    time: "09:00 AM - 05:00 PM",
    location: "Chicago, IL",
    type: "In-person",
    category: "Conference",
    attendees: 300,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Open Source Contributor Day",
    description: "Learn how to contribute to open source projects and make your first pull request.",
    date: "2025-05-10",
    time: "10:00 AM - 03:00 PM",
    location: "Online",
    type: "Virtual",
    category: "Workshop",
    attendees: 150,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Startup Pitch Night",
    description: "Watch tech startups pitch their ideas to investors and network with entrepreneurs.",
    date: "2025-05-15",
    time: "07:00 PM - 10:00 PM",
    location: "Austin, TX",
    type: "In-person",
    category: "Networking",
    attendees: 200,
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function EventsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600" onClick={() => setFilteredEvents(mockEvents)}>Events</span> &
          Meetups
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search events..." className="pl-8 w-full md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/events/create">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="in-person">In-person</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="austin">Austin</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any date</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="next-month">Next month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-4 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-events" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t registered for any events yet</p>
            <Button>Browse Events</Button>
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No past events to display</p>
            <Button variant="outline">View Archive</Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Organize Your Own Event</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Have an idea for a tech meetup, workshop, or conference? Create your own event and connect with IT
          professionals in your area.
        </p>
        <Button size="lg" asChild>
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>
    </div>
  )
}

