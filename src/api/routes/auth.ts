import { Hono } from 'hono';
import { getDb } from '../../db/index.js';
import { users, accounts, sessions } from '../database/schema.js';
import { eq, and, gt } from 'drizzle-orm';
import { scrypt, timingSafeEqual, randomBytes } from 'node:crypto';

export const authRoutes = new Hono();

// Ping para confirmar que as rotas novas estão ativas
authRoutes.get('/ping', (c) => c.json({ ok: true, version: 'native-auth-v1' }));

// Verifica senha com node:crypto nativo
// Formato do hash Better Auth: "saltHex:keyHex" (N=16384, r=16, p=1, dkLen=64)
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [saltHex, keyHex] = storedHash.split(':');
    if (!saltHex || !keyHex) return false;

    const derivedKey = await new Promise<Buffer>((resolve, reject) => {
        scrypt(
            password.normalize('NFKC'),
            saltHex,
            64,
            { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 },
            (err, key) => { if (err) reject(err); else resolve(key); }
        );
    });

    const storedKey = Buffer.from(keyHex, 'hex');
    return derivedKey.length === storedKey.length && timingSafeEqual(derivedKey, storedKey);
}

function sessionCookie(token: string, secure: boolean, maxAge: number): string {
    return `better-auth.session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

// ---------------------------------------------------------------------------
// POST /sign-in/email
// ---------------------------------------------------------------------------
authRoutes.post('/sign-in/email', async (c) => {
    // TESTE: retorna imediatamente para verificar se o handler é atingido
    console.log('🔐 [sign-in] HANDLER ATINGIDO');
    return c.json({ test: true, ts: Date.now() });

    const t0 = Date.now();
    console.log('🔐 [sign-in] iniciado');
    try {
        const { email, password } = await c.req.json();
        console.log(`🔐 [sign-in] body parsed (${Date.now()-t0}ms)`);
        if (!email || !password) return c.json({ error: 'Email e senha são obrigatórios' }, 400);

        const db = getDb(c.env);
        console.log(`🔐 [sign-in] db obtido (${Date.now()-t0}ms)`);
        if (!db) return c.json({ error: 'Database unavailable' }, 500);

        const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
        console.log(`🔐 [sign-in] user query (${Date.now()-t0}ms) found=${userRows.length}`);
        if (userRows.length === 0) return c.json({ error: 'Credenciais inválidas' }, 401);
        const user = userRows[0];

        const accountRows = await db.select().from(accounts)
            .where(and(eq(accounts.userId, user.id), eq(accounts.providerId, 'credential')))
            .limit(1);
        console.log(`🔐 [sign-in] account query (${Date.now()-t0}ms) found=${accountRows.length}`);
        if (accountRows.length === 0 || !accountRows[0].password)
            return c.json({ error: 'Credenciais inválidas' }, 401);

        const valid = await verifyPassword(password, accountRows[0].password);
        console.log(`🔐 [sign-in] password verify (${Date.now()-t0}ms) valid=${valid}`);
        if (!valid) return c.json({ error: 'Credenciais inválidas' }, 401);

        const token = randomBytes(32).toString('hex');
        const sessionId = randomBytes(16).toString('hex');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 3600 * 1000);

        await db.insert(sessions).values({
            id: sessionId, token, userId: user.id,
            expiresAt, createdAt: now, updatedAt: now,
            ipAddress: c.req.header('x-forwarded-for') ?? null,
            userAgent: c.req.header('user-agent') ?? null,
        });
        console.log(`🔐 [sign-in] session inserted (${Date.now()-t0}ms)`);

        const secure = c.req.url.startsWith('https');
        return c.json(
            {
                user: { id: user.id, email: user.email, name: user.name, role: (user as any).role,
                         emailVerified: user.emailVerified, image: user.image,
                         createdAt: user.createdAt, updatedAt: user.updatedAt },
                session: { id: sessionId, token, userId: user.id, expiresAt: expiresAt.toISOString() },
            },
            200,
            { 'Set-Cookie': sessionCookie(token, secure, 7 * 24 * 3600) }
        );
    } catch (e: any) {
        console.error('❌ [sign-in]', e.message);
        return c.json({ error: 'Erro interno' }, 500);
    }
});

// ---------------------------------------------------------------------------
// GET /get-session  (chamado pelo authClient.useSession())
// ---------------------------------------------------------------------------
authRoutes.get('/get-session', async (c) => {
    try {
        const cookieHeader = c.req.header('cookie') ?? null;
        const token = cookieHeader
            ? (() => {
                for (const part of cookieHeader.split(';')) {
                    const [k, v] = part.trim().split('=');
                    if (k === 'better-auth.session_token' && v) return decodeURIComponent(v);
                }
                return null;
            })()
            : null;

        if (!token) return c.json(null);

        const db = getDb(c.env);
        if (!db) return c.json(null);

        const rows = await db
            .select({
                sessionId: sessions.id, sessionToken: sessions.token,
                expiresAt: sessions.expiresAt, userId: sessions.userId,
                userName: users.name, userEmail: users.email,
                userRole: users.role, userEmailVerified: users.emailVerified,
                userImage: users.image, userCreatedAt: users.createdAt,
            })
            .from(sessions)
            .innerJoin(users, eq(sessions.userId, users.id))
            .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
            .limit(1);

        if (rows.length === 0) return c.json(null);
        const r = rows[0];

        return c.json({
            user: { id: r.userId, name: r.userName, email: r.userEmail,
                    role: r.userRole, emailVerified: r.userEmailVerified,
                    image: r.userImage, createdAt: r.userCreatedAt },
            session: { id: r.sessionId, token: r.sessionToken,
                       userId: r.userId, expiresAt: r.expiresAt },
        });
    } catch (e: any) {
        console.error('❌ [get-session]', e.message);
        return c.json(null);
    }
});

// ---------------------------------------------------------------------------
// POST /sign-out
// ---------------------------------------------------------------------------
authRoutes.post('/sign-out', async (c) => {
    try {
        const cookieHeader = c.req.header('cookie') ?? null;
        let token: string | null = null;
        if (cookieHeader) {
            for (const part of cookieHeader.split(';')) {
                const [k, v] = part.trim().split('=');
                if (k === 'better-auth.session_token' && v) { token = decodeURIComponent(v); break; }
            }
        }
        if (token) {
            const db = getDb(c.env);
            if (db) await db.delete(sessions).where(eq(sessions.token, token));
        }
        const secure = c.req.url.startsWith('https');
        return c.json(
            { success: true },
            200,
            { 'Set-Cookie': sessionCookie('', secure, 0) }
        );
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
