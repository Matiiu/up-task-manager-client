import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Project from '@/api/ProjectApi';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import TaskList from '../../components/tasks/TaskList';
import EditTaskData from '@/components/tasks/EditTaskData';

function DetailsProjectView() {
	const params = useParams();
	const projectId = params.projectId!;
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editProject', projectId],
		queryFn: () => Project.getProjectById(projectId),
		retry: false,
	});
	const navigate = useNavigate();

	if (isLoading) return 'Cargando...';

	if (isError) return <Navigate to='/404' />;

	if (data)
		return (
			<>
				<h1 className='text-5xl font-black'>{data.projectName}</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					{data.description}
				</p>

				<nav className='my-5 flex gap-3'>
					<button
						className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
						onClick={() => navigate(`?createTask=true`)}
					>
						Agregar Tarea
					</button>
				</nav>

				<TaskList tasks={data.tasks} />

				<CreateTaskModal />
				<EditTaskData />
			</>
		);
}

export default DetailsProjectView;
