import { Hono } from 'hono';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getDb } from '../../db/index.js';
import { plans as plansTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const checkoutRoutes = new Hono();

const PRODUCTION_URL = 'https://www.clubempar.com.br';

checkoutRoutes.post('/create-preference', async (c) => {
    console.log("🛠️ [Backend] Recebendo pedido de checkout...");
    
    try {
        const body = await c.req.json();
        const { planId, userId, email } = body;

        console.log(`📋 [Backend] Dados recebidos: plan=${planId} user=${userId} email=${email}`);

        // Validação básica de segurança
        if (!userId || !email || email === 'undefined' || userId === 'undefined') {
             console.error("❌ [Backend] Usuário não identificado no corpo da requisição");
             return c.json({ error: "Você precisa estar logado para assinar." }, 401);
        }

        const env = c.env as any;
        const mpAccessToken = env?.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

        if (!mpAccessToken) {
            console.error("❌ [Backend] MP_ACCESS_TOKEN ausente");
            return c.json({ error: "Serviço de pagamento indisponível no momento." }, 500);
        }

        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        const db = getDb(env);
        
        if (!db) {
            console.error("❌ [Backend] Banco de dados inacessível");
            return c.json({ error: "Erro de conexão com o banco de dados." }, 500);
        }

        const planResult = await db.select().from(plansTable).where(eq(plansTable.id, planId)).limit(1);
        const plan = planResult[0];

        if (!plan) {
            console.error(`❌ [Backend] Plano não encontrado: ${planId}`);
            return c.json({ error: "Plano selecionado é inválido." }, 404);
        }

        console.log(`💰 [Backend] Criando preferência MP: ${plan.name} - R$ ${plan.price}`);

        const preference = new Preference(client);

        // Detectar se é localhost para links de retorno
        const isLocal = c.req.url.includes('localhost');
        const siteUrl = isLocal ? new URL(c.req.url).origin : PRODUCTION_URL;

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
                payer: { email },
                back_urls: {
                    success: `${siteUrl}/dashboard?payment=success`,
                    failure: `${siteUrl}/plans?payment=failure`,
                    pending: `${siteUrl}/dashboard?payment=pending`,
                },
                auto_return: 'approved',
                external_reference: `${userId}:${planId}`,
                notification_url: `${PRODUCTION_URL}/api/webhooks/mercadopago`,
            }
        });

        console.log(`✅ [Backend] Preferência criada: ${result.id}`);

        return c.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
        });

    } catch (e: any) {
        console.error("🔥 [Backend] Erro fatal no checkout:", e.message);
        return c.json({ error: "Erro interno ao processar checkout.", details: e.message }, 500);
    }
});
