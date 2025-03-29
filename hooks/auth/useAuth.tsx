'use client';

import { AuthService } from '@/services/auth-service';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import useProfile from '../profile/use-profile';

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

	// useProfile hook dan ma'lumot olish
	const { userProfileData } = useProfile();

	useEffect(() => {
		const checkAuth = async () => {
			const token = AuthService.getToken();

			if (token) {
				setIsAuthenticated(true);
			}

			// userProfileData mavjud bo'lsa, uni user sifatida o'rnatish
			if (userProfileData && userProfileData.id) {
				setUser(userProfileData);
			}

			setIsLoading(false);
		};

		checkAuth();
	}, [userProfileData]); // userProfileData o'zgarishlarini kuzatish uchun dependency arrayga qo'shildi

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
