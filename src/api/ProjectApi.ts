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
			if (isAxiosError(err)) {
				return Project.handleAxiosError(err);
			}
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
			if (isAxiosError(err)) {
				return Project.handleAxiosError(err);
			}
			if (err instanceof ZodError) {
				return Project.handleZodError(err);
			}
			throw new Error('Error al obtener los proyectos');
		}
	}

	static async getProjectById(id: TProject['_id']) {
		try {
			const { data } = await api(`/projects/${id}`);
			const result = ProjectSchema.safeParse(data);
			if (!result.success) {
				throw result.error;
			}
			return result.data;
		} catch (err) {
			if (isAxiosError(err)) {
				return Project.handleAxiosError(err);
			}
			if (err instanceof ZodError) {
				return Project.handleZodError(err);
			}
			throw new Error('Error al obtener el proyecto');
		}
	}

	static async updateProject({ id, formData }: UpdateProjectParams) {
		try {
			const { data } = await api.put<string>(`/projects/${id}`, formData);
			return data;
		} catch (err) {
			if (isAxiosError(err)) {
				return Project.handleAxiosError(err);
			}
			throw new Error('Error al obtener el proyecto');
		}
	}

	private static handleAxiosError(err: AxiosError<unknown, unknown>) {
		if (err.response && (err.response.data as ErrorResponse).errors) {
			const errorsStr = (err.response.data as ErrorResponse).errors
				.map((e: { msg: string }) => e.msg)
				.join(', ');
			const messageError = `${(err.response.data as ErrorResponse).errors.length > 1 ? 'Errores' : 'Error'}: ${errorsStr}.`;
			throw new Error(messageError);
		}
	}

	private static handleZodError(err: ZodError) {
		const errorsStr = err.errors.map((e) => e.message).join(', ');
		throw new Error(`Error de validación de datos: ${errorsStr}.`);
	}
}

export default Project;
