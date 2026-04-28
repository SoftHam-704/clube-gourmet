import { createMiddleware } from "hono/factory";
import { createHmac, timingSafeEqual } from 'node:crypto';

const SECRET = () => process.env.BETTER_AUTH_SECRET || 'fallback-secret-change-me';

function verifyToken(token: string): { email: string; role: string; id?: string } | null {
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

export const authMiddleware = createMiddleware(async (c, next) => {
    let token: string | null = null;

    // Bearer token (clientes mobile/API)
    const authHeader = c.req.header('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7);
    }

    // Cookie fallback (clientes web)
    if (!token) {
        const cookieHeader = c.req.header('cookie') ?? '';
        for (const part of cookieHeader.split(';')) {
            const [k, v] = part.trim().split('=');
            if (k === 'better-auth.session_token' && v) { token = decodeURIComponent(v); break; }
        }
    }

    if (token) {
        const data = verifyToken(token);
        if (data) {
            const userId = data.id ?? 'admin';
            c.set('user', { id: userId, email: data.email, name: 'Usuário',
                            role: data.role, emailVerified: true });
            c.set('session', { id: userId, token, userId });
        } else {
            c.set('user', null);
            c.set('session', null);
        }
    } else {
        c.set('user', null);
        c.set('session', null);
    }

    return next();
});

export const authenticatedOnly = createMiddleware(async (c, next) => {
    if (!c.get('session')) return c.json({ message: 'Você não está autenticado' }, 401);
    return next();
});

export const adminOnly = createMiddleware(async (c, next) => {
    const user = c.get('user') as any;
    if (!user || user.role !== 'admin')
        return c.json({ message: 'Acesso restrito a administradores' }, 403);
    return next();
});
