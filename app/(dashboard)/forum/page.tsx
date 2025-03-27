import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Share2, BookmarkPlus, Filter } from "lucide-react"

export default function ForumPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Forum & Blog</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button>Create Post</Button>
        </div>
      </div>

      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="forum">Forum Discussions</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          {[1, 2, 3].map((post) => (
            <Card key={post} className="mb-4">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <CardTitle className="text-lg">How to optimize React performance?</CardTitle>
                    <CardDescription>Posted by John Doe • 2 hours ago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  I've been working on a large React application and noticed some performance issues. What are some best
                  practices for optimizing React performance?
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                    React
                  </span>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                    Performance
                  </span>
                  <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-2 py-1 rounded-full text-xs">
                    Frontend
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    24 Replies
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp size={16} />
                    42
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookmarkPlus size={16} />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 size={16} />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((post) => (
              <Card key={post} className="overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <CardHeader>
                  <CardTitle>Building Scalable Microservices with Node.js</CardTitle>
                  <CardDescription>By Sarah Johnson • June 15, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    Learn how to design and implement scalable microservices architecture using Node.js, Express, and
                    Docker. This comprehensive guide covers everything from initial setup to deployment.
                  </p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-2">
                      <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded-full text-xs">
                        Node.js
                      </span>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                        Microservices
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      128
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

