import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function listTables() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'emparclub';");
        console.log('Tabelas no schema emparclub:');
        console.table(res.rows);
    } catch (err) {
        console.error('Erro ao listar tabelas:', err.message);
    } finally {
        await client.end();
    }
}

listTables();
