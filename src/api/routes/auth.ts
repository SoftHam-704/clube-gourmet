import { Hono } from 'hono';
import { createHmac, timingSafeEqual } from 'node:crypto';

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

authRoutes.get('/ping', (c) => c.json({ ok: true, version: 'hmac-auth-v1' }));

// POST /sign-in/email
authRoutes.post('/sign-in/email', async (c) => {
    try {
        const { email, password } = await c.req.json();

        const emailOk = email === ADMIN_EMAIL();
        const passOk = password === ADMIN_PASSWORD();

        if (!emailOk || !passOk) {
            return c.json({ error: 'Credenciais inválidas' }, 401);
        }

        const token = makeToken(email, 'admin');
        const secure = c.req.url.startsWith('https');

        return c.json(
            {
                user: { id: 'admin', email, name: 'Administrador', role: 'admin',
                         emailVerified: true, image: null,
                         createdAt: new Date(), updatedAt: new Date() },
                session: { id: 'admin-session', token, userId: 'admin',
                            expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString() },
            },
            200,
            { 'Set-Cookie': cookie(token, secure, SESSION_MAX_AGE) }
        );
    } catch (e: any) {
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
