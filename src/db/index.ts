import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

// Configuração ultra-resiliente
const pool = new pg.Pool({
    connectionString,
    ssl: connectionString?.includes('saveincloud') ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);
