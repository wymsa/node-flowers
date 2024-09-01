import app from '.';
import constants from './constants';
import { AppDataSource } from './config';
import { User } from './user/user.entity';

const main = async () => {
	try {
		if (AppDataSource.isInitialized === false) {
			await AppDataSource.initialize()
				.then(() => console.log('Connected to DB'))
				.catch((error) => {
					throw new Error(error);
				});
		}

		app.listen(constants.PORT, () => {
			console.log(`Server is running on ${constants.PORT} port`);
		});
	} catch (error) {
		console.error(error);
	}
};

main();
