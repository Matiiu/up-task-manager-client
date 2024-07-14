import { ProjectSchema, TaskSchema } from '@/schemas/index';
import { z } from 'zod';

// ********** Star Project **********
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<
	Project,
	'clientName' | 'projectName' | 'description'
>;
// ********** End Project **********

// ********** Star Task **********
export type TaskStatus = z.infer<typeof TaskSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
// ********** End Task **********
