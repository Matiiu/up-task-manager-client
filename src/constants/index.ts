import { TaskStatus } from '@/types/index';

export const statusStyle: Record<TaskStatus, string> = {
	pending: 'border-t-slate-500',
	onHold: 'border-t-red-500',
	inProgress: 'border-t-blue-500',
	underReview: 'border-t-amber-500',
	completed: 'border-t-emerald-500',
};
