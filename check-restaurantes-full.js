import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkRestaurantesFull() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query("SELECT * FROM emparclub.restaurantes LIMIT 1;");
        console.log('Uma linha da tabela emparclub.restaurantes:');
        console.log(res.rows[0]);
    } catch (err) {
        console.error('Erro ao consultar restaurantes:', err.message);
    } finally {
        await client.end();
    }
}

checkRestaurantesFull();
