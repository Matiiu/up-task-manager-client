import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { UserLoginForm } from '@/types/authTypes';
import ErrorMsg from '@/components/ErrorMsg';
import AuthAPI from '../../api/Auth';
import { EMAIL_REGEX } from '@/constants/authConstants';

const initializeUserLoginForm = (): UserLoginForm => ({
	email: '',
	password: '',
});

function LoginView() {
	const navigate = useNavigate();
	const [isSuccessfulAuthentication, setIsSuccessfulAuthentication] =
		useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initializeUserLoginForm() });

	const { mutate } = useMutation({
		mutationFn: AuthAPI.authenticateUser,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			setIsSuccessfulAuthentication(true);
		},
	});

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (isSuccessfulAuthentication) {
			timeoutId = setTimeout(() => navigate('/'), 1500);
		}
		return () => clearTimeout(timeoutId);
	}, [isSuccessfulAuthentication, navigate]);

	const handleLogin = (userLoginForm: UserLoginForm) => {
		mutate(userLoginForm);
	};

	return (
		<>
			<h1 className='text-5xl font-black text-white'>Iniciar Sesión</h1>
			<p className='text-2xl font-light text-white mt-5'>
				Comienza a planear tus proyectos {''}
				<span className=' text-fuchsia-500 font-bold'>
					iniciando sesión en este formulario
				</span>
			</p>
			<form
				onSubmit={handleSubmit(handleLogin)}
				className='space-y-8 p-10 mt-10 bg-white'
				noValidate
			>
				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Email</label>

					<input
						id='email'
						type='email'
						placeholder='Email de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('email', {
							required: 'El Email es obligatorio',
							pattern: {
								value: EMAIL_REGEX,
								message: 'E-mail no válido',
							},
						})}
					/>
					{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
				</div>

				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Contraseña</label>

					<input
						type='password'
						placeholder='Contraseña de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('password', {
							required: 'La Contraseña es obligatoria',
						})}
					/>
					{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
				</div>

				<input
					type='submit'
					value='Iniciar Sesión'
					className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
				/>
			</form>

			<nav className='mt-10 flex flex-col space-y-4'>
				<Link
					to='/auth/register'
					className='text-center text-gray-300 font-normal'
				>
					¿No tienes cuenta? Crear Una
				</Link>
				<Link
					to='/auth/restore-password'
					className='text-center text-gray-300 font-normal'
				>
					¿Olvidaste tu contraseña? Restablecerla
				</Link>
			</nav>
		</>
	);
}

export default LoginView;
