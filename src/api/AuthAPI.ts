import { AxiosError, isAxiosError } from 'axios';
import { ZodError } from 'zod';
import api from '@/lib/axios';
import { UserRegistrationForm } from '@/types/authTypes';

type AuthAPIPayload = {
	formData: UserRegistrationForm;
};

type ErrorResponse = {
	errors: Array<{ msg: string }>;
};

class AuthAPI {
	static createAccount = async (payload: Pick<AuthAPIPayload, 'formData'>) => {
		try {
			const uri = '/auth/create-account';
			const { data } = await api.post<string>(uri, payload.formData);
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
