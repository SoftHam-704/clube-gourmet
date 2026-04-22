import { Hono } from 'hono';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const checkoutRoutes = new Hono();

const PRODUCTION_URL = 'https://www.clubempar.com.br';

checkoutRoutes.post('/create-preference', async (c) => {
    console.log("🛠️ [Backend] Iniciando requisição de checkout (Fetch Edition)...");
    
    try {
        const body = await c.req.json();
        const { planId, userId, email } = body;

        console.log(`📋 [Backend] Dados: plan=${planId}, user=${userId}, email=${email}`);

        if (!userId || !email || email === 'undefined') {
             return c.json({ error: "Sessão expirada. Faça login novamente." }, 401);
        }

        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            console.error("❌ [Backend] MP_ACCESS_TOKEN ausente");
            return c.json({ error: "Configuração do Mercado Pago ausente." }, 500);
        }

        const db = getDb(env);
        if (!db) {
            console.error("❌ [Backend] Falha ao conectar no banco");
            return c.json({ error: "Erro de banco de dados" }, 500);
        }

        const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
        const plan = planResult[0];

        if (!plan) {
            console.error(`❌ [Backend] Plano inválido: ${planId}`);
            return c.json({ error: "Plano inválido" }, 404);
        }

        console.log(`📡 [Backend] Chamando API REST do Mercado Pago...`);

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${mpAccessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        id: plan.id,
                        title: `Club Empar Gourmet - ${plan.name}`,
                        quantity: 1,
                        unit_price: Number(plan.price),
                        currency_id: 'BRL',
                    }
                ],
                payer: { email },
                back_urls: {
                    success: `${PRODUCTION_URL}/dashboard?payment=success`,
                    failure: `${PRODUCTION_URL}/plans?payment=failure`,
                    pending: `${PRODUCTION_URL}/dashboard?payment=pending`,
                },
                auto_return: 'approved',
                external_reference: `${userId}:${planId}`,
                notification_url: `${PRODUCTION_URL}/api/webhooks/mercadopago`,
            })
        });

        if (!mpResponse.ok) {
            const errorData = await mpResponse.json();
            console.error("❌ [Backend] Erro no Mercado Pago:", errorData);
            return c.json({ error: "Erro ao gerar pagamento no Mercado Pago", details: errorData }, 500);
        }

        const result = await mpResponse.json();
        console.log(`✅ [Backend] Preferência gerada: ${result.id}`);

        return c.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        console.error("🔥 [Backend] Erro fatal:", e.message);
        return c.json({ error: "Erro interno", details: e.message }, 500);
    }
});
