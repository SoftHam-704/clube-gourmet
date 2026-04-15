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

// Rota de setup do admin (ANTES do middleware de auth)
import { getAuth } from './auth.js';
import { users, accounts } from './database/schema.js';
import { eq } from 'drizzle-orm';

api.get('/setup-admin', async (c) => {
    try {
        const password = c.req.query('password') || 'admin123';
        const email = 'admin@emparclub.com.br';
        const auth = getAuth(c.env, c.req.raw);
        const db = getDb(c.env);
        if (!db) return c.json({ error: 'DB unavailable' }, 500);
        
        console.log('🛠️ [Setup Admin] Iniciando...');
        
        let userId: string | null = null;
        
        // Tenta criar via Better Auth (com timeout)
        try {
            const signUpPromise = auth.api.signUpEmail({
                body: { email, password, name: 'Administrador Empar' }
            });
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('signUp timeout 10s')), 10000)
            );
            const result = await Promise.race([signUpPromise, timeoutPromise]) as any;
            userId = result?.user?.id;
            console.log('✅ [Setup Admin] User criado:', userId);
        } catch (e: any) {
            console.log('ℹ️ [Setup Admin] signUp falhou:', e.message);
        }
        
        // Buscar user existente
        const existing = await db.select().from(users).where(eq(users.email, email));
        if (existing.length > 0) {
            userId = existing[0].id;
            await db.update(users).set({ role: 'admin', updatedAt: new Date() }).where(eq(users.id, userId));
            console.log('✅ [Setup Admin] Role atualizado para admin');
        }
        
        return c.json({ 
            success: true, userId, email, role: 'admin',
            message: 'Admin configurado! Tente logar com: ' + email + ' / ' + password
        });
    } catch (e: any) {
        console.error('❌ [Setup Admin]:', e.message);
        return c.json({ error: e.message }, 500);
    }
});

// Diagnóstico de auth (testa se o DB responde para queries do Better Auth)
api.get('/auth-test', async (c) => {
    const db = getDb(c.env);
    if (!db) return c.json({ error: 'DB unavailable' }, 500);
    
    try {
        const start = Date.now();
        const result = await db.select({ id: users.id, email: users.email, role: users.role }).from(users).limit(5);
        const accs = await db.select({ id: accounts.id, userId: accounts.userId, provider: accounts.providerId }).from(accounts).limit(5);
        const queryTime = Date.now() - start;

        // Teste de criação de usuário temporário para medir hashing
        const testEmail = `test-${Date.now()}@example.com`;
        const auth = getAuth(c.env);
        const hashStart = Date.now();
        
        let hashStatus = "Skipped";
        try {
            await auth.api.signUpEmail({
                body: { email: testEmail, password: 'password123', name: 'Test Speed' }
            });
            hashStatus = `Success (${Date.now() - hashStart}ms)`;
        } catch (e: any) {
            hashStatus = `Error: ${e.message}`;
        }

        return c.json({
            status: 'ok',
            queryLatency: `${queryTime}ms`,
            hashLatency: hashStatus,
            users: result,
            accounts: accs
        });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
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
