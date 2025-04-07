import axiosInstance from '@/lib/create-axios';

export interface Question {
	id?: number;
	text: string;
	options: string[];
	correctAnswer: number;
	skillId: number;
	skill?: {
		id: number;
		name: string;
		description: string;
		verificationStatus: string;
		userId: number;
	};
}

export interface TestSubmission {
	profileId: number;
	title: string;
	answers: number[];
}

class QuestionService {
	async createQuestion(question: Omit<Question, 'id'>): Promise<Question> {
		try {
			const response = await axiosInstance.post(`/questions`, question);
			return response.data;
		} catch (error) {
			console.error('Error creating question:', error);
			throw error;
		}
	}

	/**
	 * Get all questions
	 */
	async getAllQuestions(): Promise<Question[]> {
		try {
			const response = await axiosInstance.get(`/questions`);
			return response.data;
		} catch (error) {
			console.error('Error fetching questions:', error);
			throw error;
		}
	}

	/**
	 * Get questions by skill ID
	 */
	async getQuestionsBySkill(skillId: number): Promise<Question[]> {
		try {
			const response = await axiosInstance.get(`/questions?skillId=${skillId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching questions for skill ${skillId}:`, error);
			throw error;
		}
	}

	/**
	 * Get questions by title (for assessments)
	 */
	async getQuestionsByTitle(title: string): Promise<Question[]> {
		try {
			// In a real implementation, this would call an API endpoint that filters questions by title
			// For now, we'll return mock data
			const allQuestions = await this.getAllQuestions();
			return allQuestions.slice(0, 5); // Return first 5 questions as mock data
		} catch (error) {
			console.error(`Error fetching questions for title ${title}:`, error);
			throw error;
		}
	}

	/**
	 * Submit a test
	 */
	async submitTest(submission: TestSubmission): Promise<any> {
		try {
			// In a real implementation, this would call an API endpoint to submit the test
			// For now, we'll return mock data
			return {
				id: Math.floor(Math.random() * 1000),
				score: Math.floor(Math.random() * 30) + 70, // Mock score between 70-100
				passed: true,
				level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][
					Math.floor(Math.random() * 4)
				],
				completionDate: new Date().toISOString(),
			};
		} catch (error) {
			console.error('Error submitting test:', error);
			throw error;
		}
	}
}

export const questionService = new QuestionService();
