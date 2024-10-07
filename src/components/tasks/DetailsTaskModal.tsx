import { Fragment, useEffect, ChangeEvent, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Task from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatToLongDate } from '@/utils/index';
import { statusTranslations } from '@/locales/es';
import type { Task as TTask } from '@/types/index';

function DetailsTaskModal() {
	const params = useParams();
	const projectId = params.projectId!;
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('viewTask')!;
	const hasViewTask = !!taskId;
	const queryClient = useQueryClient();

	const { data, isError, error } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => Task.getTaskById({ projectId, taskId }),
		enabled: hasViewTask,
		retry: false,
	});

	const { mutate } = useMutation({
		mutationFn: Task.updateStatusTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		},
	});

	const handleChangeStatusTask = (event: ChangeEvent<HTMLSelectElement>) => {
		const status = event.target.value as TTask['status'];
		mutate({ projectId, taskId, status });
	};

	useEffect(() => {
		if (isError) {
			toast.error(error.message, { toastId: 'error' });
			navigate(`/projects/${projectId}`);
		}
	}, [isError, error, navigate, projectId]);

	const user = useMemo(
		() =>
			data && typeof data.completedBy === 'object' && data.completedBy
				? data.completedBy
				: null,
		[data],
	);

	if (data) {
		return (
			<>
				<Transition appear show={hasViewTask} as={Fragment}>
					<Dialog
						as='div'
						className='relative z-10'
						onClose={() => navigate({ search: '' })}
					>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-black/60' />
						</Transition.Child>

						<div className='fixed inset-0 overflow-y-auto'>
							<div className='flex min-h-full items-center justify-center p-4 text-center'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'
								>
									<Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16'>
										<p className='text-sm text-slate-400'>
											Agregada el: {formatToLongDate(data.createdAt)}
										</p>
										<p className='text-sm text-slate-400'>
											Última actualización: {formatToLongDate(data.updatedAt)}
										</p>
										{user && (
											<p className='text-sm text-slate-600'>
												Estado Actualizado por: {user.name}
											</p>
										)}
										<Dialog.Title
											as='h3'
											className='font-black text-4xl text-slate-600 my-5'
										>
											{data.name}
										</Dialog.Title>
										<p className='text-lg text-slate-500 mb-2'>
											Descripción: {data.description}
										</p>
										<div className='my-5 space-y-3'>
											<label className='font-bold'>Estado Actual:</label>
											<select
												className='w-full p-3 bg-white border-gray-300'
												defaultValue={data.status}
												onChange={handleChangeStatusTask}
											>
												{Object.entries(statusTranslations).map(
													([status, translation]) => (
														<option key={status} value={status}>
															{translation}
														</option>
													),
												)}
											</select>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}
export default DetailsTaskModal;
