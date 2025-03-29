export interface Skill {
	id: number;
	name: string;
	endorsements: number;
	percentage: number;
	profile: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		jobTitle: string;
		avatar: string;
	};
	profileId: number;
	category?: {
		id: number;
		name: string;
	};
	ownSkill: boolean;
	isPublic: boolean;
	isVerified: boolean;
}
