import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project, TaskStatus } from '@/types/index';
import TaskCard from '@/components/tasks/TaskCard';
import { statusStyle } from '@/constants/index';
import { statusTranslations } from '@/locales/es';
import DropTask from '@/components/tasks/DropTask';
import Task from '@/api/Task';

type GroupTask = {
	[key: string]: Project['tasks'];
};

const initialStateGroup: GroupTask = {
	pending: [],
	onHold: [],
	inProgress: [],
	underReview: [],
	completed: [],
};

function groupTasks(tasks: Project['tasks']) {
	function validateGroup(
		accumulatedTasks: GroupTask,
		currentTask: Project['tasks'][number],
	) {
		let currentGroup = accumulatedTasks[currentTask.status] || [];
		currentGroup = [...currentGroup, currentTask];
		return {
			...accumulatedTasks,
			[currentTask.status]: currentGroup,
		};
	}

	return tasks.reduce(validateGroup, initialStateGroup);
}

type TaskListProps = {
	tasks: Project['tasks'];
	isManager: boolean;
};

function TaskList({ tasks = [], isManager = false }: TaskListProps) {
	const params = useParams();
	const projectId = params?.projectId || '';
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: Task.updateStatusTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
		},
	});
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active?.id && over?.id) {
			const taskId = active.id.toString();
			const status = over.id as TaskStatus;

			// Optimistic update
			mutate({ projectId, taskId, status });

			queryClient.setQueryData(['project', projectId], (oldData: Project) => {
				const updatedTasks = oldData.tasks.map((task) => {
					if (task._id === taskId) {
						return { ...task, status };
					}
					return task;
				});

				return { ...oldData, tasks: updatedTasks };
			});
		}
	};

	return (
		<>
			<h2 className='text-5xl font-black my-10'>Tareas</h2>

			<section className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
				<DndContext onDragEnd={handleDragEnd}>
					{Object.entries(groupTasks(tasks)).map(([status, tasks]) => (
						<div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
							<h3
								className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyle[status as TaskStatus]}`}
							>
								{statusTranslations[status as TaskStatus]}
							</h3>
							<DropTask status={status} />
							<ul className='mt-5 space-y-5'>
								{tasks.length === 0 ? (
									<li className='text-gray-500 text-center pt-3'>
										No Hay tareas
									</li>
								) : (
									tasks.map((task) => (
										<TaskCard
											key={task._id}
											task={task}
											isManager={isManager}
										/>
									))
								)}
							</ul>
						</div>
					))}
				</DndContext>
			</section>
		</>
	);
}

export default TaskList;
