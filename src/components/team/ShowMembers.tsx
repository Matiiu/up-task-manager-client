import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { TeamMember } from '@/types/teamTypes';
import TeamAPI from '@/api/TeamAPI';

type ShowMembersProps = {
	user: TeamMember;
	onResetForm: () => void;
};

export default function ShowMembers({ user, onResetForm }: ShowMembersProps) {
	const params = useParams();
	const projectId = params?.projectId ?? '';
	const { mutate } = useMutation({
		mutationFn: TeamAPI.addMemberToProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			onResetForm();
		},
	});

	const handleAddMemberToProject = () => {
		mutate({ userId: user._id, projectId });
	};

	return (
		<>
			<p className='mt-10 text-center font-bold'>Resultado:</p>
			<div className='flex justify-between items-center'>
				<p>{user.name}</p>
				<button
					className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
					onClick={handleAddMemberToProject}
				>
					Agregar al Proyecto
				</button>
			</div>
		</>
	);
}
