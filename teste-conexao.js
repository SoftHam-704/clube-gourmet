import pg from 'pg';
import 'dotenv/config';

async function test() {
    console.log("🔍 Tentando conectar na SaveInCloud...");
    console.log("Endereço:", process.env.DATABASE_URL?.split('@')[1]); // Mostra o host sem a senha

    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false,
        connectionTimeoutMillis: 5000,
    });

    try {
        const client = await pool.connect();
        console.log("✅ Conexão estabelecida com sucesso!");

        const res = await client.query('SELECT * FROM emparclub.plans WHERE active = true');
        console.log(`📊 Planos encontrados no banco: ${res.rows.length}`);

        if (res.rows.length > 0) {
            res.rows.forEach(p => console.log(` - [${p.type}] ${p.name}: R$ ${p.price}`));
        } else {
            console.log("⚠️ O banco está conectado, mas a tabela de planos está VAZIA.");
        }

        client.release();
    } catch (err) {
        console.error("❌ ERRO DE CONEXÃO:");
        console.error("Mensagem:", err.message);
        console.error("Código:", err.code);
    } finally {
        await pool.end();
    }
}

test();
