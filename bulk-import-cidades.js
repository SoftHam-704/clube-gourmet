import XLSX from 'xlsx';
import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

// Função para gerar slug amigável
function generateSlug(nome, uf) {
    return nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-')     // Substitui caracteres especiais por -
        .replace(/(^-|-$)+/g, '')        // Remove hífens no início e fim
        + '-' + uf.toLowerCase();
}

async function runImport() {
    const client = new pg.Client(dbConfig);

    try {
        console.log('Lendo arquivo Excel...');
        const workbook = XLSX.readFile('E:/Sistemas_ia/SalesMasters/data/cidades.xlsx');
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet); // Usando objeto para mapear nomes das colunas

        console.log(`Total de registros encontrados: ${rows.length}`);

        await client.connect();
        console.log('Conectado ao PostgreSQL.');

        // Garantir que a tabela existe
        await client.query(`
      CREATE TABLE IF NOT EXISTS emparclub.cidades (
        id_cidade INTEGER PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        uf CHAR(2) NOT NULL,
        cod_ibge INTEGER,
        slug VARCHAR(150),
        ativo BOOLEAN DEFAULT FALSE,
        data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

        const BATCH_SIZE = 1000;
        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
            const batch = rows.slice(i, i + BATCH_SIZE);
            console.log(`Enviando lote ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} registros)...`);

            // Construir a query de insert múltiplo
            const values = [];
            const placeholders = [];

            batch.forEach((row, idx) => {
                const offset = idx * 5;
                const slug = generateSlug(row.NOME, row.UF);

                values.push(row.CODIGO, row.NOME, row.UF, row.CODMUN, slug);
                placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`);
            });

            const sql = `
        INSERT INTO emparclub.cidades (id_cidade, nome, uf, cod_ibge, slug)
        VALUES ${placeholders.join(', ')}
        ON CONFLICT (id_cidade) DO UPDATE SET
          nome = EXCLUDED.nome,
          uf = EXCLUDED.uf,
          cod_ibge = EXCLUDED.cod_ibge,
          slug = EXCLUDED.slug;
      `;

            await client.query(sql, values);
        }

        console.log('Importação concluída com sucesso!');

        // Ativar Campo Grande como padrão
        await client.query("UPDATE emparclub.cidades SET ativo = TRUE WHERE nome = 'CAMPO GRANDE' AND uf = 'MS'");
        console.log('Campo Grande ativada como cidade padrão.');

    } catch (error) {
        console.error('ERRO NA IMPORTAÇÃO:', error.message);
    } finally {
        await client.end();
    }
}

runImport();
