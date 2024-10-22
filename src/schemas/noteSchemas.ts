import { z } from 'zod';
import { userSchema } from './authSchemas';

export const noteSchema = z.object({
	_id: z.string(),
	content: z.string(),
	createdBy: userSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});
