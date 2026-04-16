import { Hono } from 'hono';
import { createHmac, timingSafeEqual, scrypt, randomBytes } from 'node:crypto';
import { getDb } from '../../db/index.js';
import { users, accounts, sessions } from '../database/schema.js';
import { eq, and } from 'drizzle-orm';

export const authRoutes = new Hono();

const SECRET = () => process.env.BETTER_AUTH_SECRET || 'fallback-secret-change-me';
const ADMIN_EMAIL = () => process.env.ADMIN_EMAIL || 'admin@emparclub.com.br';
const ADMIN_PASSWORD = () => process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_MAX_AGE = 7 * 24 * 3600; // 7 dias em segundos

function makeToken(email: string, role: string): string {
    const payload = Buffer.from(JSON.stringify({
        email, role, exp: Date.now() + SESSION_MAX_AGE * 1000
    })).toString('base64url');
    const sig = createHmac('sha256', SECRET()).update(payload).digest('base64url');
    return `${payload}.${sig}`;
}

function verifyToken(token: string): { email: string; role: string } | null {
    try {
        const [payload, sig] = token.split('.');
        if (!payload || !sig) return null;
        const expected = createHmac('sha256', SECRET()).update(payload).digest('base64url');
        const sigBuf = Buffer.from(sig, 'base64url');
        const expBuf = Buffer.from(expected, 'base64url');
        if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
        if (data.exp < Date.now()) return null;
        return { email: data.email, role: data.role };
    } catch {
        return null;
    }
}

function cookie(token: string, secure: boolean, maxAge: number): string {
    return `better-auth.session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

// Verifica senha com node:crypto nativo (mesmo formato do Better Auth)
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [saltHex, keyHex] = storedHash.split(':');
    if (!saltHex || !keyHex) return false;
    const derived = await new Promise<Buffer>((resolve, reject) => {
        scrypt(password.normalize('NFKC'), saltHex, 64,
            { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 },
            (err, key) => err ? reject(err) : resolve(key));
    });
    const stored = Buffer.from(keyHex, 'hex');
    return derived.length === stored.length && timingSafeEqual(derived, stored);
}

// Cria hash de senha no formato do Better Auth
async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const key = await new Promise<Buffer>((resolve, reject) => {
        scrypt(password.normalize('NFKC'), salt, 64,
            { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 },
            (err, k) => err ? reject(err) : resolve(k));
    });
    return `${salt}:${key.toString('hex')}`;
}

authRoutes.get('/ping', (c) => c.json({ ok: true, version: 'hmac-auth-v2' }));

// POST /sign-in/email — credenciais via header (evita body-parsing hang no Vercel)
authRoutes.post('/sign-in/email', async (c) => {
    try {
        const email = c.req.header('x-email') || c.req.query('email') || '';
        const password = c.req.header('x-password') || c.req.query('password') || '';
        if (!email || !password) return c.json({ error: 'Credenciais inválidas' }, 401);

        // Admin hardcoded (sem DB)
        if (email === ADMIN_EMAIL() && password === ADMIN_PASSWORD()) {
            const token = makeToken(email, 'admin');
            const secure = c.req.url.startsWith('https');
            return c.json(
                { user: { id: 'admin', email, name: 'Administrador', role: 'admin',
                           emailVerified: true, image: null },
                  session: { id: 'admin-session', token, userId: 'admin',
                             expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString() } },
                200, { 'Set-Cookie': cookie(token, secure, SESSION_MAX_AGE) }
            );
        }

        // Usuários comuns — verifica no banco
        const db = getDb(c.env);
        if (!db) return c.json({ error: 'Database unavailable' }, 500);

        const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (userRows.length === 0) return c.json({ error: 'Credenciais inválidas' }, 401);
        const user = userRows[0];

        const accountRows = await db.select().from(accounts)
            .where(and(eq(accounts.userId, user.id), eq(accounts.providerId, 'credential')))
            .limit(1);
        if (accountRows.length === 0 || !accountRows[0].password)
            return c.json({ error: 'Credenciais inválidas' }, 401);

        const valid = await verifyPassword(password, accountRows[0].password);
        if (!valid) return c.json({ error: 'Credenciais inválidas' }, 401);

        const role = (user as any).role || 'user';
        const token = makeToken(email, role);
        const secure = c.req.url.startsWith('https');
        return c.json(
            { user: { id: user.id, email: user.email, name: user.name, role,
                       emailVerified: user.emailVerified, image: user.image },
              session: { id: user.id, token, userId: user.id,
                         expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString() } },
            200, { 'Set-Cookie': cookie(token, secure, SESSION_MAX_AGE) }
        );
    } catch (e: any) {
        console.error('[sign-in]', e.message);
        return c.json({ error: 'Erro interno' }, 500);
    }
});

// POST /sign-up/email — cadastro de novo usuário
authRoutes.post('/sign-up/email', async (c) => {
    try {
        const name = c.req.header('x-name') || '';
        const email = c.req.header('x-email') || '';
        const password = c.req.header('x-password') || '';
        if (!email || !password || !name) return c.json({ error: 'Dados incompletos' }, 400);

        const db = getDb(c.env);
        if (!db) return c.json({ error: 'Database unavailable' }, 500);

        const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
        if (existing.length > 0) return c.json({ error: 'Este e-mail já está cadastrado' }, 400);

        const userId = randomBytes(16).toString('hex');
        const now = new Date();
        const hashedPwd = await hashPassword(password);

        await db.insert(users).values({
            id: userId, name, email, emailVerified: false, role: 'user',
            createdAt: now, updatedAt: now,
        });
        await db.insert(accounts).values({
            id: randomBytes(16).toString('hex'), accountId: userId,
            providerId: 'credential', userId, password: hashedPwd,
            createdAt: now, updatedAt: now,
        });

        const token = makeToken(email, 'user');
        const secure = c.req.url.startsWith('https');
        return c.json(
            { user: { id: userId, email, name, role: 'user', emailVerified: false, image: null },
              session: { id: userId, token, userId,
                         expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString() } },
            200, { 'Set-Cookie': cookie(token, secure, SESSION_MAX_AGE) }
        );
    } catch (e: any) {
        console.error('[sign-up]', e.message);
        return c.json({ error: 'Erro interno' }, 500);
    }
});

// GET /get-session
authRoutes.get('/get-session', (c) => {
    const cookieHeader = c.req.header('cookie') ?? '';
    let token: string | null = null;
    for (const part of cookieHeader.split(';')) {
        const [k, v] = part.trim().split('=');
        if (k === 'better-auth.session_token' && v) { token = decodeURIComponent(v); break; }
    }

    if (!token) return c.json(null);
    const data = verifyToken(token);
    if (!data) return c.json(null);

    return c.json({
        user: { id: 'admin', email: data.email, name: 'Administrador',
                role: data.role, emailVerified: true, image: null },
        session: { id: 'admin-session', token, userId: 'admin' },
    });
});

// POST /sign-out
authRoutes.post('/sign-out', (c) => {
    const secure = c.req.url.startsWith('https');
    return c.json({ success: true }, 200, { 'Set-Cookie': cookie('', secure, 0) });
});
