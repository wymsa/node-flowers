import { Request, Response } from 'express';
import { create, getAll, getByEmail, getById, remove, update } from './user.service';

export const createUser = async (request: Request, response: Response) => {
	try {
		const { email, password } = request.body;

		const foundUser = await getByEmail(email);
		if (foundUser) {
			return response.status(409).json({ message: 'Invalid request body' });
		}

		const newUser = await create({ email, password });
		return response.status(201).json({ message: 'User successfully created', data: newUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};

export const findUserById = async (request: Request, response: Response) => {
	try {
		const { id } = request.params;

		const foundUser = await getById(Number(id));
		return response.status(200).json({ data: foundUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};

export const findUserByEmail = async (request: Request, response: Response) => {
	try {
		const { email } = request.params;

		if (!email) {
			return response.status(400).json({ message: 'Invalid request params' });
		}

		const foundUser = await getByEmail(email);
		return response.status(200).json({ data: foundUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};

export const findAllUsers = async (request: Request, response: Response) => {
	try {
		const foundUsers = await getAll();
		return response.status(200).json({ data: foundUsers });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};

export const removeUserById = async (request: Request, response: Response) => {
	try {
		const { id } = request.params;

		const removedUser = await remove(Number(id));

		if (!removedUser) {
			return response.status(400).json({ message: 'Invalid request body' });
		}

		return response.status(200).json({ message: 'User successfully removed', data: removedUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};

export const updateUserById = async (request: Request, response: Response) => {
	try {
		const { id } = request.params;
		const userBody = request.body;

		if (userBody.email) {
			const foundUser = await getByEmail(userBody.email);
			if (foundUser) {
				return response.status(409).json({ message: 'Invalid request body' });
			}
		}

		const updatedUser = await update(Number(id), { ...userBody });

		if (!updatedUser) {
			return response.status(400).json({ message: 'Invalid request body' });
		}

		return response.status(200).json({ message: 'User successfully updated', data: updatedUser });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ message: error });
	}
};