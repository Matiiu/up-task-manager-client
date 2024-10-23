import AddNoteForm from '@/components/notes/AddNoteForm';
import type { Task } from '@/types/index';
import DetailsNote from '@/components/notes/DetailsNote';

type NotesPanelProps = {
	notes: Task['notes'];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
	return (
		<>
			<AddNoteForm />

			<section className='divide-y divide-gray-100 mt-10'>
				{notes.length ? (
					<>
						<p className='font-bold text-2xl text-slate-600 my-5'>Notas:</p>
						{notes.map((note) => (
							<DetailsNote key={note._id} note={note} />
						))}
					</>
				) : (
					<p className='text-gray-500 text-center pt-3'>No Hay Notas</p>
				)}
			</section>
		</>
	);
}
