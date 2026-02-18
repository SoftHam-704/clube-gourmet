import pg from 'pg';
import { auth } from '../src/api/auth.js';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return res.status(401).json({ message: "Não autorizado" });

    const { user } = session;
    const client = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });

    try {
        if (req.method === 'GET') {
            // Get favorites
            const result = await client.query(`
                SELECT r.id, r.nome as name, r.imagem_url as image, r.categoria as cuisine, r.slug
                FROM emparclub.favoritos f
                JOIN emparclub.restaurantes r ON f.restaurante_id = r.id
                WHERE f.usuario_id = $1
            `, [user.id]);
            await client.end();
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            const { restaurantId, action } = req.body; // action: 'add' or 'remove'

            if (action === 'add') {
                await client.query(`
                    INSERT INTO emparclub.favoritos (usuario_id, restaurante_id)
                    VALUES ($1, $2)
                    ON CONFLICT DO NOTHING
                `, [user.id, restaurantId]);
            } else {
                await client.query(`
                    DELETE FROM emparclub.favoritos
                    WHERE usuario_id = $1 AND restaurante_id = $2
                `, [user.id, restaurantId]);
            }

            await client.end();
            return res.status(200).json({ success: true });
        }
    } catch (e) {
        console.error("ERRO_FAVORITOS:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(500).json({ message: e.message });
    }
}
