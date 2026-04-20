import { getAuth } from '@clerk/express';
import type { Response, Request } from 'express';
import { upvote, cancelUpvote } from '../db/queries';

export const handleUpvote = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as { postId: string };
    const { userId } = getAuth(req);

    if (!userId) {
      // 401: unauthorized
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const vote = await upvote(postId, userId);

    // upvote uses onConflictDoNothing, so if it returns undefined,
    // 409: conflict
    if (!vote) {
      return res
        .status(409)
        .json({ error: 'Already voted or Post does not exist' });
    }

    res.status(200).json(vote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to upvote' });
  }
};

export const handleCancelUpvote = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as { postId: string };
    const { userId } = getAuth(req);

    if (!userId) {
      // 401: unauthorized
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const vote = await cancelUpvote(postId, userId);
    res.status(200).json(vote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to cancel upvote' });
  }
};
