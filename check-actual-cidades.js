import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkCidades() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM emparclub.cidades;');
        console.log('Resultados da tabela emparclub.cidades:');
        console.table(res.rows);
    } catch (err) {
        console.error('Erro ao consultar cidades:', err.message);
    } finally {
        await client.end();
    }
}

checkCidades();
