import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import type { Note } from '@/types/noteTypes';
import { formatToLongDate } from '@/utils/index';
import NoteAPI from '@/api/NoteAPI';

type DetailsNotaProps = {
	note: Note;
};

export default function DetailsNote({ note }: DetailsNotaProps) {
	const params = useParams();
	const projectId = params?.projectId ?? '';
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get('viewTask') ?? '';
	const queryClient = useQueryClient();

	const { data: authenticatedUser, isLoading: isLoadingUser } = useAuth();
	const { mutate } = useMutation({
		mutationFn: NoteAPI.delete,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		},
	});

	const canDelete = useMemo(
		() => authenticatedUser?._id === note.createdBy._id,
		[authenticatedUser, note],
	);

	if (isLoadingUser) return <p>Cargando...</p>;

	return (
		<div className='p-3 flex justify-between items-center'>
			<div>
				<p>
					{note.content} por:{' '}
					<span className='font-bold'>{note.createdBy.name}</span>
				</p>
				<p className='text-xs text-slate-500'>
					{formatToLongDate(note.createdAt)}
				</p>
			</div>
			{canDelete && (
				<button
					type='button'
					className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors'
					onClick={() =>
						mutate({
							projectId,
							taskId,
							noteId: note._id,
						})
					}
				>
					Eliminar
				</button>
			)}
		</div>
	);
}
