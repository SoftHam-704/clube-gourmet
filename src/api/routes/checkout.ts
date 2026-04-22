import { Hono } from 'hono';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';
import { authenticatedOnly } from '../middleware/auth.js';

export const checkoutRoutes = new Hono();

// URL pública para o Mercado Pago (webhook e redirecionamentos)
const PRODUCTION_URL = 'https://www.clubempar.com.br';

checkoutRoutes.post('/create-preference', authenticatedOnly, async (c) => {
    try {
        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            return c.json({ error: "MP_ACCESS_TOKEN não configurado" }, 500);
        }

        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        
        const { planId, userId, email } = await c.req.json();

        if (!planId || !userId || !email) {
            return c.json({ error: "Parâmetros faltando (planId, userId, email)" }, 400);
        }

        const db = getDb(env);
        if (!db) return c.json({ error: "Database unreachable" }, 500);

        // Busca o plano no banco
        const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
        const plan = planResult[0];

        if (!plan) {
            return c.json({ error: "Plano não encontrado no banco de dados" }, 404);
        }

        const preference = new Preference(client);

        // Usa a URL da request em dev, mas sempre produção para notification_url
        const isLocal = c.req.url.includes('localhost');
        const siteUrl = isLocal 
            ? new URL(c.req.url).origin 
            : PRODUCTION_URL;

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: plan.id,
                        title: `Club Empar Gourmet - ${plan.name}`,
                        quantity: 1,
                        unit_price: Number(plan.price),
                        currency_id: 'BRL',
                    }
                ],
                payer: {
                    email: email,
                },
                back_urls: {
                    success: `${siteUrl}/dashboard?payment=success`,
                    failure: `${siteUrl}/plans?payment=failure`,
                    pending: `${siteUrl}/dashboard?payment=pending`,
                },
                auto_return: 'approved',
                external_reference: `${userId}:${planId}`,
                // ⚠️ SEMPRE usa URL de produção para o webhook!
                // O Mercado Pago precisa acessar via internet pública.
                notification_url: `${PRODUCTION_URL}/api/webhooks/mercadopago`,
            }
        });

        console.log(`✅ [Checkout] Preferência criada: ${result.id} para user=${userId} plan=${planId}`);

        return c.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        console.error("🔥 MP Preference Error:", e.message);
        return c.json({ error: "Erro ao criar preferência", details: e.message }, 500);
    }
});
