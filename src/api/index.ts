import { Hono } from 'hono';
import { cors } from "hono/cors"
import { db } from '../db/index.js';
import { plans } from './database/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono().basePath('api');

app.use(cors({
  origin: "*"
}))

const FALLBACK_PLANS = [
  { id: "monthly", name: "Plano Mensal", description: "Ideal para começar", price: 49.90, type: "individual", active: true },
  { id: "quarterly", name: "Plano Trimestral", description: "Melhor custo-benefício", price: 119.70, type: "individual", active: true },
  { id: "semiannual", name: "Plano Semestral", description: "Favorito dos membros", price: 215.40, type: "individual", active: true },
  { id: "family-semiannual", name: "Família Semestral", description: "Para toda sua mesa", price: 122.64, type: "family", active: true }
];

app.get('/plans', async (c) => {
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ isFallback: true }), 3000)
  );

  try {
    const dbPromise = db.select().from(plans).where(eq(plans.active, true));
    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result.isFallback) {
      console.warn("⚠️ API: Banco SaveInCloud lento ou porta bloqueada. Usando Fallback.");
      return c.json(FALLBACK_PLANS);
    }

    return c.json(result.length > 0 ? result : FALLBACK_PLANS);
  } catch (error) {
    console.error("API_ERROR:", error);
    return c.json(FALLBACK_PLANS);
  }
});

app.get('/debug', (c) => c.json({ status: 'ok', message: "API está ativa!" }));

// Motor de Partida Local (Só inicia se rodar via terminal)
if (typeof process !== 'undefined') {
  try {
    const { serve } = await import('@hono/node-server');
    serve({ fetch: app.fetch, port: 3000 }, (info) => {
      console.log(`\n-----------------------------------------`);
      console.log(`🚀 MOTOR DE DADOS ATIVO!`);
      console.log(`🔗 Porta: ${info.port}`);
      console.log(`📡 Endereço: http://localhost:${info.port}`);
      console.log(`-----------------------------------------\n`);
    });
  } catch (e) { /* Erro esperado em produção */ }
}

export default app;