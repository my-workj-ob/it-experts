"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { get, isArray, isNull } from "lodash";
import {
  Briefcase,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

interface User {
  id: number;
  firstName: string;
  role: string;
  location: string;
  skills: string[];
  experience: string;
  matchPercentage: number;
  avatar: string;
  status: string;
}

interface UserCardProps {
  user: User;
  onClick: (userId: { receiverId: number }) => void;
  status: string;
  matchPercentage: number;
  skills: [];
}

export default function UserCard({
  matchPercentage,
  status,
  user,
  skills,
  onClick,
}: UserCardProps) {
  // Get connection status details
  const getConnectionDetails = () => {
    switch (status) {
      case "connect":
        return {
          text: "Connect",
          icon: UserPlus,
          variant: "default" as const,
          tooltip: "Send connection request",
        };
      case "pending":
        return {
          text: "Pending",
          icon: Clock,
          variant: "outline" as const,
          className:
            "text-amber-500 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-600",
          tooltip: "Connection request pending",
        };
      case "accepted":
        return {
          text: "Connected",
          icon: Check,
          variant: "outline" as const,
          className:
            "text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700",
          tooltip: "You are connected",
        };
      default:
        return {
          text: "Connect",
          icon: UserPlus,
          variant: "default" as const,
          tooltip: "Send connection request",
        };
    }
  };

  const connectionDetails = getConnectionDetails();
  const ConnectionIcon = connectionDetails.icon;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group border-0 shadow-sm bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Status indicator bar */}
      <div className="relative h-1.5">
        <div
          className={`h-full w-full ${
            status === "accepted"
              ? "bg-gradient-to-r from-teal-400 to-emerald-500"
              : status === "pending"
              ? "bg-gradient-to-r from-amber-400 to-orange-500"
              : "bg-gradient-to-r from-violet-500 to-purple-600"
          }`}
        />
      </div>

      <CardContent className="p-5 pt-6">
        <div className="flex items-start gap-4">
          {/* Avatar with ring based on status */}
          <Avatar
            className={`h-16 w-16 ring-2 ring-offset-2 ring-offset-background ${
              status === "accepted"
                ? "ring-emerald-400"
                : status === "pending"
                ? "ring-amber-400"
                : "ring-violet-500"
            }`}
          >
            <AvatarImage
              src={get(user, "avatar")}
              alt={get(user, "firstName")}
            />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              {get(user, "firstName", "").substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {get(user, "firstName")}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {get(user, "role", "")}
                </p>
              </div>

              <Badge
                variant="secondary"
                className="font-medium bg-gradient-to-r from-violet-500/10 to-purple-600/10 text-violet-700 dark:text-violet-300 border-violet-500/20 flex items-center gap-1"
              >
                <Zap className="h-3 w-3" />
                {matchPercentage}% Match
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                <span>{get(user, "location", "Tashkent")}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Briefcase className="h-3 w-3 mr-1 text-slate-400" />
                <span>{get(user, "experience", "2 years")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {isArray(skills) && skills.length > 0 ? (
            skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="font-normal text-xs py-0 px-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              >
                {isNull(skill) ? "no skills" : skill}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">
              No skills listed
            </span>
          )}
        </div>

        {/* Connection status badge */}
        <div className="mt-4 flex justify-center">
          <Badge
            variant="outline"
            className={`${
              status === "accepted"
                ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800"
                : status === "pending"
                ? "text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800"
                : "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/30 dark:border-rose-800"
            }`}
          >
            <ConnectionIcon className="h-3 w-3 mr-1.5" />
            {status === "accepted"
              ? "Connected"
              : status === "pending"
              ? "Pending"
              : "Not Connected"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0 gap-3">
        <Button
          variant="outline"
          size="sm"
          className="w-1/2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => {
            window.location.href = `/chat?receiverId=${get(user, "id")}`;
          }}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className={`w-1/2 ${connectionDetails.className || ""}`}
                variant={connectionDetails.variant}
                onClick={() => {
                  onClick({
                    receiverId: user.id,
                  });
                }}
              >
                <ConnectionIcon className="h-4 w-4 mr-2" />
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
  );
}
