import useAuth from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';

export default function useAuthStatus() {
	const { user } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		console.log(user);

		setIsLoggedIn(!!user); // Foydalanuvchi mavjud bo'lsa true, aks holda false
	}, [user]);

	return { isLoggedIn };
}
