import { Hono } from 'hono';
import { getAuth } from '../auth.js';
import { getDb } from '../../db/index.js';
import { users, accounts, sessions } from '../database/schema.js';
import { eq, and } from 'drizzle-orm';
import { scrypt, timingSafeEqual, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export const authRoutes = new Hono();

// -----------------------------------------------------------------------
// POST /sign-in/email — implementação nativa (bypass do @noble/hashes puro JS)
//
// Better Auth usa @noble/hashes/scrypt.js (pure JavaScript) com N=16384, r=16
// hardcoded — na CPU da Vercel isso leva 28+ segundos.
// Aqui usamos node:crypto (C++ nativo) com os mesmos parâmetros — ~60ms.
// -----------------------------------------------------------------------
authRoutes.post('/sign-in/email', async (c) => {
    const start = Date.now();
    try {
        const { email, password } = await c.req.json();

        if (!email || !password) {
            return c.json({ error: 'Email e senha são obrigatórios' }, 400);
        }

        const db = getDb(c.env);
        if (!db) return c.json({ error: 'Database unavailable' }, 500);

        // 1. Busca usuário
        const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (userRows.length === 0) {
            return c.json({ error: 'Credenciais inválidas' }, 401);
        }
        const user = userRows[0];

        // 2. Busca conta credential
        const accountRows = await db.select().from(accounts)
            .where(and(eq(accounts.userId, user.id), eq(accounts.providerId, 'credential')))
            .limit(1);

        if (accountRows.length === 0 || !accountRows[0].password) {
            return c.json({ error: 'Credenciais inválidas' }, 401);
        }

        // 3. Verifica senha usando node:crypto (mesmo algoritmo do Better Auth mas nativo)
        // Formato do hash Better Auth: "salt_hex:key_hex"
        // Parâmetros: N=16384, r=16, p=1, dkLen=64
        const storedHash = accountRows[0].password;
        const [saltHex, keyHex] = storedHash.split(':');

        if (!saltHex || !keyHex) {
            console.error('❌ [Sign-in] Formato de hash inválido');
            return c.json({ error: 'Erro interno de autenticação' }, 500);
        }

        const derivedKey = await scryptAsync(
            password.normalize('NFKC'),
            saltHex,
            64, // dkLen
            { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 }
        ) as Buffer;

        const storedKey = Buffer.from(keyHex, 'hex');

        if (derivedKey.length !== storedKey.length || !timingSafeEqual(derivedKey, storedKey)) {
            return c.json({ error: 'Credenciais inválidas' }, 401);
        }

        // 4. Cria sessão
        const sessionToken = randomBytes(32).toString('hex');
        const sessionId = randomBytes(16).toString('hex');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias

        await db.insert(sessions).values({
            id: sessionId,
            token: sessionToken,
            userId: user.id,
            expiresAt,
            createdAt: now,
            updatedAt: now,
            ipAddress: c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || null,
            userAgent: c.req.header('user-agent') || null,
        });

        const duration = Date.now() - start;
        console.log(`✅ [Sign-in] Login de ${email} concluído em ${duration}ms`);

        // 5. Retorna com cookie de sessão (mesmo formato do Better Auth)
        const isSecure = c.req.url.startsWith('https');
        const cookieValue = `better-auth.session_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 3600}${isSecure ? '; Secure' : ''}`;

        return c.json(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: (user as any).role,
                    emailVerified: user.emailVerified,
                    image: user.image,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                session: {
                    id: sessionId,
                    token: sessionToken,
                    userId: user.id,
                    expiresAt: expiresAt.toISOString(),
                },
            },
            200,
            { 'Set-Cookie': cookieValue }
        );
    } catch (e: any) {
        console.error('❌ [Sign-in] Erro:', e.message);
        return c.json({ error: 'Erro interno', message: e.message }, 500);
    }
});

// -----------------------------------------------------------------------
// POST /sign-up/email — via API programática (sign-up é menos crítico)
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
// POST /sign-out
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
// -----------------------------------------------------------------------
authRoutes.on(['GET', 'POST'], '/*', async (c) => {
    try {
        const auth = getAuth(c.env, c.req.raw);
        const handlerPromise = auth.handler(c.req.raw);
        const timeoutPromise = new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error('Auth handler timeout (15s)')), 15000)
        );
        const response = await Promise.race([handlerPromise, timeoutPromise]);
        return response;
    } catch (e: any) {
        if (e.message.includes('timeout')) {
            return c.json({ error: 'Authentication Timeout', message: e.message }, 504);
        }
        return c.json({ error: e.message }, 500);
    }
});
