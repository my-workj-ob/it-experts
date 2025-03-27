import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, Clock, Users, MapPin, ExternalLink, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HackathonsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hackathons & Competitions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Participate in coding challenges and hackathons</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Trophy size={16} />
            Host Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((event) => (
              <Card key={event} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500">Upcoming</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>AI Innovation Hackathon</CardTitle>
                      <CardDescription>Organized by TechCorp Inc.</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-green-500">$5,000</div>
                      <div className="text-sm text-gray-500">Prize Pool</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Build innovative AI solutions that address real-world problems. Open to teams of 2-5 participants.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Jul 15-17, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>120 participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>48 hours</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink size={14} />
                    Details
                  </Button>
                  <Button className="flex items-center gap-2">Register</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500">Live Now</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Web3 Development Challenge</CardTitle>
                    <CardDescription>Organized by Blockchain Foundation</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-green-500">$10,000</div>
                    <div className="text-sm text-gray-500">Prize Pool</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  Create decentralized applications that leverage blockchain technology. Individual or team
                  participation allowed.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Jun 10-20, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    <span>250 participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>10 days left</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink size={14} />
                  Details
                </Button>
                <Button className="flex items-center gap-2">Join Now</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3].map((event) => (
              <Card key={event} className="overflow-hidden opacity-80">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Mobile App Innovation Challenge</CardTitle>
                      <CardDescription>Organized by AppDev Community</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-gray-500">$3,000</div>
                      <div className="text-sm text-gray-500">Prize Pool</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Develop innovative mobile applications that solve everyday problems.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>May 5-7, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>Remote</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>85 participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={14} />
                      <span>Team Innovate (Winners)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink size={14} />
                    View Results
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    Gallery
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events">
          <div className="text-center py-12">
            <Trophy size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">You haven't participated in any events yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Join a hackathon or competition to showcase your skills
            </p>
            <Button className="flex items-center gap-2 mx-auto">Browse Events</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

