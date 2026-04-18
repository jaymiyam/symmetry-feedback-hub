import express from 'express';
import { ENV } from './config/env';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.get('/api', (req, res) => {
  res.send('<h1>api endpoint</h1>');
});

app.listen(ENV.PORT, () => {
  console.log(`Backend server listening on port ${ENV.PORT}`);
});
