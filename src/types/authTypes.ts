import { authSchema, userSchema } from '@/schemas/authSchemas';
import { z } from 'zod';

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
	Auth,
	'name' | 'email' | 'password' | 'passwordConfirmation'
>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationTokenForm = Pick<Auth, 'email'>;
export type RestorePasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'passwordConfirmation'>;
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;
