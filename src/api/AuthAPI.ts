import api from '@/lib/axios';
import type {
	UserRegistrationForm,
	ConfirmToken,
	UserLoginForm,
	RestorePasswordForm,
	NewPasswordFormWithToken,
	RequestConfirmationTokenForm,
} from '@/types/authTypes';
import { setLocalStorageItem } from '@/services/localStorageService';
import { authTokenSchema } from '@/schemas/authSchemas';
import { CustomZodError, handleApiError } from '@/utils/errorsUtils';

class AuthAPI {
	static createAccount = async (userRegistrationForm: UserRegistrationForm) => {
		try {
			const uri = '/auth/create-account';
			const { data } = await api.post<string>(uri, userRegistrationForm);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static confirmAccount = async (confirmToken: ConfirmToken) => {
		try {
			const uri = '/auth/confirm-account';
			const { data } = await api.post<string>(uri, confirmToken);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static requestConfirmationToken = async (
		requestConfirmationTokenForm: RequestConfirmationTokenForm,
	) => {
		try {
			const uri = '/auth/restore-password';
			const { data } = await api.post<string>(
				uri,
				requestConfirmationTokenForm,
			);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static authenticateUser = async (userLoginForm: UserLoginForm) => {
		try {
			const uri = '/auth/login';
			const { data } = await api.post(uri, userLoginForm);
			const response = authTokenSchema.safeParse(data);
			if (!response.success) {
				throw new CustomZodError(response.error);
			}

			setLocalStorageItem('auth_token', response.data.token);
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static restorePassword = async (restorePasswordForm: RestorePasswordForm) => {
		try {
			const uri = '/auth/restore-password';
			const { data } = await api.post<string>(uri, restorePasswordForm);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static validateToken = async (confirmToken: ConfirmToken) => {
		try {
			const uri = '/auth/validate-token';
			const { data } = await api.post<string>(uri, confirmToken);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};

	static createNewPasswordByToken = async (
		newPasswordForm: NewPasswordFormWithToken,
	) => {
		try {
			const uri = `auth/new-password/${newPasswordForm.token}`;
			const { data } = await api.post<string>(uri, newPasswordForm);
			return data;
		} catch (error) {
			handleApiError(error);
			console.error('unexpected error: ', error);
			throw new Error(
				'Ocurrió un error inesperado. Por favor, intente nuevamente.',
			);
		}
	};
}

export default AuthAPI;
