import { Router } from 'express';
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetPostById,
  handleGetPostsByAuthor,
  handleUpdatePost,
  handleCreateComment,
  handleDeleteComment,
  handleGetCommentsByPost,
} from '../controller/postsController';

const postsRouter = Router();

postsRouter.get('/', handleGetAllPosts);
// 'myposts' route must be above /$postId to avoid the dynamic params catching it
postsRouter.get('/myposts', handleGetPostsByAuthor);
postsRouter.get('/:postId', handleGetPostById);
postsRouter.post('/', handleCreatePost);
postsRouter.patch('/:postId', handleUpdatePost);
postsRouter.delete('/:postId', handleDeletePost);
// comments related routes
postsRouter.get('/:postId/comments', handleGetCommentsByPost);
postsRouter.post('/:postId/comments', handleCreateComment);
postsRouter.delete('/comments/:commentId', handleDeleteComment);

export default postsRouter;
