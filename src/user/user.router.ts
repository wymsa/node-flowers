import { Router } from 'express';
import { createUser, findUserByEmail, findUserById, removeUserById, updateUserById, findAllUsers } from './user.controller';
import { validateParams, zodValidateBody } from '../middlewares';
import { createUserSchema, updateUserSchema } from './schemas';

export const userRouter = Router();

userRouter.post('/', zodValidateBody(createUserSchema), createUser);
userRouter.get('/id/:id', validateParams, findUserById);
userRouter.get('/email/:email', findUserByEmail);
userRouter.get('/', findAllUsers);
userRouter.delete('/:id', validateParams, removeUserById);
userRouter.put('/:id', validateParams, zodValidateBody(updateUserSchema), updateUserById);