import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ErrorMsg from '@/components/ErrorMsg';
import type { User, UserProfileForm } from '@/types/authTypes';
import ProfileAPI from '@/api/Profile';

type ProfileFormProps = {
	user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserProfileForm>({ defaultValues: user });

	const { mutate } = useMutation({
		mutationFn: ProfileAPI.update,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

	return (
		<>
			<div className='mx-auto max-w-3xl g'>
				<h1 className='text-5xl font-black '>Mi Perfil</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					Aquí puedes actualizar tu información
				</p>

				<form
					onSubmit={handleSubmit(handleEditProfile)}
					className=' mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l'
					noValidate
				>
					<div className='mb-5 space-y-3'>
						<label className='text-sm uppercase font-bold' htmlFor='name'>
							Nombre
						</label>
						<input
							id='name'
							type='text'
							placeholder='Tu Nombre'
							className='w-full p-3  border border-gray-200'
							{...register('name', {
								required: 'Nombre de usuario es obligatoro',
								validate: (value) => {
									const trimmedText = value?.trim() || '';
									if (!trimmedText) {
										return 'Nombre de usuario es obligatorio';
									}
								},
							})}
						/>
						{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
					</div>

					<div className='mb-5 space-y-3'>
						<label className='text-sm uppercase font-bold' htmlFor='password'>
							E-mail
						</label>
						<input
							id='text'
							type='email'
							placeholder='Tu Email'
							className='w-full p-3  border border-gray-200'
							{...register('email', {
								required: 'EL e-mail es obligatorio',
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: 'E-mail no válido',
								},
							})}
						/>
						{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
					</div>
					<input
						type='submit'
						value='Guardar Cambios'
						className='bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors'
					/>
				</form>
			</div>
		</>
	);
}
