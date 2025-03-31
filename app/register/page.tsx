"use client"

import { Github, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useRef, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import AuthService from "@/services/auth-service"
import { IRegister } from "@/types/auth-types"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  // Form data refs
  const formData = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    company: "",
    expertise: "",
    experience: "",
  })

  // Form validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.current.firstName) newErrors.firstName = "First name is required"
    if (!formData.current.lastName) newErrors.lastName = "Last name is required"
    if (!formData.current.email) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.current.email)) newErrors.email = "Invalid email format"
    if (!formData.current.password) newErrors.password = "Password is required"
    if (formData.current.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.current.password !== formData.current.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current = {
      ...formData.current,
      [e.target.id]: e.target.value,
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    formData.current = {
      ...formData.current,
      [name]: value,
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      }
      return
    }

    setIsLoading(true)

    try {
      // Extract registration data
      const { firstName, lastName, email, password, confirmPassword, jobTitle } = formData.current

      // Register the user
      const registerData: IRegister = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        jobTitle
      }

      const response = await AuthService.register(registerData)
      console.log(response)
      // If registration is successful, store additional profile data
      // This would typically be a separate API call to update the user profile
      // For now, we'll just simulate it with a toast message

      toast({
        title: "Account created successfully!",
        description: "Welcome to DevConnect!",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Create an account
              </span>
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1 ? "Enter your details to create your account" : "Tell us more about yourself"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        onChange={handleInputChange}
                        defaultValue={formData.current.firstName}
                        required
                      />
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        onChange={handleInputChange}
                        defaultValue={formData.current.lastName}
                        required
                      />
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      onChange={handleInputChange}
                      defaultValue={formData.current.email}
                      required
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={handleInputChange}
                      defaultValue={formData.current.password}
                      required
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      onChange={handleInputChange}
                      defaultValue={formData.current.confirmPassword}
                      required
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Software Engineer"
                      onChange={handleInputChange}
                      defaultValue={formData.current.jobTitle}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Company name"
                      onChange={handleInputChange}
                      defaultValue={formData.current.company}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Area of Expertise</Label>
                    <Select onValueChange={(value) => handleSelectChange("expertise", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your area of expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => handleSelectChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-6">4-6 years</SelectItem>
                        <SelectItem value="7-10">7-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {step === 1 ? "Processing..." : "Creating account..."}
                  </>
                ) : step === 1 ? (
                  "Continue"
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            {step === 1 && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 2 ? (
              <Button variant="ghost" onClick={() => setStep(1)} disabled={isLoading}>
                Back
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

