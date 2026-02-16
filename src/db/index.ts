import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

let internalDb: any = null;

export const getDb = () => {
    if (internalDb) return internalDb;

    const connectionString = process.env.DATABASE_URL;

    // Configuração segura para evitar crash
    const poolConfig = connectionString ? {
        connectionString,
        ssl: false,
        connectionTimeoutMillis: 5000,
        max: 5,
    } : null;

    if (!poolConfig) {
        console.warn("⚠️ DATABASE_URL não definida.");
        return null;
    }

    try {
        const pool = new pg.Pool(poolConfig as any);
        pool.on('error', (err) => console.error('❌ PG Pool Error:', err.message));
        internalDb = drizzle(pool);
        return internalDb;
    } catch (e) {
        console.error("❌ Falha crítica ao inicializar Pool:", e);
        return null;
    }
};

// Mantém export para compatibilidade, mas tenta inicializar agora
export const db = getDb();
