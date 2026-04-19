import { upsertUser } from '../db/queries';
import type { Response, Request } from 'express';
import { getAuth } from '@clerk/express';

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    //   no userId from clerk auth means not authorized
    if (!userId) {
      // 401: unauthorized
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, name, avatar } = req.body;

    if (!email.trim() || !name.trim() || !avatar.trim()) {
      return (
        res
          //   400: bad request
          .status(400)
          .json({ error: 'User email, name and avatar image are required' })
      );
    }

    const user = await upsertUser({ id: userId, email, name, avatar });

    // 200: OK
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    // 500: internal server error
    res.status(500).json({ error: 'Failed to sync user' });
  }
};
