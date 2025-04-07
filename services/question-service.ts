import axiosInstance from '@/lib/create-axios';

export interface Question {
	id: number;
	title: string;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
}

export interface TestSubmission {
	profileId: number;
	title: string;
	answers: number[];
}

export interface TestResult {
	id: number;
	profile: any;
	title: string;
	completionDate: string;
	score: number;
	level: string;
	certificateUrl: string | null;
}

class QuestionService {
	// Get questions by title
	async getQuestionsByTitle(title: string): Promise<Question[]> {
		try {
			const response = await axiosInstance.get(`/questions/${title}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching questions:', error);
			throw error;
		}
	}

	// Get questions for a profile
	async getQuestionsForProfile(): Promise<Question[]> {
		try {
			const response = await axiosInstance.get(`/questions/questions/profile`);
			return response.data;
		} catch (error) {
			console.error('Error fetching profile questions:', error);
			throw error;
		}
	}

	// Add a new question
	async addQuestion(
		profileId: number,
		title: string,
		question: string,
		options: string[],
		correctAnswer: number,
		explanation: string
	): Promise<Question> {
		try {
			const response = await axiosInstance.post(`/questions/${profileId}`, {
				title,
				question,
				options,
				correctAnswer,
				explanation,
			});
			return response.data;
		} catch (error) {
			console.error('Error adding question:', error);
			throw error;
		}
	}

	// Submit test answers
	async submitTest(submission: TestSubmission): Promise<TestResult> {
		try {
			const response = await axiosInstance.post('/questions/tests', submission);
			return response.data;
		} catch (error) {
			console.error('Error submitting test:', error);
			throw error;
		}
	}
}

export const questionService = new QuestionService();
