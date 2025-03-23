import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  category: string
  attendees: number
  image: string
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge
            variant={event.type === "Virtual" ? "secondary" : "default"}
            className={
              event.type === "Virtual"
                ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                : "bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/30"
            }
          >
            {event.type}
          </Badge>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {event.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold text-xl text-primary">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/events/${event.id}`}>Details</Link>
        </Button>
        <Button>Register</Button>
      </CardFooter>
    </Card>
  )
}

