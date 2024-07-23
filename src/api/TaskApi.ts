import { isAxiosError, AxiosError } from 'axios';
import { ZodError } from 'zod';

import api from '@/lib/axios';
import type { TaskFormData, Project, Task as TTask } from '@/types/index';

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

type TaskApi = {
	projectId: Project['_id'];
	taskId: TTask['_id'];
	formData: TaskFormData;
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
		} catch (error) {
			if (isAxiosError(error)) Task.handleAxiosError(error);
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
		} catch (error) {
			if (isAxiosError(error)) Task.handleAxiosError(error);
			if (error instanceof ZodError) Task.handleZodError(error);
			throw new Error('Error al obtener la tarea');
		}
	}

	static async updateTask({
		projectId,
		taskId,
		formData,
	}: Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) {
		try {
			const url = `/projects/${projectId}/tasks/${taskId}`;
			const { data } = await api.put<string>(url, formData);
			return data;
		} catch (error) {
			if (isAxiosError(error)) Task.handleAxiosError(error);
			if (error instanceof ZodError) Task.handleZodError(error);
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
