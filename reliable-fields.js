import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function checkRestaurantesFields() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        const res = await client.query("SELECT * FROM emparclub.restaurantes LIMIT 0;");
        console.log('Campos detectados:', res.fields.map(f => f.name));
    } catch (err) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

checkRestaurantesFields();
