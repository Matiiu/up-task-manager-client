import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ProjectForm from '@/components/projects/ProjectForm';
import type { ProjectFormData } from '@/types/index';
import ProjectAPI from '../../api/ProjectAPI';
import SubmitDisplayButton from '@/components/SubmitDisplayButton';

const initialValues: ProjectFormData = {
	projectName: '',
	clientName: '',
	description: '',
};

function CreateProjectView() {
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: ProjectAPI.createProject,
		onSuccess: (data) => {
			toast.success(data);
			navigate('/');
		},
		onError: (e) => {
			toast.error(e.message);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleForm = (formData: ProjectFormData) => mutate(formData);

	return (
		<>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-5xl font-black'>Crear Proyecto</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					Llena el siguiente formulario para crear un nuevo proyecto
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
					<ProjectForm register={register} errors={errors} />
					<SubmitDisplayButton label='Crear Proyecto' />
				</form>
			</div>
		</>
	);
}

export default CreateProjectView;
