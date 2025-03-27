import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Phone, Send, Paperclip, Mic, Plus, Search } from "lucide-react"

export default function ChatVideoPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat & Video Calling</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search contacts..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { name: "Team Alpha", active: true, unread: 3 },
                { name: "Jane Smith", active: true, unread: 0 },
                { name: "Project Omega", active: false, unread: 0 },
                { name: "John Doe", active: false, unread: 0 },
                { name: "Tech Support", active: false, unread: 0 },
              ].map((contact, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                    index === 0 ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    {contact.active && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last message: 10 min ago</div>
                  </div>
                  {contact.unread > 0 && (
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <CardTitle>Team Alpha</CardTitle>
                  <CardDescription>5 members • 2 online</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Video size={18} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
                <div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                    <div className="font-medium text-sm mb-1">Alex Johnson</div>
                    <p>Hey team, I've pushed the latest changes to the repository. Can someone review my PR?</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:30 AM</div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div>
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[80%]">
                    <p>I'll take a look at it in about an hour. Currently finishing up the API integration.</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">10:32 AM</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
                <div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                    <div className="font-medium text-sm mb-1">Sarah Miller</div>
                    <p>I can review it now. Which branch is it on?</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:35 AM</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
                <div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                    <div className="font-medium text-sm mb-1">Alex Johnson</div>
                    <p>It's on the feature/user-authentication branch. Thanks Sarah!</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10:36 AM</div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div>
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[80%]">
                    <p>Also, don't forget we have a team meeting at 2 PM to discuss the project timeline.</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">10:40 AM</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex items-center gap-2 w-full">
              <Button variant="outline" size="icon">
                <Paperclip size={18} />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="outline" size="icon">
                <Mic size={18} />
              </Button>
              <Button size="icon">
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

