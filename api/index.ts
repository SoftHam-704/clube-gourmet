import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/api')

app.use('*', cors())

app.get('/debug', (c) => {
    return c.json({
        status: 'ok',
        message: 'API Minimalista - Teste de Roteamento',
        time: new Date().toISOString()
    })
})

const FALLBACK_PLANS = [
    { id: "mensal", name: "Plano Mensal", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-mensal", name: "Família Mensal", description: "A elite para todos", price: 159.64, type: "family", active: true },
    { id: "fam-trimestral", name: "Família Trimestral", description: "Economia e lazer", price: 135.64, type: "family", active: true },
    { id: "fam-semestral", name: "Família Semestral", description: "Momentos compartilhados", price: 122.64, type: "family", active: true },
    { id: "fam-anual", name: "Família Anual", description: "O ápice do Club Empar", price: 111.84, type: "family", active: true }
];

app.get('/membership-plans', async (c) => {
    console.log("Rota /membership-plans acessada!");
    try {
        // Tenta carregar o banco se possível, senão manda o fallback sem medo
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) return c.json(FALLBACK_PLANS);

        const { default: pg } = await import('pg');
        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 3000,
        });

        await client.connect();
        const res = await client.query('SELECT * FROM emparclub.plans');
        await client.end();

        return c.json(res.rows.length > 0 ? res.rows : FALLBACK_PLANS);
    } catch (e) {
        console.error("Erro na API:", e);
        return c.json(FALLBACK_PLANS);
    }
});

export default handle(app)
