import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserLoginForm } from '@/types/authTypes';
import ErrorMsg from '@/components/ErrorMsg';

export default function LoginView() {
	const initialUserLoginFormValues: UserLoginForm = {
		email: '',
		password: '',
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialUserLoginFormValues });

	const handleLogin = (formData: UserLoginForm) => {
		console.log(formData);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(handleLogin)}
				className='space-y-8 p-10 bg-white'
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
								value: /\S+@\S+\.\S+/,
								message: 'E-mail no válido',
							},
						})}
					/>
					{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
				</div>

				<div className='flex flex-col gap-5'>
					<label className='font-normal text-2xl'>Password</label>

					<input
						type='password'
						placeholder='Password de Registro'
						className='w-full p-3  border-gray-300 border'
						{...register('password', {
							required: 'El Password es obligatorio',
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
			</nav>
		</>
	);
}
