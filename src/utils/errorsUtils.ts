import { ZodError } from 'zod';
import { AxiosError } from 'axios';

export class CustomZodError extends ZodError {
	constructor(errors: ZodError) {
		// Llama al constructor de la clase base ZodError
		super(errors.errors); // ZodError tiene un array de errores llamado "errors"
	}

	// Método personalizado para devolver los mensajes de error de una manera más legible
	getFormattedErrors() {
		return this.errors.map(
			(error) => error.path.join(', ') + ': ' + error.message,
		);
	}

	// Método para obtener un solo error de un campo específico
	getErrorByPath(path: string) {
		return this.errors.find((error) => error.path.join('.') === path);
	}
}

export class CustomAxiosError extends Error {
	public status?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public data?: any;

	constructor(error: AxiosError) {
		// Llama al constructor de Error con el mensaje del error de Axios
		super(error.message);
		this.name = 'CustomAxiosError';
		this.status = error.response?.status;
		this.data = error.response?.data;

		// Captura el stack trace si está disponible
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomAxiosError);
		}
	}

	// Método para obtener un mensaje de error más legible
	getErrorMessage(): string {
		const errorMessage = this.data?.errors
			? this.data.errors
					.map((error: Record<string, string>) => error.msg)
					.join(', ')
			: this.data?.error?.msg;
		return errorMessage || 'Error desconocido, por favor intente de nuevo';
	}
}

export function handleApiError(error: unknown): void {
	if (error instanceof AxiosError && !error.response) {
		throw new Error(
			'No se pudo conectar al servidor. Verifique su conexión a Internet y vuelva a intentarlo.',
		);
	}

	if (error instanceof AxiosError && error.response) {
		const serviceError = new CustomAxiosError(error);
		console.error('Service Error:', serviceError.getErrorMessage());
		throw new Error(serviceError.getErrorMessage());
	}

	if (error instanceof CustomZodError) {
		console.error('Invalid Data:', error.getFormattedErrors());
		throw new Error(
			'Error con algunos campos. Por favor, verifique los datos ingresados.',
		);
	}
}
