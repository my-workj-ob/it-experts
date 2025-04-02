"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { ProfileService } from "@/services/profile-service"

import useProfile from "@/hooks/profile/use-profile"
import axiosInstance from "@/lib/create-axios"
import { ProfileData } from "@/types/profile-types"
import { get } from "lodash"
import {
  Bell,
  Eye,
  EyeOff,
  Github,
  Globe,
  Key,
  Linkedin,
  Loader2,
  LogOut,
  Plus,
  Shield,
  Smartphone,
  Trash2,
  Twitter,
  Upload,
  User,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function SettingsPage() {
  const { getUserProfile, updateNotificationSettings, updatePassword, updatePrivacySettings, updateProfile, updateAvatar, uploadFile } = ProfileService
  const { toast } = useToast()
  const { userProfileData, refetch } = useProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form states
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
  })
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder.svg?height=96&width=96")
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState("public")
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("system")
  const [matchingPreference, setMatchingPreference] = useState(75)
  const [category, setCategory] = useState<{ name: string }>({
    name: ""
  })
  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        const response = await getUserProfile()
        const data = response.data
        setProfileData({
          firstName: data.firstName || data.name?.split(" ")[0] || "",
          lastName: data.lastName || data.name?.split(" ")[1] || "",
          email: data.email || "",
          jobTitle: data.jobTitle || "",
        })
        if (data.avatar) {
          setAvatarUrl(data.avatar)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [toast])

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true)
      const updatedData = {
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email,
        jobTitle: profileData.jobTitle,
      }
      await updateProfile(updatedData)
      toast({
        title: "Success",
        description: "Profile information updated successfully.",
      })
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      await updatePassword({
        currentPassword,
        newPassword,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast({
        title: "Success",
        description: "Password updated successfully.",
      })
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update password:", error)
      toast({
        title: "Error",
        description: "Failed to update password. Please check your current password and try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Handle notification settings update
  const handleNotificationSettingsUpdate = async () => {
    try {
      setIsLoading(true)
      await updateNotificationSettings({
        emailNotifications,
        pushNotifications,
      })
      toast({
        title: "Success",
        description: "Notification settings updated successfully.",
      })
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update notification settings:", error)
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Handle privacy settings update
  const handlePrivacySettingsUpdate = async () => {
    try {
      setIsLoading(true)
      await updatePrivacySettings({
        isPublic: profileVisibility === "public",
        showEmail,
      })
      toast({
        title: "Success",
        description: "Privacy settings updated successfully.",
      })
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update privacy settings:", error)
      toast({
        title: "Error",
        description: "Failed to update privacy settings. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedFile = await uploadFile(file);
      const response = await updateAvatar(userProfileData.id, uploadedFile.fileUrl);
      setAvatarUrl(response.avatar);
      refetch()
      toast({
        title: 'Success',
        description: 'Avatar updated successfully.',
      });
    } catch (err: unknown) { // <-- Error turini aniq qilish
      const error = err as Error;
      console.error('Failed to upload avatar:', error.message);

      toast({
        title: 'Error',
        description: 'Failed to upload avatar. Please try again.',
        variant: 'destructive',
      });
    }
  };


  // Trigger file input click
  const handleAvatarButtonClick = () => {

    fileInputRef.current?.click()
  }

  const handleCategory = async () => {
    const res = await axiosInstance.post("/categories", {
      ...category
    })

    console.log(res.data);

  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <img className="w-10 h-10" src="https://drive.usercontent.google.com/download?id=1yoYsJuXqlU0Bjmbjo36nRzV2ojktJqu8&authuser=0" alt="" />
      <Input onChange={(e) => setCategory({ ...category, name: e.target.value })} />
      <Button onClick={() => handleCategory()}>add</Button>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="account" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex gap-2 items-center">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Key className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and how it appears on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={get(userProfileData, "avatar")} alt="Profile" />
                    <AvatarFallback>
                      {profileData.firstName?.[0]}
                      {profileData.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                    <Button variant="outline" size="sm" onClick={handleAvatarButtonClick} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      Change
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      disabled={isLoading || avatarUrl === "/placeholder.svg?height=96&width=96"}
                      onClick={() => setAvatarUrl("/placeholder.svg?height=96&width=96")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      value={profileData.jobTitle}
                      onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleProfileUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Connect your social accounts to enhance your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Connect your GitHub account</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connect your LinkedIn account</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-muted-foreground">Connect your Twitter account</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage the emails you receive from DevConnect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Connection Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when someone sends you a connection request
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">Receive emails when you get new messages</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Project Invitations</p>
                  <p className="text-sm text-muted-foreground">Receive emails when you're invited to join a project</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Event Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about upcoming events you've registered for
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Platform Updates</p>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNotificationSettingsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage the notifications you receive on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Connection Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when someone sends you a connection request
                  </p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">Receive notifications when you get new messages</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Project Updates</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about projects you're part of</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Event Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about upcoming events</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNotificationSettingsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>Control who can see your profile and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Profile visibility</Label>
                <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                  <SelectTrigger id="profileVisibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can view your profile</SelectItem>
                    <SelectItem value="connections">
                      Connections Only - Only your connections can view your profile
                    </SelectItem>
                    <SelectItem value="private">Private - Your profile is hidden from search</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Email Address</p>
                  <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                </div>
                <Switch checked={showEmail} onCheckedChange={setShowEmail} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Phone Number</p>
                  <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                </div>
                <Switch checked={showPhone} onCheckedChange={setShowPhone} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Online Status</p>
                  <p className="text-sm text-muted-foreground">Show when you're active on the platform</p>
                </div>
                <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePrivacySettingsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Activity Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Allow us to track your activity to improve recommendations
                  </p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Personalized Ads</p>
                  <p className="text-sm text-muted-foreground">
                    Allow personalized advertisements based on your activity
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Sharing with Partners</p>
                  <p className="text-sm text-muted-foreground">Allow sharing your data with trusted partners</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline">Download My Data</Button>
                <p className="text-xs text-muted-foreground">
                  Request a copy of all your data. This may take up to 48 hours to process.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                    <SelectItem value="utc-0">UTC+00:00 (GMT)</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00 (Central European Time)</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00 (China Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how DevConnect looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reduce Animations</p>
                  <p className="text-sm text-muted-foreground">Minimize animations for improved performance</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Contrast Mode</p>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matching Preferences</CardTitle>
              <CardDescription>Customize how we match you with other professionals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="matchThreshold">Minimum Match Score ({matchingPreference}%)</Label>
                </div>
                <Slider
                  id="matchThreshold"
                  value={[matchingPreference]}
                  onValueChange={(value) => setMatchingPreference(value[0])}
                  min={50}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Only show professionals with a match score above this threshold
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Skills Priority</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="cursor-pointer">React</Badge>
                  <Badge className="cursor-pointer">TypeScript</Badge>
                  <Badge className="cursor-pointer">Next.js</Badge>
                  <Badge className="cursor-pointer" variant="outline">
                    Node.js
                  </Badge>
                  <Badge className="cursor-pointer" variant="outline">
                    GraphQL
                  </Badge>
                  <Button variant="outline" size="sm" className="h-6">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Skill
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Prioritize matching with professionals who have these skills
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Location-based Matching</p>
                  <p className="text-sm text-muted-foreground">Prioritize professionals in your area</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password and manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button onClick={handlePasswordUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="2faMethod">Authentication Method</Label>
                <Select defaultValue="app">
                  <SelectTrigger id="2faMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app">Authenticator App</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">Set Up Two-Factor Authentication</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>Manage your active sessions and devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    device: "MacBook Pro",
                    location: "San Francisco, CA",
                    lastActive: "Active now",
                    browser: "Chrome",
                    current: true,
                  },
                  {
                    device: "iPhone 13",
                    location: "San Francisco, CA",
                    lastActive: "2 hours ago",
                    browser: "Safari",
                    current: false,
                  },
                  {
                    device: "Windows PC",
                    location: "New York, NY",
                    lastActive: "Yesterday",
                    browser: "Firefox",
                    current: false,
                  },
                ].map((session, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {session.device}{" "}
                          {session.current && (
                            <Badge variant="outline" className="ml-2">
                              Current
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.browser} • {session.location}
                        </p>
                        <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Log Out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Log Out of All Devices
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Deactivate Account
                </Button>
                <p className="text-xs text-muted-foreground">
                  Temporarily disable your account. You can reactivate it at any time.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

