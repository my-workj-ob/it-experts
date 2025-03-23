import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2">
        {icon}
        <h3 className="text-xl font-semibold text-center">{title}</h3>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">{description}</CardContent>
    </Card>
  )
}

