import { userSchema } from '@/schemas/authSchemas';

export const teamMemberSchema = userSchema.pick({
	_id: true,
	name: true,
	email: true,
});
