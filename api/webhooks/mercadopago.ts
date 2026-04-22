import pg from 'pg';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log("===== WEBHOOK START =====");
    const { action, type, data } = req.body;
    console.log(`[W1] type=${type}, action=${action}, data_id=${data?.id}`);

    if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
        const paymentId = data?.id || req.query.id;

        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID missing' });
        }

        try {
            // Consultar pagamento via REST API
            console.log(`[W2] Consultando pagamento ${paymentId}...`);
            const mpAccessToken = process.env.MP_ACCESS_TOKEN;
            
            const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: { 'Authorization': `Bearer ${mpAccessToken}` }
            });

            if (!mpResponse.ok) {
                console.error(`[W2] MP retornou ${mpResponse.status}`);
                return res.status(200).json({ status: 'mp_error' });
            }

            const paymentData = await mpResponse.json();
            console.log(`[W2] Status: ${paymentData.status}, Ref: ${paymentData.external_reference}`);

            if (paymentData.status === 'approved') {
                const externalReference = paymentData.external_reference;
                if (!externalReference) return res.status(200).send('No external reference');

                const [userId, planId] = externalReference.split(':');
                console.log(`[W3] Ativando assinatura: user=${userId}, plan=${planId}`);

                const pool = new pg.Pool({
                    connectionString: process.env.DATABASE_URL,
                    ssl: false,
                    max: 2,
                    connectionTimeoutMillis: 5000,
                    options: '-c search_path=emparclub,public',
                });

                const planResult = await pool.query('SELECT duration_months FROM emparclub.plans WHERE id = $1', [planId]);
                const duration = planResult.rows[0]?.duration_months || 1;

                const startDate = new Date();
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + duration);

                await pool.query(`
                    INSERT INTO emparclub.subscriptions (user_id, plan_id, status, start_date, end_date, mp_payment_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT (user_id) DO UPDATE 
                    SET plan_id = EXCLUDED.plan_id,
                        status = EXCLUDED.status,
                        start_date = EXCLUDED.start_date,
                        end_date = EXCLUDED.end_date,
                        mp_payment_id = EXCLUDED.mp_payment_id
                `, [userId, planId, 'active', startDate, endDate, paymentId]);

                await pool.end();
                console.log(`✅ Assinatura ativada: user=${userId}, plan=${planId}`);
            }

            return res.status(200).json({ status: 'success' });
        } catch (error: any) {
            console.error('❌ Webhook Error:', error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(200).json({ received: true });
}
