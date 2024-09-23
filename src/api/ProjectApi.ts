import api from '@/lib/axios';
import { AxiosError, isAxiosError } from 'axios';
import { projectSchema, dashboardProjectSchema } from '../schemas';
import { ZodError } from 'zod';
import type { Project, ProjectFormData } from '@/types/index';

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

type ProjectParams = {
	id: Project['_id'];
	formData: ProjectFormData;
};

class ProjectAPI {
	static async createProject(formData: ProjectFormData) {
		try {
			const { data } = await api.post<string>('/projects', formData);
			return data;
		} catch (error) {
			if (isAxiosError(error)) ProjectAPI.handleAxiosError(error);
			throw new Error('Error al crear el proyecto');
		}
	}

	static async getProjects() {
		try {
			const { data } = await api('/projects');
			const response = dashboardProjectSchema.safeParse(data);
			if (!response.success) {
				throw response.error;
			}
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) ProjectAPI.handleAxiosError(error);
			if (error instanceof ZodError) ProjectAPI.handleZodError(error);
			throw new Error('Error al obtener los proyectos');
		}
	}

	static async getProjectById(id: Project['_id']) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api(url);
			const result = projectSchema.safeParse(data);
			if (!result.success) throw result.error;

			return result.data;
		} catch (error) {
			if (isAxiosError(error)) ProjectAPI.handleAxiosError(error);
			if (error instanceof ZodError) ProjectAPI.handleZodError(error);
			throw new Error('Error al obtener el proyecto');
		}
	}

	static async updateProject({
		id,
		formData,
	}: Pick<ProjectParams, 'id' | 'formData'>) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api.put<string>(url, formData);
			return data;
		} catch (error) {
			if (isAxiosError(error)) ProjectAPI.handleAxiosError(error);
			throw new Error('Error al obtener el proyecto');
		}
	}

	static async deleteProject(id: Project['_id']) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api.delete<string>(url);
			return data;
		} catch (error) {
			if (isAxiosError(error)) ProjectAPI.handleAxiosError(error);
			if (error instanceof ZodError) ProjectAPI.handleZodError(error);
			throw new Error('Error al obtener el proyecto');
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

export default ProjectAPI;
