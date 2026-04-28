import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let pool: Pool | null = null;

function initPool(connectionString: string): Pool {
    if (!pool) {
        console.log("🔌 [DB] Criando pg.Pool (node-postgres)...");
        pool = new Pool({
            connectionString,
            ssl: false,
            max: 3,
            connectionTimeoutMillis: 7000,
            idleTimeoutMillis: 20000,
            statement_timeout: 10000,
            query_timeout: 10000,
            options: '-c search_path=emparclub,public -c lock_timeout=5000',
        });
        pool.on('error', (err) => {
            console.error('❌ [DB] Pool error:', err.message);
            pool = null;
        });
    }
    return pool;
}

export const getPool = (env?: any): Pool | null => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("❌ [DB] DATABASE_URL não encontrada.");
        return null;
    }
    return initPool(connectionString);
};

export const getDb = (env?: any) => {
    const p = getPool(env);
    if (!p) return null;
    return drizzle(p);
};
