import { ProjectSchema } from '@/schemas/index';
import { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<
	Project,
	'clientName' | 'projectName' | 'description'
>;
