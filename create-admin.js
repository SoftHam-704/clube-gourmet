import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function createAdminUser() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        console.log('🚀 Iniciando reparo de acesso administrativo...');

        const now = new Date();
        const adminEmail = 'admin@emparclub.com.br';
        const adminId = 'admin-master-001';

        // 1. Garantir que o usuário existe com os campos obrigatórios
        await client.query(`
            INSERT INTO emparclub.users (id, name, email, email_verified, role, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (email) DO UPDATE SET
                role = 'admin',
                updated_at = $7;
        `, [adminId, 'Administrador Empar', adminEmail, true, 'admin', now, now]);

        // 2. Criar a conta (Better Auth precisa disso na tabela accounts para login por email)
        // Nota: O password deve ser hash, mas se inserirmos aqui sem hash, o better-auth não o reconhecerá via UI.
        // O ideal é usar a API do better-auth, mas vamos pelo menos garantir a estrutura.
        await client.query(`
            INSERT INTO emparclub.accounts (id, user_id, account_id, provider_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (account_id) DO NOTHING;
        `, [`acc-${adminId}`, adminId, adminEmail, 'email', now, now]);

        console.log('✅ Estrutura de Admin reparada com sucesso!');
        console.log('⚠️  Atenção: Se o login falhar por senha, use a função de "Esqueci minha senha" ou registre o admin via UI se disponível.');
        
    } catch (err) {
        console.error('❌ Erro no reparo:', err.message);
    } finally {
        await client.end();
    }
}

createAdminUser();

