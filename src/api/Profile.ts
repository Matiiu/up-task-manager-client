import api from '@/lib/axios';
import { handleApiError } from '@/utils/errorsUtils';
import type { UserProfileForm } from '@/types/authTypes';
import { normalizeText } from '@/utils/index';
import type { ChangePassword, CheckPassword } from '@/types/profileTypes';

export default class ProfileAPI {
	static update = async (formData: UserProfileForm) => {
		// sanitize data
		formData.name = normalizeText(formData.name);

		const uri = '/profile';
		try {
			const { data } = await api.put<string>(uri, formData);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error('Error al eliminar la nota');
		}
	};

	static updatePassword = async (formData: ChangePassword) => {
		const uri = '/profile/password';
		try {
			const { data } = await api.post<string>(uri, formData);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error('Error al cambiar la contraseña');
		}
	};

	static checkPassword = async (formData: CheckPassword) => {
		const uri = '/profile/check-password';
		try {
			const { data } = await api.post<string>(uri, formData);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error('Error al verificar la contraseña');
		}
	};
}
