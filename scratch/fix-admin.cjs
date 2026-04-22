// Recria o admin usando Better Auth internamente (via API)
// Primeiro limpa o admin quebrado, depois usa signUp para criar com hash correto
const pg = require('pg');

const connectionString = 'postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet';
const client = new pg.Client({ connectionString, ssl: false });

async function fixAdmin() {
    try {
        await client.connect();
        console.log('✅ Conectado ao banco');
        
        const adminEmail = 'admin@emparclub.com.br';
        const adminId = 'admin-master-001';
        
        // 1. Verificar o estado atual do admin
        console.log('\n📋 Estado atual:');
        const current = await client.query(`
            SELECT u.id, u.email, u.role, a.provider_id, 
                   LEFT(a.password, 30) as hash_preview,
                   LENGTH(a.password) as hash_length
            FROM emparclub.users u 
            LEFT JOIN emparclub.accounts a ON a.user_id = u.id 
            WHERE u.email = $1
        `, [adminEmail]);
        console.table(current.rows);
        
        // 2. Verificar o hash do test@example.com (que TEM hash válido do Better Auth)
        console.log('\n📋 Hash do test@example.com (referência Better Auth):');
        const testUser = await client.query(`
            SELECT u.id, u.email, a.provider_id,
                   LEFT(a.password, 50) as hash_preview,
                   LENGTH(a.password) as hash_length
            FROM emparclub.users u 
            LEFT JOIN emparclub.accounts a ON a.user_id = u.id 
            WHERE u.email = 'test@example.com'
        `);
        console.table(testUser.rows);
        
        // 3. Remover o admin criado manualmente (hash incompatível)
        console.log('\n🧹 Removendo admin com hash manual...');
        await client.query(`DELETE FROM emparclub.sessions WHERE user_id = $1`, [adminId]);
        await client.query(`DELETE FROM emparclub.accounts WHERE user_id = $1`, [adminId]);
        await client.query(`DELETE FROM emparclub.users WHERE id = $1`, [adminId]);
        console.log('✅ Admin removido');
        
        // 4. Verificar restante
        const remaining = await client.query(`SELECT id, email, role FROM emparclub.users`);
        console.log('\n📋 Usuários restantes:');
        console.table(remaining.rows);
        
        console.log('\n⚠️  PRÓXIMO PASSO: Deploy as mudanças para a Vercel e acessar:');
        console.log('   https://www.clubempar.com.br/api/auth/setup-admin?password=admin123');
        console.log('   Isso vai criar o admin com hash correto via Better Auth.');
        
    } catch (e) {
        console.error('❌ Erro:', e.message);
    } finally {
        await client.end();
    }
}

fixAdmin();
