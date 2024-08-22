import { z } from 'zod';

export const authSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	passwordConfirmation: z.string().min(8),
});
