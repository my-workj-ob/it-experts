"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TermsAndConditionsPage() {
  const [accepted, setAccepted] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleAccept = () => {
    if (!accepted) {
      toast({
        title: "Please accept the terms",
        description: "You must accept the terms and conditions to continue",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Terms accepted",
      description: "You have successfully accepted the terms and conditions",
    })

    // Redirect to dashboard after accepting
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms and Conditions</CardTitle>
          <CardDescription>Please read these terms and conditions carefully before using our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="space-y-4 mt-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Welcome to the IT Networking Platform. By accessing or using our platform, you agree to be bound by
                  these Terms and Conditions. If you disagree with any part of these terms, you may not access the
                  service.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">2. User Agreements</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  By creating an account on our platform, you agree to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Account Registration</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To use certain features of the platform, you must register for an account. When you register, you
                  agree to provide accurate information. You are responsible for maintaining the confidentiality of your
                  account information and for all activities that occur under your account.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">4. Intellectual Property</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The platform and its original content, features, and functionality are owned by the IT Networking
                  Platform and are protected by international copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">5. Termination</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any
                  reason, including without limitation if you breach the Terms and Conditions. Upon termination, your
                  right to use the platform will immediately cease.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">6. Limitation of Liability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  In no event shall the IT Networking Platform, nor its directors, employees, partners, agents,
                  suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                  losses.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">7. Governing Law</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms shall be governed and construed in accordance with the laws, without regard to its
                  conflict of law provisions.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">8. Changes to Terms</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material we will try to provide at least 30 days notice prior to any new terms taking
                  effect.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4 mt-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">Privacy Policy</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your privacy is important to us. It is our policy to respect your privacy regarding any information we
                  may collect from you across our platform.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We only collect information about you if we have a reason to do so. We collect information in the
                  following ways:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Information you provide to us (e.g., account details, profile information)</li>
                  <li>Information we collect automatically (e.g., cookies, log information)</li>
                  <li>Information we get from third parties (e.g., social media platforms)</li>
                </ul>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">2. How We Use Information</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We use the information we collect in various ways, including to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Provide, operate, and maintain our platform</li>
                  <li>Improve, personalize, and expand our platform</li>
                  <li>Understand and analyze how you use our platform</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you for customer service, updates, and marketing</li>
                </ul>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Data Retention</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We retain your personal information only for as long as is necessary for the purposes set out in this
                  Privacy Policy. We will retain and use your information to the extent necessary to comply with our
                  legal obligations, resolve disputes, and enforce our policies.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">4. Data Security</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We implement security measures to maintain the safety of your personal information when you enter,
                  submit, or access your personal information. However, no method of transmission over the Internet or
                  method of electronic storage is 100% secure.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="conduct" className="space-y-4 mt-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">Code of Conduct</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our platform is dedicated to providing a harassment-free and inclusive experience for everyone. We do
                  not tolerate harassment of participants in any form.
                </p>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">1. Expected Behavior</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Be respectful and considerate</li>
                  <li>Refrain from demeaning, discriminatory, or harassing behavior</li>
                  <li>Be mindful of your surroundings and fellow participants</li>
                  <li>Alert community leaders if you notice dangerous situations or someone in distress</li>
                </ul>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">2. Unacceptable Behavior</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Intimidating, harassing, abusive, discriminatory, or derogatory conduct</li>
                  <li>Violence, threats of violence, or violent language</li>
                  <li>Posting or displaying sexually explicit or violent material</li>
                  <li>Posting or threatening to post other people's personally identifying information</li>
                  <li>Inappropriate photography or recording</li>
                  <li>Unwelcome sexual attention or advances</li>
                  <li>Advocating for or encouraging any of the above behavior</li>
                </ul>
              </section>

              <Separator className="my-4" />

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Consequences of Unacceptable Behavior</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Unacceptable behavior will not be tolerated. Anyone asked to stop unacceptable behavior is expected to
                  comply immediately. If a participant engages in unacceptable behavior, we may take any action we deem
                  appropriate, including warning the offender or expulsion from the platform with no refund.
                </p>
              </section>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={accepted} onCheckedChange={(checked) => setAccepted(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the terms and conditions
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={handleAccept}>Accept and Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

