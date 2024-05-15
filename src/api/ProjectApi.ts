import { ProjectFormData } from '@/types/index';
import api from '@/lib/axios';

type SchemaApi = {
	success: boolean;
	data?: Record<string, unknown>;
	message?: string;
};

const schemaApi = ({ success, data = {}, message = '' }: SchemaApi) => ({
	success,
	data,
	message,
});

export async function createProject(
	formData: ProjectFormData,
): Promise<SchemaApi> {
	try {
		const { data: message } = await api.post('/projects', formData);
		return schemaApi({
			success: true,
			message,
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : 'An error occurred';
		console.error(errMsg);
		return schemaApi({
			success: false,
			message: 'Ocurrió un error inesperado',
		});
	}
}
