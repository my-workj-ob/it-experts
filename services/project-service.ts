'use client';
import axiosInstance from '@/lib/create-axios';

// Project types
export interface ProjectCategory {
	id: number;
	name: string;
}

export interface ProjectStatus {
	id: number;
	name: string;
}

export interface ProjectFormData {
	title: string;
	description: string;
	categoryId: number;
	status: string;
	tags: string[];
	githubUrl?: string;
	liveDemoUrl?: string;
	coverImage?: File;
	additionalImages?: File[];
	codeSnippets?: File[];
	ownProduct: boolean;
}

// Mock categories and statuses

export const projectStatuses: ProjectStatus[] = [
	{ id: 1, name: 'In Progress' },
	{ id: 2, name: 'Completed' },
	{ id: 3, name: 'Planning' },
	{ id: 4, name: 'On Hold' },
];

// Create a new project
export const uploadFile = async (formData: FormData) => {
	try {
		// Override content type for file uploads
		const response = await axiosInstance.post('/file/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		console.log('File upload response:', response.data);

		// Return the URL from the response
		return {
			url: response.data.url || response.data.path || response.data,
			...response.data,
		};
	} catch (error) {
		console.error('Error uploading file:', error);
		throw error;
	}
};

export const createProject = async (projectData: any) => {
	try {
		// Log the data we're sending
		console.log('Sending project data to server:', projectData);

		// Send the request to the server as JSON
		const response = await axiosInstance.post('/projects', projectData);

		console.log('Server response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error in createProject service:', error);
		throw error;
	}
};

// Get all projects
export async function getProjects(): Promise<any> {
	try {
		const response = await axiosInstance.get('/projects');
		return response.data;
	} catch (error) {
		console.error('Error fetching projects:', error);
		throw error;
	}
}

// Get project by ID
export async function getProjectById(id: string): Promise<any> {
	try {
		const response = await axiosInstance.get(`/projects/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching project:', error);
		throw error;
	}
}
