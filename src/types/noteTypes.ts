import { z } from 'zod';
import { noteSchema } from '@/schemas/noteSchemas';

export type Note = z.infer<typeof noteSchema>;
export type NoteForm = Pick<Note, 'content'>;
