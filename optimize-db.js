import pg from 'pg';

const config = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

async function optimizeDB() {
    const client = new pg.Client(config);
    try {
        await client.connect();
        console.log('Otimizando banco de dados...');

        // 1. Índices para Cidades
        await client.query('CREATE INDEX IF NOT EXISTS idx_cidades_slug ON emparclub.cidades(slug);');
        await client.query('CREATE INDEX IF NOT EXISTS idx_cidades_nome ON emparclub.cidades(nome);');
        await client.query('CREATE INDEX IF NOT EXISTS idx_cidades_ativo ON emparclub.cidades(ativo);');
        console.log('Índices de cidades criados/verificados.');

        // 2. Coluna de Cidade em Restaurantes (se não existir)
        const checkCol = await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'emparclub' AND table_name = 'restaurantes' AND column_name = 'cidade_slug';");
        if (checkCol.rows.length === 0) {
            await client.query('ALTER TABLE emparclub.restaurantes ADD COLUMN cidade_slug character varying(255);');
            console.log('Coluna cidade_slug adicionada a restaurantes.');
        }

        // 3. Índices para Restaurantes
        await client.query('CREATE INDEX IF NOT EXISTS idx_restaurantes_slug ON emparclub.restaurantes(slug);');
        await client.query('CREATE INDEX IF NOT EXISTS idx_restaurantes_cidade ON emparclub.restaurantes(cidade_slug);');
        await client.query('CREATE INDEX IF NOT EXISTS idx_restaurantes_ativo ON emparclub.restaurantes(ativo);');
        console.log('Índices de restaurantes criados/verificados.');

        console.log('Banco de dados otimizado com sucesso!');
    } catch (err) {
        console.error('Erro na otimização:', err.message);
    } finally {
        await client.end();
    }
}

optimizeDB();
