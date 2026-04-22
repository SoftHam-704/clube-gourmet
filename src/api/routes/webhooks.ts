import { Hono } from 'hono';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { getDb } from '../../db/index.js';
import { subscriptions as subscriptionsTable, plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const webhookRoutes = new Hono();

webhookRoutes.post('/mercadopago', async (c) => {
    try {
        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            console.error('❌ [Webhook] MP_ACCESS_TOKEN não configurado');
            return c.json({ error: 'Configuração inválida' }, 500);
        }

        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        
        const body = await c.req.json();
        const { action, type, data } = body;

        console.log(`🔔 [Webhook MP] Recebido: type=${type} action=${action} data=${JSON.stringify(data)}`);

        // Aceita notificações de pagamento
        if (type === 'payment' || action?.startsWith('payment')) {
            const paymentId = data?.id || c.req.query('id');

            if (!paymentId) {
                console.warn('⚠️ [Webhook] Payment ID ausente');
                return c.json({ error: 'Missing payment ID' }, 400);
            }

            console.log(`🔍 [Webhook] Consultando pagamento #${paymentId}...`);

            const payment = new Payment(client);
            const paymentData = await payment.get({ id: paymentId });

            console.log(`📋 [Webhook] Status: ${paymentData.status} | External: ${paymentData.external_reference}`);

            if (paymentData.status === 'approved') {
                const externalReference = paymentData.external_reference; 
                if (!externalReference) {
                    console.warn('⚠️ [Webhook] Pagamento aprovado mas sem external_reference');
                    return c.json({ status: 'skipped', message: 'No external reference' });
                }

                const [userId, planId] = externalReference.split(':');
                
                if (!userId || !planId) {
                    console.error('❌ [Webhook] external_reference inválido:', externalReference);
                    return c.json({ error: 'Invalid external_reference format' }, 400);
                }

                const db = getDb(env);
                if (!db) {
                    console.error('❌ [Webhook] DB indisponível');
                    return c.json({ error: 'DB unreachable' }, 500);
                }

                // 1. Busca o plano para saber a duração
                const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
                const plan = planResult[0];
                const duration = plan?.duration_months || 1;

                const startDate = new Date();
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + duration);

                const subscriptionId = `sub_${userId}_${Date.now()}`;

                // 2. Insere ou atualiza assinatura no banco
                await db.insert(subscriptionsTable).values({
                    id: subscriptionId,
                    userId,
                    planId,
                    status: 'active',
                    startDate,
                    endDate,
                    externalSubscriptionId: paymentId.toString(),
                    mpPaymentId: paymentId.toString(),
                }).onConflictDoUpdate({
                    target: subscriptionsTable.userId,
                    set: {
                        planId,
                        status: 'active',
                        startDate,
                        endDate,
                        externalSubscriptionId: paymentId.toString(),
                        mpPaymentId: paymentId.toString(),
                    }
                });

                console.log(`✅ [Webhook] Assinatura ATIVADA!`);
                console.log(`   👤 User: ${userId}`);
                console.log(`   📋 Plano: ${planId} (${plan?.name || 'desconhecido'})`);
                console.log(`   💰 Payment: #${paymentId}`);
                console.log(`   📅 Válida: ${startDate.toISOString()} → ${endDate.toISOString()}`);
            } else {
                console.log(`ℹ️ [Webhook] Pagamento #${paymentId} não aprovado (status: ${paymentData.status})`);
            }
        }

        // O Mercado Pago exige status 200 para parar de re-enviar
        return c.json({ received: true }, 200);

    } catch (e: any) {
        console.error('❌ [Webhook] Erro fatal:', e.message);
        // Retorna 500 para que o MP tente novamente
        return c.json({ error: 'Internal Error' }, 500);
    }
});
