import pg from 'pg';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    let connectionString = process.env.DATABASE_URL;
    if (connectionString) {
        connectionString = connectionString.split('?')[0] + '?sslmode=disable';
    }

    const client = new pg.Pool({
        connectionString,
        ssl: false,
        connectionTimeoutMillis: 5000,
        max: 1
    });

    try {
        if (req.method === 'GET') {
            const result = await client.query('SELECT slug as id, nome as name, uf as state, ativo as active FROM emparclub.cidades ORDER BY nome ASC');
            await client.end();
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            const { id, name, state, active } = req.body;
            const query = `
                INSERT INTO emparclub.cidades (slug, nome, uf, ativo)
                VALUES ($1, $2, $3, $4)
                RETURNING slug as id, nome as name, uf as state, ativo as active
            `;
            const result = await client.query(query, [id, name, state, active]);
            await client.end();
            return res.status(201).json(result.rows[0]);
        }

        if (req.method === 'PUT') {
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            const { name, state, active } = req.body;

            const query = `
                UPDATE emparclub.cidades 
                SET nome = $1, uf = $2, ativo = $3 
                WHERE slug = $4 
                RETURNING slug as id, nome as name, uf as state, ativo as active
            `;
            const result = await client.query(query, [name, state, active, id]);
            await client.end();
            return res.status(200).json(result.rows[0]);
        }

        if (req.method === 'DELETE') {
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            await client.query('DELETE FROM emparclub.cidades WHERE slug = $1', [id]);
            await client.end();
            return res.status(204).end();
        }

        await client.end();
        return res.status(405).json({ error: "Method not allowed" });
    } catch (e) {
        console.error("ERRO_CIDADES:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(200).json({
            isError: true,
            message: e.message,
            stack: e.stack
        });
    }
}
