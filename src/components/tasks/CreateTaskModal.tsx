import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { TaskFormData } from '@/types/index';
import SubmitDisplayButton from '../SubmitDisplayButton';
import TaskForm from './TaskForm';
import Task from '@/api/TaskApi';
import { toast } from 'react-toastify';

const initialTaskValues: TaskFormData = {
	name: '',
	description: '',
};

function CreateTaskModal() {
	const navigate = useNavigate();

	// Read if modal exists
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const hasCreateTask = !!queryParams.get('createTask');

	// Get projectId
	const { projectId } = useParams();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialTaskValues });

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: Task.createTask,
		onError: (e) => {
			toast.error(e.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
			toast.success(data);
			reset();
			navigate({ search: '' });
		},
	});

	const handleCreateTask = (formData: TaskFormData) => {
		mutate({
			formData,
			projectId: String(projectId),
		});
	};

	return (
		<>
			<Transition
				appear
				show={hasCreateTask}
				as={Fragment}
			>
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
									<Dialog.Title
										as='h3'
										className='font-black text-4xl  my-5'
									>
										Nueva Tarea
									</Dialog.Title>

									<p className='text-xl font-bold'>
										Llena el formulario y crea {''}
										<span className='text-fuchsia-600'>una tarea</span>
									</p>

									<form
										className='mt-10 space-y-3'
										noValidate
										onSubmit={handleSubmit(handleCreateTask)}
									>
										<TaskForm
											errors={errors}
											register={register}
										/>
										<SubmitDisplayButton label='Crear Tarea' />
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default CreateTaskModal;
