import pg from 'pg';
import { auth } from '../src/api/auth.ts';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
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
            await client.end();
            return res.status(200).json(user);
        }

        if (req.method === 'PUT') {
            const { name, image } = req.body;

            // Update in Better Auth table
            await client.query(`
                UPDATE emparclub.users
                SET name = $1, image = $2, updated_at = NOW()
                WHERE id = $3
            `, [name, image, user.id]);

            await client.end();
            return res.status(200).json({ success: true });
        }
    } catch (e) {
        console.error("ERRO_PERFIL:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(500).json({ message: e.message });
    }
}
