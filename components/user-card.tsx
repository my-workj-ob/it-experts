import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Briefcase, MessageSquare, UserPlus } from "lucide-react"

interface User {
  id: number
  name: string
  role: string
  location: string
  skills: string[]
  experience: string
  matchScore: number
  avatar: string
}

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="h-2 bg-primary" />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="font-semibold bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/30"
          >
            {user.matchScore}% Match
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-xl text-primary">{user.name}</h3>
          <p className="text-muted-foreground">{user.role}</p>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Briefcase className="h-3 w-3 mr-1" />
            <span>{user.experience}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center mt-4">
          {user.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" className="w-[48%]">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button size="sm" className="w-[48%]">
          <UserPlus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  )
}

