import { AxiosError, isAxiosError } from 'axios';
import { ZodError } from 'zod';
import api from '@/lib/axios';
import { UserRegistrationForm } from '@/types/authTypes';
import type { Auth } from '@/types/authTypes';

type AuthAPIPayload = {
	userRegistrationForm: UserRegistrationForm;
	token: Auth['token'];
	email: Auth['email'];
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

	static confirmAccount = async (payload: Pick<AuthAPIPayload, 'token'>) => {
		try {
			const uri = '/auth/confirm-account';
			const { data } = await api.post<string>(uri, { token: payload.token });
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
			const uri = '/auth/request-token';
			const { data } = await api.post<string>(uri, { email: payload.email });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				AuthAPI.handleAxiosError(error);
			}
			throw new Error('Error al crear la cuenta');
		}
	};

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
