import { AxiosError, isAxiosError } from 'axios';
import { ZodError } from 'zod';
import api from '@/lib/axios';
import type {
	UserRegistrationForm,
	Auth,
	ConfirmToken,
	UserLoginForm,
	RestorePasswordForm,
	NewPasswordFormWithToken,
} from '@/types/authTypes';

type AuthAPIPayload = {
	userRegistrationForm: UserRegistrationForm;
	token: Auth['token'];
	email: Auth['email'];
	confirmToken: ConfirmToken;
	userLoginForm: UserLoginForm;
	restorePasswordForm: RestorePasswordForm;
};

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

class AuthAPI {
	static createAccount = async (
		payload: Pick<AuthAPIPayload, 'userRegistrationForm'>,
	) => {
		try {
			const uri = '/auth/create-account';
			const { data } = await api.post<string>(
				uri,
				payload.userRegistrationForm,
			);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

	static confirmAccount = async ({
		confirmToken,
	}: Pick<AuthAPIPayload, 'confirmToken'>) => {
		try {
			const uri = '/auth/confirm-account';
			const { data } = await api.post<string>(uri, confirmToken);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

	static requestConfirmationToken = async (
		payload: Pick<AuthAPIPayload, 'email'>,
	) => {
		try {
			const uri = '/auth/restore-password';
			const { data } = await api.post<string>(uri, payload);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

	static authenticateUser = async (
		payload: Pick<AuthAPIPayload, 'userLoginForm'>,
	) => {
		try {
			const uri = '/auth/login';
			const { data } = await api.post<string>(uri, payload.userLoginForm);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

	static restorePassword = async ({
		restorePasswordForm,
	}: Pick<AuthAPIPayload, 'restorePasswordForm'>) => {
		console.log('begin restore password');
		try {
			const uri = '/auth/restore-password';
			const { data } = await api.post<string>(uri, restorePasswordForm);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

	static async validateToken(confirmToken: ConfirmToken) {
		try {
			const uri = '/auth/validate-token';
			const { data } = await api.post<string>(uri, confirmToken);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al validar el token');
		}
	}

	static async createNewPasswordByToken(
		newPasswordForm: NewPasswordFormWithToken,
	) {
		try {
			const uri = `auth/new-password/${newPasswordForm.token}`;
			const { data } = await api.post<string>(uri, newPasswordForm);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al restablecer la contraseña');
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

export default AuthAPI;
