import { Hono } from 'hono';
import { cors } from "hono/cors"
import { db } from '../db/index.js';
import { plans } from './database/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

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

app.get('/plans', async (c) => {
  // Purge Cache Versão: 1.0.12
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');

  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ isFallback: true }), 5000) // Aumentado para 5s
  );

  try {
    console.log("💎 API: Buscando planos reais na SaveInCloud...");
    const dbPromise = db.select().from(plans).where(eq(plans.active, true));
    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result.isFallback) {
      console.warn("⚠️ API: Timeout na SaveInCloud. Usando Fallback de Segurança.");
      return c.json(FALLBACK_PLANS);
    }

    console.log(`✅ API: Sucesso! Retornando ${result.length} planos.`);
    return c.json(result.length > 0 ? result : FALLBACK_PLANS);
  } catch (error) {
    console.error("❌ API_ERROR:", error);
    return c.json(FALLBACK_PLANS);
  }
});

app.get('/debug', (c) => c.json({ status: 'ok', message: "API está ativa!" }));

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