import axiosInstance from '@/lib/create-axios';
import {
	NotificationSettings,
	PasswordUpdateData,
	PrivacySettings,
	ProfileData,
} from '@/types/profile-types';
// getProfile,
// updateNotificationSettings,
// updatePassword,
// updatePrivacySettings,
// updateProfile,
// uploadAvatar,
export const ProfileService = {
	getUserProfile: async () => {
		const response = await axiosInstance.get('/profile');
		return response;
	},

	// Update profile information
	updateProfile: async (profileData: ProfileData) => {
		try {
			const response = await axiosInstance.patch('/profile', profileData, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});

			return response.data;
		} catch (error) {
			console.error('Error updating profile:', error);
			throw error;
		}
	},

	// Update password
	updatePassword: async (passwordData: PasswordUpdateData) => {
		try {
			const response = await fetch('/api/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(passwordData),
			});

			if (!response.ok) {
				throw new Error('Failed to update password');
			}

			return await response.json();
		} catch (error) {
			console.error('Error updating password:', error);
			throw error;
		}
	},

	// Update notification settings
	updateNotificationSettings: async (settings: NotificationSettings) => {
		try {
			const response = await fetch('/api/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settings),
			});

			if (!response.ok) {
				throw new Error('Failed to update notification settings');
			}

			return await response.json();
		} catch (error) {
			console.error('Error updating notification settings:', error);
			throw error;
		}
	},
	// Update privacy settings
	updatePrivacySettings: async (settings: PrivacySettings) => {
		try {
			const response = await fetch('/api/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settings),
			});

			if (!response.ok) {
				throw new Error('Failed to update privacy settings');
			}

			return await response.json();
		} catch (error) {
			console.error('Error updating privacy settings:', error);
			throw error;
		}
	},
	// Upload avatar

	uploadFile: async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		const response = await axiosInstance.post(
			'http://localhost:3030/file/upload',
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true,
			}
		);

		return response.data; // { fileId: 123, fileUrl: "uploads/image.png" }
	},

	updateAvatar: async (profileId: number, fileUrl: string) => {
		const response = await axiosInstance.patch(
			`/profile/avatar/${profileId}`,
			{ avatar: fileUrl }, // <-- JSON obyekt ichida avatar URL yuborish
			{
				withCredentials: true,
			}
		);

		return response.data;
	},
};
