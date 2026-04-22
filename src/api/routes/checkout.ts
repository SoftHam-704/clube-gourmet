import { Hono } from 'hono';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const checkoutRoutes = new Hono();

const PRODUCTION_URL = 'https://www.clubempar.com.br';

checkoutRoutes.get('/test', (c) => {
    return c.json({ message: 'Checkout alive!' });
});

checkoutRoutes.post('/create-preference', async (c) => {
    console.log("===== CHECKOUT START =====");
    
    // STEP 1: Parse body - Usar método alternativo para evitar hang
    let planId: string, userId: string, email: string;
    try {
        // Tentar ler o body de forma alternativa
        const rawBody = await c.req.text();
        console.log(`[S1] Raw body length: ${rawBody.length}`);
        
        if (!rawBody || rawBody.length === 0) {
            console.error("[S1] Body VAZIO!");
            return c.json({ error: "Body vazio" }, 400);
        }

        const body = JSON.parse(rawBody);
        planId = body.planId;
        userId = body.userId;
        email = body.email;
        console.log(`[S1] OK: plan=${planId}, user=${userId}, email=${email}`);
    } catch (e: any) {
        console.error("[S1] FAIL:", e.message);
        return c.json({ error: "Body inválido: " + e.message }, 400);
    }

    if (!userId || !email) {
        return c.json({ error: "Login necessário" }, 401);
    }

    // STEP 2: Get plan from DB
    let plan: any;
    try {
        console.log("[S2] Getting DB...");
        const env = c.env as any;
        const db = getDb(env);
        
        if (!db) {
            return c.json({ error: "DB null" }, 500);
        }

        const dbPromise = db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('DB_TIMEOUT_5S')), 5000)
        );

        const planResult = await Promise.race([dbPromise, timeoutPromise]) as any[];
        plan = planResult[0];
        console.log(`[S2] Plan: ${plan ? plan.name : 'NOT FOUND'}`);
        
        if (!plan) return c.json({ error: "Plano não encontrado" }, 404);
    } catch (e: any) {
        console.error("[S2] ERROR:", e.message);
        return c.json({ error: "DB: " + e.message }, 500);
    }

    // STEP 3: Call Mercado Pago
    try {
        console.log("[S3] Calling MP...");
        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            return c.json({ error: "MP token missing" }, 500);
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${mpAccessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);
        console.log(`[S3] MP status: ${mpResponse.status}`);

        if (!mpResponse.ok) {
            const errText = await mpResponse.text();
            console.error("[S3] MP Error:", errText);
            return c.json({ error: "MP error", details: errText }, 500);
        }

        const result = await mpResponse.json();
        console.log(`[S3] Preference: ${result.id}`);
        console.log("===== CHECKOUT SUCCESS =====");

        return c.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        if (e.name === 'AbortError') {
            console.error("[S3] MP TIMEOUT");
            return c.json({ error: "MP timeout" }, 504);
        }
        console.error("[S3] FATAL:", e.message);
        return c.json({ error: e.message }, 500);
    }
});
