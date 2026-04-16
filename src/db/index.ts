import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let pool: Pool | null = null;

export const getDb = (env?: any) => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("❌ [DB] DATABASE_URL não encontrada.");
        return null;
    }

    if (!pool) {
        console.log("🔌 [DB] Criando pg.Pool (node-postgres)...");

        pool = new Pool({
            connectionString,
            ssl: false,
            max: 3,
            connectionTimeoutMillis: 7000,  // Client-side: desiste de pegar conexão após 7s
            idleTimeoutMillis: 20000,        // Fecha conexões ociosas em 20s
            statement_timeout: 10000,        // Server-side: mata queries lentas em 10s
            query_timeout: 10000,            // Client-side: rejeita a Promise após 10s (não depende de pooler)
            options: '-c search_path=emparclub,public -c lock_timeout=5000',
        });

        pool.on('error', (err) => {
            console.error('❌ [DB] Pool error:', err.message);
            pool = null; // Força recriação na próxima requisição
        });
    }

    return drizzle(pool);
};
