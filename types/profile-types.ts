export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	jobTitle: string;
	avatar: string;
}

export interface ProfileData {
	name?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	jobTitle?: string;
}

export interface PasswordUpdateData {
	currentPassword: string;
	newPassword: string;
}

export interface NotificationSettings {
	emailNotifications: boolean;
	pushNotifications: boolean;
}

export interface PrivacySettings {
	isPublic: boolean;
	showEmail: boolean;
}
