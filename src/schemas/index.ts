import { z } from 'zod';

// ********** Star Task **********
export const taskStatusSchema = z.enum([
	'pending',
	'onHold',
	'inProgress',
	'underReview',
	'completed',
]);
export const TaskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	project: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: taskStatusSchema,
});
// ********** End Task **********

// ********** Star Project **********
export const ProjectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	tasks: z.array(TaskSchema),
});

export const DashboardProjectSchema = z.array(
	ProjectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		description: true,
	}),
);
// ********** End Project **********
