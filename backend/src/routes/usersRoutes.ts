import { Router } from 'express';
import { syncUser, handleGetUserStats } from '../controller/usersController';

const usersRouter = Router();

usersRouter.post('/sync', syncUser);
usersRouter.get('/:userId/stats', handleGetUserStats);

export default usersRouter;
