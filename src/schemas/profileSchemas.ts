import { z } from 'zod';

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(8),
	newPassword: z.string().min(8),
	passwordConfirmation: z.string().min(8),
});
