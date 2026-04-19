import { Router } from 'express';
import {
  handleUpvote,
  handleCancelUpvote,
} from '../controller/votesController';

const votesRouter = Router();

votesRouter.post('/:postId', handleUpvote);
votesRouter.delete('/:postId', handleCancelUpvote);

export default votesRouter;
