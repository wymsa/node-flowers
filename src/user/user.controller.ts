import { Request, Response } from 'express';
import { create, getByEmail } from './user.service';

export const createUser = async (request: Request, response: Response) => {
	try {
		const { email, password } = request.body;

		if (!email || !password) {
			return response.status(400).json({ message: 'Invalid credential' });
		}

		const foundUser = await getByEmail(email);
		if (foundUser) {
			return response.status(409).json({ message: 'Invalid credential' });
		}

		const newUser = await create({ email, password });
		return response.status(201).json({ message: 'User successfully created', data: newUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};