import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { pgTable, text, numeric, integer, boolean, timestamp, pgSchema } from 'drizzle-orm/pg-core';

// Schema inline para evitar problemas de importação
const emparclub = pgSchema('emparclub');
const plans = emparclub.table('plans', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    duration_months: integer('duration_months').notNull(),
    description: text('description'),
    is_active: boolean('is_active').default(true),
    created_at: timestamp('created_at').defaultNow(),
});

const PRODUCTION_URL = 'https://www.clubempar.com.br';

let pool: Pool | null = null;

function getPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: false,
            max: 2,
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 10000,
            statement_timeout: 5000,
            query_timeout: 5000,
            options: '-c search_path=emparclub,public',
        });
        pool.on('error', (err) => {
            console.error('Pool error:', err.message);
            pool = null;
        });
    }
    return pool;
}

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || PRODUCTION_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log("===== CHECKOUT (Native) START =====");

    try {
        const { planId, userId, email } = req.body;
        console.log(`[S1] plan=${planId}, user=${userId}, email=${email}`);

        if (!userId || !email) {
            return res.status(401).json({ error: "Login necessário" });
        }

        // Get plan from DB
        console.log("[S2] Querying plan...");
        const db = drizzle(getPool());
        const planResult = await db.select().from(plans).where(eq(plans.id, planId)).limit(1);
        const plan = planResult[0];

        if (!plan) {
            console.log("[S2] Plan not found");
            return res.status(404).json({ error: "Plano não encontrado" });
        }
        console.log(`[S2] Found: ${plan.name} - R$ ${plan.price}`);

        // Call Mercado Pago REST API
        console.log("[S3] Calling Mercado Pago...");
        const mpAccessToken = process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            return res.status(500).json({ error: "MP token not configured" });
        }

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
        });

        console.log(`[S3] MP status: ${mpResponse.status}`);

        if (!mpResponse.ok) {
            const errText = await mpResponse.text();
            console.error("[S3] MP Error:", errText);
            return res.status(500).json({ error: "Erro no Mercado Pago", details: errText });
        }

        const result = await mpResponse.json();
        console.log(`[S3] Preference: ${result.id}`);
        console.log("===== CHECKOUT SUCCESS =====");

        return res.status(200).json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        console.error("FATAL:", e.message);
        return res.status(500).json({ error: e.message });
    }
}
