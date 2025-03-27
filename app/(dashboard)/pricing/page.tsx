"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Check,
  X,
  Zap,
  CreditCard,
  Users,
  MessageSquare,
  Calendar,
  FolderKanban,
  Video,
  BookOpen,
  Briefcase,
  Award,
  LinkIcon,
  Code,
  Trophy,
  FileCode,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Free",
      description: "Basic features for individuals getting started",
      price: {
        monthly: 0,
        annual: 0,
      },
      features: [
        { name: "Basic profile creation", included: true },
        { name: "Limited Explore access", included: true },
        { name: "Basic Chat functionality", included: true },
        { name: "View public Events", included: true },
        { name: "Join up to 3 Projects", included: true },
        { name: "Limited Videos access", included: true },
        { name: "Basic Learning resources", included: true },
        { name: "Simple Portfolio", included: true },
        { name: "View Mentorship opportunities", included: false },
        { name: "Basic Skills verification", included: true },
        { name: "Limited Jobs access", included: true },
        { name: "No Integrations", included: false },
        { name: "Forum read-only access", included: true },
        { name: "Limited AI Recommendations", included: false },
        { name: "No Code Review access", included: false },
        { name: "Basic Chat & Video", included: true },
        { name: "Limited Tasks management", included: true },
        { name: "No Live Coding sessions", included: false },
        { name: "View Hackathons", included: true },
      ],
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      buttonDisabled: true,
    },
    {
      name: "Pro",
      description: "Advanced features for professionals and active networkers",
      price: {
        monthly: 9.99,
        annual: 7.99,
      },
      features: [
        { name: "Enhanced profile with portfolio", included: true },
        { name: "Full Explore access", included: true },
        { name: "Advanced Chat with smart replies", included: true },
        { name: "Create and join Events", included: true },
        { name: "Create up to 5 Projects", included: true },
        { name: "Full Videos access", included: true },
        { name: "Complete Learning resources", included: true },
        { name: "Advanced Portfolio builder", included: true },
        { name: "Access to Mentorship program", included: true },
        { name: "Full Skills verification", included: true },
        { name: "Priority Jobs access", included: true },
        { name: "Basic Integrations", included: true },
        { name: "Full Forum access", included: true },
        { name: "Advanced AI Recommendations", included: true },
        { name: "Basic Code Review", included: true },
        { name: "Enhanced Chat & Video calls", included: true },
        { name: "Full Tasks management", included: true },
        { name: "Join Live Coding sessions", included: true },
        { name: "Participate in Hackathons", included: true },
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      buttonDisabled: false,
    },
    {
      name: "Enterprise",
      description: "Premium features for businesses and power users",
      price: {
        monthly: 29.99,
        annual: 24.99,
      },
      features: [
        { name: "Verified profile badge", included: true },
        { name: "Priority Explore ranking", included: true },
        { name: "Custom Chat solutions", included: true },
        { name: "Host premium Events", included: true },
        { name: "Unlimited Projects creation", included: true },
        { name: "Premium Videos features", included: true },
        { name: "Custom Learning paths", included: true },
        { name: "Professional Portfolio tools", included: true },
        { name: "Become a Mentor", included: true },
        { name: "Advanced Skills certification", included: true },
        { name: "Featured Jobs listings", included: true },
        { name: "Custom Integrations", included: true },
        { name: "Moderate Forum sections", included: true },
        { name: "Custom AI Recommendations", included: true },
        { name: "Professional Code Review", included: true },
        { name: "Premium Chat & Video features", included: true },
        { name: "Enterprise Tasks & Kanban", included: true },
        { name: "Host Live Coding sessions", included: true },
        { name: "Organize Hackathons", included: true },
      ],
      popular: false,
      buttonText: "Upgrade to Enterprise",
      buttonVariant: "default" as const,
      buttonDisabled: false,
    },
  ]

  const featureIcons = {
    profile: Users,
    Explore: Users,
    Chat: MessageSquare,
    Events: Calendar,
    Projects: FolderKanban,
    Videos: Video,
    Learning: BookOpen,
    Portfolio: Briefcase,
    Mentorship: Users,
    Skills: Award,
    Jobs: Briefcase,
    Integrations: LinkIcon,
    Forum: MessageSquare,
    "AI Recommendations": Sparkles,
    "Code Review": FileCode,
    "Chat & Video": Video,
    Tasks: FolderKanban,
    "Live Coding": Code,
    Hackathons: Trophy,
  }

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of DevConnect with our premium plans designed for IT professionals.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
            <Switch
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            />
            <span className={billingCycle === "annual" ? "font-medium" : "text-muted-foreground"}>Annual</span>
          </div>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
            Save 20%
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && <Badge className="absolute -top-2 right-4 px-3 py-1">Most Popular</Badge>}
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                </span>
                <span className="text-muted-foreground ml-2">
                  {plan.price.monthly > 0 ? `/ ${billingCycle === "monthly" ? "month" : "month, billed annually"}` : ""}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      plan.name === "Free" ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : plan.name === "Pro" ? (
                        <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.buttonVariant}
                className={`w-full ${plan.name !== "Free" ? "bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90" : ""}`}
                disabled={plan.buttonDisabled}
                asChild={!plan.buttonDisabled}
              >
                {plan.buttonDisabled ? (
                  <span>{plan.buttonText}</span>
                ) : (
                  <Link href={`/upgrade/${plan.name.toLowerCase()}`}>
                    {plan.name === "Pro" && <Zap className="mr-2 h-4 w-4 animate-pulse" />}
                    {plan.name === "Enterprise" && <CreditCard className="mr-2 h-4 w-4" />}
                    {plan.buttonText}
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">All Features</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Free</th>
                    <th className="text-center py-4 px-4">Pro</th>
                    <th className="text-center py-4 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Users className="h-5 w-5 text-amber-500 mr-2" />
                      Explore
                    </td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Full Access</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Priority</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <MessageSquare className="h-5 w-5 text-amber-500 mr-2" />
                      Chat
                    </td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Advanced</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                      Events
                    </td>
                    <td className="text-center py-4 px-4">View Only</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Create & Join</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Host Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <FolderKanban className="h-5 w-5 text-amber-500 mr-2" />
                      Projects
                    </td>
                    <td className="text-center py-4 px-4">Join up to 3</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Create up to 5</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Video className="h-5 w-5 text-amber-500 mr-2" />
                      Videos
                    </td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Full Access</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <BookOpen className="h-5 w-5 text-amber-500 mr-2" />
                      Learn
                    </td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Complete</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Custom Paths</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Briefcase className="h-5 w-5 text-amber-500 mr-2" />
                      Portfolio
                    </td>
                    <td className="text-center py-4 px-4">Simple</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Advanced</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Professional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Users className="h-5 w-5 text-amber-500 mr-2" />
                      Mentorship
                    </td>
                    <td className="text-center py-4 px-4">View Only</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Access Program</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Become a Mentor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Award className="h-5 w-5 text-amber-500 mr-2" />
                      Skills
                    </td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Full</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Briefcase className="h-5 w-5 text-amber-500 mr-2" />
                      Jobs
                    </td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Priority</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Featured</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <LinkIcon className="h-5 w-5 text-amber-500 mr-2" />
                      Integrations
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Basic</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <MessageSquare className="h-5 w-5 text-amber-500 mr-2" />
                      Forum
                    </td>
                    <td className="text-center py-4 px-4">Read-only</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Full Access</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Moderate</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                      AI Recommendations
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Advanced</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <FileCode className="h-5 w-5 text-amber-500 mr-2" />
                      Code Review
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Basic</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Professional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Video className="h-5 w-5 text-amber-500 mr-2" />
                      Chat & Video
                    </td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Enhanced</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <FolderKanban className="h-5 w-5 text-amber-500 mr-2" />
                      Tasks
                    </td>
                    <td className="text-center py-4 px-4">Limited</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Full</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Enterprise</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Code className="h-5 w-5 text-amber-500 mr-2" />
                      Live Coding
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Join Sessions</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Host Sessions</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium flex items-center">
                      <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                      Hackathons
                    </td>
                    <td className="text-center py-4 px-4">View Only</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-medium">Participate</td>
                    <td className="text-center py-4 px-4 text-amber-600 font-medium">Organize</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Can I switch between plans?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. If you downgrade, your new plan will take
                  effect at the end of your current billing cycle.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">How does the annual billing work?</h3>
                <p className="text-muted-foreground">
                  With annual billing, you pay for 12 months upfront and receive a 20% discount compared to monthly
                  billing.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Is there a free trial for paid plans?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 14-day free trial for the Pro plan. No credit card required to start.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Can I get a refund if I'm not satisfied?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our
                  support team.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="enterprise" className="mt-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Enterprise Solutions</h3>
                <p className="text-muted-foreground mb-4">
                  Looking for a custom solution for your organization? Our Enterprise plan offers additional features
                  and customization options.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>Custom branding and white-labeling options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>Dedicated account manager and priority support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>Advanced analytics and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>API access for custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>Enhanced security features and compliance</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-500/90 hover:to-orange-600/90"
                  asChild
                >
                  <Link href="/contact-sales">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-muted p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team is here to help you find the perfect plan for your needs. Schedule a free consultation with one of
          our experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/compare-plans">Compare All Plans</Link>
          </Button>
          <Button asChild>
            <Link href="/contact-sales">Talk to Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

