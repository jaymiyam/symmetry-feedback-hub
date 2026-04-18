import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ENV } from '../config/env';
import * as schema from './schema';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('Database connected successfully ✅');
});

pool.on('error', (err) => {
  console.log('💥 Database connection error:', err);
});

export const db = drizzle({ client: pool, schema });
