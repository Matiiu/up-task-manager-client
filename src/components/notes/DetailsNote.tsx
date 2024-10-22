import type { Note } from '@/types/noteTypes';
import { formatToLongDate } from '@/utils/index';

type DetailsNotaProps = {
	note: Note;
};

export default function DetailsNote({ note }: DetailsNotaProps) {
	return (
		<div className='p-3 flex justify-between items-center'>
			<p>
				{note.content} por:{' '}
				<span className='font-bold'>{note.createdBy.name}</span>
			</p>
			<p className='text-xs text-slate-500'>
				{formatToLongDate(note.createdAt)}
			</p>
		</div>
	);
}
