"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/create-axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { isArray } from "lodash"
import { CalendarClock, CheckCircle, Clock, UserPlus, X } from "lucide-react"
import Link from "next/link"

export default function ConnectionRequestsIncoming() {
  const { toast } = useToast()

  // Fetch incoming connection requests
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["connections_requests_incoming"],
    queryFn: async () => {
      const response = await axiosInstance.get("/connections/requests/incoming")
      return response.data
    },
  })

  // Accept connection request mutation
  const acceptConnection = useMutation({
    mutationKey: ["connections_accept"],
    mutationFn: async (requestId: number) => {
      const response = await axiosInstance.post(`/connections/accept/${requestId}`)
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Connection accepted",
        description: "You have successfully accepted the connection request",
      })
      refetch()
    },
  })

  // Reject connection request mutation
  const rejectConnection = useMutation({
    mutationKey: ["connections_reject"],
    mutationFn: async (requestId: number) => {
      const response = await axiosInstance.post(`/connections/reject/${requestId}`)
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Connection rejected",
        description: "You have rejected the connection request",
      })
      refetch()
    },
  })

  // Handle accept connection
  const handleAccept = (requestId: number) => {
    acceptConnection.mutate(requestId)
  }

  // Handle reject connection
  const handleReject = (requestId: number) => {
    rejectConnection.mutate(requestId)
  }

  // Parse incoming requests data
  const incomingRequests = isArray(data) ? data : []
  const pendingRequests = incomingRequests.filter((request) => request.status === "pending")

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Connection{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Requests</span>
        </h1>
        <p className="text-muted-foreground">Manage your incoming connection requests</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden border border-border/40">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pendingRequests.length === 0 ? (
            <Card className="border border-border/40">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any pending connection requests at the moment
                </p>
                <Button asChild>
                  <Link href="/explore">Explore Professionals</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={() => handleAccept(request.id)}
                  onReject={() => handleReject(request.id)}
                  isAccepting={acceptConnection.isPending && acceptConnection.variables === request.id}
                  isRejecting={rejectConnection.isPending && rejectConnection.variables === request.id}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden border border-border/40">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : incomingRequests.length === 0 ? (
            <Card className="border border-border/40">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No connection requests</h3>
                <p className="text-muted-foreground mb-6">You don't have any connection requests at the moment</p>
                <Button asChild>
                  <Link href="/explore">Explore Professionals</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {incomingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={() => handleAccept(request.id)}
                  onReject={() => handleReject(request.id)}
                  isAccepting={acceptConnection.isPending && acceptConnection.variables === request.id}
                  isRejecting={rejectConnection.isPending && rejectConnection.variables === request.id}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Request Card Component
function RequestCard({ request, onAccept, onReject, isAccepting = false, isRejecting = false }: any) {
  const requester = request.requester || {}
  const profile = requester.profile || {}
  const createdAt = new Date(request.createdAt)
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  // Status badge component
  const StatusBadge = ({ status }) => {
    if (status === "pending") {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    }
    if (status === "accepted") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Accepted
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <X className="h-3 w-3 mr-1" />
        Rejected
      </Badge>
    )
  }

  return (
    <Card className="overflow-hidden border border-border/40 transition-all hover:shadow-md">
      <CardHeader className="p-6 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage
                src={profile.avatar || "/placeholder.svg?height=64&width=64"}
                alt={profile.name || requester.email}
              />
              <AvatarFallback>{(profile.name || requester.email || "").substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{profile.name || requester.email}</CardTitle>
              <CardDescription className="mt-1">
                {profile.headline || profile.role || "IT Professional"}
              </CardDescription>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarClock className="h-4 w-4 mr-2" />
          Requested {timeAgo}
        </div>

        {profile.bio && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{profile.bio}</p>}

        {profile.skills && profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {request.status === "pending" && (
        <CardFooter className="p-6 pt-0 flex gap-3">
          <Button onClick={onAccept} className="flex-1" disabled={isAccepting || isRejecting}>
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
          <Button onClick={onReject} variant="outline" className="flex-1" disabled={isAccepting || isRejecting}>
            {isRejecting ? "Rejecting..." : "Decline"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
