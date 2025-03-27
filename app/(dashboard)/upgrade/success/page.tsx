"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="container max-w-md mx-auto py-10">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Upgrade Successful!</CardTitle>
          <CardDescription>
            Thank you for upgrading to the Pro plan. Your account has been successfully upgraded.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/5 dark:to-indigo-500/5 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Order Number</div>
            <div className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium text-primary">Pro (Monthly)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">$9.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Billing Date</span>
              <span className="font-medium">June 23, 2025</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/invoice/latest">
                <Download className="h-4 w-4 mr-2" />
                Invoice
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/settings">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Subscription
              </Link>
            </Button>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
            asChild
          >
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Redirecting to dashboard in {countdown} seconds...</p>
        </CardFooter>
      </Card>
    </div>
  )
}

