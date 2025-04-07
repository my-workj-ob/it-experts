import axiosInstance from '@/lib/create-axios';

// Define interfaces for assessment data
export interface AssessmentQuestion {
	id?: number;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation?: string;
}

export interface CodingChallenge {
	id?: number;
	title: string;
	description: string;
	initialCode: string;
	testCases: {
		input: string;
		expectedOutput: string;
	}[];
}

export interface Assessment {
	id?: number;
	title: string;
	description: string;
	skillId: number;
	skillName: string;
	duration: number;
	passingScore: number;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
	questions: AssessmentQuestion[];
	codingChallenges: CodingChallenge[];
}

export interface AssessmentResult {
	id?: number;
	assessmentId: number;
	userId: number;
	answers: {
		questionId: number;
		selectedOption: number;
		isCorrect: boolean;
	}[];
	codingSubmissions: {
		challengeId: number;
		code: string;
		passed: boolean;
	}[];
	score?: number;
	passed?: boolean;
	completedAt?: string;
	level?: string;
}

export interface UserAssessments {
	available: Assessment[];
	completed: Assessment[];
}

class AssessmentService {
	/**
	 * Create a new assessment
	 */
	async createAssessment(
		assessment: Omit<Assessment, 'id'>
	): Promise<Assessment> {
		try {
			const response = await axiosInstance.post(`/assessments`, assessment);
			return response.data;
		} catch (error) {
			console.error('Error creating assessment:', error);
			throw error;
		}
	}

	/**
	 * Get all assessments
	 */
	async getAllAssessments(): Promise<Assessment[]> {
		try {
			const response = await axiosInstance.get(`/assessments`);
			return response.data;
		} catch (error) {
			console.error('Error fetching assessments:', error);
			throw error;
		}
	}

	/**
	 * Get assessment by ID
	 */
	async getAssessmentById(id: number): Promise<Assessment> {
		try {
			const response = await axiosInstance.get(`/assessments/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching assessment with ID ${id}:`, error);
			throw error;
		}
	}

	/**
	 * Update an existing assessment
	 */
	async updateAssessment(
		id: number,
		assessmentData: Partial<Assessment>
	): Promise<Assessment> {
		try {
			const response = await axiosInstance.put(
				`/assessments/${id}`,
				assessmentData
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating assessment with ID ${id}:`, error);
			throw error;
		}
	}

	/**
	 * Delete an assessment
	 */
	async deleteAssessment(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`/assessments/${id}`);
		} catch (error) {
			console.error(`Error deleting assessment with ID ${id}:`, error);
			throw error;
		}
	}

	/**
	 * Get assessments for a specific user
	 */
	async getUserAssessments(userId: number): Promise<UserAssessments> {
		try {
			const response = await axiosInstance.get(`/assessments/users/${userId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching assessments for user ${userId}:`, error);
			throw error;
		}
	}

	/**
	 * Get assessments for a specific skill
	 */
	async getAssessmentsBySkill(skillId: number): Promise<Assessment[]> {
		try {
			const response = await axiosInstance.get(`/assessments/skill/${skillId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching assessments for skill ${skillId}:`, error);
			throw error;
		}
	}

	/**
	 * Alternative endpoint to get user assessments
	 */
	async getUserAssessmentsAlternative(
		userId: number
	): Promise<UserAssessments> {
		try {
			const response = await axiosInstance.get(
				`/assessments/user/asseesment-user/${userId}`
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching assessments for user ${userId} (alternative endpoint):`,
				error
			);
			throw error;
		}
	}

	/**
	 * Submit assessment results
	 */
	async submitAssessment(
		assessmentResult: Omit<AssessmentResult, 'id'>
	): Promise<AssessmentResult> {
		try {
			const response = await axiosInstance.post(
				`/assessment-results`,
				assessmentResult
			);
			return response.data;
		} catch (error) {
			console.error('Error submitting assessment:', error);
			throw error;
		}
	}

	/**
	 * Get assessment results for a user
	 */
	async getUserAssessmentResults(userId: number): Promise<AssessmentResult[]> {
		try {
			const response = await axiosInstance.get(
				`/assessment-results/users/${userId}`
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching assessment results for user ${userId}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Get assessment result by ID
	 */
	async getAssessmentResultById(id: number): Promise<AssessmentResult> {
		try {
			const response = await axiosInstance.get(`/assessment-results/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching assessment result with ID ${id}:`, error);
			throw error;
		}
	}

	/**
	 * Get assessments for a user (for display purposes)
	 */
	async getAssessments(userId: number): Promise<any[]> {
		try {
			// This is a mock function that returns completed assessments with additional display data
			// In a real implementation, this would call the API and transform the data
			const response = await this.getUserAssessments(userId);

			return response.completed.map(assessment => ({
				id: assessment.id,
				title: assessment.title,
				score: Math.floor(Math.random() * 30) + 70, // Mock score between 70-100
				level: ['Beginner', 'Intermediate', 'Advanced'][
					Math.floor(Math.random() * 3)
				],
				completionDate: new Date().toISOString(),
				certificateUrl:
					assessment?.id % 2 === 0 ? `/certificates/${assessment.id}` : null,
			}));
		} catch (error) {
			console.error(`Error fetching assessments for user ${userId}:`, error);
			return [];
		}
	}
}

export const assessmentService = new AssessmentService();
