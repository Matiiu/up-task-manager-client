import { useForm } from 'react-hook-form';
import type { NoteForm } from '@/types/noteTypes';
import ErrorMsg from '@/components/ErrorMsg';

const initializeNote = (): NoteForm => ({
	content: '',
});

export default function AddNoteForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initializeNote(),
	});

	const handleAddNote = (data: NoteForm) => {
		console.log(data);
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
