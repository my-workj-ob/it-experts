"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/create-axios"
import { useState } from "react"

interface MentorshipRequestModalProps {
  isOpen: boolean
  onClose: () => void
  mentorId: number
  mentorName: string
}

export function MentorshipRequestModal({ isOpen, onClose, mentorId, mentorName }: MentorshipRequestModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    menteeName: "",
    menteeEmail: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use the correct API endpoint as shown in the image
      await axiosInstance.post('/mentorship-requests', {
        menteeName: formData.menteeName,
        menteeEmail: formData.menteeEmail,
        message: formData.message,
        mentorId: mentorId
      })

      toast({
        title: "Request sent!",
        description: `Your mentorship request has been sent to ${mentorName}.`,
        variant: "default",
      })
      onClose()
      // Reset form
      setFormData({
        menteeName: "",
        menteeEmail: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your request couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Mentorship</DialogTitle>
          <DialogDescription>
            Send a mentorship request to {mentorName}. Please include why you're interested in being mentored.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menteeName" className="text-right">
                Name
              </Label>
              <Input
                id="menteeName"
                name="menteeName"
                value={formData.menteeName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menteeEmail" className="text-right">
                Email
              </Label>
              <Input
                id="menteeEmail"
                name="menteeEmail"
                type="email"
                value={formData.menteeEmail}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell the mentor why you're interested and what you hope to learn..."
                className="col-span-3"
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
