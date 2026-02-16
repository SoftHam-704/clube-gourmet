import pg from 'pg';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    let connectionString = process.env.DATABASE_URL;
    if (connectionString && !connectionString.includes('sslmode=')) {
        connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=disable';
    }

    const client = new pg.Pool({
        connectionString,
        ssl: false,
        connectionTimeoutMillis: 5000,
        max: 1
    });

    try {
        // 1. Total Members
        const membersCount = await client.query('SELECT COUNT(*) FROM emparclub.usuarios');

        // 2. Active Cities
        const citiesCount = await client.query('SELECT COUNT(*) FROM emparclub.cidades WHERE ativo = true');

        // 3. Vouchers Redeemed
        const vouchersCount = await client.query('SELECT COUNT(*) FROM emparclub.beneficios_resgatados');

        // 4. Monthly Revenue (Estimated from active subscriptions)
        // Note: Using 'plans' table for prices
        const revenueResult = await client.query(`
            SELECT SUM(CAST(p.price AS DECIMAL)) as total 
            FROM emparclub.subscriptions s
            JOIN emparclub.plans p ON s.plan_id = p.id
            WHERE s.status = 'active' OR s.status = 'paid'
        `);

        // 5. Recent Members
        const recentMembers = await client.query(`
            SELECT u.nome as name, u.email, u.data_criacao as date, p.name as plan
            FROM emparclub.usuarios u
            LEFT JOIN emparclub.plans p ON CAST(u.plano_id AS TEXT) = p.id
            ORDER BY u.data_criacao DESC
            LIMIT 4
        `);

        await client.end();

        return res.status(200).json({
            stats: {
                totalMembers: parseInt(membersCount.rows[0].count) || 0,
                activeCities: parseInt(citiesCount.rows[0].count) || 0,
                vouchersRedeemed: parseInt(vouchersCount.rows[0].count) || 0,
                monthlyRevenue: parseFloat(revenueResult.rows[0].total) || 0
            },
            recentMembers: recentMembers.rows.map(m => ({
                ...m,
                date: new Date(m.date).toLocaleString('pt-BR')
            }))
        });

    } catch (e) {
        console.error("ERRO_ADMIN_STATS:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(500).json({
            isError: true,
            message: e.message
        });
    }
}
