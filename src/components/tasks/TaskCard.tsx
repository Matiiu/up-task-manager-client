import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDraggable } from '@dnd-kit/core';
import type { Project } from '@/types/index';
import { toast } from 'react-toastify';
import Task from '@/api/Task';

type TaskCardProps = {
	task: Project['tasks'][0];
	isManager: boolean;
};

export default function TaskCard({ task, isManager = false }: TaskCardProps) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task._id,
		});
	const navigate = useNavigate();
	const params = useParams();
	const ProjectId = params.projectId!;
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: Task.deleteTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['project', ProjectId] });
			toast.success(data);
		},
	});

	// Styles when dragging the task
	const dragStyles = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				padding: '1.25rem',
				backgroundColor: 'rgb(255 255 255 / 42%)',
				width: '300px',
				display: 'flex',
				borderWidth: '1px',
				borderColor: 'rgb(203 213 225)',
			}
		: undefined;

	return (
		<li
			className={`${isDragging ? 'bg-transparent border-none' : 'border border-slate-300 p-5 bg-white  flex justify-between'}`}
		>
			<div
				{...listeners}
				{...attributes}
				ref={setNodeRef}
				style={dragStyles}
				className='min-w-0 flex flex-col gap-y-4'
			>
				<p className='text-xl font-bold text-slate-600'>{task.name}</p>
				<p className='text-slate-500'>{task.description}</p>
			</div>

			<div className='flex shrink-0  gap-x-6'>
				<Menu
					as='div'
					className={`${isDragging ? 'hidden' : 'relative flex-none'}`}
				>
					<Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
						<span className='sr-only'>opciones</span>
						<EllipsisVerticalIcon className='h-9 w-9' aria-hidden='true' />
					</Menu.Button>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
							<Menu.Item>
								<button
									type='button'
									className='block px-3 py-1 text-sm leading-6 text-gray-900'
									onClick={() =>
										navigate(location.pathname + `?viewTask=${task._id}`)
									}
								>
									Ver Tarea
								</button>
							</Menu.Item>
							{isManager && (
								<>
									<Menu.Item>
										<button
											type='button'
											className='block px-3 py-1 text-sm leading-6 text-gray-900'
											onClick={() =>
												navigate(location.pathname + `?editTask=${task._id}`)
											}
										>
											Editar Tarea
										</button>
									</Menu.Item>

									<Menu.Item>
										<button
											className='block px-3 py-1 text-sm leading-6 text-red-500'
											type='reset'
											onClick={() =>
												mutate({
													projectId: ProjectId,
													taskId: task._id,
												})
											}
										>
											Eliminar Tarea
										</button>
									</Menu.Item>
								</>
							)}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</li>
	);
}
