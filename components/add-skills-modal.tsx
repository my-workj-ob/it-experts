"use client"

import type React from "react"

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
import { skillService, type SkillData } from "@/services/skill-service"
import { useState } from "react"

interface AddSkillModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	profileId: string
	onSkillAdded?: () => void
}

export function AddSkillModal({ open, onOpenChange, profileId, onSkillAdded }: AddSkillModalProps) {
	const [skillName, setSkillName] = useState("")
	const [skillDescription, setSkillDescription] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!skillName.trim()) {
			toast({
				title: "Error",
				description: "Skill name is required",
				variant: "destructive",
			})
			return
		}

		try {
			setIsSubmitting(true)

			const skillData: SkillData = {
				name: skillName,
				description: skillDescription,
			}

			await skillService.createSkill(skillData, Number.parseInt(profileId))

			toast({
				title: "Success",
				description: "Skill added successfully",
			})

			setSkillName("")
			setSkillDescription("")
			onOpenChange(false)

			if (onSkillAdded) {
				onSkillAdded()
			}
		} catch (error) {
			console.error("Error adding skill:", error)
			toast({
				title: "Error",
				description: "Failed to add skill. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Skill</DialogTitle>
					<DialogDescription>
						Add a new skill to your profile. You can verify it later through assessments.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="skill-name" className="col-span-4">
								Skill Name
							</Label>
							<Input
								id="skill-name"
								value={skillName}
								onChange={(e) => setSkillName(e.target.value)}
								className="col-span-4"
								placeholder="e.g., JavaScript, React, Project Management"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="skill-description" className="col-span-4">
								Description
							</Label>
							<Textarea
								id="skill-description"
								value={skillDescription}
								onChange={(e) => setSkillDescription(e.target.value)}
								className="col-span-4"
								placeholder="Briefly describe your experience with this skill"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Adding..." : "Add Skill"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

