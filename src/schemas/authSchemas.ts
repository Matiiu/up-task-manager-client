import { z } from 'zod';

export const authSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	passwordConfirmation: z.string().min(8),
	token: z.string().length(6),
});

export const authTokenSchema = z.object({
	token: z.string(),
});
