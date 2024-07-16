export const statusTranslation: Record<string, string> = {
	pending: 'Pendiente',
	onHold: 'En Espera',
	inProgress: 'En Progreso',
	underReview: 'En Revisión',
	completed: 'Completada',
};

export const statusStyle: Record<string, string> = {
	pending: 'border-t-slate-500',
	onHold: 'border-t-red-500',
	inProgress: 'border-t-blue-500',
	underReview: 'border-t-amber-500',
	completed: 'border-t-emerald-500',
};
