import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Users, Play, Plus, Clock, Calendar, Search } from "lucide-react"

export default function LiveCodingPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Coding Sessions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Collaborate with others in real-time coding sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Search size={16} />
            Find Sessions
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Create Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active Now</TabsTrigger>
          <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((session) => (
              <Card key={session}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Building a React Component Library</CardTitle>
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                      React
                    </div>
                  </div>
                  <CardDescription>Hosted by Sarah Johnson</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Learn how to build a reusable component library with React and Storybook. We'll cover component
                    design, documentation, and testing.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Jun 20, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>2:00 PM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users size={14} />
                    <span>12 participants</span>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Calendar size={14} />
                    RSVP
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((session) => (
              <Card key={session}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Debugging a Node.js API</CardTitle>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                      Live Now
                    </div>
                  </div>
                  <CardDescription>Hosted by Michael Chen</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Join this session to help debug a Node.js API that's experiencing performance issues. We'll use
                    profiling tools to identify bottlenecks.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>8 participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Started 45 min ago</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Play size={14} />
                    Join Session
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-sessions">
          <div className="text-center py-12">
            <Code size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">You haven't created any sessions yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Host your own live coding session to collaborate with others
            </p>
            <Button className="flex items-center gap-2 mx-auto">
              <Plus size={16} />
              Create Session
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

