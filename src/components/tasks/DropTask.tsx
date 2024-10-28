import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { TaskStatus } from '@/types/index';
import { taskStatusSchema } from '@/schemas/index';

function parsedStatus(status = 'pending'): TaskStatus {
	const parsedStatus = taskStatusSchema.safeParse(status);
	return parsedStatus.success ? parsedStatus.data : 'pending';
}

export default function DropTask({ status = 'pending' }) {
	const taskStatus: TaskStatus = useMemo(() => parsedStatus(status), [status]);

	const { isOver, setNodeRef } = useDroppable({
		id: taskStatus,
	});

	const style = {
		opacity: isOver ? 0.4 : 1,
	};

	return (
		<div
			style={style}
			ref={setNodeRef}
			className='text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500'
		>
			Soltar Tarea Aquí
		</div>
	);
}
