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
            
            // Forçamos o sslmode se não estiver na URL
            const finalUrl = connectionString.includes('sslmode=') 
                ? connectionString 
                : `${connectionString}${connectionString.includes('?') ? '&' : '?'}sslmode=require`;

            sqlClient = postgres(finalUrl, {
                ssl: 'require', // Força SSL modo 'require'
                max: 10,
                idle_timeout: 20,
                connect_timeout: 10,
            });
        }


        return drizzle(sqlClient);
    } catch (e) {
        console.error("❌ [DB] Falha na inicialização:", e);
        return null;
    }
};

