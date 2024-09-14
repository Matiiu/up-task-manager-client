import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TaskFormData } from '@/types/index';
import ErrorMsg from '@/components/ErrorMsg';

type TaskFormProps = {
	errors: FieldErrors<TaskFormData>;
	register: UseFormRegister<TaskFormData>;
};

function TaskForm({ errors, register }: TaskFormProps) {
	return (
		<>
			<div className='flex flex-col gap-5'>
				<label className='font-normal text-2xl' htmlFor='name'>
					Nombre de la tarea
				</label>
				<input
					id='name'
					type='text'
					placeholder='Nombre de la tarea'
					className='w-full p-3  border-gray-300 border'
					{...register('name', {
						required: 'El nombre de la tarea es obligatorio',
						validate: (value) =>
							value?.trim().length > 0 ||
							'El nombre de la tarea es obligatorio',
					})}
				/>
				{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
			</div>

			<div className='flex flex-col gap-5'>
				<label className='font-normal text-2xl' htmlFor='description'>
					Descripción de la tarea
				</label>
				<textarea
					id='description'
					placeholder='Descripción de la tarea'
					className='w-full p-3  border-gray-300 border'
					{...register('description', {
						required: 'La descripción de la tarea es obligatoria',
						validate: (value) =>
							value?.trim().length > 0 ||
							'La descripción de la tarea es obligatoria',
					})}
				/>
				{errors.description && (
					<ErrorMsg>{errors.description.message}</ErrorMsg>
				)}
			</div>
		</>
	);
}

export default TaskForm;
