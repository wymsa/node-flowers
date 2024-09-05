import { z } from 'zod';
import { createUserSchema } from '../schemas';

export type CreateUserDto = z.infer<typeof createUserSchema>;