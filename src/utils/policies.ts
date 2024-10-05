import type { User } from '@/types/authTypes';

export function isManager(managerId: User['_id'], userId: User['_id']) {
	return managerId === userId;
}
