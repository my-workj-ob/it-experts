import { BookOpen, BarChart, Users, Video } from "lucide-react"

export const popularCourses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 345,
    students: 1245,
    duration: "8 weeks",
    level: "Beginner",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript"],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Advanced React & Redux",
    description: "Master React hooks, context API, and Redux for complex applications.",
    instructor: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 79.99,
    rating: 4.9,
    reviewCount: 892,
    students: 892,
    duration: "10 weeks",
    level: "Advanced",
    category: "Web Development",
    tags: ["React", "Redux", "JavaScript"],
    progress: 35,
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning concepts.",
    instructor: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 69.99,
    rating: 4.7,
    reviewCount: 1567,
    students: 1567,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Statistics", "Machine Learning"],
    progress: 75,
  },
  {
    id: "4",
    title: "UX/UI Design Principles",
    description: "Learn user-centered design approaches and create stunning interfaces.",
    instructor: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 59.99,
    rating: 4.6,
    reviewCount: 723,
    students: 723,
    duration: "6 weeks",
    level: "Beginner",
    category: "Design",
    tags: ["Figma", "Design Thinking", "Prototyping"],
    progress: 20,
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications with Flutter and Dart.",
    instructor: {
      name: "Jessica Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 69.99,
    rating: 4.8,
    reviewCount: 1089,
    students: 1089,
    duration: "9 weeks",
    level: "Intermediate",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "Mobile"],
    progress: 0,
  },
  {
    id: "6",
    title: "DevOps Engineering",
    description: "Master CI/CD pipelines, containerization, and cloud infrastructure.",
    instructor: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    thumbnail: "/placeholder.svg?height=200&width=350",
    price: 89.99,
    rating: 4.9,
    reviewCount: 645,
    students: 645,
    duration: "14 weeks",
    level: "Advanced",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "AWS"],
    progress: 50,
  },
]

export const testimonials = [
  {
    content:
      "DevConnect helped me find the perfect team members for my startup. The AI matching is incredibly accurate!",
    author: {
      name: "Sarah Williams",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
  },
  {
    content:
      "I've attended several events through DevConnect and made valuable connections that led to job opportunities.",
    author: {
      name: "Michael Chen",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
  },
  {
    content:
      "The AI assistant helped me optimize my profile and I've received more connection requests than ever before!",
    author: {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
  },
]

export const categories = [
  {
    name: "Web Development",
    slug: "web-development",
    count: 245,
    icon: BookOpen,
  },
  {
    name: "Data Science",
    slug: "data-science",
    count: 187,
    icon: BarChart,
  },
  {
    name: "Design",
    slug: "design",
    count: 321,
    icon: Users,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    count: 156,
    icon: Video,
  },
]

