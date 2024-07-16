import { isAxiosError, AxiosError } from 'axios';
import { ZodError } from 'zod';

import api from '@/lib/axios';
import type { TaskFormData, Project, Task as TTask } from '@/types/index';

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

type TaskApi = {
	formData: TaskFormData;
	projectId: Project['_id'];
	taskId: TTask['_id'];
};

class Task {
	static async createTask({
		formData,
		projectId,
	}: Pick<TaskApi, 'formData' | 'projectId'>) {
		try {
			const url = `/projects/${projectId}/tasks`;
			const { data } = await api.post<string>(url, formData);
			return data;
		} catch (e) {
			if (isAxiosError(e)) Task.handleAxiosError(e);
			throw new Error('Error al crear la tarea');
		}
	}

	static async getTaskById({
		projectId,
		taskId,
	}: Pick<TaskApi, 'projectId' | 'taskId'>) {
		try {
			const url = `/projects/${projectId}/tasks/${taskId}`;
			const { data } = await api(url);
			return data;
		} catch (e) {
			if (isAxiosError(e)) Task.handleAxiosError(e);
			if (e instanceof ZodError) Task.handleZodError(e);
			throw new Error('Error al obtener la tarea');
		}
	}

	private static handleAxiosError(error: AxiosError<unknown, unknown>) {
		if (error.response && (error.response.data as ErrorResponse).errors) {
			const errorMessage = (error.response.data as ErrorResponse).errors
				.map((e) => e.msg)
				.join(', ');
			throw new Error(`Errores: ${errorMessage}`);
		}
	}

	private static handleZodError(error: ZodError) {
		const errorMessage = error.errors.map((e) => e.message).join(', ');
		throw new Error(`Error de validación de datos: ${errorMessage}.`);
	}
}

export default Task;
