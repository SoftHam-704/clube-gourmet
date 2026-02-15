import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// Em ambientes de borda (Cloudflare/Vercel), as variáveis vem de process.env ou bindings
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
    connectionString,
    ssl: connectionString?.includes('sp1.br.saveincloud') ? false : { rejectUnauthorized: false },
    max: 10, // Limite de conexões
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);
