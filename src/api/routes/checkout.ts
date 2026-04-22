import { Hono } from 'hono';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const checkoutRoutes = new Hono();

const PRODUCTION_URL = 'https://www.clubempar.com.br';

// Rota de diagnóstico para verificar se o checkout responde
checkoutRoutes.get('/test', (c) => {
    return c.json({ message: 'Checkout route is alive!' });
});

checkoutRoutes.post('/create-preference', async (c) => {
    console.log("🛠️ [STEP 1] Recebendo body...");
    
    let body: any;
    try {
        body = await c.req.json();
    } catch (e: any) {
        console.error("❌ Erro ao parsear body:", e.message);
        return c.json({ error: "Body inválido" }, 400);
    }

    const { planId, userId, email } = body;
    console.log(`🛠️ [STEP 2] Dados: plan=${planId}, user=${userId}, email=${email}`);

    if (!userId || !email) {
        return c.json({ error: "Sessão expirada" }, 401);
    }

    // STEP 3: Tentar acessar o banco
    console.log("🛠️ [STEP 3] Conectando ao banco...");
    let plan: any;
    try {
        const env = c.env as any;
        const db = getDb(env);
        if (!db) {
            console.error("❌ DB null");
            return c.json({ error: "Banco de dados indisponível" }, 500);
        }

        console.log("🛠️ [STEP 3b] Executando query...");
        const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
        plan = planResult[0];
        console.log(`🛠️ [STEP 3c] Plano encontrado: ${plan?.name || 'NÃO ENCONTRADO'}`);

        if (!plan) {
            return c.json({ error: "Plano não encontrado" }, 404);
        }
    } catch (e: any) {
        console.error("❌ [STEP 3] Erro no banco:", e.message);
        return c.json({ error: "Erro ao consultar plano", details: e.message }, 500);
    }

    // STEP 4: Chamar API do Mercado Pago
    console.log("🛠️ [STEP 4] Chamando Mercado Pago API...");
    try {
        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            console.error("❌ MP_ACCESS_TOKEN ausente");
            return c.json({ error: "Token do MP não configurado" }, 500);
        }

        const mpBody = {
            items: [{
                id: plan.id,
                title: `Club Empar - ${plan.name}`,
                quantity: 1,
                unit_price: Number(plan.price),
                currency_id: 'BRL',
            }],
            payer: { email },
            back_urls: {
                success: `${PRODUCTION_URL}/dashboard?payment=success`,
                failure: `${PRODUCTION_URL}/plans?payment=failure`,
                pending: `${PRODUCTION_URL}/dashboard?payment=pending`,
            },
            auto_return: 'approved',
            external_reference: `${userId}:${planId}`,
            notification_url: `${PRODUCTION_URL}/api/webhooks/mercadopago`,
        };

        console.log("🛠️ [STEP 4b] Enviando para https://api.mercadopago.com...");

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${mpAccessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mpBody),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        console.log(`🛠️ [STEP 4c] MP respondeu com status: ${mpResponse.status}`);

        if (!mpResponse.ok) {
            const errorData = await mpResponse.text();
            console.error("❌ [STEP 4] Erro MP:", errorData);
            return c.json({ error: "Erro no Mercado Pago", details: errorData }, 500);
        }

        const result = await mpResponse.json();
        console.log(`✅ [STEP 5] Preferência criada: ${result.id}`);

        return c.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        if (e.name === 'AbortError') {
            console.error("❌ [STEP 4] Timeout ao chamar Mercado Pago (8s)");
            return c.json({ error: "Timeout ao conectar com Mercado Pago" }, 504);
        }
        console.error("🔥 [STEP 4] Erro fatal:", e.message);
        return c.json({ error: "Erro interno", details: e.message }, 500);
    }
});
