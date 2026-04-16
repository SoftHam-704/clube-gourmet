import { Hono } from 'hono';
import { getAuth } from '../auth.js';

export const authRoutes = new Hono();

// -----------------------------------------------------------------------
// POST /sign-in/email — usa a API programática do Better Auth
// O auth.handler() trava em serverless pois faz chamadas HTTP internas.
// auth.api.signInEmail() executa diretamente sem sair pela rede.
// -----------------------------------------------------------------------
authRoutes.post('/sign-in/email', async (c) => {
    try {
        console.log(`🔐 [Auth] sign-in/email (programático) iniciado`);
        const start = Date.now();
        const auth = getAuth(c.env, c.req.raw);

        const body = await c.req.json();

        const result = await auth.api.signInEmail({
            body,
            headers: c.req.raw.headers,
            asResponse: true,
        });

        const duration = Date.now() - start;
        console.log(`✅ [Auth] sign-in concluído em ${duration}ms — status ${result.status}`);
        return result;
    } catch (e: any) {
        console.error('❌ [Auth] sign-in/email erro:', e.message);
        // Better Auth lança APIError com statusCode quando as credenciais são inválidas
        const status = (e as any).statusCode ?? 401;
        return c.json({ error: e.message || 'Credenciais inválidas' }, status);
    }
});

// -----------------------------------------------------------------------
// POST /sign-up/email — idem
// -----------------------------------------------------------------------
authRoutes.post('/sign-up/email', async (c) => {
    try {
        const auth = getAuth(c.env, c.req.raw);
        const body = await c.req.json();

        const result = await auth.api.signUpEmail({
            body,
            headers: c.req.raw.headers,
            asResponse: true,
        });

        return result;
    } catch (e: any) {
        const status = (e as any).statusCode ?? 400;
        return c.json({ error: e.message }, status);
    }
});

// -----------------------------------------------------------------------
// POST /sign-out — idem
// -----------------------------------------------------------------------
authRoutes.post('/sign-out', async (c) => {
    try {
        const auth = getAuth(c.env, c.req.raw);

        const result = await auth.api.signOut({
            headers: c.req.raw.headers,
            asResponse: true,
        });

        return result;
    } catch (e: any) {
        const status = (e as any).statusCode ?? 500;
        return c.json({ error: e.message }, status);
    }
});

// -----------------------------------------------------------------------
// Todas as outras rotas (get-session, verify-email, etc.) via handler HTTP
// Essas já funcionam rapidamente (get-session: ~200ms)
// -----------------------------------------------------------------------
authRoutes.on(['GET', 'POST'], '/*', async (c) => {
    try {
        console.log(`🔐 [Auth Handler] ${c.req.method} ${c.req.url}`);
        const auth = getAuth(c.env, c.req.raw);

        const handlerPromise = auth.handler(c.req.raw);
        const timeoutPromise = new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error('Auth handler timeout (15s)')), 15000)
        );

        const response = await Promise.race([handlerPromise, timeoutPromise]);
        return response;
    } catch (e: any) {
        console.error('❌ [Auth Handler] erro:', e.message);
        if (e.message.includes('timeout')) {
            return c.json({ error: 'Authentication Timeout', message: e.message }, 504);
        }
        return c.json({ error: e.message }, 500);
    }
});
