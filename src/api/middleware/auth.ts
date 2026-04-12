import { createMiddleware } from "hono/factory";
import { getAuth } from "../auth.js";

export const authMiddleware = createMiddleware(async (c, next) => {
    try {
        // Ignora rotas que não precisam de auth para poupar conexões
        if (c.req.path.includes('/webhooks/mercadopago')) {
            return next();
        }

        const auth = getAuth(c.env);
        const session = await auth.api.getSession({ headers: c.req.raw.headers });
        
        if (session) {
            c.set("user", session.user);
            c.set("session", session.session);
        } else {
            c.set("user", null);
            c.set("session", null);
        }
    } catch (e: any) {
        console.warn("⚠️ [Auth Middleware] Sessão não recuperada:", e.message);
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
        console.log(`🚫 [Admin Guard] Bloqueado: ${user?.email || 'Anônimo'} tentou acessar rota admin.`);
        return c.json({ message: "Acesso restrito a administradores" }, 403);
    }
    return next();
});
