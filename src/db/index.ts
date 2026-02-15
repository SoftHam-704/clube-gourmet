import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const rawConnectionString = process.env.DATABASE_URL;
const connectionString = rawConnectionString?.includes('?')
    ? `${rawConnectionString}&sslmode=disable`
    : `${rawConnectionString}?sslmode=disable`;

const pool = new pg.Pool({
    connectionString,
    ssl: false,
    connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);
