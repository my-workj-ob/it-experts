'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useProfile from '@/hooks/profile/use-profile';
import { useToast } from '@/hooks/use-toast';
import { categoryService } from '@/services/category-service';
import { skillService } from '@/services/skill-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, isArray } from 'lodash';
import { useState } from 'react';

interface AddSkillModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	profileId: string | number;
}
interface SkillData {
	category: string
	categoryId: number
	name: string
	isPublic: boolean
}
export function AddSkillModal({
	open,
	onOpenChange,
}: AddSkillModalProps) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const { userProfileData } = useProfile()
	const [skillData, setSkillData] = useState<SkillData>({
		category: '',
		categoryId: 1,
		name: '',
		isPublic: true,
	});

	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => await categoryService.getCategories(),
		enabled: !!open
	})


	const categories = isArray(get(data, "data", [])) ? get(data, "data") : []

	const handleCategoryChange = (value: string) => {
		const category = categories.find((cat: { id: number }) => cat.id.toString() === value);
		if (category) {
			setSkillData({
				...skillData,
				category: category.name,
				categoryId: category.id,
				name: category.name,
			});
		}
	};

	const { mutate, } = useMutation({
		mutationKey: ["skills"],
		mutationFn: async (skill: SkillData) => await skillService.createSkill(skill, get(userProfileData, "id")),

	})

	const handleSubmit = async () => {
		setIsLoading(true);
		try {


			const res = mutate(skillData, {
				onSuccess: (data) => {
					console.log("Success:", data)
					toast({
						title: "Skill added successfully",
						description: `${skillData.name} has been added to your profile.`,
					})
					onOpenChange(false)
				},
				onError: (error) => {
					console.error("Error:", error)
					toast({
						title: "Failed to add skill",
						description: "There was an error adding your skill. Please try again.",
						variant: "destructive",
					})
				},
				onSettled: () => {
					setIsLoading(false)
				}
			})



			toast({
				title: 'Skill added successfully',
				description: `${skillData.name} has been added to your profile.`,
			});
			onOpenChange(false);
		} catch (error) {
			console.error('Error adding skill:', error);
			toast({
				title: 'Failed to add skill',
				description: 'There was an error adding your skill. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add a new skill</DialogTitle>
					<DialogDescription>
						Add a skill to your profile to showcase your expertise.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='category' className='text-right'>
							Category
						</Label>
						<Select onValueChange={handleCategoryChange}>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a category' />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((category: { id: number, name: string }) => (
									<SelectItem key={category.id} value={category.id.toString()}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Skill Name
						</Label>
						<Input
							id='name'
							value={skillData.name}
							onChange={e =>
								setSkillData({ ...skillData, name: e.target.value })
							}
							className='col-span-3'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='isPublic' className='text-right'>
							Public
						</Label>
						<div className='flex items-center space-x-2 col-span-3'>
							<Switch
								id='isPublic'
								checked={skillData.isPublic}
								onCheckedChange={checked =>
									setSkillData({ ...skillData, isPublic: checked })
								}
							/>
							<Label htmlFor='isPublic'>
								Make this skill visible to others
							</Label>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						type='submit'
						onClick={handleSubmit}
						disabled={isLoading || !skillData.name || !skillData.category}
					>
						{isLoading ? 'Adding...' : 'Add Skill'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
