import { createMiddleware } from "hono/factory";
import { getAuth } from "../auth.js";

export const authMiddleware = createMiddleware(async (c, next) => {
    try {
        // Ignora rotas públicas (auth, webhooks, debug)
        const path = c.req.path;
        if (
            path.includes('/webhooks/') ||
            path.includes('/auth/') ||
            path.startsWith('/auth') ||
            path.includes('/debug') ||
            path.includes('/health') ||
            path.includes('/setup-admin')
        ) {
            return next();
        }

        const auth = getAuth(c.env, c.req.raw);

        // Timeout de segurança para evitar hang infinito em serverless
        const sessionPromise = auth.api.getSession({ headers: c.req.raw.headers });
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Session check timeout (8s)")), 8000)
        );

        try {
            const session = await Promise.race([sessionPromise, timeoutPromise]) as any;
            
            if (session) {
                c.set("user", session.user);
                c.set("session", session.session);
            } else {
                c.set("user", null);
                c.set("session", null);
            }
        } catch (timeoutErr: any) {
            console.warn("⏱️ [Auth Middleware] Timeout na verificação de sessão:", timeoutErr.message);
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
