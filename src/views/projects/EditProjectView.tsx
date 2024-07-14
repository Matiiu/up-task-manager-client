import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Project from '@/api/ProjectApi';
import EditProjectForm from '@/components/projects/EditProjectForm';

function EditProjectView() {
	const { projectId } = useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editProject', projectId],
		queryFn: () => Project.getProjectById(String(projectId)),
		retry: false,
	});

	if (isLoading) return 'Cargando...';

	if (isError) return <Navigate to='/404' />;

	if (data && projectId)
		return (
			<EditProjectForm
				project={data}
				projectId={projectId}
			/>
		);
}

export default EditProjectView;
