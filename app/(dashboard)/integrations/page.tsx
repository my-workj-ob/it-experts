"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  Check,
  ExternalLink,
  Github,
  Trello,
  GitMerge,
  Slack,
  Figma,
  BugIcon as Jira,
  Calendar,
  Code,
  Database,
  Settings,
  RefreshCw,
  MessageSquare,
  Cloud,
  CheckSquare,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input placeholder="Search integrations..." className="pl-10" />
          <div className="absolute left-3 top-3 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="project-management">Project Management</TabsTrigger>
          <TabsTrigger value="code-repositories">Code Repositories</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "GitHub",
                description: "Connect your GitHub repositories to showcase your code and collaborate with others.",
                icon: <Github className="h-8 w-8" />,
                category: "Code Repositories",
                connected: true,
                popular: true,
              },
              {
                name: "GitLab",
                description: "Integrate with GitLab to manage your repositories and CI/CD pipelines.",
                icon: <Code className="h-8 w-8" />,
                category: "Code Repositories",
                connected: false,
                popular: false,
              },
              {
                name: "Bitbucket",
                description: "Connect your Bitbucket repositories for seamless code integration.",
                icon: <GitMerge className="h-8 w-8" />,
                category: "Code Repositories",
                connected: false,
                popular: false,
              },
              {
                name: "Jira",
                description: "Track issues, manage projects, and connect your development workflow.",
                icon: <Jira className="h-8 w-8" />,
                category: "Project Management",
                connected: true,
                popular: true,
              },
              {
                name: "Trello",
                description: "Visualize your projects with Kanban boards and track progress.",
                icon: <Trello className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: true,
              },
              {
                name: "Asana",
                description: "Organize, track, and manage your team's work with Asana integration.",
                icon: <Database className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: false,
              },
              {
                name: "Slack",
                description: "Get notifications and updates directly in your Slack workspace.",
                icon: <Slack className="h-8 w-8" />,
                category: "Communication",
                connected: true,
                popular: true,
              },
              {
                name: "Discord",
                description: "Connect your Discord server for team communication and updates.",
                icon: <MessageSquare className="h-8 w-8" />,
                category: "Communication",
                connected: false,
                popular: false,
              },
              {
                name: "Figma",
                description: "Showcase your design work and collaborate with designers.",
                icon: <Figma className="h-8 w-8" />,
                category: "Design",
                connected: false,
                popular: true,
              },
              {
                name: "Google Calendar",
                description: "Sync your events and meetings with Google Calendar.",
                icon: <Calendar className="h-8 w-8" />,
                category: "Productivity",
                connected: true,
                popular: false,
              },
              {
                name: "AWS",
                description: "Connect your AWS services for deployment and infrastructure management.",
                icon: <Cloud className="h-8 w-8" />,
                category: "Cloud Services",
                connected: false,
                popular: false,
              },
              {
                name: "Vercel",
                description: "Deploy your projects directly from your DevConnect portfolio.",
                icon: <Code className="h-8 w-8" />,
                category: "Deployment",
                connected: false,
                popular: false,
              },
            ].map((integration, index) => (
              <Card key={index} className={integration.connected ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{integration.name}</CardTitle>
                          {integration.popular && (
                            <Badge variant="secondary" className="ml-2">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{integration.category}</CardDescription>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/integrations/${integration.name.toLowerCase()}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Link>
                  </Button>
                  {integration.connected ? (
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "GitHub",
                description: "Connect your GitHub repositories to showcase your code and collaborate with others.",
                icon: <Github className="h-8 w-8" />,
                category: "Code Repositories",
                connected: true,
                lastSync: "2 hours ago",
                status: "Healthy",
              },
              {
                name: "Jira",
                description: "Track issues, manage projects, and connect your development workflow.",
                icon: <Jira className="h-8 w-8" />,
                category: "Project Management",
                connected: true,
                lastSync: "1 day ago",
                status: "Healthy",
              },
              {
                name: "Slack",
                description: "Get notifications and updates directly in your Slack workspace.",
                icon: <Slack className="h-8 w-8" />,
                category: "Communication",
                connected: true,
                lastSync: "3 hours ago",
                status: "Needs attention",
              },
              {
                name: "Google Calendar",
                description: "Sync your events and meetings with Google Calendar.",
                icon: <Calendar className="h-8 w-8" />,
                category: "Productivity",
                connected: true,
                lastSync: "5 hours ago",
                status: "Healthy",
              },
            ].map((integration, index) => (
              <Card key={index} className="border-primary/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>{integration.category}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        integration.status === "Healthy"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {integration.status === "Healthy" ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <RefreshCw className="h-3 w-3 mr-1" />
                      )}
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Last synced: {integration.lastSync}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add More Integrations
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="project-management" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Jira",
                description: "Track issues, manage projects, and connect your development workflow.",
                icon: <Jira className="h-8 w-8" />,
                category: "Project Management",
                connected: true,
                popular: true,
              },
              {
                name: "Trello",
                description: "Visualize your projects with Kanban boards and track progress.",
                icon: <Trello className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: true,
              },
              {
                name: "Asana",
                description: "Organize, track, and manage your team's work with Asana integration.",
                icon: <Database className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: false,
              },
              {
                name: "Monday.com",
                description: "Manage your projects and workflows with Monday.com integration.",
                icon: <Calendar className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: false,
              },
              {
                name: "ClickUp",
                description: "Manage tasks, docs, goals, and chat with your team in one place.",
                icon: <CheckSquare className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: false,
              },
              {
                name: "Notion",
                description: "Connect your Notion workspace for documentation and project management.",
                icon: <FileText className="h-8 w-8" />,
                category: "Project Management",
                connected: false,
                popular: true,
              },
            ].map((integration, index) => (
              <Card key={index} className={integration.connected ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{integration.name}</CardTitle>
                          {integration.popular && (
                            <Badge variant="secondary" className="ml-2">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{integration.category}</CardDescription>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/integrations/${integration.name.toLowerCase()}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Link>
                  </Button>
                  {integration.connected ? (
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="code-repositories" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "GitHub",
                description: "Connect your GitHub repositories to showcase your code and collaborate with others.",
                icon: <Github className="h-8 w-8" />,
                category: "Code Repositories",
                connected: true,
                popular: true,
              },
              {
                name: "GitLab",
                description: "Integrate with GitLab to manage your repositories and CI/CD pipelines.",
                icon: <Code className="h-8 w-8" />,
                category: "Code Repositories",
                connected: false,
                popular: false,
              },
              {
                name: "Bitbucket",
                description: "Connect your Bitbucket repositories for seamless code integration.",
                icon: <GitMerge className="h-8 w-8" />,
                category: "Code Repositories",
                connected: false,
                popular: false,
              },
            ].map((integration, index) => (
              <Card key={index} className={integration.connected ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{integration.name}</CardTitle>
                          {integration.popular && (
                            <Badge variant="secondary" className="ml-2">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{integration.category}</CardDescription>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/integrations/${integration.name.toLowerCase()}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Link>
                  </Button>
                  {integration.connected ? (
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Slack",
                description: "Get notifications and updates directly in your Slack workspace.",
                icon: <Slack className="h-8 w-8" />,
                category: "Communication",
                connected: true,
                popular: true,
              },
              {
                name: "Discord",
                description: "Connect your Discord server for team communication and updates.",
                icon: <MessageSquare className="h-8 w-8" />,
                category: "Communication",
                connected: false,
                popular: false,
              },
              {
                name: "Microsoft Teams",
                description: "Integrate with Microsoft Teams for seamless collaboration.",
                icon: <Users className="h-8 w-8" />,
                category: "Communication",
                connected: false,
                popular: false,
              },
            ].map((integration, index) => (
              <Card key={index} className={integration.connected ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{integration.name}</CardTitle>
                          {integration.popular && (
                            <Badge variant="secondary" className="ml-2">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{integration.category}</CardDescription>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/integrations/${integration.name.toLowerCase()}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Link>
                  </Button>
                  {integration.connected ? (
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>Manage your integration preferences and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Auto-sync integrations</Label>
                <p className="text-sm text-muted-foreground">Automatically sync your integrations every 6 hours</p>
              </div>
              <Switch id="auto-sync" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-repos">Show public repositories</Label>
                <p className="text-sm text-muted-foreground">Display your public repositories on your profile</p>
              </div>
              <Switch id="public-repos" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="project-sync">Sync project details</Label>
                <p className="text-sm text-muted-foreground">Import project details from connected services</p>
              </div>
              <Switch id="project-sync" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Integration notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about integration status</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

