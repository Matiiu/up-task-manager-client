import { TaskStatus } from '@/types/index';

export const statusTranslations: Record<TaskStatus, string> = {
	pending: 'Pendiente',
	onHold: 'En Espera',
	inProgress: 'En Progreso',
	underReview: 'En Revisión',
	completed: 'Completada',
};
