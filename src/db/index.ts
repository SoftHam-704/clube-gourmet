import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let sqlClient: postgres.Sql | null = null;
let lastSuccessfulQuery = 0;

// Em ambientes serverless (Vercel), conexões podem morrer entre invocações.
// Recriamos a conexão se ficou muito tempo sem uso.
const MAX_IDLE_MS = 30_000; // 30 segundos

export const getDb = (env?: any) => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
        console.error("❌ [DB] DATABASE_URL não encontrada.");
        return null;
    }

    try {
        const now = Date.now();
        const isStale = sqlClient && (now - lastSuccessfulQuery > MAX_IDLE_MS);
        
        if (isStale) {
            console.warn("⚠️ [DB] Resetando conexão stale...");
            try { sqlClient!.end({ timeout: 1 }); } catch (_) {}
            sqlClient = null;
        }

        if (!sqlClient) {
            console.log("🔌 [DB] Nova conexão Postgres (SearchPath: emparclub)...");
            
            sqlClient = postgres(connectionString, {
                ssl: false,              // SaveInCloud dropa conexões TLS silenciosamente
                max: 10,
                connect_timeout: 5,
                idle_timeout: 30,
                max_lifetime: 60 * 10,
                fetch_types: false,
                prepare: false,          // Desativa prepared statements para evitar problemas em serverless/poolers
                parameters: {
                    'search_path': 'emparclub,public'
                }
            });
            
            lastSuccessfulQuery = now;
        } else {
            lastSuccessfulQuery = now;
        }

        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Erro Crítico:", e);
        sqlClient = null;
        return null;
    }
};
