import pg from 'pg';
import { auth } from '../src/api/auth.ts';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Verify session
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
        return res.status(401).json({ message: "Não autorizado" });
    }

    const { user } = session;

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
        // 1. Get user details from the business table (mapping by email)
        // Note: Better Auth uses 'users' table, business logic might use 'usuarios' or the new 'users' table.
        // We'll check both or assume we are building on the new 'users' table.
        // For now, let's try to find them in 'users' and enrich with subscription info.

        // Let's also check the 'subscriptions' table we saw earlier
        const subResult = await client.query(`
            SELECT s.*, p.name as plan_name, p.price as plan_price
            FROM emparclub.subscriptions s
            JOIN emparclub.plans p ON s.plan_id = p.id
            WHERE s.user_id = $1 AND (s.status = 'active' OR s.status = 'paid')
            ORDER BY s.created_at DESC LIMIT 1
        `, [user.id]);

        const subscription = subResult.rows[0] || null;

        // 2. Get Recent Redemptions
        const redemptionsResult = await client.query(`
            SELECT b.*, r.nome as restaurant_name, r.imagem_url, r.categoria as cuisine
            FROM emparclub.beneficios_resgatados b
            JOIN emparclub.restaurantes r ON b.restaurante_id = r.id
            WHERE b.usuario_id = (SELECT id FROM emparclub.usuarios WHERE email = $1 LIMIT 1)
               OR b.usuario_id = (SELECT CAST(id AS INTEGER) FROM emparclub.users WHERE email = $1 LIMIT 1) -- Fallback if using users table with int id
            ORDER BY b.data_resgate DESC
            LIMIT 5
        `, [user.email]);

        // 3. Current active/pending QR Codes
        const activeQrResult = await client.query(`
            SELECT b.*, r.nome as restaurant_name
            FROM emparclub.beneficios_resgatados b
            JOIN emparclub.restaurantes r ON b.restaurante_id = r.id
            WHERE (b.usuario_id = (SELECT id FROM emparclub.usuarios WHERE email = $1 LIMIT 1))
              AND b.utilizado = false
              AND b.data_validade > NOW()
            ORDER BY b.data_resgate DESC
            LIMIT 1
        `, [user.email]);

        await client.end();

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                subscription: subscription ? {
                    status: subscription.status,
                    plan: subscription.plan_name,
                    price: subscription.plan_price,
                    expiresAt: subscription.end_date
                } : null
            },
            stats: {
                totalResgates: redemptionsResult.rows.length,
                economizado: redemptionsResult.rows.length * 50 // Estimativa de R$ 50 economizados por resgate
            },
            activeQr: activeQrResult.rows[0] || null,
            history: redemptionsResult.rows.map(r => ({
                id: r.id,
                restaurant: r.restaurant_name,
                cuisine: r.cuisine,
                date: new Date(r.data_resgate).toLocaleDateString('pt-BR'),
                status: r.utilizado ? 'Utilizado' : 'Pendente',
                image: r.imagem_url
            }))
        });

    } catch (e) {
        console.error("ERRO_USER_DASHBOARD:", e.message);
        try { await client.end(); } catch (err) { }
        return res.status(500).json({
            isError: true,
            message: e.message
        });
    }
}
