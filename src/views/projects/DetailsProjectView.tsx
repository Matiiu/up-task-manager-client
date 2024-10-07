import { lazy, Suspense, memo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProjectAPI from '@/api/ProjectAPI';
import TaskList from '@/components/tasks/TaskList';
import useAuth from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';

const MemoizedTaskList = memo(TaskList);
const LazyCreateTaskModal = lazy(
	() => import('@/components/tasks/CreateTaskModal'),
);
const LazyEditTaskData = lazy(() => import('@/components/tasks/EditTaskData'));
const LazyDetailsTaskModal = lazy(
	() => import('@/components/tasks/DetailsTaskModal'),
);

function DetailsProjectView() {
	const params = useParams();
	const { data: authenticatedUser, isLoading: isAuthLoading } = useAuth();
	const projectId = params.projectId!;
	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => ProjectAPI.getProjectById(projectId),
		retry: false,
	});
	const navigate = useNavigate();

	if (isLoading && isAuthLoading) return 'Cargando...';

	if (isError) return <Navigate to='/404' />;

	if (data && authenticatedUser) {
		return (
			<>
				<h1 className='text-5xl font-black'>{data.projectName}</h1>
				<p className='text-2xl font-light text-gray-500 mt-5'>
					{data.description}
				</p>

				{isManager(data.manager, authenticatedUser._id) && (
					<nav className='my-5 flex gap-3'>
						<button
							className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
							onClick={() => navigate(`?createTask=true`)}
						>
							Agregar Tarea
						</button>

						<Link
							to={'team'}
							className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
						>
							Colaboradores
						</Link>
					</nav>
				)}

				<MemoizedTaskList
					tasks={data.tasks}
					isManager={isManager(data.manager, authenticatedUser._id)}
				/>

				<Suspense fallback='Cargando...'>
					<LazyCreateTaskModal />
					<LazyEditTaskData />
					<LazyDetailsTaskModal />
				</Suspense>
			</>
		);
	}
}

export default DetailsProjectView;
