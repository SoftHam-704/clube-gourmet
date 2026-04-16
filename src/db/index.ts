import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let sqlClient: postgres.Sql | null = null;
let clientCreatedAt = 0;

// Em serverless (Vercel), cada invocação pode ser um processo novo.
// Mantemos max baixo para não esgotar o pool do banco.
const MAX_CONNECTION_AGE_MS = 55_000; // 55s — menor que o idle_timeout do servidor

export const getDb = (env?: any) => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("❌ [DB] DATABASE_URL não encontrada.");
        return null;
    }

    try {
        const now = Date.now();
        const isTooOld = sqlClient && (now - clientCreatedAt > MAX_CONNECTION_AGE_MS);

        if (isTooOld) {
            console.warn("⚠️ [DB] Conexão expirada, recriando...");
            try { sqlClient!.end({ timeout: 2 }); } catch (_) {}
            sqlClient = null;
        }

        if (!sqlClient) {
            console.log("🔌 [DB] Nova conexão Postgres (SearchPath: emparclub)...");

            sqlClient = postgres(connectionString, {
                ssl: 'prefer',           // Tenta SSL; cai para plain se o servidor não suportar
                max: 3,                  // Serverless: pool pequeno para não esgotar conexões do banco
                connect_timeout: 10,     // 10s para estabelecer conexão TCP + SSL
                idle_timeout: 20,        // Fecha conexões ociosas em 20s
                max_lifetime: 50,        // Recicla conexões após 50s (menor que MAX_CONNECTION_AGE_MS)
                fetch_types: false,
                prepare: false,          // Desativa prepared statements para evitar problemas em poolers
                connection: {
                    search_path: 'emparclub,public',
                    statement_timeout: 12000,   // 12s — mata queries travadas no servidor
                    lock_timeout: 5000,          // 5s — evita deadlocks silenciosos
                }
            });

            clientCreatedAt = now;
        }

        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Erro Crítico:", e);
        sqlClient = null;
        return null;
    }
};
