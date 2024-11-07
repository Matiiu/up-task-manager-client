import { Fragment } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMsg from '@/components/ErrorMsg';
import type { CheckPassword } from '@/types/profileTypes';
import ProfileAPI from '@/api/Profile';
import ProjectAPI from '@/api/Project';

const initializedCheckPasswordForm = (): CheckPassword => ({
	password: '',
});

export default function DeleteProjectModal() {
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const projectId = queryParams.get('deleteProject') ?? '';
	const isShowModal = !!projectId;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ defaultValues: initializedCheckPasswordForm() });

	const checkUserPasswordMutation = useMutation({
		mutationFn: ProfileAPI.checkPassword,
		onError: (error) => toast.error(error.message),
	});

	const queryClient = useQueryClient();
	const deleteProjectMutation = useMutation({
		mutationFn: ProjectAPI.deleteProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			// Close modal
			navigate(location.pathname, { replace: true });
		},
	});

	const handleForm = async (formData: CheckPassword) => {
		await checkUserPasswordMutation.mutateAsync(formData);
		await deleteProjectMutation.mutateAsync(projectId);
	};

	return (
		<Transition appear show={isShowModal} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => navigate(location.pathname, { replace: true })}
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
								<Dialog.Title as='h3' className='font-black text-4xl  my-5'>
									Eliminar Proyecto{' '}
								</Dialog.Title>

								<p className='text-xl font-bold'>
									Confirma la eliminación del proyecto {''}
									<span className='text-fuchsia-600'>
										colocando tu password
									</span>
								</p>

								<form
									className='mt-10 space-y-5'
									onSubmit={handleSubmit(handleForm)}
									noValidate
								>
									<div className='flex flex-col gap-3'>
										<label className='font-normal text-2xl' htmlFor='password'>
											Password
										</label>
										<input
											id='password'
											type='password'
											placeholder='Password Inicio de Sesión'
											className='w-full p-3  border-gray-300 border'
											{...register('password', {
												required: 'El password es obligatorio',
											})}
										/>
										{errors.password && (
											<ErrorMsg>{errors.password.message}</ErrorMsg>
										)}
									</div>

									<input
										type='submit'
										className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
										value='Eliminar Proyecto'
									/>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
