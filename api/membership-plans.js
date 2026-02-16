import pg from 'pg';

const FALLBACK_PLANS = [
    { id: "mensal", name: "Plano Mensal (CACHE_BREAKER_01)", price: 0.01, type: "individual", active: true }
];

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const connectionString = process.env.DATABASE_URL;

    try {
        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000,
        });
        await client.connect();
        const result = await client.query('SELECT * FROM emparclub.plans ORDER BY price ASC');
        await client.end();
        return res.status(200).json(result.rows.length > 0 ? result.rows : FALLBACK_PLANS);
    } catch (e) {
        return res.status(200).json({
            isError: true,
            error: e.message,
            env_db_set: !!connectionString,
            fallback: FALLBACK_PLANS
        });
    }
}
