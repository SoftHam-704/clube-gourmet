import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkTables() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'emparclub'
      ORDER BY table_name;
    `);
        console.log('Tabelas no schema emparclub:');
        console.table(res.rows);
    } catch (err) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

checkTables();
