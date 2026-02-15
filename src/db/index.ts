import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
const isSaveInCloud = connectionString?.includes('saveincloud');

const pool = new pg.Pool({
    connectionString,
    ssl: isSaveInCloud ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);
