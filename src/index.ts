import 'dotenv/config';
import "reflect-metadata";
import express from 'express';
import { userRouter } from './user/user.router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

export default app;