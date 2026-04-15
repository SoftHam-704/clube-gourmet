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
            console.warn("⚠️ [DB] Conexão possivelmente stale. Recriando...");
            try { sqlClient!.end({ timeout: 1 }); } catch (_) { /* ignore */ }
            sqlClient = null;
        }

        if (!sqlClient) {
            console.log("🔌 [DB] Iniciando nova conexão Postgres...");
            
            const isProduction = !connectionString.includes('localhost');
            
            sqlClient = postgres(connectionString, {
                ssl: 'prefer',           // SaveInCloud pode não suportar SSL estrito
                max: 3,                  // Menos conexões para serverless
                connect_timeout: 10,     // Timeout de conexão mais curto
                idle_timeout: 20,
                max_lifetime: 60 * 5,    // Conexões vivem no máximo 5 min
                fetch_types: false,       // Evita query extra no startup (mais rápido)
            });
            
            // Marca o timestamp para controle de stale
            lastSuccessfulQuery = now;
            
            // Teste rápido silencioso
            sqlClient`SELECT 1`
                .then(() => {
                    lastSuccessfulQuery = Date.now();
                    console.log("✅ [DB] Conexão Teste OK");
                })
                .catch(e => {
                    console.error("❌ [DB] Conexão Teste Falhou:", e.message);
                    // Se o teste falhou, marca como morta para recriar no próximo getDb()
                    sqlClient = null;
                });
        } else {
            // Atualiza timestamp de uso
            lastSuccessfulQuery = now;
        }

        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Erro Crítico:", e);
        sqlClient = null;
        return null;
    }
};
