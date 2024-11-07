import api from '@/lib/axios';
import { handleApiError } from '@/utils/errorsUtils';

import { teamMemberSchema, teamMembersSchema } from '@/schemas/teamSchemas';
import type {
	TeamMemberForm,
	AddMemberToProject,
	RemoveMemberFromProject,
} from '@/types/teamTypes';
import { Project } from '../types';

export default class TeamAPI {
	private static readonly ENDPOINT = '/team';

	static getTeam = async (projectId: string) => {
		try {
			const uri = `${this.ENDPOINT}/${projectId}`;
			const { data } = await api(uri);
			const result = teamMembersSchema.safeParse(data);
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
	static getMemberByEmail = async ({
		teamMemberForm,
		projectId,
	}: {
		teamMemberForm: TeamMemberForm;
		projectId: Project['_id'];
	}) => {
		try {
			const uri = `${this.ENDPOINT}/${projectId}/find`;
			const { data } = await api.post(uri, teamMemberForm);
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
			const uri = `${this.ENDPOINT}/${projectId}`;
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

	static removeMemberFromProject = async ({
		userId,
		projectId,
	}: RemoveMemberFromProject) => {
		try {
			const uri = `${this.ENDPOINT}/${projectId}/${userId}`;
			const { data } = await api.delete<string>(uri);
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
