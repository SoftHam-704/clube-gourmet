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
            const result = await client.query('SELECT * FROM emparclub.cities ORDER BY name ASC');
            await client.end();
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            const { id, name, state, active, image } = req.body;
            const query = `
                INSERT INTO emparclub.cities (id, name, state, active, image)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const result = await client.query(query, [id, name, state, active, image]);
            await client.end();
            return res.status(201).json(result.rows[0]);
        }

        if (req.method === 'PUT') {
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            const { createdAt, id: _id, ...data } = req.body;

            const keys = Object.keys(data);
            const values = Object.values(data);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

            const query = `UPDATE emparclub.cities SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            const result = await client.query(query, [...values, id]);
            await client.end();
            return res.status(200).json(result.rows[0]);
        }

        if (req.method === 'DELETE') {
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            await client.query('DELETE FROM emparclub.cities WHERE id = $1', [id]);
            await client.end();
            return res.status(204).end();
        }

        await client.end();
        return res.status(405).json({ error: "Method not allowed" });
    } catch (e) {
        console.error("ERRO_CIDADES:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(500).json({ error: e.message });
    }
}
