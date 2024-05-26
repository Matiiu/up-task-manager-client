import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import type { ProjectFormData, Project as TProject } from '@/types/index';
import ProjectForm from './ProjectForm';
import Project from '@/api/ProjectApi';
import { toast } from 'react-toastify';

type EditProjectFormProps = {
	projectId: TProject['_id'];
	project: ProjectFormData;
};

function EditProjectForm({ projectId, project }: EditProjectFormProps) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { ...project } });

	const { mutate } = useMutation({
		mutationFn: Project.updateProject,
		onError: (err) => {
			toast.error(err.message);
		},
		onSuccess: (data) => {
			typeof data === 'string' && toast.success(data);
			navigate('/');
		},
	});

	const handleForm = (formData: ProjectFormData) => {
		const body = {
			id: projectId,
			formData,
		};
		mutate(body);
	};

	return (
		<>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-5xl font-black'>Editar Proyecto</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					Llena el siguiente formulario para editar el proyecto
				</p>
				<nav className='my-5'>
					<Link
						to='/'
						className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors duration-300 ease-in-out'
					>
						Volver a proyectos
					</Link>
				</nav>

				<form
					className='mt-10 bg-white shadow-lg p-10 rounded-lg'
					onSubmit={handleSubmit(handleForm)}
					noValidate
				>
					<ProjectForm
						register={register}
						errors={errors}
					/>
					<input
						type='submit'
						value='Guardar Cambios'
						className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-300 ease-in-out'
					/>
				</form>
			</div>
		</>
	);
}

export default EditProjectForm;
