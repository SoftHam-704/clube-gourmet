import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkCidadesColumns() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'emparclub' AND table_name = 'cidades' ORDER BY ordinal_position;");
        console.table(res.rows);
    } catch (err) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

checkCidadesColumns();
