import type { NewPasswordForm } from '@/types/authTypes';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMsg from '@/components/ErrorMsg';

const initializeNewPasswordForm = (): NewPasswordForm => ({
	password: '',
	passwordConfirmation: '',
});

function NewPasswordForm() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initializeNewPasswordForm() });

	const handleNewPassword = (newPasswordForm: NewPasswordForm) => {
		console.log(newPasswordForm);
		reset();
		navigate('/login');
	};

	const password = watch('password');

	return (
		<>
			<form
				onSubmit={handleSubmit(handleNewPassword)}
				className='space-y-8 p-10  bg-white mt-10'
				noValidate
			>
				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Password</label>

					<input
						type='password'
						placeholder='Password de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('password', {
							required: 'El Password es obligatorio',
							minLength: {
								value: 8,
								message: 'El Password debe ser mínimo de 8 caracteres',
							},
						})}
					/>
					{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
				</div>

				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Repetir Password</label>

					<input
						id='passwordConfirmation'
						type='password'
						placeholder='Repite Password de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('passwordConfirmation', {
							required: 'Repetir Password es obligatorio',
							validate: (value) =>
								value === password || 'Los Passwords no son iguales',
						})}
					/>

					{errors.passwordConfirmation && (
						<ErrorMsg>{errors.passwordConfirmation.message}</ErrorMsg>
					)}
				</div>

				<input
					type='submit'
					value='Establecer Password'
					className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
				/>
			</form>
		</>
	);
}

export default NewPasswordForm;
