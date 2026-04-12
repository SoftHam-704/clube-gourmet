import { Hono } from 'hono';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const checkoutRoutes = new Hono();

checkoutRoutes.post('/create-preference', async (c) => {
    try {
        const env = c.env;
        const mpAccessToken = env.MP_ACCESS_TOKEN || "APP_USR-6725227787346850-021812-706f976a9117798365615879a9539304-2216508933";
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
        const authUrl = env.BETTER_AUTH_URL || "http://localhost:5174";

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
                    success: `${authUrl}/dashboard?payment=success`,
                    failure: `${authUrl}/plans?payment=failure`,
                    pending: `${authUrl}/dashboard?payment=pending`,
                },
                auto_return: 'approved',
                external_reference: `${userId}:${planId}`,
                notification_url: `${authUrl}/api/webhooks/mercadopago`,
            }
        });

        return c.json({
            id: result.id,
            init_point: result.init_point,
        });

    } catch (e: any) {
        console.error("🔥 MP Preference Error:", e.message);
        return c.json({ error: "Erro ao criar preferência", details: e.message }, 500);
    }
});
