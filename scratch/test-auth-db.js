// Teste de conexão ao banco para verificar se o schema emparclub está acessível
const pg = require('pg');

const connectionString = 'postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet';

const client = new pg.Client({ connectionString, ssl: false });

async function test() {
    try {
        console.log('🔌 Conectando...');
        const start = Date.now();
        
        await client.connect();
        console.log(`✅ Conectado (${Date.now() - start}ms)`);
        
        // 1. Teste básico
        await client.query('SELECT 1');
        console.log(`✅ SELECT 1 OK (${Date.now() - start}ms)`);
        
        // 2. Teste do schema emparclub
        const users = await client.query('SELECT id, email, role FROM emparclub.users LIMIT 5');
        console.log(`✅ Users encontrados:`, users.rows.length);
        console.table(users.rows);
        
        // 3. Verificar admin
        const admin = await client.query(`
            SELECT u.id, u.email, u.role, a.provider_id, 
                CASE WHEN a.password IS NOT NULL THEN 'SIM' ELSE 'NAO' END as tem_hash
            FROM emparclub.users u 
            LEFT JOIN emparclub.accounts a ON a.user_id = u.id 
            WHERE u.email = 'admin@emparclub.com.br'
        `);
        console.log('\n📊 Admin:');
        console.table(admin.rows);
        
        // 4. Verificar sessões existentes
        const sessions = await client.query('SELECT id, user_id, expires_at FROM emparclub.sessions LIMIT 5');
        console.log(`\n📋 Sessões (${sessions.rows.length}):`);
        console.table(sessions.rows);
        
    } catch (e) {
        console.error('❌ Erro:', e.message);
    } finally {
        await client.end();
    }
}

test();
