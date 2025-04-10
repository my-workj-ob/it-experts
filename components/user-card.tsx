"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { get, isArray, isNull } from "lodash"
import { Briefcase, Check, Clock, MapPin, MessageSquare, UserPlus } from "lucide-react"

interface User {
  id: number
  firstName: string
  role: string
  location: string
  skills: string[]
  experience: string
  matchPercentage: number
  avatar: string
  status: string
}

interface UserCardProps {
  user: User
  onClick: (userId: { receiverId: number }) => void,
  status: string
  matchPercentage: number
  skills: []
}

export default function UserCard({ matchPercentage, status, user, skills, onClick }: UserCardProps) {
  // Get connection status details
  const getConnectionDetails = () => {
    switch (status) {
      case "connect":
        return {
          text: "Connect",
          icon: UserPlus,
          variant: "default" as const,
          tooltip: "Send connection request",
        }
      case "pending":
        return {
          text: "Pending",
          icon: Clock,
          variant: "outline" as const,
          className: "text-amber-500 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-600",
          tooltip: "Connection request pending",
        }
      case "accepted":
        return {
          text: "Connected",
          icon: Check,
          variant: "outline" as const,
          className: "text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700",
          tooltip: "You are connected",
        }
      default:
        return {
          text: "Connect",
          icon: UserPlus,
          variant: "default" as const,
          tooltip: "Send connection request",
        }
    }
  }

  const connectionDetails = getConnectionDetails()
  const ConnectionIcon = connectionDetails.icon

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        {/* Gradient top bar that changes color based on connection status */}
        <div
          className={`h-2 ${status === "accepted"
            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
            : status === "pending"
              ? "bg-gradient-to-r from-amber-400 to-amber-500"
              : "bg-gradient-to-r from-primary to-indigo-600"
            }`}
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="font-semibold bg-gradient-to-r from-primary/20 to-indigo-500/20 text-primary border-primary/30"
          >
            {matchPercentage}% Match
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
            <AvatarImage src={get(user, "avatar")} alt={get(user, "firstName")} />
            <AvatarFallback>{get(user, "firstName", "").substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-xl text-primary">{get(user, "firstName")}</h3>
          <p className="text-muted-foreground">{get(user, "role", "")}</p>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{get(user, "location", "Tashkent")}</span>
          </div>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Briefcase className="h-3 w-3 mr-1" />
            <span>{get(user, "experience", "2 years")}</span>
          </div>

          {/* Connection status badge */}
          {status !== "connect" ? (
            <Badge
              variant="outline"
              className={`mt-3 ${status === "accepted"
                ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                : "text-amber-500 border-amber-200 bg-amber-50"
                }`}
            >
              <ConnectionIcon className="h-3 w-3 mr-1" />
              {status === "accepted" ? "Connected" : "Pending"}
            </Badge>
          ) : <Badge
            variant="outline"
            className={`mt-3 ${status === "connect"
              ? "text-red-600 border-red-200 bg-red-50"
              : "text-amber-500 border-amber-200 bg-amber-50"
              }`}
          >
            <ConnectionIcon className="h-3 w-3 mr-1" />
            not Connected
          </Badge>}
        </div>

        <div className="flex flex-wrap gap-1 justify-center mt-4">
          {isArray(skills) && skills.map((skill) => (
            <Badge key={skill} variant="outline" className="font-normal">
              {isNull(skill) ? "no skills" : skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" className="w-[48%]" onClick={() => {
          if (status === "accepted") {
            window.location.href = `/chat?receiverId=${get(user, "id")}`
          }
          if (status === "pending") {
            window.location.href = `/chat?receiverId=${get(user, "id")}`
          }
          if (status === "connect") {
            window.location.href = `/chat?receiverId=${get(user, "id")}`
          }
        }}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className={`w-[48%] ${connectionDetails.className || ""}`}
                variant={connectionDetails.variant}
                onClick={() => {
                  onClick({
                    receiverId: user.id,
                  })
                }}
              >
                <ConnectionIcon className="h-4 w-4 " />
                {connectionDetails.text}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{connectionDetails.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
