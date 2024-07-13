import api from '@/lib/axios';
import { AxiosError, isAxiosError } from 'axios';
import { ProjectSchema, DashboardProjectSchema } from '../schemas';
import { ZodError } from 'zod';
import type { Project as TProject, ProjectFormData } from '@/types/index';

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

type UpdateProjectParams = {
	id: TProject['_id'];
	formData: ProjectFormData;
};

class Project {
	static async createProject(formData: ProjectFormData) {
		try {
			const { data } = await api.post<string>('/projects', formData);
			return data;
		} catch (err) {
			if (isAxiosError(err)) Project.handleAxiosError(err);
			throw new Error('Error al crear el proyecto');
		}
	}

	static async getProjects() {
		try {
			const { data } = await api('/projects');
			const response = DashboardProjectSchema.safeParse(data);
			if (!response.success) {
				throw response.error;
			}
			return response.data;
		} catch (err) {
			if (isAxiosError(err)) Project.handleAxiosError(err);
			if (err instanceof ZodError) Project.handleZodError(err);
			throw new Error('Error al obtener los proyectos');
		}
	}

	static async getProjectById(id: TProject['_id']) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api(url);
			const result = ProjectSchema.safeParse(data);
			if (!result.success) {
				throw result.error;
			}
			return result.data;
		} catch (err) {
			if (isAxiosError(err)) Project.handleAxiosError(err);
			if (err instanceof ZodError) Project.handleZodError(err);
			throw new Error('Error al obtener el proyecto');
		}
	}

	static async updateProject({ id, formData }: UpdateProjectParams) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api.put<string>(url, formData);
			return data;
		} catch (err) {
			if (isAxiosError(err)) Project.handleAxiosError(err);
			throw new Error('Error al obtener el proyecto');
		}
	}

	static async deleteProject(id: TProject['_id']) {
		try {
			const url = `/projects/${id}`;
			const { data } = await api.delete<string>(url);
			return data;
		} catch (err) {
			if (isAxiosError(err)) Project.handleAxiosError(err);
			if (err instanceof ZodError) Project.handleZodError(err);
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

export default Project;
