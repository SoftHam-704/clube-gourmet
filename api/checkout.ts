import { MercadoPagoConfig, Preference } from 'mercadopago';

// Mercado Pago Configuration
// TODO: Move to process.env.MP_ACCESS_TOKEN
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-6725227787346850-021812-706f976a9117798365615879a9539304-2216508933'; // Exemplo de token
const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { planId, userId, email } = req.body;

        // Fetch plan details from DB or constant
        // For simplicity, let's look up in a predefined list or fetch from DB
        // Fetching from DB is safer.

        // Mocking plan data for now to ensure flow works
        const plans = [
            { id: "mensal", name: "Plano Mensal", price: 49.90 },
            { id: "trimestral", name: "Plano Trimestral", price: 119.70 },
            { id: "semestral", name: "Plano Semestral", price: 215.40 },
            { id: "anual", name: "Plano Anual", price: 394.80 },
            { id: "fam-mensal", name: "Família Mensal", price: 159.64 },
            { id: "fam-trimestral", name: "Família Trimestral", price: 135.64 },
            { id: "fam-semestral", name: "Família Semestral", price: 122.64 },
            { id: "fam-anual", name: "Família Anual", price: 111.84 }
        ];

        const plan = plans.find(p => p.id === planId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        const preference = new Preference(client);

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
                    success: `${process.env.BETTER_AUTH_URL}/dashboard?payment=success`,
                    failure: `${process.env.BETTER_AUTH_URL}/checkout?plan=${planId}&payment=failure`,
                    pending: `${process.env.BETTER_AUTH_URL}/dashboard?payment=pending`,
                },
                auto_return: 'approved',
                external_reference: `${userId}:${planId}`,
                notification_url: `${process.env.BETTER_AUTH_URL}/api/webhooks/mercadopago`,
            }
        });

        return res.status(200).json({
            id: result.id,
            init_point: result.init_point,
        });
    } catch (error: any) {
        console.error('MP Preference Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
