import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import ErrorMsg from '@/components/ErrorMsg';
import type { ConfirmToken, NewPasswordForm } from '@/types/authTypes';
import AuthAPI from '@/api/AuthAPI';
import { toast } from 'react-toastify';
import { PASSWORD_REGEX } from '@/constants/authConstants';

const initializeNewPasswordForm = (): NewPasswordForm => ({
	password: '',
	passwordConfirmation: '',
});

type NewPasswordFormProps = {
	token: ConfirmToken['token'];
};

function NewPasswordForm({ token }: NewPasswordFormProps) {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initializeNewPasswordForm() });

	const { mutate } = useMutation({
		mutationFn: AuthAPI.createNewPasswordByToken,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
			navigate('/auth/login');
		},
	});

	const handleNewPassword = (newPasswordForm: NewPasswordForm) => {
		const body = {
			...newPasswordForm,
			token,
		};
		mutate(body);
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
					<label className='font-normal text-2xl'>Contraseña</label>

					<input
						type='password'
						placeholder='Contraseña de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('password', {
							required: 'La contraseña es obligatorio',
							minLength: {
								value: 8,
								message: 'La contraseña debe ser mínimo de 8 caracteres',
							},
							pattern: {
								value: PASSWORD_REGEX,
								message:
									'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial',
							},
						})}
					/>
					{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
				</div>

				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Repetir Contraseña</label>

					<input
						id='passwordConfirmation'
						type='password'
						placeholder='Repite Password de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('passwordConfirmation', {
							required: 'Repetir Contraseña es obligatorio',
							validate: (value) =>
								value === password || 'Las Contraseñas no son iguales',
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
