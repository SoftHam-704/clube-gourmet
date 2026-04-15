import pg from 'pg';
import crypto from 'crypto';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

/**
 * Hash de senha compatível com Better Auth v1.5
 * Better Auth usa scrypt internamente. Vamos aplicar o mesmo formato.
 */
async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16);
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            // Formato: salt:hash (ambos em hex)
            resolve(`${salt.toString('hex')}:${derivedKey.toString('hex')}`);
        });
    });
}

async function createAdminUser() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        console.log('🚀 Iniciando criação do admin via inserção direta...');

        const now = new Date();
        const adminEmail = 'admin@emparclub.com.br';
        const adminPassword = 'admin123';
        const adminId = 'admin-master-001';
        const accountId = `acc-${adminId}`;

        // 1. Limpar registros antigos corrompidos (sem hash)
        console.log('🧹 Limpando registros antigos...');
        await client.query(`DELETE FROM emparclub.sessions WHERE user_id = $1`, [adminId]);
        await client.query(`DELETE FROM emparclub.accounts WHERE user_id = $1`, [adminId]);
        await client.query(`DELETE FROM emparclub.users WHERE id = $1`, [adminId]);
        // Também limpar por email caso tenha IDs diferentes
        const existingUser = await client.query(`SELECT id FROM emparclub.users WHERE email = $1`, [adminEmail]);
        if (existingUser.rows.length > 0) {
            const oldId = existingUser.rows[0].id;
            console.log(`  ↳ Encontrou usuário existente com ID: ${oldId}, removendo...`);
            await client.query(`DELETE FROM emparclub.sessions WHERE user_id = $1`, [oldId]);
            await client.query(`DELETE FROM emparclub.accounts WHERE user_id = $1`, [oldId]);
            await client.query(`DELETE FROM emparclub.users WHERE id = $1`, [oldId]);
        }

        // 2. Hash da senha
        const hashedPassword = await hashPassword(adminPassword);
        console.log('🔑 Password hash gerado:', hashedPassword.substring(0, 20) + '...');

        // 3. Criar o usuário
        await client.query(`
            INSERT INTO emparclub.users (id, name, email, email_verified, role, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [adminId, 'Administrador Empar', adminEmail, true, 'admin', now, now]);
        console.log('✅ Usuário criado');

        // 4. Criar a conta com password hash (campo "password" na tabela accounts é onde Better Auth armazena)
        await client.query(`
            INSERT INTO emparclub.accounts (id, user_id, account_id, provider_id, password, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [accountId, adminId, adminId, 'credential', hashedPassword, now, now]);
        console.log('✅ Conta com credencial criada');

        // 5. Verificação
        const verify = await client.query(`
            SELECT u.id, u.email, u.role, a.provider_id, 
                   CASE WHEN a.password IS NOT NULL THEN 'SIM' ELSE 'NÃO' END as tem_senha
            FROM emparclub.users u
            JOIN emparclub.accounts a ON a.user_id = u.id
            WHERE u.email = $1
        `, [adminEmail]);
        
        console.log('\n📊 Verificação:');
        console.table(verify.rows);
        console.log('\n🎉 Admin pronto! Login: admin@emparclub.com.br / admin123');
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
        console.error(err.stack);
    } finally {
        await client.end();
    }
}

createAdminUser();
