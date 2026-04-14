import { Hono } from 'hono';
import { cors } from "hono/cors";

import { authRoutes } from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';
import { plansRoutes } from './routes/plans.js';
import { restaurantsRoutes } from './routes/restaurants.js';
import { citiesRoutes } from './routes/cities.js';
import { adminRoutes } from './routes/admin.js';
import { userRoutes } from './routes/user.js';
import { checkoutRoutes } from './routes/checkout.js';
import { webhookRoutes } from './routes/webhooks.js';

const app = new Hono();

// Logger de Emergência para capturar o Firefox
app.use('*', async (c, next) => {
    console.log(`📡 [API REQ] ${c.req.method} ${c.req.url}`);
    await next();
    console.log(`✅ [API RES] ${c.req.method} ${c.req.url} -> Status: ${c.res.status}`);
});

app.use(cors({ 
    origin: (origin) => origin || 'https://www.clubempar.com.br',
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposeHeaders: ['Set-Cookie'],
}));





// Agrupamos as rotas de API
const api = new Hono();

import { sql } from 'drizzle-orm';
import { getDb } from '../db/index.js';

// Rotas públicas (Sempre rodar ANTES do middleware)
api.get('/health', (c) => c.json({ status: 'ok', domain: 'www.clubempar.com.br' }));

api.get('/debug', async (c) => {
    console.log("🔍 [Debug] Testando conexão com o DB...");
    const db = getDb(c.env);
    
    if (!db) {
        return c.json({ status: 'error', db: 'NOT_FOUND', env: !!c.env });
    }

    try {
        // Tenta uma query ultra simples
        const start = Date.now();
        await db.execute(sql`SELECT 1`);
        const duration = Date.now() - start;
        
        return c.json({ 
            status: 'ok', 
            db: 'CONNECTED', 
            latency: `${duration}ms`,
            message: "Club Empar API v2 — Online & Connected" 
        });
    } catch (e: any) {
        console.error("❌ [Debug] Erro:", e);
        return c.json({ 
            status: 'error', 
            db: 'FAILED', 
            message: e.message,
            raw: JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e)))
        }, 500);
    }
});



// !!! O AuthMiddleware agora só roda para rotas protegidas !!!

api.use(authMiddleware);

api.route('/', authRoutes);

api.route('/membership-plans', plansRoutes);
api.route('/restaurants', restaurantsRoutes);
api.route('/cities', citiesRoutes);
api.route('/admin', adminRoutes);
api.route('/user', userRoutes);
api.route('/checkout', checkoutRoutes);
api.route('/webhooks', webhookRoutes);

// Debug movido para o topo


app.onError((err, c) => {
    console.error("🔥 [FATAL API ERROR]:", err);
    return c.json({ 
        error: "Internal Server Error", 
        message: err.message, 
        path: c.req.path
    }, 500);
});

// Montamos a API no path /api
app.route('/api', api);

export default app;
