"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Briefcase,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/create-axios";
import { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function ProjectDetail() {
  const params = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", params?.id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/projects/${params?.id}`);
      return res.data;
    },
    enabled: !!params?.id,
  });

  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-background min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-background min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading project details.</p>
      </div>
    );
  }

  const {
    title,
    description,
    technologies,
    images,
    user,
    category,
    deadline,
    teamSize,
    openPositions,
    status,
  } = data;

  const deadlineDate = new Date(deadline);
  const currentDate = new Date("2025-05-18T13:20:00+05:00");
  const isDeadlinePassed = deadlineDate < currentDate;
  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background min-h-screen">
      <Card className="overflow-hidden">
        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images?.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <img
                      src={image}
                      alt={`${title} image ${index + 1}`}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "/fallback-image.jpg"; // Replace with your fallback image
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">
                      No images available
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {images?.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === selectedIndex ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">{title}</CardTitle>
            <Badge
              variant={status === "In Progress" ? "default" : "secondary"}
              className="text-sm"
            >
              {status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {description || "No description provided."}
          </p>

          <Separator className="my-6" />

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Category</span>
                <p className="font-medium">{category?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Deadline</span>
                <p
                  className={`font-medium ${
                    isDeadlinePassed ? "text-destructive" : ""
                  }`}
                >
                  {formattedDeadline}
                  {isDeadlinePassed && " (Expired)"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Team Size</span>
                <p className="font-medium">{teamSize || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <p className="font-medium">{status || "N/A"}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies?.length > 0 ? (
                technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech.toUpperCase()}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No technologies listed.
                </p>
              )}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Open Positions</h3>
            <div className="flex flex-wrap gap-2">
              {openPositions?.length > 0 ? (
                openPositions.map((position) => (
                  <Badge key={position} variant="default">
                    {position}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No open positions.
                </p>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {user?.email[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Project Owner</h3>
              <p className="text-muted-foreground">{user?.email || "N/A"}</p>
              <p className="text-sm text-muted-foreground">
                Profile Views: {user?.profileViews || "0"}
              </p>
              <p className="text-sm text-muted-foreground">
                Last Updated:{" "}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString("en-US")
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
