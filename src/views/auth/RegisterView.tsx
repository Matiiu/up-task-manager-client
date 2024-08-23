import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UserRegistrationForm } from '@/types/authTypes';
import ErrorMsg from '@/components/ErrorMsg';
import AuthAPI from '@/api/AuthApi';
import { toast } from 'react-toastify';
import { PASSWORD_REGEX, EMAIL_REGEX } from '@/constants/authConstants';

function RegisterView() {
	const initializedUserRegistrationForm = (): UserRegistrationForm => ({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationForm>({
		defaultValues: initializedUserRegistrationForm(),
	});

	const { mutate } = useMutation({
		mutationFn: AuthAPI.createAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const currentPassword = watch('password');

	const handleRegister = (formData: UserRegistrationForm) => {
		mutate({ formData });
	};

	return (
		<>
			<h1 className='text-5xl font-black text-white'>Crear Cuenta</h1>
			<p className='text-2xl font-light text-white mt-5'>
				Llena el formulario para {''}
				<span className=' text-fuchsia-500 font-bold'> crear tu cuenta</span>
			</p>

			<form
				onSubmit={handleSubmit(handleRegister)}
				className='space-y-8 p-10  bg-white mt-10'
				noValidate
			>
				<div className='flex flex-col gap-5'>
					<label
						className='font-normal text-2xl'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('email', {
							required: 'El Email de registro es obligatorio',
							pattern: {
								value: EMAIL_REGEX,
								message: 'E-mail no válido',
							},
						})}
					/>
					{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
				</div>

				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Nombre</label>
					<input
						type='name'
						placeholder='Nombre de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('name', {
							required: 'El Nombre de usuario es obligatorio',
						})}
					/>
					{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
				</div>

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
							pattern: {
								value: PASSWORD_REGEX,
								message:
									'El Password debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
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
								value === currentPassword || 'Los Passwords no son iguales',
						})}
					/>

					{errors.passwordConfirmation && (
						<ErrorMsg>{errors.passwordConfirmation.message}</ErrorMsg>
					)}
				</div>

				<input
					type='submit'
					value='Registrarme'
					className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
				/>
			</form>

			<nav className='mt-10 flex flex-col space-y-4'>
				<Link
					to='/auth/login'
					className='text-center text-gray-300 font-normal'
				>
					¿Ya tiene cuenta? Iniciar Sesión
				</Link>
			</nav>
		</>
	);
}

export default RegisterView;
