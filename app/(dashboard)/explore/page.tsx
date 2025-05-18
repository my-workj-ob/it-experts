"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/user-card";
import useSocketNotification from "@/hooks/notification/use-socket-notification";
import {
  useNotifications,
  useUnreadNotificationCount,
} from "@/hooks/notification/useNotification";
import useProfile from "@/hooks/profile/use-profile";
import axiosInstance from "@/lib/create-axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get, isArray } from "lodash";
import {
  Bell,
  BriefcaseIcon,
  Filter,
  Flame,
  Globe,
  Handshake,
  History,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RequestCard } from "./incoming/page";
import Link from "next/link";

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [matchThreshold, setMatchThreshold] = useState([70]);
  const { userProfileData } = useProfile();
  const { data, refetch } = useQuery({
    queryKey: ["explorer"],
    queryFn: async () => {
      const data = await axiosInstance.get("/explore");
      return data;
    },
  });

  const { data: outgoing, refetch: outgoingRefetch } = useQuery({
    queryKey: ["connections_requests_outgoing"],
    queryFn: async () => {
      const data = await axiosInstance.get("/connections/requests/outgoing");
      return data;
    },
  });

  const { data: connections, refetch: connectionsRefetch } = useQuery({
    queryKey: ["connections_me"],
    queryFn: async () => {
      const data = await axiosInstance.get("/connections/me");
      return data;
    },
  });

  const exploreData = isArray(get(data, "data")) ? get(data, "data", []) : [];
  const outgoingData = isArray(get(outgoing, "data"))
    ? get(outgoing, "data", [])
    : [];
  const connectionsData = isArray(get(connections, "data"))
    ? get(connections, "data", [])
    : [];

  const connection = useMutation({
    mutationKey: ["connections_request"],
    mutationFn: async (requestConnection) => {
      const data = await axiosInstance.post(
        `/connections/request`,
        requestConnection
      );
      return data.data;
    },
  });

  const removeConnection = useMutation({
    mutationKey: ["connections_remove"],
    mutationFn: async (requestConnection) => {
      const data = await axiosInstance.delete(
        `/connections/remove/${requestConnection}`
      );
      return data.data;
    },
  });

  const acceptConnection = useMutation({
    mutationKey: ["connections_accept"],
    mutationFn: async (requestConnection) => {
      const data = await axiosInstance.post(
        `/connections/accept/${requestConnection}`
      );
      return data.data;
    },
  });

  const handleRequest = (data: any) => {
    connection.mutate(data, {
      onSuccess: () => {
        incomingRefetch();
        refetch();
        connectionsRefetch();
        outgoingRefetch();
      },
    });
  };

  const handleRemoveConnection = (data: any) => {
    removeConnection.mutate(data, {
      onSuccess: () => {
        incomingRefetch();
        refetch();
        connectionsRefetch();
        outgoingRefetch();
      },
    });
  };

  const handleAccept = (data: any) => {
    acceptConnection.mutate(data, {
      onSuccess: () => {
        incomingRefetch();
        refetch();
        connectionsRefetch();
        outgoingRefetch();
      },
    });
  };

  const {
    data: request_incoming,
    isLoading,
    refetch: incomingRefetch,
  } = useQuery({
    queryKey: ["connections_requests_incoming"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/connections/requests/incoming"
      );
      return response.data;
    },
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header with gradient background */}
      <div className="relative rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/5 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Explore{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                IT Professionals
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Connect with talented IT specialists, collaborate on projects, and
              grow your professional network.
            </p>
          </div>

          <div className="flex gap-3 md:self-start">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, skills, or role..."
                className="pl-9 w-full md:w-[300px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
              />
            </div>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={
                showFilters
                  ? "bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
                  : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
              }
            >
              {showFilters ? (
                <X className="h-4 w-4" />
              ) : (
                <Filter className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters panel with animation */}
      {showFilters && (
        <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <BriefcaseIcon className="h-3.5 w-3.5 text-violet-500" />
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="data-scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="product-manager">
                      Product Manager
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Globe className="h-3.5 w-3.5 text-violet-500" />
                  Location
                </Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tashkent">Tashkent</SelectItem>
                    <SelectItem value="samarkand">Samarkand</SelectItem>
                    <SelectItem value="bukhara">Bukhara</SelectItem>
                    <SelectItem value="namangan">Namangan</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <History className="h-3.5 w-3.5 text-violet-500" />
                  Experience
                </Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  Skills
                </Label>
                <Input
                  placeholder="e.g. React, Python, AWS"
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <Flame className="h-3.5 w-3.5 text-violet-500" />
                    Match Score
                  </Label>
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                    {matchThreshold}%
                  </span>
                </div>
                <Slider
                  value={matchThreshold}
                  onValueChange={setMatchThreshold}
                  min={0}
                  max={100}
                  step={1}
                  className="py-1"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
                >
                  Reset
                </Button>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs with custom styling */}
      <Tabs defaultValue="recommended" className="mt-8">
        <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
          <TabsTrigger
            value="recommended"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm rounded-md"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Recommended
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm rounded-md"
          >
            <History className="h-4 w-4 mr-2" />
            Recently Active
          </TabsTrigger>
          <TabsTrigger
            value="connections"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm rounded-md"
          >
            <Handshake className="h-4 w-4 mr-2" />
            Connections
          </TabsTrigger>
          <TabsTrigger
            value="incoming_requests"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm rounded-md"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notification{" "}
            <span className="p-2 text-[10px] bg-muted-foreground  h-5 flex justify-center items-center text-white ml-2 rounded-full ">
              {request_incoming?.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Recommended tab content */}
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreData?.length > 0 ? (
              exploreData.map((user: any) => (
                <UserCard
                  matchPercentage={get(user, "matchPercentage")}
                  key={user.id}
                  skills={get(user, "skills")}
                  status={get(user, "status")}
                  user={get(user, "profile")}
                  onClick={() => {
                    if (get(user, "status") === "accepted") {
                      return handleRemoveConnection(get(user, "id"));
                    } else if (get(user, "status") === "connect") {
                      return handleRequest({
                        receiverId: get(user, "id"),
                      });
                    } else if (get(user, "status") === "pending") {
                      return handleAccept(get(user, "id"));
                    }
                  }}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3 mb-4">
                  <Sparkles className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No recommendations yet
                </h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  We're working on finding the perfect matches for you. Check
                  back soon!
                </p>
                <Button>Refresh</Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Recent tab content */}
        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outgoingData?.length > 0 ? (
              outgoingData.map((user: any) => (
                <UserCard
                  key={user.id}
                  matchPercentage={get(user, "matchPercentage")}
                  status={get(user, "status")}
                  skills={get(user, "skills")}
                  user={get(user, "receiver.profile")}
                  onClick={() => {
                    if (get(user, "status") === "accepted") {
                      return handleRemoveConnection(get(user, "id"));
                    } else if (get(user, "status") === "connect") {
                      return handleRequest({
                        receiverId: get(user, "id"),
                      });
                    } else if (get(user, "status") === "pending") {
                      return handleAccept(get(user, "id"));
                    }
                  }}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mb-4">
                  <History className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  You haven't interacted with any professionals recently.
                </p>
                <Button>Explore Professionals</Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Connections tab content */}
        <TabsContent value="connections" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectionsData?.length > 0 ? (
              connectionsData.map((user: any) => (
                <UserCard
                  key={user.id}
                  matchPercentage={get(user, "matchPercentage")}
                  status={get(user, "status")}
                  skills={get(user, "skills")}
                  user={get(user, "receiver.profile")}
                  onClick={() => {
                    if (get(user, "status") === "accepted") {
                      return handleRemoveConnection(get(user, "id"));
                    } else if (get(user, "status") === "connect") {
                      window.location.href = `/chat?receiverId=${get(
                        user,
                        "id"
                      )}`;
                      return handleRequest({
                        receiverId: get(user, "id"),
                      });
                    } else if (get(user, "status") === "pending") {
                      return handleAccept(get(user, "id"));
                    }
                  }}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-4">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No connections yet</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Start building your professional network by connecting with IT
                  professionals.
                </p>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Find Connections
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="incoming_requests" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {request_incoming?.length > 0 ? (
              request_incoming.map((user: any) => (
                <RequestCard
                  key={user.id}
                  request={user}
                  onAccept={() => handleAccept(user.id)}
                  onReject={() => handleRemoveConnection(user.id)}
                  isAccepting={
                    acceptConnection.isPending &&
                    acceptConnection.variables === user.id
                  }
                  isRejecting={
                    removeConnection.isPending &&
                    removeConnection.variables === user.id
                  }
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-4">
                  <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No connections yet</h3>

                <Link
                  href={"/explore/incoming"}
                  className="border border-emerald-500 p-2 rounded-full text-sm hover:bg-emerald-500 hover:text-white"
                >
                  View all connections
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
