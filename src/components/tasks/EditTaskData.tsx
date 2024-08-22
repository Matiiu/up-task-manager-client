import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Task from '@/api/TaskApi';
import EditTaskModal from './EditTaskModal';

function EditTaskData() {
	const params = useParams();
	const projectId = params.projectId!;
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('editTask')!;
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editTask', taskId],
		queryFn: () => Task.getTaskById({ projectId, taskId }),
		retry: false,
		enabled: !!taskId,
	});

	if (isLoading) return 'Cargando...';

	if (isError) return <Navigate to='/404' />;

	if (data)
		return (
			<EditTaskModal
				task={data}
				taskId={taskId}
			/>
		);
}

export default EditTaskData;
