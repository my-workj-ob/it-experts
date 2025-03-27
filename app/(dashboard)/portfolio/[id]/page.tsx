import { ArrowLeft, Share2, Heart, Bookmark, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the portfolio data based on the ID
  const portfolioId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/portfolio" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Portfolio Project</h1>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img
                src="/placeholder.svg?height=500&width=800"
                alt="Portfolio Project"
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">E-Commerce Platform Redesign</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.
                  The project included user research, wireframing, prototyping, and implementation.
                </p>

                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <p className="text-sm">
                      This project was a comprehensive redesign of an existing e-commerce platform that was struggling
                      with low conversion rates and poor user engagement. The goal was to create a more intuitive,
                      visually appealing, and conversion-focused design while maintaining the brand identity.
                      <br />
                      <br />
                      The redesign process involved extensive user research, including interviews, surveys, and
                      usability testing. Based on the insights gathered, I created wireframes and interactive prototypes
                      that were tested with real users before implementation.
                      <br />
                      <br />
                      The final design features a clean, modern aesthetic with a focus on product imagery, simplified
                      navigation, and a streamlined checkout process. The result was a 35% increase in conversion rate
                      and a 42% increase in average session duration.
                    </p>
                  </TabsContent>
                  <TabsContent value="technologies">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["React", "Next.js", "Tailwind CSS", "Figma", "Framer Motion", "TypeScript"].map((tech) => (
                        <div key={tech} className="bg-secondary p-3 rounded-md text-center">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Balancing aesthetic design with performance optimization</li>
                      <li>Creating a responsive design that works across all device sizes</li>
                      <li>Implementing complex filtering and search functionality</li>
                      <li>Optimizing the checkout flow to reduce abandonment</li>
                      <li>Integrating with existing backend systems</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Comments</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b">
                    <img
                      src={`/placeholder.svg?height=40&width=40&text=User${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">User Name</h4>
                        <span className="text-xs text-gray-500 ml-2">2 days ago</span>
                      </div>
                      <p className="text-sm mt-1">
                        Great work! I really like the attention to detail in the checkout process.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <textarea
                  className="w-full p-3 border rounded-md dark:bg-gray-800"
                  rows={3}
                  placeholder="Add a comment..."
                ></textarea>
                <Button className="mt-2">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/placeholder.svg?height=60&width=60&text=User"
                  alt="Creator"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="font-bold">Alex Johnson</h3>
                  <p className="text-sm text-gray-500">UI/UX Designer</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm">Created</span>
                  <span className="text-sm">June 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Category</span>
                  <span className="text-sm">Web Design</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Client</span>
                  <span className="text-sm">TechRetail Inc.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="text-sm">3 months</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Contact Creator</Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Case Study
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">More Projects by Alex</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={`/placeholder.svg?height=60&width=60&text=P${i}`}
                      alt="Project thumbnail"
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-sm">Mobile App Design</h4>
                      <p className="text-xs text-gray-500">UI/UX Design</p>
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

