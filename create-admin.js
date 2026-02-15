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
        console.log('Criando usuário administrador mestre...');

        // Inserindo o usuário admin na tabela users do Better Auth
        await client.query(`
      INSERT INTO emparclub.users (id, name, email, email_verified, role, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO UPDATE SET
        role = 'admin',
        password_hash = EXCLUDED.password_hash;
    `, [
            'admin-master-001',
            'Administrador Empar',
            'admin@emparclub.com.br',
            true,
            'admin',
            'admin123' // Em produção usaremos bcrypt, para o teste inicial usaremos texto plano/simples
        ]);

        console.log('Usuário admin criado: admin@emparclub.com.br / admin123');
    } catch (err) {
        console.error('Erro ao criar admin:', err.message);
    } finally {
        await client.end();
    }
}

createAdminUser();
