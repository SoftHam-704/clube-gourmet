import { createMiddleware } from "hono/factory";
import { getAuth } from "../auth.js";

// Injeta user e session no contexto Hono em todas as rotas
export const authMiddleware = createMiddleware(async (c, next) => {
    try {
        const auth = getAuth();
        const session = await auth.api.getSession({ headers: c.req.raw.headers });
        if (!session) {
            c.set("user", null);
            c.set("session", null);
        } else {
            c.set("user", session.user);
            c.set("session", session.session);
        }
    } catch {
        c.set("user", null);
        c.set("session", null);
    }
    return next();
});

// Protege rotas que exigem login
export const authenticatedOnly = createMiddleware(async (c, next) => {
    const session = c.get("session");
    if (!session) {
        return c.json({ message: "Você não está autenticado" }, 401);
    }
    return next();
});

// Protege rotas que exigem role admin
export const adminOnly = createMiddleware(async (c, next) => {
    const user = c.get("user") as any;
    if (!user || user.role !== "admin") {
        return c.json({ message: "Acesso restrito a administradores" }, 403);
    }
    return next();
});
