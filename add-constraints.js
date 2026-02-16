import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function addConstraints() {
    const client = new pg.Client(config);
    try {
        await client.connect();

        // Cidades slug único
        await client.query('ALTER TABLE emparclub.cidades ADD CONSTRAINT unique_cidade_slug UNIQUE (slug);');

        // Restaurantes slug único
        await client.query('ALTER TABLE emparclub.restaurantes ADD CONSTRAINT unique_restaurante_slug UNIQUE (slug);');

        console.log('Constraints de unicidade adicionadas.');
    } catch (err) {
        console.error('Erro (provavelmente constraint já existe ou dados duplicados):', err.message);
    } finally {
        await client.end();
    }
}

addConstraints();
