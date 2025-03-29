export interface IRegister {
	firstName: string;
	lastName: string;
	jobTitle: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface UserCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken?: string;
	user?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}
