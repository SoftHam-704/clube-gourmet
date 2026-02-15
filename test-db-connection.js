import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function testConnection() {
    const client = new pg.Client(config);
    try {
        console.log('Tentando conectar ao banco de dados...');
        await client.connect();
        console.log('Conexão estabelecida com sucesso!');

        const res = await client.query('SELECT current_database(), current_schema(), version();');
        console.log('Informações do Banco:');
        console.table(res.rows);

        // Verificar se o schema emparclub existe
        const schemaRes = await client.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'emparclub';");
        if (schemaRes.rows.length > 0) {
            console.log("Schema 'emparclub' encontrado!");
        } else {
            console.log("Schema 'emparclub' NÃO encontrado.");
        }

    } catch (err) {
        console.error('Erro na conexão:', err.message);
    } finally {
        await client.end();
    }
}

testConnection();
