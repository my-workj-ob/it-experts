import axios from 'axios';

const getApiUrl = () => {
	if (typeof window !== 'undefined') {
		const hostname = window.location.hostname;

		if (hostname === 'localhost') {
			return 'http://localhost:3030'; // Local development
		} else if (hostname === 'staging.example.com') {
			return 'https://backend-lesb.onrender.com/api/docs'; // Staging muhit
		} else {
			return 'https://backend-lesb.onrender.com/api/docs'; // Production muhit
		}
	}

	return (
		process.env.NEXT_PUBLIC_API_URL ||
		'https://backend-lesb.onrender.com/api/docs'
	);
};

// Create axios instance with base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const axiosInstance = axios.create({
	baseURL: getApiUrl(),
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	config => {
		// Get token from localStorage
		const token = localStorage.getItem('accessToken');

		// If token exists, add it to request headers
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		const originalRequest = error.config;

		// If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Try to refresh the token
				const refreshToken = localStorage.getItem('refreshToken');

				if (!refreshToken) {
					// If no refresh token, redirect to login
					window.location.href = '/login';
					return Promise.reject(error);
				}

				// Call refresh token endpoint
				const response = await axiosInstance.post('/auth/refresh-token', {
					refreshToken,
				});

				// Save new tokens
				const { accessToken, refreshToken: newRefreshToken } = response.data;
				localStorage.setItem('accessToken', accessToken);

				if (newRefreshToken) {
					localStorage.setItem('refreshToken', newRefreshToken);
				}

				// Update Authorization header and retry the original request
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// If refresh token fails, redirect to login
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
