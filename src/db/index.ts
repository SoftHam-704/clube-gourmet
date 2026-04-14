import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let sqlClient: postgres.Sql | null = null;

export const getDb = (env?: any) => {
    const connectionString = env?.DATABASE_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
        console.error("❌ [DB] DATABASE_URL não encontrada.");
        return null;
    }

    try {
        if (!sqlClient) {
            console.log("🔌 [DB] Iniciando nova conexão Postgres...");
            
            sqlClient = postgres(connectionString, {
                ssl: 'prefer', // Tenta com SSL, se o banco não aceitar, vai sem (mais compatível)
                max: 10,
                connect_timeout: 15,
                idle_timeout: 20,
            });
            
            // Teste rápido silencioso
            sqlClient`SELECT 1`.then(() => console.log("✅ [DB] Conexão Teste OK")).catch(e => console.error("❌ [DB] Conexão Teste Falhou:", e.message));
        }

        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Erro Crítico:", e);
        return null;
    }
};
