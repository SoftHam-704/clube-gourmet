import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkRestaurantesSchema() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'emparclub' AND table_name = 'restaurantes' ORDER BY ordinal_position;");
        console.log('Colunas da tabela emparclub.restaurantes:');
        res.rows.forEach(col => console.log(`- ${col.column_name} (${col.data_type})`));

        const indices = await client.query("SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'emparclub';");
        console.log('\nÍndices no schema emparclub:');
        indices.rows.forEach(idx => console.log(`- ${idx.indexname}: ${idx.indexdef}`));

    } catch (err) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

checkRestaurantesSchema();
