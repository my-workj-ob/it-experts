import axiosInstance from '@/lib/create-axios';

export const skillService = {
	getSkillsProfileById: async (profileId: number, isPublic: boolean) => {
		const response = await axiosInstance.get(
			`/profiles/${profileId}/skills?isPublic=${isPublic}`
		);
		return response;
	},
	//
	createSkill: async (data: any, profileId: number) => {
		const response = await axiosInstance.post(
			`/profiles/${profileId}/skills`,
			data
		);
		return response;
	},
	updateSkillVisibility: async (
		skillId: number,
		profileId: number,
		isPublic: boolean
	) => {
		const response = await axiosInstance.patch(
			`/profiles/${profileId}/skills/${skillId}/endorse`,
			{
				isPublic: isPublic,
			}
		);
		return response;
	},
};
