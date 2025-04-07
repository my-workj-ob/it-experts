// Define the skill interface based on the provided data structure
export interface Skill {
	id: number;
	name: string;
	description: string;
	verificationStatus: string;
	userId: number;
}

// Define the skill data for creating a new skill
export interface SkillData {
	name: string;
	description: string;
}

class SkillService {
	// Get skills by user ID
	async getSkillsProfileById(userId?: number): Promise<Skill[]> {
		if (!userId) return [];

		try {
			// In a real app, this would be a fetch call to your API
			// For now, return mock data that matches the structure you provided
			return [
				{
					id: 1,
					name: 'JavaScript',
					description: 'Programming language',
					verificationStatus: 'verified',
					userId: userId,
				},
				{
					id: 2,
					name: 'React',
					description: 'Frontend framework',
					verificationStatus: 'verified',
					userId: userId,
				},
				{
					id: 3,
					name: 'Coding',
					description: 'developer',
					verificationStatus: 'not_verified',
					userId: userId,
				},
			];
		} catch (error) {
			console.error('Error fetching skills:', error);
			return [];
		}
	}

	// Create a new skill
	async createSkill(skillData: SkillData, userId: number): Promise<Skill> {
		try {
			// In a real app, this would be a POST request to your API
			// For now, return a mock response
			return {
				id: Math.floor(Math.random() * 1000),
				name: skillData.name,
				description: skillData.description,
				verificationStatus: 'not_verified',
				userId: userId,
			};
		} catch (error) {
			console.error('Error creating skill:', error);
			throw error;
		}
	}

	// Update skill verification status
	async updateSkillVerificationStatus(
		skillId: number,
		verificationStatus: string
	): Promise<Skill> {
		try {
			// In a real app, this would be a PATCH request to your API
			// For now, return a mock response
			return {
				id: skillId,
				name: 'Updated Skill',
				description: 'Updated description',
				verificationStatus: verificationStatus,
				userId: 2,
			};
		} catch (error) {
			console.error('Error updating skill verification status:', error);
			throw error;
		}
	}

	// Delete a skill
	async deleteSkill(skillId: number): Promise<void> {
		try {
			// In a real app, this would be a DELETE request to your API
			console.log(`Skill ${skillId} deleted successfully`);
		} catch (error) {
			console.error('Error deleting skill:', error);
			throw error;
		}
	}
}

export const skillService = new SkillService();
