import api from '@/lib/axios';
import { NoteForm } from '@/types/noteTypes';
import { handleApiError } from '@/utils/errorsUtils';

export default class NoteAPI {
	static create = async ({
		projectId,
		taskId,
		note,
	}: {
		projectId: string;
		taskId: string;
		note: NoteForm;
	}) => {
		try {
			const uri = `/notes/${projectId}/task/${taskId}`;
			const { data } = await api.post<string>(uri, note);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error('Error al crear la nota');
		}
	};
}
