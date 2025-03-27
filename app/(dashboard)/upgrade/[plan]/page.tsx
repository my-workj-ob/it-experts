"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Check, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

export default function UpgradePage() {
  const params = useParams()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">("credit-card")
  const [isLoading, setIsLoading] = useState(false)

  const planName = typeof params.plan === "string" ? params.plan : ""

  const plans = {
    pro: {
      name: "Pro",
      price: {
        monthly: 9.99,
        annual: 7.99 * 12,
      },
      features: [
        "Enhanced profile with portfolio",
        "Unlimited connections",
        "Browse and join unlimited projects",
        "Create up to 5 projects",
        "Register for premium events",
        "Advanced messaging with smart replies",
        "Full AI assistant access",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: {
        monthly: 29.99,
        annual: 24.99 * 12,
      },
      features: [
        "Verified profile badge",
        "Unlimited connections",
        "Create unlimited projects",
        "Early access to exclusive events",
        "Advanced messaging with analytics",
        "Custom AI assistant",
        "Priority support",
        "API access",
      ],
    },
  }

  const currentPlan = planName === "pro" ? plans.pro : plans.enterprise

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push("/upgrade/success")
    }, 2000)
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/pricing">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Upgrade to {currentPlan.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Cycle</CardTitle>
              <CardDescription>Choose how you want to be billed</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={billingCycle}
                onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                  <Label
                    htmlFor="monthly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-2">Monthly</div>
                    <div className="text-2xl font-bold">${currentPlan.price.monthly}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="annual" id="annual" className="peer sr-only" />
                  <Label
                    htmlFor="annual"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary relative overflow-hidden"
                  >
                    <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Save 20%
                    </Badge>
                    <div className="mb-2">Annual</div>
                    <div className="text-2xl font-bold">${currentPlan.price.annual.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(currentPlan.price.annual / 12).toFixed(2)} per month, billed annually
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="credit-card"
                onValueChange={(value) => setPaymentMethod(value as "credit-card" | "paypal")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="space-y-4 mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="saveCard" />
                      <Label htmlFor="saveCard">Save card for future payments</Label>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="paypal" className="mt-4">
                  <div className="text-center p-6 space-y-4">
                    <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment.</p>
                    <Button className="w-full" onClick={handleSubmit}>
                      Continue with PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6 border-gradient-to-r from-primary to-indigo-500">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/5 dark:to-indigo-500/5">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>
                  {currentPlan.name} Plan ({billingCycle})
                </span>
                <span>
                  ${billingCycle === "monthly" ? currentPlan.price.monthly : currentPlan.price.annual.toFixed(2)}
                </span>
              </div>
              {billingCycle === "annual" && (
                <div className="flex justify-between text-green-600">
                  <span>Annual discount</span>
                  <span>-${(currentPlan.price.monthly * 12 - currentPlan.price.annual).toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ${billingCycle === "monthly" ? currentPlan.price.monthly : currentPlan.price.annual.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 mt-6">
                <h3 className="font-medium">What's included:</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 mr-2 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
                size="lg"
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Processing..." : `Upgrade Now`}
              </Button>
              <div className="flex items-center justify-center text-xs text-muted-foreground gap-1">
                <Lock className="h-3 w-3" />
                <span>Secure payment</span>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                By upgrading, you agree to our Terms of Service and Privacy Policy. You can cancel anytime.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

