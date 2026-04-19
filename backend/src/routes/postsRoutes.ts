import { Router } from 'express';

const postsRouter = Router();

postsRouter.get('/');
postsRouter.get('/:postId');
postsRouter.get('/myposts');
postsRouter.post('/');
postsRouter.put('/:postId');
postsRouter.delete('/:postId');

export default postsRouter;
