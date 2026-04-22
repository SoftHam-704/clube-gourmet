import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function listSchemas() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        const res = await client.query(`
            SELECT schema_name 
            FROM information_schema.schemata
            WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'
            ORDER BY schema_name;
        `);
        console.log('Schemas no banco de dados:');
        console.table(res.rows);
    } catch (err) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

listSchemas();
