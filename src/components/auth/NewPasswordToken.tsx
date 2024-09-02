import { Link } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

function NewPasswordToken() {
	const handleChange = (token: string) => {
		console.log(token);
	};
	const handleComplete = (token: string) => {
		console.log(token);
	};

	return (
		<>
			<form className='space-y-8 p-10 rounded-lg bg-white mt-10'>
				<label className='font-normal text-2xl text-center block'>
					Código de 6 dígitos
				</label>
				<div className='flex justify-center gap-5'>
					<PinInput
						value={'123456'}
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
