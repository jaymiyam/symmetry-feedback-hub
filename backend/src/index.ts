import express from 'express';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

import postsRouter from './routes/postsRoutes';
import usersRouter from './routes/usersRoutes';
import votesRouter from './routes/votesRoutes';

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/votes', votesRouter);

app.get('/api', (req, res) => {
  res.json({
    message:
      'Welcome to Symmetry Feedback Hub API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      votes: 'api/votes',
    },
  });
});

app.listen(ENV.PORT, () => {
  console.log(`Backend server listening on port ${ENV.PORT}`);
});
