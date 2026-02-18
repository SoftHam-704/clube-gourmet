import { createMiddleware } from "hono/factory";
import { auth } from "../auth.js";

// Attaches session and user if they are authenticated in the hono context.
export const authMiddleware = createMiddleware(async (c, next) => {
    try {
        const session = await auth.api.getSession({ headers: c.req.raw.headers });
        if (!session) {
            c.set("user", null);
            c.set("session", null);
        } else {
            c.set("user", session.user);
            c.set("session", session.session);
        }
    } catch (e) {
        c.set("user", null);
        c.set("session", null);
    }
    return next();
});

// Use this middleware to protect routes such as only authenticated users can access them.
export const authenticatedOnly = createMiddleware(
    async (c, next) => {
        const session = c.get("session");
        if (!session) {
            return c.json(
                {
                    message: "Você não está autenticado",
                },
                401
            );
        } else {
            return next();
        }
    }
);
