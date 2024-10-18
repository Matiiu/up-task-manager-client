import { z } from 'zod';

export const noteSchema = z.object({
	_id: z.string(),
	content: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
