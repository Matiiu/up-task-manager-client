import { z } from 'zod';
import { userSchema } from '@/schemas/authSchemas';

export const noteSchema = z.object({
	_id: z.string(),
	content: z.string(),
	createdBy: z.union([userSchema, z.string()]),
	task: z.string(),
});
