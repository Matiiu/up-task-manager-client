import { z } from 'zod';
import { changePasswordSchema } from '@/schemas/profileSchemas';
import type { Auth } from '@/types/authTypes';

export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type CheckPassword = Pick<Auth, 'password'>;
