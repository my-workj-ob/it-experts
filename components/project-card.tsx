import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Users } from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  skills: string[]
  category: string
  status: string
  openPositions: string[]
  teamSize: number
  deadline: string
  image: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
      case "Recruiting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      case "Completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="mb-2">
            {project.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-xl text-primary">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 4 && (
            <Badge variant="secondary" className="font-normal">
              +{project.skills.length - 4} more
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

        {project.openPositions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Open Positions:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {project.openPositions.map((position) => (
                <li key={position}>• {position}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}`}>Details</Link>
        </Button>
        <Button>Apply</Button>
      </CardFooter>
    </Card>
  )
}

