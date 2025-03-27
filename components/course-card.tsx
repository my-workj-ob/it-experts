import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Users, BookOpen } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  thumbnail: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  students: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  category: string
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/courses/${course.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          {course.isBestseller && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white border-yellow-500">Bestseller</Badge>
          )}
          {course.isNew && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white border-green-500">New</Badge>
          )}
          {course.originalPrice && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white border-red-500">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/courses/${course.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">{course.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{course.description}</p>

        <div className="flex items-center mt-3">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
            <AvatarFallback>{course.instructor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex items-center text-yellow-500 mr-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                  />
                ))}
            </div>
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{course.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
          {course.originalPrice && (
            <span className="text-sm text-muted-foreground line-through ml-2">${course.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Link href={`/courses/${course.id}`} className="text-sm text-primary hover:underline">
          View Course
        </Link>
      </CardFooter>
    </Card>
  )
}

