import { MercadoPagoConfig, Payment } from 'mercadopago';
import pg from 'pg';

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-6725227787346850-021812-706f976a9117798365615879a9539304-2216508933';
const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // O Mercado Pago envia o tipo de recurso e o ID no body ou query
    const { action, type, data } = req.body;

    // Queremos apenas notificações de pagamento aprovado
    if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
        const paymentId = data?.id || req.query.id;

        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID missing' });
        }

        try {
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: paymentId });

            if (paymentData.status === 'approved') {
                const externalReference = paymentData.external_reference; // Esperado "userId:planId"
                if (!externalReference) return res.status(200).send('No external reference');

                const [userId, planId] = externalReference.split(':');

                // Conectar ao banco para atualizar a assinatura
                const pool = new pg.Pool({
                    connectionString: process.env.DATABASE_URL,
                    ssl: false // Mantendo o padrão do projeto
                });

                // 1. Verificar se o plano existe para saber a duração
                const planResult = await pool.query('SELECT duration_months FROM emparclub.plans WHERE id = $1', [planId]);
                const duration = planResult.rows[0]?.duration_months || 1;

                const startDate = new Date();
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + duration);

                // 2. Inserir ou atualizar assinatura
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
                console.log(`✅ Assinatura ativada para o usuário ${userId} (Plano: ${planId})`);
            }

            // O Mercado Pago exige um status 200 ou 201 para parar de enviar a notificação
            return res.status(200).json({ status: 'success' });
        } catch (error: any) {
            console.error('❌ Webhook Error:', error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(200).json({ received: true });
}
