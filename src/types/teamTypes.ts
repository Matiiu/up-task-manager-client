import z from 'zod';
import { teamMemberSchema } from '@/schemas/teamSchemas';
import type { Project } from '@/types/index';

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
export type TeamMemberFormWithProjectId = TeamMemberForm & {
	projectId: Project['_id'];
};
export type AddMemberToProject = {
	userId: TeamMember['_id'];
	projectId: Project['_id'];
};
export type RemoveMemberFromProject = {
	userId: TeamMember['_id'];
	projectId: Project['_id'];
};
