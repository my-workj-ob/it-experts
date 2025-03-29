'use client';

import { AuthService } from '@/services/auth-service';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (userData: any) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Check if user is authenticated on initial load
		const checkAuth = async () => {
			const token = AuthService.getToken();

			if (token) {
				setIsAuthenticated(true);
				// You might want to fetch user data here if needed
			}

			setIsLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await AuthService.login({ email, password });
			setIsAuthenticated(true);
			if (response.user) {
				setUser(response.user);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (userData: any) => {
		setIsLoading(true);
		try {
			const response = await AuthService.register(userData);
			setIsAuthenticated(true);
			if (response.user) {
				setUser(response.user);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		AuthService.logout();
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {

		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export default useAuth;
