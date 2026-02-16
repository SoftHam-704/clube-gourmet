import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

// Configuração segura para evitar crash na inicialização
const poolConfig = connectionString ? {
    connectionString,
    ssl: false, // SaveInCloud compatibility
    connectionTimeoutMillis: 10000,
    max: 10,
} : {
    // Configuração dummy para não quebrar a inicialização se faltar a ENV
    connectionString: "postgres://user:pass@localhost:5432/db",
};

if (!connectionString) {
    console.error("❌ ERRO CRÍTICO: DATABASE_URL não definida! O app vai rodar em modo fallback.");
}

const pool = new pg.Pool(poolConfig as any);

// Prevenir crash do processo em erros inesperados no pool
pool.on('error', (err) => {
    console.error('❌ PG Pool Error:', err);
});

export const db = drizzle(pool);
