import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Testimonial {
  content: string
  author: {
    name: string
    role: string
    avatar: string
  }
  rating: number
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-500"
                fill={i < testimonial.rating ? "currentColor" : "none"}
              />
            ))}
        </div>
        <p className="text-muted-foreground flex-1 mb-4">"{testimonial.content}"</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
            <AvatarFallback>{testimonial.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{testimonial.author.name}</div>
            <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

