import api from '@/lib/axios';
import { handleApiError } from '@/utils/errorsUtils';
import type {
	TeamMemberFormWithProjectId,
	AddMemberToProject,
} from '@/types/teamTypes';
import { teamMemberSchema } from '@/schemas/teamSchemas';

export default class TeamAPI {
	static getMemberByEmail = async (
		teamMemberForm: TeamMemberFormWithProjectId,
	) => {
		try {
			const { projectId, ...rest } = teamMemberForm;
			const uri = `/team/${projectId}/find`;
			const { data } = await api.post(uri, rest);
			const result = teamMemberSchema.safeParse(data);
			if (!result.success) {
				throw result.error;
			}
			return result.data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static addMemberToProject = async ({
		userId,
		projectId,
	}: AddMemberToProject) => {
		try {
			const uri = `/team/${projectId}`;
			const { data } = await api.post<string>(uri, { userId });
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};
}
