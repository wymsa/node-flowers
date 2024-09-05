import app from '.';
import constants from './constants';
import { AppDataSource } from './config';
import { Server } from 'node:http';

function shutdown(server: Server) {
	server.close(() => {
		process.exit(0);
	});

	setTimeout(() => {
		process.exit(1);
	}, 10000);
}

const main = async () => {
	try {
		if (AppDataSource.isInitialized === false) {
			await AppDataSource.initialize()
				.then(() => console.log('Connected to DB'))
				.catch((error) => {
					throw new Error(error);
				});
		}

		const server = app.listen(constants.PORT, () => {
			console.log(`Server is running on ${constants.PORT} port`);
		});

		process.on('SIGINT', () => {
			shutdown(server);
		});

		process.on('SIGTERM', () => {
			shutdown(server);
		});
	} catch (error) {
		console.error(error);
	}
};

main();
