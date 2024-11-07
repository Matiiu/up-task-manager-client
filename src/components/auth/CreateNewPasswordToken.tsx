import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { toast } from 'react-toastify';
import type { ConfirmToken } from '@/types/authTypes';
import AuthAPI from '../../api/Auth';

type NewPasswordTokenProps = {
	token: ConfirmToken['token'];
	setToken: Dispatch<SetStateAction<string>>;
	setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

function NewPasswordToken({
	token,
	setToken,
	setIsValidToken,
}: NewPasswordTokenProps) {
	const { mutate } = useMutation({
		mutationFn: AuthAPI.validateToken,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			setIsValidToken(true);
		},
	});

	const handleChange = (tkn: ConfirmToken['token']) => {
		setToken(tkn);
	};

	const handleComplete = (tkn: ConfirmToken['token']) => {
		mutate({ token: tkn });
	};

	return (
		<>
			<form className='space-y-8 p-10 rounded-lg bg-white mt-10'>
				<label className='font-normal text-2xl text-center block'>
					Código de 6 dígitos
				</label>
				<div className='flex justify-center gap-5'>
					<PinInput
						value={token}
						onChange={handleChange}
						onComplete={handleComplete}
					>
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
						<PinInputField className='h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white' />
					</PinInput>
				</div>
			</form>
			<nav className='mt-10 flex flex-col space-y-4'>
				<Link
					to='/auth/restore-password'
					className='text-center text-gray-300 font-normal'
				>
					Solicitar un nuevo Código
				</Link>
			</nav>
		</>
	);
}

export default NewPasswordToken;
