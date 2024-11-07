import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ErrorMsg from '@/components/ErrorMsg';
import type { TeamMemberForm } from '@/types/teamTypes';
import { EMAIL_REGEX } from '@/constants/authConstants';
import TeamAPI from '../../api/TeamAPI';
import ShowMembers from '@/components/team/ShowMembers';

const initializedAddMemberForm = (): TeamMemberForm => ({
	email: '',
});

export default function AddMemberForm() {
	const params = useParams();
	const projectId = params?.projectId ?? '';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initializedAddMemberForm() });

	const mutation = useMutation({
		mutationFn: TeamAPI.getMemberByEmail,
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const resetData = () => {
		reset();
		mutation.reset();
	};

	const handleSearchUser = async (teamMemberForm: TeamMemberForm) => {
		mutation.mutate({ projectId, teamMemberForm });
	};

	return (
		<>
			<form
				className='mt-10 space-y-5'
				onSubmit={handleSubmit(handleSearchUser)}
				noValidate
			>
				<div className='flex flex-col gap-3'>
					<label className='font-normal text-2xl' htmlFor='name'>
						E-mail de Usuario
					</label>
					<input
						id='name'
						type='text'
						placeholder='E-mail del usuario a Agregar'
						className='w-full p-3  border-gray-300 border'
						{...register('email', {
							required: 'El Email es obligatorio',
							pattern: {
								value: EMAIL_REGEX,
								message: 'El Email no es valido',
							},
						})}
					/>
					{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
				</div>

				<input
					type='submit'
					className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
					value='Buscar Usuario'
				/>
			</form>
			<div className='mt-10'>
				{mutation.isPending && (
					<p className='text-center'>Buscando Usuario...</p>
				)}
				{mutation.data && (
					<ShowMembers user={mutation.data} onResetForm={resetData} />
				)}
			</div>
		</>
	);
}
