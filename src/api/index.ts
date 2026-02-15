import { Hono } from 'hono';
import { cors } from "hono/cors"
import { db } from '../db/index.js';
import { plans } from './database/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.use(cors({
  origin: "*"
}))

// Dados de segurança (Fallback) caso o banco falhe
const FALLBACK_PLANS = [
  { id: "monthly", name: "Plano Mensal", description: "Ideal para começar", price: 49.90, type: "individual", active: true },
  { id: "quarterly", name: "Plano Trimestral", description: "Melhor custo-benefício", price: 119.70, type: "individual", active: true },
  { id: "semiannual", name: "Plano Semestral", description: "Favorito dos membros", price: 215.40, type: "individual", active: true },
  { id: "family-semiannual", name: "Família Semestral", description: "Para toda sua mesa", price: 122.64, type: "family", active: true }
];

app.get('/plans', async (c) => {
  // Criamos uma promessa de "desistência" para não deixar o usuário esperando
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ isFallback: true }), 2500)
  );

  try {
    const dbPromise = db.select().from(plans).where(eq(plans.active, true));

    // Quem chegar primeiro vence: o Banco ou os 2.5 segundos de limite
    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result.isFallback) {
      console.warn("⚠️ Timeout na conexão com SaveInCloud. Usando Fallback.");
      return c.json(FALLBACK_PLANS);
    }

    if (result.length === 0) return c.json(FALLBACK_PLANS);
    return c.json(result);
  } catch (error) {
    console.error("DB_ERROR_USING_FALLBACK:", error);
    return c.json(FALLBACK_PLANS);
  }
});

app.get('/debug', (c) => {
  return c.json({
    status: 'ok',
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV
    },
    message: "API server is running!"
  });
});

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

export default app;