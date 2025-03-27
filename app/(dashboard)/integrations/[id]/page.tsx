import { ArrowLeft, Check, ExternalLink, Github, GitMerge, GitPullRequest, Info, Settings, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function IntegrationDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the integration data based on the ID
  const integrationId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/integrations" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">GitHub Integration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-black p-4 rounded-full">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">GitHub</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Connect your GitHub repositories to your DevConnect account
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800"
                  >
                    Connected
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="repositories">Repositories</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">About This Integration</h3>
                      <p className="text-sm">
                        The GitHub integration allows you to connect your GitHub repositories to your DevConnect
                        account. This enables you to showcase your code, collaborate with other developers, and track
                        your contributions directly from the platform.
                        <br />
                        <br />
                        With this integration, you can:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                        <li>Display your repositories on your profile</li>
                        <li>Share code snippets in discussions and messages</li>
                        <li>Receive notifications for repository events</li>
                        <li>Create and review pull requests</li>
                        <li>Track issues and project boards</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Recent Activity</h3>
                      <div className="space-y-4">
                        {[
                          {
                            icon: <GitPullRequest className="h-5 w-5" />,
                            title: "Pull request merged",
                            description: "Feature/user authentication",
                            time: "2 hours ago",
                          },
                          {
                            icon: <GitMerge className="h-5 w-5" />,
                            title: "Branch merged",
                            description: "develop → main",
                            time: "Yesterday",
                          },
                          {
                            icon: <Github className="h-5 w-5" />,
                            title: "Repository created",
                            description: "e-commerce-platform",
                            time: "3 days ago",
                          },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 pb-3 border-b">
                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">{activity.icon}</div>
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                            </div>
                            <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2">Connection Status</h3>
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 dark:text-green-400">Connected to GitHub</h4>
                          <p className="text-sm text-green-700 dark:text-green-500">
                            Your GitHub account is successfully connected. You have access to all repositories and
                            features.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="repositories">
                  <div className="space-y-4">
                    {[
                      {
                        name: "e-commerce-platform",
                        description: "A full-stack e-commerce platform built with React and Node.js",
                        language: "TypeScript",
                        stars: 24,
                        forks: 8,
                        updated: "2 days ago",
                      },
                      {
                        name: "react-component-library",
                        description: "A collection of reusable React components with Storybook documentation",
                        language: "JavaScript",
                        stars: 156,
                        forks: 32,
                        updated: "1 week ago",
                      },
                      {
                        name: "node-api-starter",
                        description: "A starter template for Node.js APIs with Express and MongoDB",
                        language: "JavaScript",
                        stars: 87,
                        forks: 15,
                        updated: "3 weeks ago",
                      },
                      {
                        name: "portfolio-website",
                        description: "My personal portfolio website built with Next.js",
                        language: "TypeScript",
                        stars: 12,
                        forks: 3,
                        updated: "1 month ago",
                      },
                    ].map((repo, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-primary">{repo.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">{repo.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                  <span className="text-xs">{repo.language}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <span>★</span>
                                  <span>{repo.stars}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <span>🍴</span>
                                  <span>{repo.forks}</span>
                                </div>
                                <span className="text-xs text-gray-500">Updated {repo.updated}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Integration Settings</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Display repositories on profile</h4>
                              <p className="text-sm text-gray-500">
                                Show your pinned repositories on your public profile
                              </p>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Receive notifications</h4>
                              <p className="text-sm text-gray-500">Get notified about repository events</p>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Sync contributions</h4>
                              <p className="text-sm text-gray-500">
                                Show your GitHub contributions on your activity feed
                              </p>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Allow code sharing</h4>
                              <p className="text-sm text-gray-500">
                                Enable sharing code snippets from private repositories
                              </p>
                            </div>
                            <Switch checked={false} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Permissions</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Repository Access</h4>
                              <p className="text-sm text-gray-500">DevConnect has access to all public repositories</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Authorized on</h4>
                              <p className="text-sm text-gray-500">June 15, 2023 at 10:24 AM</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Permissions
                      </Button>
                      <Button variant="destructive">Disconnect</Button>
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
              <h3 className="font-bold mb-4">Integration Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800"
                  >
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connected Account</span>
                  <span className="text-sm font-medium">github.com/username</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connected On</span>
                  <span className="text-sm font-medium">June 15, 2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Synced</span>
                  <span className="text-sm font-medium">Today, 10:24 AM</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full">
                  <GitMerge className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Other Integrations</h3>
              <div className="space-y-4">
                {[
                  {
                    name: "GitLab",
                    icon: (
                      <div className="bg-orange-600 p-2 rounded-full">
                        <span className="text-white font-bold">GL</span>
                      </div>
                    ),
                    status: "Not Connected",
                  },
                  {
                    name: "Jira",
                    icon: (
                      <div className="bg-blue-600 p-2 rounded-full">
                        <span className="text-white font-bold">J</span>
                      </div>
                    ),
                    status: "Not Connected",
                  },
                  {
                    name: "Trello",
                    icon: (
                      <div className="bg-sky-500 p-2 rounded-full">
                        <span className="text-white font-bold">T</span>
                      </div>
                    ),
                    status: "Not Connected",
                  },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {integration.icon}
                      <span className="font-medium">{integration.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
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

