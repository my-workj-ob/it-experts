"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import useProfile from "@/hooks/profile/use-profile"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/create-axios"
import { Calendar, CheckCircle, Clock, Clock4, MessageSquare, XCircle } from 'lucide-react'
import { useEffect, useState } from "react"

interface MentorshipRequest {
  id: number
  menteeName: string
  menteeEmail: string
  message: string
  durationInHours: number | null
  additionalDetails: string | null
  status: "pending" | "active" | "rejected"
  createdAt?: string
  menteeAvatar?: string
}

export default function MentorshipRequestsPage() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<MentorshipRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<MentorshipRequest | null>(null)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)
  const [responseType, setResponseType] = useState<"accept" | "reject" | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [durationInHours, setDurationInHours] = useState<number | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userProfileData } = useProfile()

  useEffect(() => {
    fetchMentorshipRequests()
  }, [])

  const fetchMentorshipRequests = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await axiosInstance.get("/mentors/1")
      setRequests(response.data.mentorshipRequests || [])
    } catch (err) {
      console.error("Error fetching mentorship requests:", err)
      setError("Failed to load mentorship requests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenResponseDialog = (request: MentorshipRequest, type: "accept" | "reject") => {
    setSelectedRequest(request)
    setResponseType(type)
    setResponseDialogOpen(true)
    setResponseMessage("")
    setDurationInHours(type === "accept" ? 1 : "")
  }

  const handleSubmitResponse = async () => {
    if (!selectedRequest || !responseType) return

    setIsSubmitting(true)

    try {
      await axiosInstance.patch(`/mentorship-requests/${selectedRequest.id}/status`, {
        status: responseType === "accept" ? "active" : "rejected"
      })

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === selectedRequest.id
            ? {
              ...req,
              status: responseType === "accept" ? "active" : "rejected",
              ...(responseType === "accept" && { durationInHours: Number(durationInHours) }),
              additionalDetails: responseMessage || null
            }
            : req
        )
      )

      toast({
        title: responseType === "accept" ? "Request accepted" : "Request rejected",
        description: responseType === "accept"
          ? `You have accepted the mentorship request from ${selectedRequest.menteeName}.`
          : `You have rejected the mentorship request from ${selectedRequest.menteeName}.`,
        variant: "default",
      })

      setResponseDialogOpen(false)
    } catch (error) {
      console.error(`Error ${responseType}ing request:`, error)
      toast({
        title: "Something went wrong",
        description: `Failed to ${responseType} the mentorship request. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading mentorship requests...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchMentorshipRequests} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentorship Requests</h1>
        <p className="text-muted-foreground">Manage incoming mentorship requests from potential mentees</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2">
              {requests.filter(req => req.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <Badge variant="secondary" className="ml-2">
              {requests.filter(req => req.status === "active").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge variant="secondary" className="ml-2">
              {requests.filter(req => req.status === "rejected").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        {["pending", "active", "rejected", "all"].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {requests.filter(req => tabValue === "all" || req.status === tabValue).length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No {tabValue !== "all" ? tabValue : ""} mentorship requests found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests
                  .filter(req => tabValue === "all" || req.status === tabValue)
                  .map(request => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={request.menteeAvatar || "/placeholder.svg?height=48&width=48"} />
                              <AvatarFallback>{request?.menteeName?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{request.menteeName}</CardTitle>
                              <CardDescription>{request.menteeEmail}</CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Message</p>
                          <p className="text-sm border rounded-md p-3 bg-muted/20">{request.message}</p>
                        </div>

                        {request.status === "active" && request.durationInHours && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock4 className="h-4 w-4 text-muted-foreground" />
                            <span>Duration: {request.durationInHours} hour{request.durationInHours > 1 ? 's' : ''}</span>
                          </div>
                        )}

                        {request.additionalDetails && (
                          <div>
                            <p className="text-sm font-medium mb-1">Additional Details</p>
                            <p className="text-sm border rounded-md p-3 bg-muted/20">{request.additionalDetails}</p>
                          </div>
                        )}

                        {request.createdAt && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Requested on {new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>

                        {request.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenResponseDialog(request, "reject")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleOpenResponseDialog(request, "accept")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {responseType === "accept" ? "Accept" : "Reject"} Mentorship Request
            </DialogTitle>
            <DialogDescription>
              {responseType === "accept"
                ? "Accept this mentorship request and set the initial details."
                : "Provide a reason for rejecting this mentorship request."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {responseType === "accept" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={durationInHours}
                    onChange={(e) => setDurationInHours(e.target.value ? parseInt(e.target.value) : "")}
                    className="w-20"
                  />
                  <span>hour{durationInHours !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder={
                  responseType === "accept"
                    ? "Add any additional details or instructions for the mentee..."
                    : "Provide a reason for rejecting this request..."
                }
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitResponse}
              disabled={isSubmitting || (responseType === "accept" && !durationInHours)}
              variant={responseType === "accept" ? "default" : "destructive"}
            >
              {isSubmitting ? "Submitting..." : responseType === "accept" ? "Accept Request" : "Reject Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
