import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/api')

app.use('*', cors())

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

// --- AUXILIARES DE BANCO (DYNAMIC) ---
async function getContext() {
    const { getDb } = await import('../src/db/index');
    const { plans, cities } = await import('../src/api/database/schema');
    const { eq } = await import('drizzle-orm');
    const db = getDb();
    return { db, plans, cities, eq };
}

// --- ROTAS DE PLANOS ---

app.get('/membership-plans', async (c) => {
    try {
        const { db, plans } = await getContext();
        if (!db) return c.json(FALLBACK_PLANS);

        const dbPromise = db.select().from(plans).execute();
        const timeout = new Promise((r) => setTimeout(() => r({ isTimeout: true }), 4000));
        const result: any = await Promise.race([dbPromise, timeout]);

        if (result.isTimeout) return c.json(FALLBACK_PLANS);
        return c.json(result.length > 0 ? result : FALLBACK_PLANS);
    } catch (e) {
        return c.json(FALLBACK_PLANS);
    }
});

app.put('/membership-plans/:id', async (c) => {
    try {
        const { db, plans, eq } = await getContext();
        if (!db) return c.json({ error: "DB Offline" }, 503);

        const id = c.req.param('id');
        const body = await c.req.json();
        const { createdAt, id: _, ...data } = body;

        const result = await db.update(plans).set(data).where(eq.eq(plans.id, id)).returning();
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/membership-plans', async (c) => {
    try {
        const { db, plans } = await getContext();
        if (!db) return c.json({ error: "DB Offline" }, 503);

        const body = await c.req.json();
        const { createdAt, ...data } = body;

        const result = await db.insert(plans).values(data).returning();
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

app.get('/debug-db', async (c) => {
    try {
        const { db } = await getContext();
        if (!db) return c.json({ status: 'error', message: 'No DB' });
        await db.execute('SELECT 1');
        return c.json({ status: 'ok', database: 'connected' });
    } catch (e: any) {
        return c.json({ status: 'error', error: e.message });
    }
});

export default handle(app)
