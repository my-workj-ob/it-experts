import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Calendar, MessageSquare, Zap } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import StatCard from "@/components/stat-card"

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connect with IT Professionals <br />
            <span className="text-primary">Build Amazing Projects Together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DevConnect is the ultimate platform for developers, designers, DevOps specialists, data scientists,
            startups, and investors to connect, collaborate, and create.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">Explore Professionals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="AI-Powered Matchmaking"
              description="Find the perfect match for your project based on skills, experience, and interests using our TensorFlow-based algorithm."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="Seamless Communication"
              description="Connect with professionals through direct messaging and group chats to discuss ideas and opportunities."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Events & Meetups"
              description="Discover and participate in online and offline networking events, hackathons, and workshops."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Professional Profiles"
              description="Create a comprehensive profile showcasing your skills, experience, projects, and certifications."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Growing Community</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number="10,000+" label="IT Professionals" />
            <StatCard number="5,000+" label="Successful Matches" />
            <StatCard number="1,200+" label="Active Projects" />
            <StatCard number="500+" label="Monthly Events" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Connect with IT Professionals?</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join our community today and start building your network of IT professionals.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Create Your Profile</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

