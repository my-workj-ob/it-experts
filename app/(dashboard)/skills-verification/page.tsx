"use client"

import { AddSkillModal } from "@/components/add-skills-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useProfile from "@/hooks/profile/use-profile"
import { skillService } from "@/services/skill-service"
import { Skill } from "@/types/skills-types"
import { useQuery } from "@tanstack/react-query"
import { get } from "lodash"
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  FileCheck,
  HelpCircle,
  Info,
  Lock,
  Plus,
  Search,
  Shield,
  Star,
  Trophy,
  Upload,
  Zap,
} from "lucide-react"
import { useState } from "react"

export default function SkillsVerificationPage() {
  const [activeTab, setActiveTab] = useState<string>("my-skills");
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { userProfileData } = useProfile();

  // Fetch skills data using React Query
  const { data: skill = [], isLoading, refetch } = useQuery({
    queryKey: ["skills_by_profile_id", userProfileData?.id],
    queryFn: async () => skillService.getSkillsProfileById(userProfileData?.id, false),
    enabled: !!userProfileData?.id,
  });

  // Ensure `skills` has the correct structure
  const skills: Skill[] = Array.isArray(get(skill, "data", [])) ? get(skill, "data", []) : [];

  // Filter skills based on the search query
  const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Group skills by category
  const groupedSkills = filteredSkills.reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      const categoryName = skill.category?.name || "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(skill);
      return acc;
    },
    {}
  );

  // Calculate verification stats
  const verifiedSkillsCount = skills.filter((skill) => skill.isVerified).length;
  const totalSkillsCount = skills.length;
  const verificationPercentage = totalSkillsCount > 0 ? Math.round((verifiedSkillsCount / totalSkillsCount) * 100) : 0;

  // Get total endorsements
  const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsements, 0);

  // Toggle skill visibility
  const toggleSkillVisibility = async (profileId: number, isPublic: boolean) => {
    try {
      await skillService.getSkillsProfileById(profileId, isPublic);
      refetch();
    } catch (error) {
      console.error("Error updating skill visibility:", error);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Skills Verification</h1>
          <p className="text-muted-foreground">Verify your skills and showcase your expertise</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Resources
          </Button>
          <Button>
            <Award className="h-4 w-4 mr-2" />
            Take Assessment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-skills" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-[600px]">
          <TabsTrigger value="my-skills">My Skills</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
        </TabsList>

        <TabsContent value="my-skills" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Search your skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsAddSkillModalOpen(true)}>
              <Zap className="h-4 w-4 mr-2" />
              Add Skills
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : skills.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Zap className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Add your skills to showcase your expertise and get endorsed by your connections.
                </p>
                <Button onClick={() => setIsAddSkillModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Skill
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Render skills by category */}
              {Object.entries(groupedSkills).map(([categoryName, categorySkills]) => (
                <Card key={categoryName}>
                  <CardHeader>
                    <CardTitle>{categoryName}</CardTitle>
                    <CardDescription>
                      {categoryName === "Technical Skills" && "Programming languages, frameworks, and tools"}
                      {categoryName === "Soft Skills" && "Communication, leadership, and teamwork"}
                      {categoryName === "Domain Knowledge" && "Industry-specific knowledge and expertise"}
                      {!["Technical Skills", "Soft Skills", "Domain Knowledge"].includes(categoryName) &&
                        `Skills related to ${categoryName.toLowerCase()}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {categorySkills.length > 0 ? (
                      categorySkills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                              {skill.isVerified && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {skill.ownSkill && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Owner
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => toggleSkillVisibility(userProfileData?.id, !skill.isPublic)}
                                title={skill.isPublic ? "Make private" : "Make public"}
                              >
                                {skill.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </button>
                              <span className="text-sm text-muted-foreground">{skill.endorsements} endorsements</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={skill.percentage} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{skill.percentage}%</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No {categoryName.toLowerCase()} added yet
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify Skills
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* If no categories are found, show default cards */}
              {Object.keys(groupedSkills).length === 0 && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Skills</CardTitle>
                      <CardDescription>Programming languages, frameworks, and tools</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-muted-foreground">No technical skills added yet</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setIsAddSkillModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Technical Skills
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Soft Skills</CardTitle>
                      <CardDescription>Communication, leadership, and teamwork</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-muted-foreground">No soft skills added yet</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setIsAddSkillModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Soft Skills
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Domain Knowledge</CardTitle>
                      <CardDescription>Industry-specific knowledge and expertise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-muted-foreground">No domain knowledge added yet</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setIsAddSkillModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Domain Knowledge
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              )}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Skill Verification Progress</CardTitle>
              <CardDescription>Track your progress towards a fully verified profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Verification</span>
                  <span className="text-sm font-medium">{verificationPercentage}%</span>
                </div>
                <Progress value={verificationPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{verifiedSkillsCount}</div>
                  <div className="text-sm text-muted-foreground">Verified Skills</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{totalSkillsCount}</div>
                  <div className="text-sm text-muted-foreground">Total Skills</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{totalEndorsements}</div>
                  <div className="text-sm text-muted-foreground">Endorsements</div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mt-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Boost your profile credibility
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Verified skills are 3x more likely to get you noticed by employers and potential collaborators.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Verify More Skills
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          {/* Assessment content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Assessments</CardTitle>
                <CardDescription>Take assessments to verify your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "JavaScript Proficiency",
                    description: "Test your knowledge of JavaScript fundamentals, ES6+, and advanced concepts.",
                    duration: "45 minutes",
                    questions: 30,
                    difficulty: "Intermediate",
                  },
                  {
                    name: "React Development",
                    description: "Demonstrate your skills in building React applications, hooks, and state management.",
                    duration: "60 minutes",
                    questions: 35,
                    difficulty: "Advanced",
                  },
                  {
                    name: "Node.js Backend",
                    description: "Prove your ability to build server-side applications with Node.js and Express.",
                    duration: "50 minutes",
                    questions: 25,
                    difficulty: "Intermediate",
                  },
                  {
                    name: "Data Structures & Algorithms",
                    description: "Solve coding challenges to demonstrate your problem-solving abilities.",
                    duration: "90 minutes",
                    questions: 15,
                    difficulty: "Advanced",
                  },
                ].map((assessment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assessment.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{assessment.description}</p>
                      </div>
                      <Badge variant="outline">{assessment.difficulty}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{assessment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{assessment.questions} questions</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="w-full">
                        Take Assessment
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Assessments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Assessments</CardTitle>
                <CardDescription>Your assessment results and certificates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "HTML & CSS Fundamentals",
                    score: 92,
                    date: "March 15, 2025",
                    badge: "Expert",
                    certificate: true,
                  },
                  {
                    name: "JavaScript Basics",
                    score: 88,
                    date: "February 20, 2025",
                    badge: "Advanced",
                    certificate: true,
                  },
                  {
                    name: "Git & Version Control",
                    score: 95,
                    date: "January 10, 2025",
                    badge: "Expert",
                    certificate: true,
                  },
                ].map((assessment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assessment.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Completed on {assessment.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        {assessment.score}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Award className="h-3 w-3 mr-1" />
                        {assessment.badge}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {assessment.certificate && (
                          <Button size="sm">
                            <FileCheck className="h-4 w-4 mr-2" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Results
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Information</CardTitle>
              <CardDescription>Learn more about our skill assessment process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Industry-Standard Tests</h3>
                    <p className="text-sm text-muted-foreground">
                      Our assessments are designed by industry experts to match real-world job requirements.
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Secure Testing Environment</h3>
                    <p className="text-sm text-muted-foreground">
                      Assessments are conducted in a secure environment to ensure integrity and fairness.
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Recognized Credentials</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn badges and certificates that are recognized by top employers in the industry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-4 mt-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Assessment Guidelines</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      You can retake assessments after 30 days if you don't achieve your desired score. Prepare well
                      before starting an assessment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          {/* Certifications content remains the same */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search certifications..." className="pl-10" />
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Certifications</CardTitle>
                <CardDescription>Certifications you've earned and uploaded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "AWS Certified Solutions Architect",
                    issuer: "Amazon Web Services",
                    date: "January 2025",
                    expiry: "January 2028",
                    verified: true,
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Professional Scrum Master I",
                    issuer: "Scrum.org",
                    date: "March 2024",
                    expiry: "No Expiration",
                    verified: true,
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Google Professional Cloud Developer",
                    issuer: "Google Cloud",
                    date: "November 2024",
                    expiry: "November 2026",
                    verified: true,
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                ].map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex gap-3">
                      <img src={cert.logo || "/placeholder.svg"} alt={cert.issuer} className="h-12 w-12 rounded" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{cert.name}</h3>
                          {cert.verified && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                        <div className="flex gap-4 mt-1 text-sm">
                          <span>Issued: {cert.date}</span>
                          <span>Expires: {cert.expiry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Certifications
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Certifications</CardTitle>
                <CardDescription>Based on your skills and career goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "React Developer Certification",
                    issuer: "Meta",
                    level: "Intermediate",
                    duration: "3 months",
                    cost: "$299",
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Full Stack JavaScript Developer",
                    issuer: "OpenJS Foundation",
                    level: "Advanced",
                    duration: "6 months",
                    cost: "$499",
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Certified Kubernetes Administrator",
                    issuer: "Cloud Native Computing Foundation",
                    level: "Advanced",
                    duration: "2 months",
                    cost: "$375",
                    logo: "/placeholder.svg?height=40&width=40",
                  },
                ].map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex gap-3">
                      <img src={cert.logo || "/placeholder.svg"} alt={cert.issuer} className="h-12 w-12 rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{cert.level}</Badge>
                          <Badge variant="secondary">{cert.duration}</Badge>
                          <Badge variant="secondary">{cert.cost}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button size="sm">Enroll</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Certification Verification</CardTitle>
              <CardDescription>Upload and verify your certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FileCheck className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="font-medium mb-1">Upload Certification</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Drag and drop your certification file or click to browse
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Verification Process</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Upload your certification document</li>
                  <li>Fill in the certification details</li>
                  <li>Our team will verify the certification with the issuer</li>
                  <li>Once verified, the certification will be displayed on your profile</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endorsements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Endorsements Received</CardTitle>
                <CardDescription>Skills endorsed by your connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : skills.filter((s) => s.endorsements > 0).length > 0 ? (
                  skills
                    .filter((s) => s.endorsements > 0)
                    .map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="secondary">{skill.endorsements} endorsements</Badge>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No endorsements received yet</div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Endorsements
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Endorsers</CardTitle>
                <CardDescription>People who have endorsed your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Senior Frontend Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    endorsements: 8,
                  },
                  {
                    name: "Michael Chen",
                    role: "DevOps Engineer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    endorsements: 6,
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Data Scientist",
                    avatar: "/placeholder.svg?height=40&width=40",
                    endorsements: 5,
                  },
                  {
                    name: "David Kim",
                    role: "Full Stack Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    endorsements: 4,
                  },
                ].map((endorser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={endorser.avatar} alt={endorser.name} />
                        <AvatarFallback>{endorser.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{endorser.name}</p>
                        <p className="text-sm text-muted-foreground">{endorser.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{endorser.endorsements} skills</Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Endorsers
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endorsements Given</CardTitle>
                <CardDescription>Skills you've endorsed for others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Jessica Patel",
                    skill: "UI/UX Design",
                    date: "2 weeks ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Robert Wilson",
                    skill: "Mobile Development",
                    date: "1 month ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Lisa Wang",
                    skill: "Data Analysis",
                    date: "2 months ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "James Smith",
                    skill: "Cloud Architecture",
                    date: "3 months ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                ].map((endorsement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={endorsement.avatar} alt={endorsement.name} />
                        <AvatarFallback>{endorsement.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{endorsement.name}</p>
                        <p className="text-sm text-muted-foreground">
                          You endorsed: <span className="font-medium">{endorsement.skill}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{endorsement.date}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Given
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Endorse Your Connections</CardTitle>
              <CardDescription>Help your connections showcase their skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input placeholder="Search your connections..." className="pl-10" />
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Backend Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    skills: ["Python", "Django", "PostgreSQL", "Docker"],
                  },
                  {
                    name: "Sophia Martinez",
                    role: "Frontend Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    skills: ["React", "Vue.js", "CSS", "Webpack"],
                  },
                  {
                    name: "Daniel Lee",
                    role: "DevOps Engineer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
                  },
                ].map((connection, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{connection.name}</p>
                            <p className="text-sm text-muted-foreground">{connection.role}</p>
                          </div>
                          <Button size="sm">
                            <Star className="h-4 w-4 mr-2" />
                            Endorse
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {connection.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="cursor-pointer hover:bg-primary/10">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View More Connections
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Skill Modal */}
      <AddSkillModal
        open={isAddSkillModalOpen}
        onOpenChange={setIsAddSkillModalOpen}
        profileId={userProfileData?.id?.toString() || ""}
      />
    </div>
  )
}

