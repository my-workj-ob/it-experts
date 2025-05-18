import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { User } from "@/types/profile-types";

interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

interface Project {
  id: number;
  title: string;
  categoryId: number;
  description: string;
  technologies: string[];
  images: string[];
  user: User; // Assuming you have a User interface defined elsewhere
  userId: number;
  category: Category;
  deadline: string;
  teamSize: number;
  openPositions: string[];
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Recruiting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={project.images[0] || "/placeholder.svg"} // Access the first image in the array
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(project?.status)}>
            {project.status}
          </Badge>
        </div>
      </div>
      <CardContent className="px-3 py-1">
        <div className="mb-2">
          <Badge variant="outline" className="mb-2">
            {project?.category?.name}
          </Badge>
        </div>
        <h3 className="font-semibold text-xl text-primary">{project?.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project?.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map(
            (
              skill // Use technologies array
            ) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            )
          )}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="font-normal">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Deadline: {formatDate(project.deadline)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Team: {project.teamSize} member{project.teamSize !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-3 py-1 pt-0 flex justify-end  ">
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
