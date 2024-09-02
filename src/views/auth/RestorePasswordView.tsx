import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RestorePasswordForm } from '@/types/authTypes';
import ErrorMsg from '@/components/ErrorMsg';
import AuthAPI from '@/api/AuthAPI';

const initializeRestorePasswordForm = (): RestorePasswordForm => ({
	email: '',
});

function RestorePasswordView() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initializeRestorePasswordForm() });

	const { mutate } = useMutation({
		mutationFn: AuthAPI.restorePassword,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleRestorePassword = (restorePasswordForm: RestorePasswordForm) => {
		mutate({ restorePasswordForm });
	};

	return (
		<>
			<h1 className='text-5xl font-black text-white'>Restablecer Contraseña</h1>
			<p className='text-2xl font-light text-white mt-5'>
				¿Olvidaste tu contraseña? Ingresa tu email y {''}
				<span className=' text-fuchsia-500 font-bold'>
					restablece tu contraseña
				</span>
			</p>
			<form
				onSubmit={handleSubmit(handleRestorePassword)}
				className='space-y-8 p-10 mt-10  bg-white'
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
								value: /\S+@\S+\.\S+/,
								message: 'E-mail no válido',
							},
						})}
					/>
					{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
				</div>

				<input
					type='submit'
					value='Enviar Instrucciones'
					className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
				/>
			</form>

			<nav className='mt-10 flex flex-col space-y-4'>
				<Link
					to='/auth/login'
					className='text-center text-gray-300 font-normal'
				>
					¿Ya tienes cuenta? Iniciar Sesión
				</Link>

				<Link
					to='/auth/register'
					className='text-center text-gray-300 font-normal'
				>
					¿No tienes cuenta? Crea una
				</Link>
			</nav>
		</>
	);
}

export default RestorePasswordView;
