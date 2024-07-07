import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const neonDBUrl = process.env.NEON_DB_URL!;
if (!neonDBUrl) {
  throw new Error('NEON_DB_URL environment variable is not defined');
}
const sql = neon(neonDBUrl);
export const db = drizzle(sql);