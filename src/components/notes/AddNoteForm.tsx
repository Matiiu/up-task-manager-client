import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { NoteForm } from '@/types/noteTypes';
import ErrorMsg from '@/components/ErrorMsg';
import NoteAPI from '../../api/NoteAPI';

const initializeNote = (): NoteForm => ({
	content: '',
});

export default function AddNoteForm() {
	const params = useParams();
	const projectId = params?.projectId ?? '';
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('viewTask') ?? '';
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: initializeNote(),
	});

	const { mutate } = useMutation({
		mutationFn: NoteAPI.create,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		},
	});

	const handleAddNote = (note: NoteForm) => {
		mutate({ projectId, taskId, note });
	};

	return (
		<form
			onSubmit={handleSubmit(handleAddNote)}
			noValidate
			className='space-y-3'
		>
			<div className='flex flex-col gap-2'>
				<label htmlFor='content' className='font-bold'>
					Crear Nota
				</label>
				<input
					type='text'
					id='content'
					placeholder='Contenido de la nota'
					className='w-full p-3 border border-gray-300'
					{...register('content', {
						required: 'El contenido de la nota es obligatorio',
						validate: (value) =>
							value.trim().length > 0 ||
							'El contenido de la nota es obligatorio',
					})}
				/>
				{errors.content && <ErrorMsg>{errors.content.message}</ErrorMsg>}
			</div>

			<input
				type='submit'
				value='Crear Nota'
				className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
			/>
		</form>
	);
}
