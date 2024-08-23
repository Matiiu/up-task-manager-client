import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProjectAPI from '@/api/ProjectAPI';
import EditProjectForm from '@/components/projects/EditProjectForm';

function EditProjectView() {
	const params = useParams();
	const projectId = params.projectId!;
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editProject', projectId],
		queryFn: () => ProjectAPI.getProjectById(projectId),
		retry: false,
	});

	if (isLoading) return 'Cargando...';

	if (isError) return <Navigate to='/404' />;

	if (data)
		return (
			<EditProjectForm
				project={data}
				projectId={projectId}
			/>
		);
}

export default EditProjectView;
