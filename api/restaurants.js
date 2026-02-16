import pg from 'pg';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    let connectionString = process.env.DATABASE_URL;
    if (connectionString && !connectionString.includes('sslmode=')) {
        connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=disable';
    }

    const client = new pg.Client({
        connectionString,
        ssl: false,
        connectionTimeoutMillis: 5000,
    });

    try {
        if (req.method === 'GET') {
            await client.connect();
            const result = await client.query(`
                SELECT 
                    r.id, r.nome as name, r.categoria as cuisine, 
                    r.descricao as description, r.endereco as address, 
                    r.imagem_url as image, r.slug, r.destaque as highlighted, 
                    r.ativo as active, r.cidade_slug as city_slug,
                    c.nome as city_name
                FROM emparclub.restaurantes r
                LEFT JOIN emparclub.cidades c ON r.cidade_slug = c.slug
                ORDER BY r.nome ASC
            `);
            await client.end();
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            await client.connect();
            const { name, cuisine, description, address, image, slug, highlighted, active, city_slug } = req.body;
            const query = `
                INSERT INTO emparclub.restaurantes 
                (nome, categoria, descricao, endereco, imagem_url, slug, destaque, ativo, cidade_slug)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id, nome as name, slug
            `;
            const result = await client.query(query, [name, cuisine, description, address, image, slug, highlighted, active, city_slug]);
            await client.end();
            return res.status(201).json(result.rows[0]);
        }

        if (req.method === 'PUT') {
            await client.connect();
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            const { name, cuisine, description, address, image, slug, highlighted, active, city_slug } = req.body;

            const query = `
                UPDATE emparclub.restaurantes 
                SET nome = $1, categoria = $2, descricao = $3, endereco = $4, 
                    imagem_url = $5, slug = $6, destaque = $7, ativo = $8, cidade_slug = $9
                WHERE id = $10 
                RETURNING id, nome as name, slug
            `;
            const result = await client.query(query, [name, cuisine, description, address, image, slug, highlighted, active, city_slug, id]);
            await client.end();
            return res.status(200).json(result.rows[0]);
        }

        if (req.method === 'DELETE') {
            await client.connect();
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            await client.query('DELETE FROM emparclub.restaurantes WHERE id = $1', [id]);
            await client.end();
            return res.status(204).end();
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (e) {
        console.error("ERRO_RESTAURANTES:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(200).json({
            isError: true,
            message: e.message
        });
    }
}
