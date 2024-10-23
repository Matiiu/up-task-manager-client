import api from '@/lib/axios';
import { Note, NoteForm } from '@/types/noteTypes';
import { handleApiError } from '@/utils/errorsUtils';
import { Project, Task } from '@/types/index';

export default class NoteAPI {
	static create = async ({
		projectId,
		taskId,
		note,
	}: {
		projectId: Project['_id'];
		taskId: Task['_id'];
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

	static delete = async ({
		projectId,
		taskId,
		noteId,
	}: {
		projectId: Project['_id'];
		taskId: Task['_id'];
		noteId: Note['_id'];
	}) => {
		try {
			const uri = `/notes/${projectId}/task/${taskId}/${noteId}`;
			const { data } = await api.delete<string>(uri);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error('Error al eliminar la nota');
		}
	};
}
