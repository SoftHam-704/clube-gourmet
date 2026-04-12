import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// Em Workers, cache global pode causar "hangs" se a conexão cair.
// Vamos usar uma abordagem mais segura.
let poolInstance: pg.Pool | null = null;

export const getDb = (env?: any) => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
        console.error("❌ [DB] Erro: DATABASE_URL não encontrada no context ou process.env");
        return null;
    }

    try {
        // Se o pool já existe, verificamos se ele ainda é válido
        if (!poolInstance) {
            console.log("🔌 [DB] Criando novo Pool de conexões...");
            poolInstance = new pg.Pool({
                connectionString,
                ssl: false,
                connectionTimeoutMillis: 10000,
                max: 5, // Reduzi o max para evitar sobrecarga no SaveInCloud
            });

            poolInstance.on('error', (err) => {
                console.error('❌ [Pool Error]:', err.message);
                poolInstance = null; // Reseta para tentar criar um novo no próximo request
            });
        }

        return drizzle(poolInstance);
    } catch (e) {
        console.error("❌ [DB] Falha crítica na inicialização:", e);
        return null;
    }
};
