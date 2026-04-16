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
import { users, accounts, sessions } from './database/schema.js';
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

// Diagnóstico granular do login — testa cada etapa separadamente
api.get('/debug-login', async (c) => {
    const results: Record<string, any> = {};
    const db = getDb(c.env);
    if (!db) return c.json({ error: 'DB unavailable' }, 500);

    // Etapa 1: Query na tabela users
    try {
        const t = Date.now();
        const u = await db.select({ id: users.id, email: users.email, role: users.role })
            .from(users).where(eq(users.email, 'admin@emparclub.com.br')).limit(1);
        results.step1_users_query = `${Date.now() - t}ms`;
        results.step1_user_found = u.length > 0;
        if (u.length > 0) {
            // Etapa 2: Query na tabela accounts
            const t2 = Date.now();
            const a = await db.select({ id: accounts.id, providerId: accounts.providerId })
                .from(accounts).where(eq(accounts.userId, u[0].id)).limit(5);
            results.step2_accounts_query = `${Date.now() - t2}ms`;
            results.step2_accounts = a.map(x => x.providerId);
        }
    } catch (e: any) {
        results.db_error = e.message;
    }

    // Etapa 3: scrypt nativo do Node.js (N=1024)
    try {
        const { scrypt, randomBytes } = await import('node:crypto');
        const t3 = Date.now();
        const salt = randomBytes(16);
        await new Promise<void>((resolve, reject) => {
            scrypt('testpassword', salt, 32, { N: 1024, r: 8, p: 1 }, (err) => {
                if (err) reject(err); else resolve();
            });
        });
        results.step3_scrypt_N1024 = `${Date.now() - t3}ms`;
    } catch (e: any) {
        results.step3_error = e.message;
    }

    // Etapa 4: scrypt nativo N=16384 (padrão se cost não for aplicado)
    try {
        const { scrypt, randomBytes } = await import('node:crypto');
        const t4 = Date.now();
        const salt = randomBytes(16);
        await new Promise<void>((resolve, reject) => {
            scrypt('testpassword', salt, 32, { N: 16384, r: 8, p: 1 }, (err) => {
                if (err) reject(err); else resolve();
            });
        });
        results.step4_scrypt_N16384 = `${Date.now() - t4}ms`;
    } catch (e: any) {
        results.step4_error = e.message;
    }

    // Etapa 5: INSERT de sessão de teste (e depois DELETE)
    try {
        const { randomUUID } = await import('node:crypto');
        const testId = randomUUID();
        const testToken = randomUUID();
        const now = new Date();
        const expires = new Date(now.getTime() + 60000); // 1 min

        const t5 = Date.now();
        await db.insert(sessions).values({
            id: testId,
            token: testToken,
            userId: 'debug-test-skip', // não existe, vai falhar com FK — isso é esperado
            expiresAt: expires,
            createdAt: now,
            updatedAt: now,
        });
        results.step5_insert_session = `${Date.now() - t5}ms (sucesso inesperado)`;
        // limpa se por algum motivo inseriu
        await db.delete(sessions).where(eq(sessions.id, testId));
    } catch (e: any) {
        // FK violation é esperada — o que importa é o TEMPO até o erro
        results.step5_insert_latency = `${Date.now() - (results._t5_start || Date.now())}ms`;
        results.step5_insert_error = e.message.substring(0, 120);
    }

    // Etapa 6: INSERT de sessão real (com userId válido do admin)
    try {
        const { randomUUID } = await import('node:crypto');
        const u2 = await db.select({ id: users.id }).from(users)
            .where(eq(users.email, 'admin@emparclub.com.br')).limit(1);

        if (u2.length > 0) {
            const testId2 = randomUUID();
            const testToken2 = randomUUID();
            const now2 = new Date();
            const expires2 = new Date(now2.getTime() + 60000);

            const t6 = Date.now();
            await db.insert(sessions).values({
                id: testId2,
                token: testToken2,
                userId: u2[0].id,
                expiresAt: expires2,
                createdAt: now2,
                updatedAt: now2,
            });
            results.step6_insert_real_session = `${Date.now() - t6}ms`;
            // Remove o teste
            await db.delete(sessions).where(eq(sessions.id, testId2));
            results.step6_delete_session = 'ok';
        } else {
            results.step6_insert_real_session = 'skipped — admin user not found';
        }
    } catch (e: any) {
        results.step6_insert_error = e.message.substring(0, 120);
    }

    return c.json(results);
});

// Rotas de Auth montadas em /auth para não interceptar rotas de admin/plans/etc
api.route('/auth', authRoutes);

// !!! O AuthMiddleware agora só roda para rotas protegidas !!!
api.use(authMiddleware);

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
