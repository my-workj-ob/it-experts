import {
  ArrowLeft,
  Bookmark,
  Building,
  Calendar,
  DollarSign,
  Globe,
  MapPin,
  MessageSquare,
  Share2,
  Briefcase,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the job data based on the ID
  const jobId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/jobs" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Senior React Developer</h1>
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
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/placeholder.svg?height=80&width=80&text=TC"
                  alt="Company Logo"
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <h2 className="text-xl font-bold">TechCorp Inc.</h2>
                  <p className="text-gray-500 dark:text-gray-400">Software Development • 500-1000 employees</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">Salary</span>
                  </div>
                  <span className="font-medium">$120K - $150K</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Location</span>
                  </div>
                  <span className="font-medium">Remote (US)</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span className="text-sm">Job Type</span>
                  </div>
                  <span className="font-medium">Full-time</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Posted</span>
                  </div>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Node.js</Badge>
                <Badge>GraphQL</Badge>
                <Badge>AWS</Badge>
                <Badge>Redux</Badge>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <div className="space-y-4">
                    <p className="text-sm">
                      TechCorp is looking for a Senior React Developer to join our growing team. In this role, you will
                      be responsible for building and maintaining high-performance web applications using React and
                      related technologies. You will work closely with our product and design teams to create intuitive
                      user interfaces and implement complex features.
                    </p>
                    <div>
                      <h3 className="font-bold mb-2">Responsibilities:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Design and implement new features and functionality using React</li>
                        <li>Build reusable components and libraries for future use</li>
                        <li>Optimize components for maximum performance across devices and browsers</li>
                        <li>Collaborate with backend developers to integrate REST and GraphQL APIs</li>
                        <li>Write unit and integration tests for your code</li>
                        <li>Participate in code reviews and mentor junior developers</li>
                        <li>Stay up-to-date with emerging trends and technologies in frontend development</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="requirements">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-2">Required Skills:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>5+ years of experience in frontend development</li>
                        <li>3+ years of experience with React and its ecosystem</li>
                        <li>Strong proficiency in TypeScript</li>
                        <li>Experience with state management libraries (Redux, MobX, Zustand)</li>
                        <li>Familiarity with GraphQL and Apollo Client</li>
                        <li>Knowledge of modern frontend build tools (Webpack, Vite)</li>
                        <li>Understanding of CI/CD pipelines and DevOps practices</li>
                        <li>Excellent problem-solving and communication skills</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Nice to Have:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Experience with Next.js or other React frameworks</li>
                        <li>Knowledge of backend technologies (Node.js, Express)</li>
                        <li>Experience with cloud services (AWS, Azure, GCP)</li>
                        <li>Contributions to open-source projects</li>
                        <li>Experience with mobile development (React Native)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="benefits">
                  <div className="space-y-4">
                    <p className="text-sm">
                      At TechCorp, we offer a comprehensive benefits package to support our employees' well-being and
                      professional growth.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Competitive salary and equity options</li>
                      <li>Flexible work hours and remote work policy</li>
                      <li>Comprehensive health, dental, and vision insurance</li>
                      <li>401(k) matching program</li>
                      <li>Generous paid time off and parental leave</li>
                      <li>Professional development budget ($2,000/year)</li>
                      <li>Home office stipend ($500/year)</li>
                      <li>Regular team events and retreats</li>
                      <li>Mental health and wellness programs</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="company">
                  <div className="space-y-4">
                    <p className="text-sm">
                      TechCorp is a leading software company specializing in cloud-based solutions for enterprise
                      clients. Founded in 2010, we've grown to over 500 employees across the globe, with offices in San
                      Francisco, New York, London, and Singapore.
                    </p>
                    <p className="text-sm">
                      Our mission is to empower businesses with innovative technology solutions that drive growth and
                      efficiency. We're backed by top-tier investors and have been recognized as one of the
                      fastest-growing tech companies in the industry.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <a href="#" className="text-sm text-primary">
                          techcorp.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        <span className="text-sm">San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-sm">500-1000 employees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm">Founded in 2010</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <Button className="w-full mb-4">Apply Now</Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Recruiter
              </Button>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Applications</span>
                  <span className="font-medium">78</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interviews</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time to hire</span>
                  <span className="font-medium">2-3 weeks</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {[
                    "Frontend Developer at StartupX",
                    "React Engineer at BigTech",
                    "Senior UI Developer at FinCorp",
                  ].map((job, index) => (
                    <div key={index} className="group">
                      <Link href="#" className="text-sm font-medium group-hover:text-primary">
                        {job}
                      </Link>
                      <p className="text-xs text-gray-500">Posted 3 days ago</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Job Insights</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Interview Difficulty</span>
                    <span>Moderate</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Work/Life Balance</span>
                    <span>Good</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Career Growth</span>
                    <span>Excellent</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

