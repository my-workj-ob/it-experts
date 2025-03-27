"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CreditCard, Download, Calendar, Clock, AlertCircle, ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock subscription data
  const subscription = {
    plan: "Pro",
    status: "active",
    billingCycle: "monthly",
    price: 9.99,
    nextBillingDate: "June 23, 2025",
    paymentMethod: "Visa ending in 4242",
    startDate: "May 23, 2025",
  }

  // Mock invoice data
  const invoices = [
    {
      id: "INV-001",
      date: "May 23, 2025",
      amount: 9.99,
      status: "paid",
    },
    {
      id: "INV-002",
      date: "April 23, 2025",
      amount: 9.99,
      status: "paid",
    },
    {
      id: "INV-003",
      date: "March 23, 2025",
      amount: 9.99,
      status: "paid",
    },
  ]

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/5 dark:to-indigo-500/5">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                    {subscription.plan}
                  </h3>
                  <p className="text-muted-foreground">
                    ${subscription.price}/month, billed {subscription.billingCycle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/upgrade/pro">Change Plan</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Your subscription will remain active until the end of your current billing period on{" "}
                          {subscription.nextBillingDate}. After that, you'll be downgraded to the Free plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground">
                          Cancel Subscription
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next billing date</p>
                      <p className="font-medium">{subscription.nextBillingDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Subscription started</p>
                      <p className="font-medium">{subscription.startDate}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment method</p>
                      <p className="font-medium">{subscription.paymentMethod}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/subscription?tab=payment" onClick={() => setActiveTab("payment")}>
                      Update Payment Method
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Features</CardTitle>
              <CardDescription>Features included in your current plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Enhanced profile with portfolio</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Unlimited connections</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Browse and join unlimited projects</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Create up to 5 projects</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Register for premium events</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Advanced messaging with smart replies</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>Full AI assistant access</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/pricing">
                  Compare Plans <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-4 p-4 border-b last:border-0 items-center">
                    <div>{invoice.id}</div>
                    <div>{invoice.date}</div>
                    <div>${invoice.amount.toFixed(2)}</div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/invoice/${invoice.id}`}>
                          <Download className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>

              <Button className="w-full">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>Manage your billing address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">123 Main St</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
                <p className="text-muted-foreground">United States</p>
              </div>

              <Button variant="outline" className="w-full">
                Update Billing Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg flex items-start gap-4">
        <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium mb-1">Need help with your subscription?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you with any questions about your subscription or billing.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact-support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

