import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background dark:from-primary/5">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 px-3 py-1 bg-primary/20 text-primary border-primary/30">
              The Ultimate IT Networking Platform
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Connect with IT Professionals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                Build Amazing Projects Together
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              DevConnect is the ultimate platform for developers, designers,
              DevOps specialists, data scientists, startups, and investors to
              connect, collaborate, and create.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-lg hover:shadow-primary/20"
                asChild
              >
                <Link href="/register" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5"
                asChild
              >
                <Link href="/explore">Explore Professionals</Link>
              </Button>
            </div>

            {/* <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-20 bottom-0 z-10"></div>
             
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-0">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-primary/20 text-primary border-primary/30">
                Platform Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Everything You Need
                </span>{" "}
                to Connect & Collaborate
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
                Our platform provides all the tools you need to build your
                professional network, find projects, and advance your career.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-primary/30">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  AI-Powered Matchmaking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find the perfect match for your project based on skills,
                  experience, and interests using our advanced algorithm.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-primary/30">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center mb-6">
                  <MessageSquare className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Seamless Communication
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with professionals through direct messaging and group
                  chats to discuss ideas and opportunities.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-primary/30">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Events & Meetups</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover and participate in online and offline networking
                  events, hackathons, and workshops.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-primary/30">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary/20 to-indigo-500/20 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Professional Profiles
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create a comprehensive profile showcasing your skills,
                  experience, projects, and certifications.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-amber-300">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-6">
                  <Sparkles className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Assistant
                  <Badge className="ml-2 bg-amber-100 text-amber-600 hover:bg-amber-200">
                    PRO
                  </Badge>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get personalized recommendations and assistance with our
                  AI-powered assistant.
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg hover:border-amber-300">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Secure Collaboration
                  <Badge className="ml-2 bg-amber-100 text-amber-600 hover:bg-amber-200">
                    PRO
                  </Badge>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work together on projects with secure tools and protected
                  intellectual property.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/5 dark:to-indigo-500/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-primary/20 text-primary border-primary/30">
                Growing Community
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Join{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Thousands
                </span>{" "}
                of IT Professionals
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
                Be part of our thriving community of tech professionals from
                around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg p-8 text-center shadow-md border hover:shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  10,000+
                </div>
                <div className="text-muted-foreground">IT Professionals</div>
              </div>

              <div className="bg-card rounded-lg p-8 text-center shadow-md border hover:shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  5,000+
                </div>
                <div className="text-muted-foreground">Successful Matches</div>
              </div>

              <div className="bg-card rounded-lg p-8 text-center shadow-md border hover:shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  1,200+
                </div>
                <div className="text-muted-foreground">Active Projects</div>
              </div>

              <div className="bg-card rounded-lg p-8 text-center shadow-md border hover:shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Monthly Events</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-primary/20 text-primary border-primary/30">
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                What Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Users
                </span>{" "}
                Say
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
                Hear from professionals who have found success on our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "DevConnect helped me find the perfect team members for my
                  startup. The AI matching is incredibly accurate!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-muted mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="User"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Sarah Williams</div>
                    <div className="text-sm text-muted-foreground">
                      Startup Founder
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "I've attended several events through DevConnect and made
                  valuable connections that led to job opportunities."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-muted mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="User"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Frontend Developer
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The AI assistant helped me optimize my profile and I've
                  received more connection requests than ever before!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-muted mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="User"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">
                      Data Scientist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/5 dark:to-indigo-500/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-primary/20 text-primary border-primary/30">
                Pricing Plans
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Choose the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                  Right Plan
                </span>{" "}
                for You
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
                We offer flexible plans to meet your needs, from free to premium
                options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">
                  $0
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Perfect for getting started and exploring the platform.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span>Basic profile creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span>Up to 20 connections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span>Browse public projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span>Limited AI suggestions</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/register">Sign Up Free</Link>
                </Button>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-lg border-primary relative transform scale-105">
                <Badge className="absolute -top-3 right-8 px-3 py-1 bg-amber-500 text-white">
                  Popular
                </Badge>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">
                  $9.99
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  For professionals looking to expand their network.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Enhanced profile with portfolio</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Unlimited connections</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Create up to 5 projects</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Full AI assistant access</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-primary/20"
                  asChild
                >
                  <Link
                    href="/pricing"
                    className="flex items-center justify-center"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Link>
                </Button>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">
                  $29.99
                  <span className="text-muted-foreground text-sm font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  For businesses and power users with advanced needs.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Verified profile badge</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Create unlimited projects</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Custom AI assistant</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 mr-3 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/pricing">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                Connect
              </span>{" "}
              with IT Professionals?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Join our community today and start building your network of IT
              professionals.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-lg hover:shadow-primary/20"
              asChild
            >
              <Link href="/register" className="flex items-center">
                Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DevConnect</h3>
              <p className="text-muted-foreground mb-4">
                The ultimate platform for IT professionals to connect,
                collaborate, and create.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/explore"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
