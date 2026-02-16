import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkPlans() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM emparclub.plans;');
        console.log('Resultados da tabela emparclub.plans:');
        console.table(res.rows);
    } catch (err) {
        console.error('Erro ao consultar planos:', err.message);
    } finally {
        await client.end();
    }
}

checkPlans();
