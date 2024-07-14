import { isAxiosError, AxiosError } from 'axios';
import { ZodError } from 'zod';

import api from '@/lib/axios';
import { TaskFormData, Project } from '@/types/index';

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

type TaskApi = {
	formData: TaskFormData;
	projectId: Project['_id'];
};

class Task {
	static async createTask({ formData, projectId }: TaskApi) {
		try {
			const url = `/projects/${projectId}/tasks`;
			const { data } = await api.post<string>(url, formData);
			return data;
		} catch (e) {
			if (isAxiosError(e)) Task.handleAxiosError(e);
			throw new Error('Error al crear la tarea');
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
