"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useProfile from "@/hooks/profile/use-profile";
import axiosInstance from "@/lib/create-axios";
import { get } from "lodash";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle,
  Eye,
  Github,
  Globe,
  Heart,
  Loader,
  MessageSquare,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Function to get project details by ID
const getProjectDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/portfolios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

// Function to get related projects by the same author
const getAuthorProjects = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/portfolios/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching author projects:", error);
    return [];
  }
};

// Replace the getProjectComments function with this improved version that better handles the API response structure
const getProjectComments = async (projectId: string) => {
  try {
    const response = await axiosInstance.get(`/comments`, {
      params: {
        entityId: projectId,
        entityType: "post",
      },
    });

    // The API returns a flat array of comments
    const allComments = response.data?.comments || [];

    // Create a map to store parent comments and their replies
    const commentMap = new Map();
    const topLevelComments: any[] = [];

    // First pass: identify all comments and create entries in the map
    allComments.forEach((comment: any) => {
      // Initialize replies array for each comment
      if (!comment.replies) {
        comment.replies = [];
      }

      // Add to the map for quick lookup
      commentMap.set(comment.id, comment);
    });

    // Second pass: organize comments into parent-child relationships
    allComments.forEach((comment: any) => {
      // Check both parentComment and parentCommentId properties
      const hasParent = comment.parentComment || comment.parentCommentId;

      if (hasParent) {
        // This is a reply - find its parent and add to replies
        const parentId = comment.parentComment?.id || comment.parentCommentId;
        const parentComment = commentMap.get(parentId);

        if (parentComment) {
          if (!parentComment.replies) {
            parentComment.replies = [];
          }
          parentComment.replies.push(comment);
        } else {
          // If parent not found, treat as top-level comment
          topLevelComments.push(comment);
        }
      } else {
        // This is a top-level comment
        topLevelComments.push(comment);
      }
    });

    // Sort top-level comments by creation date (newest first)
    topLevelComments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Sort replies within each comment by creation date (oldest first)
    topLevelComments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

    console.log(
      "Processed comments:",
      JSON.stringify(topLevelComments, null, 2)
    );
    return topLevelComments;
  } catch (error) {
    console.error("Error fetching project comments:", error);
    return [];
  }
};

// Update the addProjectComment function to handle the correct parentCommentId
const addProjectComment = async (
  projectId: string,
  content: string,
  parentCommentId?: number
) => {
  try {
    const response = await axiosInstance.post(`/comments`, {
      entityId: projectId,
      entityType: "post",
      content,
      parentCommentId: parentCommentId || null,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
};

const deleteComment = async (commentId: string) => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
};

// Update the likeComment function to match the API endpoint
const likeComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.post(`/likes/${commentId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking comment:", error);
    return null;
  }
};

export default function DiscoverProjectDetailPage() {
  const [project, setProject] = useState<any>(null);
  const [authorProjects, setAuthorProjects] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [likeLoading, setIsLikeLoading] = useState(false);
  // Initialize all replies to be visible by default
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  const { userProfileData } = useProfile();

  const { id } = useParams<{ id: string }>();

  const [likeStatus, setLikeStatus] = useState<boolean>();
  const [commentLike, setCommentLike] = useState(false);
  useEffect(() => {
    try {
      const ProjectLikeStatus = async () => {
        const res = await axiosInstance.get(
          `/portfolios/${id}/like/status?userId=${get(userProfileData, "id")}`
        );

        setLikeStatus(res.data);
        ProjectLikeStatus();
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!replyContent.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      // Use the actual parentCommentId
      const addedReply = await addProjectComment(
        id,
        replyContent,
        Number.parseInt(parentCommentId)
      );

      if (addedReply) {
        // After successful API call, fetch all comments again to ensure correct structure
        const updatedComments = await getProjectComments(id);
        setComments(updatedComments);

        // Make sure replies are visible after adding one
        setShowReplies({
          ...showReplies,
          [parentCommentId]: true,
        });

        // Increment the comment count
        setProject({
          ...project,
          commentsCount: (project.commentsCount || 0) + 1,
        });
      }

      // Reset reply state
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Update the useEffect hook to ensure replies are visible by default
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        const projectData = await getProjectDetails(id);
        setProject(projectData);

        // Fetch comments for the project
        const commentsData = await getProjectComments(id);

        // Initialize showReplies state for all comments with replies
        const initialShowReplies: any = {};
        commentsData.forEach((comment) => {
          if (comment.replies && comment.replies.length > 0) {
            initialShowReplies[comment.id] = true; // Show all replies by default
          }
        });

        setShowReplies(initialShowReplies);
        setComments(commentsData || []);

        // Fetch other projects by the same author
        if (projectData?.userId) {
          const authorProjects = await getAuthorProjects(projectData.userId);
          setAuthorProjects(authorProjects || []);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [id, likeComment, likeLoading, commentLike]);

  const handleLike = async () => {
    try {
      setIsLikeLoading(true);
      setIsLiked(!isLiked);
      // In a real app, you would call an API to update the like status
      await axiosInstance.post(`/portfolios/${id}/like`, { liked: !isLiked });

      if (!isLiked) {
        setProject(project);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      setIsLiked(isLiked); // Revert on error
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      // In a real app, you would call an API to update the bookmark status
      await axiosInstance.post(`/portfolios/${id}/bookmark`, {
        bookmarked: !isBookmarked,
      });
    } catch (error) {
      console.error("Error updating bookmark status:", error);
      setIsBookmarked(isBookmarked); // Revert on error
    }
  };

  // Update the handleCommentSubmit function to properly create a new comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const addedComment = await addProjectComment(id, newComment);

      if (addedComment) {
        // After successful API call, fetch all comments again to ensure correct structure
        const updatedComments = await getProjectComments(id);
        setComments(updatedComments);
        setNewComment("");

        // Increment the comment count
        setProject({
          ...project,
          commentsCount: (project.commentsCount || 0) + 1,
        });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const success = await deleteComment(commentId);
      if (success) {
        // Remove the comment from the state
        const updatedComments = comments.filter((comment) => {
          // Remove the comment if it's the one to delete
          if (comment.id === Number.parseInt(commentId)) return false;

          // If the comment has replies, filter out the reply to delete
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = comment.replies.filter(
              (reply: any) => reply.id !== Number.parseInt(commentId)
            );
          }

          return true;
        });

        setComments(updatedComments);

        // Update the comment count
        setProject({
          ...project,
          commentsCount: (project.commentsCount || 0) - 1,
        });
      }
    }
  };

  // Update the handleCommentLike function to properly like a comment
  const handleCommentLike = async (commentId: string) => {
    try {
      const response = await likeComment(commentId);
      setCommentLike(response);
    } catch (error) {
      console.error("Error liking comment:", error);
      // Revert the like status on error
    }
  };

  // Toggle showing replies for a comment
  const toggleReplies = (commentId: string) => {
    setShowReplies({
      ...showReplies,
      [commentId]: !showReplies[commentId],
    });
  };

  // Check if a user is the project owner
  const isProjectOwner = (userId: string) => {
    return project?.userId === userId;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 bg-muted rounded-full mr-4" />
          <div className="h-8 bg-muted rounded w-48" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <div className="h-[400px] bg-muted rounded-t-lg" />
              <div className="p-6">
                <div className="h-8 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-5/6 mb-6" />

                <div className="h-10 bg-muted rounded w-full mb-4" />
                <div className="h-32 bg-muted rounded w-full" />
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 bg-muted rounded-full" />
                  <div>
                    <div className="h-6 bg-muted rounded w-32 mb-1" />
                    <div className="h-4 bg-muted rounded w-24" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-20" />
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // if (!project) {
  //   return (
  //     <div className="container mx-auto py-8 text-center">
  //       <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
  //       <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
  //       <Link href="/portfolio/discover">
  //         <Button>Back to Discover</Button>
  //       </Link>
  //     </div>
  //   )
  // }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };
  console.log(comments);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/portfolio/discover" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{get(project, "title")}</h1>
        <div className="ml-auto flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // Copy the current URL to clipboard
              navigator.clipboard.writeText(window.location.href);
              // In a real app, you would show a toast notification
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant={isLiked ? "default" : "outline"}
            size="icon"
            onClick={handleLike}
          >
            {likeLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            )}
          </Button>
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="icon"
            onClick={handleBookmark}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img
                src={get(project, "imageUrl") || "/placeholder.svg"}
                alt={get(project, "title", "Project Image")}
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {get(project, "title")}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {get(project, "title")}
                </p>

                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    {project?.images && project.images.length > 0 && (
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value="description">
                    <p className="text-sm whitespace-pre-line">
                      {project?.longDescription || project?.description}
                    </p>
                  </TabsContent>
                  <TabsContent value="technologies">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project?.tags &&
                        project?.tags.map((tech: string) => (
                          <div
                            key={tech}
                            className="bg-secondary p-3 rounded-md text-center"
                          >
                            {tech}
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges">
                    <ul className="list-disc pl-5 space-y-2">
                      {project?.challenges?.map(
                        (challenge: string, index: number) => (
                          <li key={index}>{challenge}</li>
                        )
                      ) || (
                        <li>
                          No specific challenges documented for this project.
                        </li>
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="gallery">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project?.images?.map((image: any, index: number) => (
                        <img
                          key={index}
                          src={image.fileUrl || "/placeholder.svg"}
                          alt={`Project image ${index + 1}`}
                          className="rounded-md object-cover w-full h-40"
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* YouTube-style Comment Section */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  Comments ({project?.commentsCount || 0})
                </h3>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Sort by
                </Button>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      get(userProfileData, "avatar") ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={userProfileData?.name || "User"}
                  />
                  <AvatarFallback>
                    {userProfileData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <form onSubmit={(e) => handleCommentSubmit(e)}>
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2 resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={!newComment.trim() || isSubmittingComment}
                        size="sm"
                      >
                        {isSubmittingComment ? "Posting..." : "Comment"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <Separator className="my-6" />

              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10 rounded-full">
                        <AvatarImage
                          src={
                            comment.user?.profile?.avatar ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={comment.user?.profile?.name || "User"}
                          className="rounded-full"
                        />
                        <AvatarFallback className="rounded-full">
                          {comment.user?.profile?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <h4 className="font-medium text-sm">
                              {comment.user?.profile?.firstName ||
                                comment.user?.profile?.name ||
                                "Anonymous User"}
                            </h4>
                            {isProjectOwner(comment.user?.id) && (
                              <span className="ml-1 flex items-center text-blue-500 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Author
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm mt-1 mb-2">{comment.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <button
                            className={`flex items-center hover:text-foreground ${
                              likedComments[comment.id] ? "text-blue-500" : ""
                            }`}
                            onClick={() =>
                              handleCommentLike(comment.id.toString())
                            }
                          >
                            <ThumbsUp
                              className={`h-3.5 w-3.5 mr-1 ${
                                comment?.likedByCurrentUser
                                  ? "fill-blue-500"
                                  : ""
                              }`}
                            />
                            {comment.likesCount || 0}
                          </button>
                          <button
                            className="hover:text-foreground"
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === comment.id.toString()
                                  ? null
                                  : comment.id.toString()
                              )
                            }
                          >
                            Reply
                          </button>
                          {comment.user?.id === userProfileData?.id && (
                            <button
                              onClick={() =>
                                handleDeleteComment(comment.id.toString())
                              }
                              className="text-xs text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>

                        {replyingTo === comment.id.toString() && (
                          <div className="mt-3 flex gap-3">
                            <Avatar className="h-8 w-8 rounded-full">
                              <AvatarImage
                                src={
                                  get(userProfileData, "avatar") ||
                                  "/placeholder.svg?height=32&width=32"
                                }
                                alt={userProfileData?.name || "You"}
                                className="rounded-full"
                              />
                              <AvatarFallback className="rounded-full">
                                {userProfileData?.name?.charAt(0) || "Y"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Add a reply..."
                                value={replyContent}
                                onChange={(e) =>
                                  setReplyContent(e.target.value)
                                }
                                className="mb-2 resize-none text-sm"
                                rows={2}
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyContent("");
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  disabled={
                                    !replyContent.trim() || isSubmittingComment
                                  }
                                  onClick={() =>
                                    handleReplySubmit(comment.id.toString())
                                  }
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                          <>
                            <button
                              className="mt-2 text-blue-500 text-xs font-medium flex items-center"
                              onClick={() =>
                                toggleReplies(comment.id.toString())
                              }
                            >
                              {showReplies[comment.id] ? "Hide" : "View"}{" "}
                              {comment.replies.length}{" "}
                              {comment.replies.length === 1
                                ? "reply"
                                : "replies"}
                            </button>

                            {showReplies[comment.id] && (
                              <div className="mt-2 pl-6 space-y-4">
                                {comment.replies.map((reply: any) => {
                                  console.log(reply);

                                  return (
                                    <div key={reply.id} className="flex gap-3">
                                      <Avatar className="h-8 w-8 rounded-full">
                                        <AvatarImage
                                          src={
                                            reply.user?.profile?.avatar ||
                                            "/placeholder.svg?height=32&width=32"
                                          }
                                          alt={
                                            reply.user?.profile?.name || "User"
                                          }
                                          className="rounded-full"
                                        />
                                        <AvatarFallback className="rounded-full">
                                          {reply.user?.profile?.firstName?.charAt(
                                            0
                                          ) ||
                                            reply.user?.profile?.name?.charAt(
                                              0
                                            ) ||
                                            "U"}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center">
                                          <div className="flex items-center">
                                            <h5 className="font-medium text-xs">
                                              {reply.user?.profile?.firstName ||
                                                reply.user?.profile?.name ||
                                                "Anonymous User"}
                                            </h5>
                                            {isProjectOwner(reply.user?.id) && (
                                              <span className="ml-1 flex items-center text-blue-500 text-xs">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Author
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-xs text-muted-foreground ml-2">
                                            {timeAgo(reply.createdAt)}
                                          </span>
                                        </div>
                                        <p className="text-xs mt-1 mb-1">
                                          {reply.content}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                          <button
                                            className={`flex items-center hover:text-foreground ${
                                              reply?.likedByCurrentUser
                                                ? "text-blue-500"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleCommentLike(
                                                reply.id.toString()
                                              )
                                            }
                                          >
                                            <ThumbsUp
                                              className={`h-3 w-3 mr-1 ${
                                                reply?.likedByCurrentUser
                                                  ? "fill-blue-500"
                                                  : ""
                                              }`}
                                            />
                                            {reply.likesCount || 0}
                                          </button>
                                          {reply.user?.id ===
                                            userProfileData?.id && (
                                            <button
                                              onClick={() =>
                                                handleDeleteComment(
                                                  reply.id.toString()
                                                )
                                              }
                                              className="text-xs text-muted-foreground hover:text-destructive"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h4 className="text-lg font-medium mb-1">No comments yet</h4>
                  <p className="text-sm text-muted-foreground">
                    Be the first to share your thoughts on this project
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={
                      project?.profile?.avatar ||
                      "/placeholder.svg?height=56&width=56"
                    }
                    alt={project?.profile?.name || "Creator"}
                  />
                  <AvatarFallback>
                    {project?.profile?.name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">
                    {project?.profile?.name || "Project Creator"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project?.profile?.jobTitle || "Creator"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm">Created</span>
                  <span className="text-sm">
                    {formatDate(project?.createdAt || new Date().toISOString())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Category</span>
                  <span className="text-sm">
                    {project?.category || "Uncategorized"}
                  </span>
                </div>
                {project?.client && (
                  <div className="flex justify-between">
                    <span className="text-sm">Client</span>
                    <span className="text-sm">{project?.client}</span>
                  </div>
                )}
                {project?.duration && (
                  <div className="flex justify-between">
                    <span className="text-sm">Duration</span>
                    <span className="text-sm">{project?.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <span className="text-sm">
                    {project?.status || "Completed"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Contact Creator</Button>
                {project?.githubUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
                {project?.liveDemoUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project?.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {authorProjects.length > 0 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">
                  More Projects by {project?.profile?.name || "this Creator"}
                </h3>
                <div className="space-y-4">
                  {authorProjects?.map((authorProject) => (
                    <Link
                      key={authorProject?.id}
                      href={`/portfolio/discover/${authorProject?.id}`}
                      className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <img
                        src={
                          get(
                            JSON.parse(get(project, "imageUrl")),
                            "fileUrl"
                          ) || "/placeholder.svg"
                        }
                        alt={authorProject?.title}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">
                          {authorProject?.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {authorProject?.category || "Project"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Project Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project?.views || 0}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <ThumbsUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project?.likesCount || 0}</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-center mb-1">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="font-bold">{project?.commentsCount || 0}</div>
                  <div className="text-xs text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
