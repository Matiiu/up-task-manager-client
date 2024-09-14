import { useState } from 'react';
import CreateNewPasswordForm from '@/components/auth/CreateNewPasswordForm';
import CreateNewPasswordToken from '@/components/auth/CreateNewPasswordToken';
import { ConfirmToken } from '@/types/authTypes';

function NewPasswordView() {
	const [token, setToken] = useState<ConfirmToken['token']>('');
	const [isValidToken, setIsValidToken] = useState(false);

	return (
		<>
			<h1 className='text-5xl font-black text-white'>Restablecer Contraseña</h1>
			<p className='text-2xl font-light text-white mt-5'>
				Ingresa el código que recibiste {''}
				<span className=' text-fuchsia-500 font-bold'>por email</span>
			</p>

			{isValidToken ? (
				<CreateNewPasswordForm token={token} />
			) : (
				<CreateNewPasswordToken
					token={token}
					setToken={setToken}
					setIsValidToken={setIsValidToken}
				/>
			)}
		</>
	);
}

export default NewPasswordView;
