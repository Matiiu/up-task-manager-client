import { z } from 'zod';
import { changePasswordSchema } from '@/schemas/profileSchemas';

export type ChangePassword = z.infer<typeof changePasswordSchema>;
