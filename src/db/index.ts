import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.warn("⚠️ DATABASE_URL não encontrada! A API funcionará apenas em modo debug.");
}

const pool = new pg.Pool({
    connectionString: connectionString || "",
    ssl: connectionString?.includes('sp1.br.saveincloud') ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);
