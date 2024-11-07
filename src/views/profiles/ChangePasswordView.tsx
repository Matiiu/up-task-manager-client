import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ErrorMsg from '@/components/ErrorMsg';
import type { ChangePassword } from '@/types/profileTypes';
import { PASSWORD_REGEX } from '@/constants/authConstants';
import ProfileAPI from '@/api/Profile';

const initializedChangePassword = (): ChangePassword => ({
	currentPassword: '',
	newPassword: '',
	passwordConfirmation: '',
});

export default function ChangePasswordView() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initializedChangePassword() });

	const { mutate } = useMutation({
		mutationFn: ProfileAPI.updatePassword,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const newPassword = watch('newPassword');

	const handleChangePassword = (formData: ChangePassword) => mutate(formData);

	return (
		<>
			<div className='mx-auto max-w-3xl'>
				<h1 className='text-5xl font-black '>Cambiar Password</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					Utiliza este formulario para cambiar tu password
				</p>

				<form
					onSubmit={handleSubmit(handleChangePassword)}
					className=' mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg'
					noValidate
				>
					<div className='mb-5 space-y-3'>
						<label
							className='text-sm uppercase font-bold'
							htmlFor='current_password'
						>
							Password Actual
						</label>
						<input
							id='current_password'
							type='password'
							placeholder='Password Actual'
							className='w-full p-3  border border-gray-200'
							{...register('currentPassword', {
								required: 'El password actual es obligatorio',
							})}
						/>
						{errors.currentPassword && (
							<ErrorMsg>{errors.currentPassword.message}</ErrorMsg>
						)}
					</div>

					<div className='mb-5 space-y-3'>
						<label
							className='text-sm uppercase font-bold'
							htmlFor='newPassword'
						>
							Nuevo Password
						</label>
						<input
							id='newPassword'
							type='password'
							placeholder='Nuevo Password'
							className='w-full p-3  border border-gray-200'
							{...register('newPassword', {
								required: 'El Nuevo Password es obligatorio',
								minLength: {
									value: 8,
									message: 'El Password debe ser mínimo de 8 caracteres',
								},
								pattern: {
									value: PASSWORD_REGEX,
									message:
										'El Password debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
								},
							})}
						/>
						{errors.newPassword && (
							<ErrorMsg>{errors.newPassword.message}</ErrorMsg>
						)}
					</div>
					<div className='mb-5 space-y-3'>
						<label
							htmlFor='passwordConfirmation'
							className='text-sm uppercase font-bold'
						>
							Repetir Password
						</label>

						<input
							id='passwordConfirmation'
							type='password'
							placeholder='Repetir Password'
							className='w-full p-3  border border-gray-200'
							{...register('passwordConfirmation', {
								required: 'Este campo es obligatorio',
								validate: (value) =>
									value === newPassword || 'Los Passwords no son iguales',
							})}
						/>
						{errors.passwordConfirmation && (
							<ErrorMsg>{errors.passwordConfirmation.message}</ErrorMsg>
						)}
					</div>

					<input
						type='submit'
						value='Cambiar Password'
						className='bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors'
					/>
				</form>
			</div>
		</>
	);
}
