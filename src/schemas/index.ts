import { z } from 'zod';
import { userSchema } from '@/schemas/authSchemas';
import { noteSchema } from '@/schemas/noteSchemas';

// ********** Star Task **********
export const taskStatusSchema = z.enum([
	'pending',
	'onHold',
	'inProgress',
	'underReview',
	'completed',
]);

export const activityLogSchema = z.object({
	user: z.union([
		z.string(),
		z.object(userSchema.pick({ _id: true, name: true, email: true }).shape),
	]),
	status: taskStatusSchema,
});

export const taskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	project: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: taskStatusSchema,
	notes: z.array(noteSchema.extend({ createdBy: userSchema })).default([]),
	completedBy: z.array(activityLogSchema).default([]),
});

export const taskSchemaWithStringNotes = taskSchema.extend({
	notes: z.array(z.string()),
});
// ********** End Task **********

// ********** Star Project **********
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	tasks: z.array(taskSchemaWithStringNotes),
	manager: z.string(userSchema.pick({ _id: true })),
});

export const dashboardProjectSchema = z.array(
	projectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		description: true,
		createdAt: true,
		updatedAt: true,
		manager: true,
	}),
);
// ********** End Project **********
