import { ArrowLeft, Bookmark, Heart, MessageSquare, Share2, ThumbsUp, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ForumDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the forum post data based on the ID
  const postId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/forum" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Forum Discussion</h1>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=MJ" alt="@user" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Best practices for React performance optimization</h2>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="font-medium text-primary">Michael Johnson</span>
                    <span className="mx-2">•</span>
                    <span>Posted 2 days ago</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>React</Badge>
                <Badge>Performance</Badge>
                <Badge>Optimization</Badge>
                <Badge>Frontend</Badge>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-6">
                <p>
                  I've been working on a large-scale React application and I'm running into some performance issues. The
                  app becomes sluggish when rendering large lists and complex components. I've tried a few optimization
                  techniques, but I'm looking for more advanced strategies.
                </p>
                <p>Here's what I've tried so far:</p>
                <ul>
                  <li>Using React.memo for component memoization</li>
                  <li>Implementing useCallback and useMemo hooks</li>
                  <li>Virtualizing long lists with react-window</li>
                  <li>Code splitting with React.lazy and Suspense</li>
                </ul>
                <p>
                  While these have helped, I'm still experiencing performance bottlenecks, especially when users
                  interact with multiple components simultaneously. Are there any other techniques or tools I should be
                  using?
                </p>
                <p>I'm particularly interested in:</p>
                <ol>
                  <li>State management optimizations (currently using Redux)</li>
                  <li>Rendering strategies for complex forms</li>
                  <li>Handling real-time data updates efficiently</li>
                  <li>Profiling and identifying performance bottlenecks</li>
                </ol>
                <p>Any advice or resources would be greatly appreciated!</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>42</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>18</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>24 Replies</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Follow Thread
                </Button>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold mt-8 mb-4">Replies (24)</h3>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} alt="@user" />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Sarah Parker</h4>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        {i === 1 && (
                          <Badge
                            variant="outline"
                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800"
                          >
                            Top Answer
                          </Badge>
                        )}
                      </div>

                      <div className="prose dark:prose-invert max-w-none text-sm mt-2">
                        <p>
                          Have you tried using the React DevTools Profiler? It's an excellent way to identify which
                          components are re-rendering unnecessarily and causing performance issues.
                        </p>
                        <p>
                          For Redux, I'd recommend looking into Redux Toolkit which has built-in optimizations. Also,
                          consider using the `reselect` library for memoized selectors to prevent unnecessary
                          recalculations.
                        </p>
                        <p>
                          For complex forms, you might want to check out Formik or React Hook Form, which are optimized
                          for performance. They handle form state updates efficiently and reduce unnecessary re-renders.
                        </p>
                        <p>
                          Regarding real-time updates, consider implementing a throttling or debouncing mechanism for
                          frequent data changes. This can significantly improve performance by limiting the number of
                          renders.
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>28</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Add a Reply</h3>
              <textarea
                className="w-full p-3 border rounded-md dark:bg-gray-800 min-h-[120px]"
                placeholder="Share your thoughts..."
              ></textarea>
              <div className="flex justify-end mt-4">
                <Button>Post Reply</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=60&width=60&text=MJ" alt="@user" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">Michael Johnson</h4>
                  <p className="text-sm text-gray-500">Senior Frontend Developer</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Frontend developer with 5+ years of experience specializing in React and modern JavaScript frameworks.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span>Member since 2021</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>142 posts</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Related Discussions</h3>
              <div className="space-y-4">
                {[
                  "Optimizing Redux state for large applications",
                  "React Server Components and performance",
                  "Strategies for reducing bundle size in React apps",
                ].map((title, index) => (
                  <div key={index} className="group">
                    <Link href="#" className="text-sm font-medium group-hover:text-primary">
                      {title}
                    </Link>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>32 replies</span>
                      <span className="mx-2">•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Performance</Badge>
                <Badge variant="outline">Redux</Badge>
                <Badge variant="outline">Hooks</Badge>
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Frontend</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

