import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
    connectionString,
    // Forçando SSL false para SaveInCloud e aumentando a resiliência
    ssl: false,
    connectionTimeoutMillis: 10000, // Dá 10 segundos para a Vercel respirar
    max: 10, // Limite de conexões para não estourar o banco
});

export const db = drizzle(pool);
