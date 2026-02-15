import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool);
