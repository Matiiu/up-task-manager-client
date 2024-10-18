import AddNoteForm from '@/components/notes/AddNoteForm';
import type { Task } from '@/types/index';

type NotesPanelProps = {
	notes: Task['notes'];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
	return (
		<>
			<AddNoteForm />

			<div className='divide-y divide-gray-100 mt-10'>
				{notes.length ? (
					<p className='font-bold text-2xl text-slate-600 my-5'>Notas:</p>
				) : (
					<p className='text-gray-500 text-center pt-3'>No Hay Notas</p>
				)}
			</div>
		</>
	);
}
