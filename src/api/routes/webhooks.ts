import { Hono } from 'hono';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { getDb } from '../../db/index.js';
import { subscriptions as subscriptionsTable, plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const webhookRoutes = new Hono();

webhookRoutes.post('/mercadopago', async (c) => {
    try {
        const env = c.env;
        const mpAccessToken = env.MP_ACCESS_TOKEN || "APP_USR-6725227787346850-021812-706f976a9117798365615879a9539304-2216508933";
        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        
        const body = await c.req.json();
        const { action, type, data } = body;

        console.log(`🔔 Webhook recebido: ${type} - ${action}`);

        if (type === 'payment' || action?.startsWith('payment')) {
            const paymentId = data?.id || c.req.query('id');

            if (!paymentId) return c.json({ error: "Missing ID" }, 400);

            const payment = new Payment(client);
            const paymentData = await payment.get({ id: paymentId });

            if (paymentData.status === 'approved') {
                const externalReference = paymentData.external_reference; 
                if (!externalReference) return c.json({ status: "skipped", message: "No external reference" });

                const [userId, planId] = externalReference.split(':');
                const db = getDb(env);
                if (!db) return c.json({ error: "DB unreachable" }, 500);

                // 1. Busca o plano para saber a duração
                const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
                const plan = planResult[0];
                const duration = plan?.duration_months || 1;

                const startDate = new Date();
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + duration);

                // 2. Atualiza assinatura no banco
                // Nota: Usamos external_reference como userId:planId
                await db.insert(subscriptionsTable).values({
                    id: `sub_${userId}_${Date.now()}`, // Gerando um ID único para assinatura
                    userId,
                    planId,
                    status: 'active',
                    startDate,
                    endDate,
                    externalSubscriptionId: paymentId.toString(), // Guardando o ID do pagamento MP
                }).onConflictDoUpdate({
                    target: subscriptionsTable.userId,
                    set: {
                        planId,
                        status: 'active',
                        startDate,
                        endDate,
                        externalSubscriptionId: paymentId.toString()
                    }
                });

                console.log(`✅ Assinatura ativada via Webhook para ${userId}`);
            }
        }

        return c.json({ received: true }, 200);

    } catch (e: any) {
        console.error("❌ MP Webhook Error:", e.message);
        return c.json({ error: "Internal Error" }, 500);
    }
});
