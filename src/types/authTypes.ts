import { authSchema } from '@/schemas/authSchemas';
import { z } from 'zod';

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
	Auth,
	'name' | 'email' | 'password' | 'passwordConfirmation'
>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationTokenForm = Pick<Auth, 'email'>;
