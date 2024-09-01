import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const userRepository = AppDataSource.getRepository(User);

export const create = async (createUserDto: CreateUserDto) => {
	try {
		const newUser = await userRepository.create({ ...createUserDto });
		await userRepository.save(newUser);
		return newUser;
	} catch (error) {
		console.error(error);
	}
};

export const getByEmail = async (email: string) => {
	try {
		const foundUser = await userRepository.findOneBy({ email });
		return foundUser;
	} catch (error) {
		console.error(error);
	}
};