import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Briefcase, Calendar, MapPin } from "lucide-react"

interface User {
  id: number
  profile: {
    firstName: string
    lastName?: string
    avatar: string
    jobTitle?: string
    skills?: string[]
    location?: string
    experience?: string
  }
  email: string
  online: boolean
  lastMessage?: string
  unread?: number
  status?: string
  matchPercentage?: number
  isBlocked?: boolean
  isSpam?: boolean
}

// User profile card component for chat header
export const UserProfileCard = ({ user }: { user: User }) => {
  if (!user) return null

  return (
    <Card className="bg-slate-800 border-slate-700 mb-4 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-slate-700">
              <AvatarImage src={user.profile.avatar} alt={user.profile.firstName} />
              <AvatarFallback className="bg-slate-700 text-slate-200 text-xl">
                {user.profile.firstName?.substring(0, 1)}
                {user.profile.lastName?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white">
                {user.profile.firstName} {user.profile.lastName}
              </CardTitle>
              <CardDescription className="text-slate-400">{user.profile.jobTitle || "IT Professional"}</CardDescription>

              {user.matchPercentage && (
                <Badge className="mt-2 bg-green-500/20 text-green-500 border-green-500/30">
                  {user.matchPercentage}% Match
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {user.profile.location && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>{user.profile.location}</span>
            </div>
          )}

          {user.profile.jobTitle && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Briefcase className="h-4 w-4 text-slate-400" />
              <span>{user.profile.jobTitle}</span>
            </div>
          )}

          {user.profile.experience && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{user.profile.experience} experience</span>
            </div>
          )}
        </div>

        {user.profile.skills && user.profile.skills.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-slate-400" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {user.profile.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {user.isBlocked && (
          <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-400">
            This user is blocked. You won't receive their messages.
          </div>
        )}

        {user.isSpam && (
          <div className="mt-4 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-sm text-yellow-400">
            This user has been marked as spam.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
