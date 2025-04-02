import axiosInstance from '@/lib/create-axios';
import { AuthResponse, IRegister, UserCredentials } from '@/types/auth-types';

export const AuthService = {
	// Register a new user
	register: async (user: IRegister): Promise<AuthResponse> => {
		const response = await axiosInstance.post<AuthResponse>(
			'/auth/register',
			user,
			{
				withCredentials: true,
			}
		);

		// Store tokens in localStorage
		if (response.data.accessToken) {
			localStorage.setItem('accessToken', response.data.accessToken);

			if (response.data.refreshToken) {
				localStorage.setItem('refreshToken', response.data.refreshToken);
			}
		}

		return response.data;
	},

	// Login user
	login: async (credentials: UserCredentials): Promise<AuthResponse> => {
		const response = await axiosInstance.post<AuthResponse>(
			'/auth/login',
			credentials
		);

		// Store tokens in localStorage
		if (response.data.accessToken) {
			localStorage.setItem('accessToken', response.data.accessToken);

			if (response.data.refreshToken) {
				localStorage.setItem('refreshToken', response.data.refreshToken);
			}
		}

		return response.data;
	},

	// Logout user
	logout: () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	},

	// Check if user is authenticated
	isAuthenticated: (): boolean => {
		return !!localStorage.getItem('accessToken');
	},

	// Refresh token
	refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
		const response = await axiosInstance.post<AuthResponse>(
			'/auth/refresh-token',
			{ refreshToken }
		);

		if (response.data.accessToken) {
			localStorage.setItem('accessToken', response.data.accessToken);

			if (response.data.refreshToken) {
				localStorage.setItem('refreshToken', response.data.refreshToken);
			}
		}

		return response.data;
	},

	// Get current user token
	getToken: (): string | null => {
		return localStorage.getItem('accessToken');
	},
};

export default AuthService;
