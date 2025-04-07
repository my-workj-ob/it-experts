import {
	assessmentService,
	type Assessment,
	type UserAssessments,
} from '@/services/assessment-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Hook for fetching all assessments
export const useAllAssessments = () => {
	return useQuery({
		queryKey: ['assessments'],
		queryFn: () => assessmentService.getAllAssessments(),
	});
};

// Hook for fetching a specific assessment by ID
export const useAssessment = (id: number) => {
	return useQuery({
		queryKey: ['assessment', id],
		queryFn: () => assessmentService.getAssessmentById(id),
		enabled: !!id,
	});
};

// Hook for fetching assessments for a specific user
export const useUserAssessments = (userId: number) => {
	return useQuery<UserAssessments>({
		queryKey: ['userAssessments', userId],
		queryFn: () => assessmentService.getUserAssessments(userId),
		enabled: !!userId,
	});
};

// Hook for fetching assessments for a specific skill
export const useSkillAssessments = (skillId: number) => {
	return useQuery<Assessment[]>({
		queryKey: ['skillAssessments', skillId],
		queryFn: () => assessmentService.getAssessmentsBySkill(skillId),
		enabled: !!skillId,
	});
};

// Hook for creating a new assessment
export const useCreateAssessment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (assessment: Omit<Assessment, 'id'>) =>
			assessmentService.createAssessment(assessment),
		onSuccess: () => {
			// Invalidate the assessments query to refetch the list
			queryClient.invalidateQueries({ queryKey: ['assessments'] });
		},
	});
};

// Hook for updating an assessment
export const useUpdateAssessment = (id: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (assessmentData: Partial<Assessment>) =>
			assessmentService.updateAssessment(id, assessmentData),
		onSuccess: () => {
			// Invalidate specific queries
			queryClient.invalidateQueries({ queryKey: ['assessment', id] });
			queryClient.invalidateQueries({ queryKey: ['assessments'] });
		},
	});
};

// Hook for deleting an assessment
export const useDeleteAssessment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => assessmentService.deleteAssessment(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['assessments'] });
		},
	});
};

// Hook for submitting an assessment
export const useSubmitAssessment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			assessmentId,
			userId,
			answers,
			codingSubmissions,
		}: {
			assessmentId: number;
			userId: number;
			answers: { questionId: number; selectedOption: number }[];
			codingSubmissions?: { challengeId: number; code: string }[];
		}) =>
			assessmentService.submitAssessment(
				assessmentId,
				userId,
				answers,
				codingSubmissions
			),
		onSuccess: (_, variables) => {
			// Invalidate user assessments query
			queryClient.invalidateQueries({
				queryKey: ['userAssessments', variables.userId],
			});
		},
	});
};
