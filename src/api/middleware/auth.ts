import { createMiddleware } from "hono/factory";
import { getDb } from "../../db/index.js";
import { sessions, users } from "../database/schema.js";
import { eq, and, gt } from "drizzle-orm";

// Lê o token do cookie better-auth.session_token
function getSessionToken(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    for (const part of cookieHeader.split(';')) {
        const [k, v] = part.trim().split('=');
        if (k === 'better-auth.session_token' && v) return decodeURIComponent(v);
    }
    return null;
}

export const authMiddleware = createMiddleware(async (c, next) => {
    const token = getSessionToken(c.req.header('cookie') ?? null);

    if (!token) {
        c.set("user", null);
        c.set("session", null);
        return next();
    }

    try {
        const db = getDb(c.env);
        if (!db) { c.set("user", null); c.set("session", null); return next(); }

        const now = new Date();
        const rows = await db
            .select({
                sessionId: sessions.id,
                sessionToken: sessions.token,
                expiresAt: sessions.expiresAt,
                userId: sessions.userId,
                userName: users.name,
                userEmail: users.email,
                userRole: users.role,
                userEmailVerified: users.emailVerified,
                userImage: users.image,
            })
            .from(sessions)
            .innerJoin(users, eq(sessions.userId, users.id))
            .where(and(eq(sessions.token, token), gt(sessions.expiresAt, now)))
            .limit(1);

        if (rows.length === 0) {
            c.set("user", null);
            c.set("session", null);
        } else {
            const r = rows[0];
            c.set("user", {
                id: r.userId,
                name: r.userName,
                email: r.userEmail,
                role: r.userRole,
                emailVerified: r.userEmailVerified,
                image: r.userImage,
            });
            c.set("session", {
                id: r.sessionId,
                token: r.sessionToken,
                userId: r.userId,
                expiresAt: r.expiresAt,
            });
        }
    } catch (e: any) {
        console.warn("⚠️ [Auth Middleware] Erro ao verificar sessão:", e.message);
        c.set("user", null);
        c.set("session", null);
    }

    return next();
});

export const authenticatedOnly = createMiddleware(async (c, next) => {
    const session = c.get("session");
    if (!session) {
        return c.json({ message: "Você não está autenticado" }, 401);
    }
    return next();
});

export const adminOnly = createMiddleware(async (c, next) => {
    const user = c.get("user") as any;
    if (!user || user.role !== "admin") {
        return c.json({ message: "Acesso restrito a administradores" }, 403);
    }
    return next();
});
