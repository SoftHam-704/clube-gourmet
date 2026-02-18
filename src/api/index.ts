import { Hono } from 'hono';
import { cors } from "hono/cors";

import { authRoutes } from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';

const app = new Hono();

app.use(cors({ origin: "*" }));
app.use(authMiddleware);
app.route('/', authRoutes);

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

// Rota de Planos ULTRA RESILIENTE
api.get('/membership-plans', async (c) => {
  c.header('Content-Type', 'application/json');
  console.log("💎 API: Rota /membership-plans chamada (Modo Resiliência)");

  try {
    // Carregamento dinâmico para não quebrar no Top-Level
    const { getDb } = await import('../db/index');
    const { plans } = await import('./database/schema');

    const db = getDb();
    if (!db) return c.json(FALLBACK_PLANS);

    const dbPromise = db.select().from(plans).execute();
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ isFallback: true }), 3000));

    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result && result.isFallback) return c.json(FALLBACK_PLANS);
    return c.json(Array.isArray(result) && result.length > 0 ? result : FALLBACK_PLANS);
  } catch (error) {
    console.error("❌ API ERROR (DEFERRED):", error);
    return c.json(FALLBACK_PLANS);
  }
});

api.get('/debug', (c) => c.json({ status: 'ok', message: "API Ultra-Resiliente Ativa!" }));

app.onError((err, c) => {
  console.error("🔥 CRITICAL_HANO_ERROR:", err.message);
  return c.json({ error: "Internal Error", message: err.message }, 500);
});

app.route('/api', api);

export default app;