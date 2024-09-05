import z from 'zod';

export const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, 'Must be 6 or more characters long').max(12, 'Must be 12 or less characters long')
});

export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	password: z.string().min(6, 'Must be 6 or more characters long').max(12, 'Must be 12 or less characters long').optional()
});