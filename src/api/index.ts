import { Hono } from 'hono';
import { cors } from "hono/cors"
import { db } from '../db/index';
import { plans, cities } from './database/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

// Middleware para JSON body removido para evitar conflito de leitura de stream
// app.use('*', async (c, next) => {
//   if (c.req.header('Content-Type')?.includes('application/json')) {
//     try {
//       (c.req as any).jsonBody = await c.req.json();
//     } catch (e) { }
//   }
//   await next();
// });

app.use(cors({
  origin: "*"
}))

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

const api = new Hono();

// --- ENDPOINTS DE PLANOS ---

api.get('/membership-plans', async (c) => {
  // Purge Cache Final: 1.0.15
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');

  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ isFallback: true }), 6000)
  );

  try {
    console.log("💎 API: Consultando SaveInCloud (Plans)...");
    const dbPromise = db.select().from(plans).orderBy(plans.price);
    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result.isFallback) {
      console.warn("⚠️ API: Timeout. Entregando 8 planos de backup.");
      return c.json(FALLBACK_PLANS);
    }

    return c.json(result.length > 0 ? result : FALLBACK_PLANS);
  } catch (error) {
    console.error("❌ API_ERROR (Plans):", error);
    return c.json(FALLBACK_PLANS);
  }
});

api.post('/membership-plans', async (c) => {
  try {
    const body = await c.req.json();
    const { createdAt, ...data } = body;
    const result = await db.insert(plans).values(data).returning();
    return c.json(result[0]);
  } catch (error) {
    console.error("❌ API_ERROR (POST Plans):", error);
    return c.json({ error: String(error) }, 500);
  }
});

api.put('/membership-plans/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { createdAt, id: _, ...data } = body;
    const result = await db.update(plans).set(data).where(eq(plans.id, id)).returning();
    return c.json(result[0]);
  } catch (error) {
    console.error("❌ API_ERROR (PUT Plans):", error);
    return c.json({ error: String(error) }, 500);
  }
});

api.delete('/membership-plans/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await db.delete(plans).where(eq(plans.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

// --- ENDPOINTS DE CIDADES ---

api.get('/cities', async (c) => {
  try {
    const result = await db.select().from(cities);
    return c.json(result);
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});

api.post('/cities', async (c) => {
  try {
    const body = await c.req.json();
    const { createdAt, ...data } = body;
    const result = await db.insert(cities).values(data).returning();
    return c.json(result[0]);
  } catch (error) {
    console.error("❌ API_ERROR (POST Cities):", error);
    return c.json({ error: String(error) }, 500);
  }
});

api.put('/cities/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { createdAt, id: _, ...data } = body;
    const result = await db.update(cities).set(data).where(eq(cities.id, id)).returning();
    return c.json(result[0]);
  } catch (error) {
    console.error("❌ API_ERROR (PUT Cities):", error);
    return c.json({ error: String(error) }, 500);
  }
});

api.delete('/cities/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await db.delete(cities).where(eq(cities.id, id));
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: String(error) }, 500);
  }
});


api.get('/debug', (c) => c.json({ status: 'ok', message: "API está ativa!" }));

app.route('/api', api);

// Motor de Partida Local (Só inicia se rodar DIRETAMENTE via terminal/npx)
// Na Vercel, este bloco é ignorado completamente.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  try {
    const { serve } = await import('@hono/node-server');
    serve({ fetch: app.fetch, port: 3000 }, (info) => {
      console.log(`\n🚀 MOTOR LOCAL ATIVO: http://localhost:${info.port}`);
    });
  } catch (e) { }
}

export default app;