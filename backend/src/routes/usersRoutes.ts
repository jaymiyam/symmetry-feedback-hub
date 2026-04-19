import { Router } from 'express';
import { syncUser } from '../controller/usersController';

const usersRouter = Router();

usersRouter.post('/sync', syncUser);

export default usersRouter;
