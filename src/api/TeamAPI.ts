import api from '@/lib/axios';
import { handleApiError } from '@/utils/errorsUtils';
import type { TeamMemberFormWithProjectId } from '@/types/teamTypes';

export default class TeamAPI {
	static getMemberByEmail = async (
		teamMemberForm: TeamMemberFormWithProjectId,
	) => {
		try {
			const { projectId, ...rest } = teamMemberForm;
			const uri = `/team/${projectId}/find`;
			const { data } = await api.post(uri, rest);
			console.log({ data });
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
