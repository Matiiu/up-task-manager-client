import {
	projectSchema,
	taskSchema,
	taskStatusSchema,
	ActivityLogSchema,
} from '@/schemas/index';
import { z } from 'zod';

// ********** Star Project **********
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
	Project,
	'clientName' | 'projectName' | 'description'
>;
// ********** End Project **********

// ********** Star Task **********
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type ActivityLog = z.infer<typeof ActivityLogSchema>;
// ********** End Task **********
