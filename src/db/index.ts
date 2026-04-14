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
            console.log("🔌 [DB] Criando novo cliente Postgres-JS...");
            sqlClient = postgres(connectionString, {
                ssl: { rejectUnauthorized: false },
                max: 1, // Importante para Serverless (Vercel)
                idle_timeout: 20,
                connect_timeout: 15,
            });
        }

        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Falha na inicialização:", e);
        return null;
    }
};

