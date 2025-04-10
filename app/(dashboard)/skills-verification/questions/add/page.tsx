"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// API base URL
const API_URL = "http://localhost:3030"

// Type definitions
interface Question {
  text: string
  options: string[]
  correctAnswer: number
  skillId?: number
  categoryId: number
}

interface Skill {
  id: number
  name: string
}
interface Category {
  id: number
  name: string
}

// API services
const skillService = {
  getSkillsProfileById: async (profileId?: number): Promise<Skill[]> => {
    if (!profileId) return []
    const response = await axiosInstance.get(`/skills?profileId=${profileId}`)
    return response.data
  },
}
const categoryServie = {
  getCategories: async (profileId?: number): Promise<Category[]> => {
    if (!profileId) return []
    const response = await axiosInstance.get(`/categories`)
    return response.data
  },
}


const questionService = {
  createQuestion: async (question: Question): Promise<any> => {
    const response = await axiosInstance.post(`/questions`, question)
    return response.data
  },
}

export default function AddQuestionPage() {
  const router = useRouter()
  const { userProfileData } = useProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch user skills
  const { data: skills = [] } = useQuery({
    queryKey: ["skills_by_profile_id", userProfileData?.id],
    queryFn: async () => await skillService.getSkillsProfileById(userProfileData?.id),
    enabled: !!userProfileData?.id,
  })
  const { data: categories = [] } = useQuery({
    queryKey: ["categories", userProfileData?.id],
    queryFn: async () => await categoryServie.getCategories(userProfileData?.id),
    enabled: !!userProfileData?.id,
  })

  // Create question mutation
  const createQuestionMutation = useMutation({
    mutationFn: (questionData: Question) => questionService.createQuestion(questionData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Question added successfully",
      })

      // Reset form
      setQuestion({
        text: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        skillId: 0,
        categoryId: 0,
      })
    },
    onError: (error) => {
      console.error("Error adding question:", error)
      toast({
        title: "Error",
        description: "Failed to add question. Please try again.",
      })
    },
  })

  // Question state
  const [question, setQuestion] = useState<Question>({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    skillId: 0,
    categoryId: 0,
  })

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({
      ...question,
      text: e.target.value,
    })
  }

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options]
    updatedOptions[index] = value
    setQuestion({
      ...question,
      options: updatedOptions,
    })
  }

  // Handle correct answer change
  const handleCorrectAnswerChange = (index: number) => {
    setQuestion({
      ...question,
      correctAnswer: index,
    })
  }

  // Handle skill change
  const handleSkillChange = (value: string) => {
    setQuestion({
      ...question,
      skillId: Number(value),
    })
  }

  // Handle category change (if needed)
  const handleCategoryChange = (value: string) => {
    setQuestion({
      ...question,
      categoryId: Number(value),
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!question.text.trim()) {
      toast({
        title: "Error",
        description: "Question text is required",
      })
      return
    }

    if (question.options.some((option) => !option.trim())) {
      toast({
        title: "Error",
        description: "All options must have content",
      })
      return
    }



    // Submit using React Query mutation
    createQuestionMutation.mutate(question)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/skills-verification" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Question</h1>
          <p className="text-muted-foreground">Contribute questions to the skills verification platform</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
            <CardDescription>Create a new multiple-choice question</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skill">
                Skill
              </Label>
              <Select value={question.skillId.toString()} onValueChange={handleSkillChange}>
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Select a skill</SelectItem>
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={question.categoryId.toString()} onValueChange={handleCategoryChange}>
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Select a skill</SelectItem>
                  {categories.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">
                Question <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="question"
                placeholder="Enter your question here..."
                value={question.text}
                onChange={handleTextChange}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>
                Options <span className="text-destructive">*</span>
              </Label>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                    <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`correct-${index}`}
                      name="correctAnswer"
                      className="mr-2"
                      checked={question.correctAnswer === index}
                      onChange={() => handleCorrectAnswerChange(index)}
                    />
                    <Label htmlFor={`correct-${index}`} className="text-sm cursor-pointer">
                      Correct
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={createQuestionMutation.isPending}>
              {createQuestionMutation.isPending ? "Adding..." : "Add Question"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
