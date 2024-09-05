import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

// Validating 'id' params
export const validateParams = (request: Request, response: Response, next: NextFunction) => {
	const { id } = request.params;

	if (!id || Number.isNaN(Number(id))) {
		return response.status(400).json({ message: 'Invalid request params' });
	}

	next();
};

export const zodValidateBody = (zodSchema: ZodSchema) => {
	return async (request: Request, response: Response, next: NextFunction) => {
		const requestBody = request.body;

		try {
			await zodSchema.parseAsync(requestBody);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors = [];
				for (const issue of error.issues) {
					formattedErrors.push({
						errorMessage: issue.message,
						errorPath: issue.path
					});
				}

				return response.status(400).json({ message: 'Invalid request body', errors: formattedErrors });
			}

			return response.status(400).json(error);
		}
	};
};