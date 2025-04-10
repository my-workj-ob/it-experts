import axiosInstance from '@/lib/create-axios';
import { useQuery } from '@tanstack/react-query';

export const useNotifications = () => {
	return useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
			const res = await axiosInstance.get('/notifications');
			return res.data;
		},
		refetchInterval: 5000, // 10 soniyada bir marta yangilab turish
	});
};

export const useUnreadNotificationCount = () => {
	return useQuery({
		queryKey: ['notifications_unread_count'],
		queryFn: async () => {
			const res = await axiosInstance.get('/notifications/unread-count');
			if (!res || !res.data) {
				// Agar res yoki res.data bo'sh bo'lsa, null yoki 0 qaytaring
				return 0;
			}
			return res.data || 0; // Agar count bo'lmasa, 0 qaytarsin
		},
	});
};
