import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// Em ambientes de borda (Cloudflare/Vercel), as variáveis vem de process.env ou bindings
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
    connectionString,
    // Para o SaveInCloud, manter SSL como false por enquanto, 
    // mas em produção (AWS/Heroku) mudar para { rejectUnauthorized: false }
    ssl: false,
});

export const db = drizzle(pool);
