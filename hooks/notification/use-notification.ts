'use client';

import axiosInstance from '@/lib/create-axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import useSocketNotification from './use-socket-notification';

interface Notification {
	id: string;
	message: string;
	timestamp: string;
	read: boolean;
	type: string;
	senderId?: number;
}

interface UseNotificationsProps {
	userId?: number;
}

export function useNotifications({ userId }: UseNotificationsProps) {
	const queryClient = useQueryClient();

	// Connect to socket for real-time notifications
	useSocketNotification(userId);

	// Fetch notifications
	const { data: notifications = [] } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
			if (!userId) return [];
			const response = await axiosInstance.get(`/notifications/user/devices`);
			console.log('Notifications:', response.data);

			return response.data;
		},

		enabled: !!userId,
	});

	// Get unread count
	const { data: unreadCount = 0 } = useQuery({
		queryKey: ['notifications_unread_count'],
		queryFn: async () => {
			if (!userId) return 0;
			const response = await axiosInstance.get(
				`/notifications/unread-count?userId=${userId}`
			);
			return response.data.count;
		},
		enabled: !!userId,
	});

	// Mark notification as read
	const markAsReadMutation = useMutation({
		mutationFn: async (notificationId: string) => {
			return axiosInstance.post(`/notifications/mark-read`, {
				notificationId,
				userId,
			});
		},
		onSuccess: (_, notificationId) => {
			// Update notifications in cache
			queryClient.setQueryData(['notifications'], (oldData: any) => {
				return oldData.map((notification: Notification) =>
					notification.id === notificationId
						? { ...notification, read: true }
						: notification
				);
			});

			// Invalidate unread count
			queryClient.invalidateQueries({
				queryKey: ['notifications_unread_count'],
			});
		},
	});

	// Mark all notifications as read
	const markAllAsReadMutation = useMutation({
		mutationFn: async () => {
			return axiosInstance.post(`/notifications/mark-all-read`, {
				userId,
			});
		},
		onSuccess: () => {
			// Update all notifications in cache
			queryClient.setQueryData(['notifications'], (oldData: any) => {
				return oldData.map((notification: Notification) => ({
					...notification,
					read: true,
				}));
			});

			// Invalidate unread count
			queryClient.invalidateQueries({
				queryKey: ['notifications_unread_count'],
			});
		},
	});

	// Get user devices
	const getUserDevices = useCallback(async () => {
		try {
			const response = await axiosInstance.get(`/notifications/user/devices`);
			console.log('User devices:', response.data);

			return response.data;
		} catch (error) {
			console.error('Error fetching user devices:', error);
			return [];
		}
	}, []);

	// Register web push subscription
	const registerWebPushMutation = useMutation({
		mutationFn: async (subscription: PushSubscription) => {
			return axiosInstance.post(
				'/notifications/register-web-push',
				subscription
			);
		},

		onSuccess: () => {
			console.log('Web push subscription registered successfully');
			// UI-ni yangilash (agar kerak bo'lsa)
		},

		onError: (error: any) => {
			console.error('Failed to register web push subscription:', error);
			// Foydalanuvchiga xatolik haqida ma'lumot berish
		},

		// Optional: Yuklash holatini kuzatish
		onSettled: () => {
			// Yuklash tugadi (success yoki error holatidan qat'iy nazar)
			console.log('Web push subscription registration attempt finished');
		},
	});

	return {
		notifications,
		unreadCount,
		markAsRead: (id: string) => markAsReadMutation.mutate(id),
		markAllAsRead: () => markAllAsReadMutation.mutate(),
		getUserDevices,
		registerWebPush: (subscription: PushSubscription) =>
			registerWebPushMutation.mutate(subscription),
	};
}
