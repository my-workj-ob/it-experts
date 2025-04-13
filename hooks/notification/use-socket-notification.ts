'use client';

import { socket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const useSocketNotification = (userId?: number) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!userId || !socket) return;

		if (!socket.connected) {
			socket.connect();
		}

		socket.emit('join', userId); // Foydalanuvchini xonasiga qo'shish

		// Real-time notification handling
		const handleNotification = (notification: any) => {
			// Notificationlarni query cache'ga qo'shish
			queryClient.setQueryData(['notifications'], (oldData: any) => {
				// Agar oldData mavjud bo'lmasa, yangi array yaratamiz
				return [...(oldData || []), notification];
			});

			// Unread count-ni yangilash
			queryClient.invalidateQueries({
				queryKey: ['notifications_unread_count'],
			});
		};

		socket.on('notification', handleNotification);

		// Cleanup
		return () => {
			if (!userId || !socket) return;
			socket.off('notification', handleNotification);
		};
	}, [userId, queryClient]);
};

export default useSocketNotification;
