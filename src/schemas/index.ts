import { z } from 'zod';

export const ProjectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
});

export const ProjectPrueba = z.object({
	_id: z.number(),
	projectName: z.number(),
	clientName: z.number(),
	description: z.number(),
});

export const DashboardProjectSchema = z.array(
	ProjectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		description: true,
	}),
);
