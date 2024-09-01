import path from 'path';
import { DataSource } from 'typeorm';
import constants from '../constants';

const rootDir = process.cwd();
const AppDataSource = new DataSource({
	type: 'postgres',
	host: constants.DB_HOST,
	port: Number(constants.DB_PORT),
	username: constants.DB_USERNAME,
	password: constants.DB_PASSWORD,
	database: constants.DB_DATABASE,
	synchronize: true,
	entities: [path.join(rootDir, '/src/**/*.entity.ts')],
	migrations: [path.join(rootDir, '/src/migrations/*.ts')]
});

export { AppDataSource };