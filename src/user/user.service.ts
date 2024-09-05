import { AppDataSource } from '../config';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userRepository = AppDataSource.getRepository(UserEntity);

export const create = async (createUserDto: CreateUserDto) => {
	try {
		const newUser = userRepository.create({ ...createUserDto });
		return await userRepository.save(newUser);
	} catch (error) {
		console.error(error);
	}
};

export const getByEmail = async (email: string) => {
	try {
		const foundUser = await userRepository.findOne({ where: { email } });
		return foundUser;
	} catch (error) {
		console.error(error);
	}
};

export const getById = async (id: number) => {
	try {
		const foundUser = await userRepository.findOne({ where: { id } });
		return foundUser;
	} catch (error) {
		console.error(error);
	}
};

export const getAll = async () => {
	try {
		return await userRepository.findAndCount();
	} catch (error) {
		console.error(error);
	}
};

export const remove = async (id: number) => {
	try {
		const foundUser = await userRepository.findOne({ where: { id } });
		if (foundUser) {
			return await userRepository.remove(foundUser);
		}

		return null;
	} catch (error) {
		console.error(error);
	}
};

export const update = async (id: number, updateUserDto: UpdateUserDto) => {
	try {
		const foundUser = await userRepository.findOne({ where: { id } });

		if (foundUser) {
			return await userRepository.save({ ...foundUser, ...updateUserDto });
		}

		return null;
	} catch (error) {
		console.error(error);
	}
};