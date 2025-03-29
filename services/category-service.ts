import axiosInstance from '@/lib/create-axios';

export const categoryService = {
	getCategories: async () => {
		const response = await axiosInstance.get('/categories');
		return response;
	},
};
