import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, MessageSquare, ThumbsUp, Eye, Clock, Upload, Filter } from "lucide-react"

export default function CodeReviewPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Code Review Platform</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Get feedback on your code from the community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Upload size={16} />
            Submit Code
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="my-submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {[1, 2, 3, 4].map((review) => (
            <Card key={review} className="mb-4">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <CardTitle className="text-lg">React Authentication System</CardTitle>
                      <CardDescription>Submitted by Michael Chen • 3 hours ago</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    <span>Avg. response time: 2 hours</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I've implemented a custom authentication system using React and Firebase. Looking for feedback on
                  security best practices and code organization.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code>
                      {`const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};`}
                    </code>
                  </pre>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs">
                    React
                  </span>
                  <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 px-2 py-1 rounded-full text-xs">
                    Firebase
                  </span>
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded-full text-xs">
                    Authentication
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare size={16} />8 Comments
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      12
                    </Button>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Eye size={16} />
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="popular">
          <div className="text-center py-12">
            <Code size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">Popular code reviews will appear here</h3>
            <p className="text-gray-500 dark:text-gray-400">Browse the recent tab to see the latest code submissions</p>
          </div>
        </TabsContent>

        <TabsContent value="my-submissions">
          <div className="text-center py-12">
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">You haven't submitted any code yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Submit your code to get feedback from the community</p>
            <Button className="flex items-center gap-2 mx-auto">
              <Upload size={16} />
              Submit Code
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="my-reviews">
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">You haven't reviewed any code yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Help others by reviewing their code submissions</p>
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <Eye size={16} />
              Browse Submissions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

