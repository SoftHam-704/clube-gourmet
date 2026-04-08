import { Hono } from "hono";
import { eq, count, and } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { users, subscriptions, restaurants, cities } from "../database/schema.js";
import { authenticatedOnly, adminOnly } from "../middleware/auth.js";

export const adminRoutes = new Hono();

// GET /api/admin/stats — painel administrativo
adminRoutes.get("/stats", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const [
            totalUsersResult,
            activeSubsResult,
            totalRestaurantsResult,
            activeCitiesResult,
            recentUsersResult,
            recentSubsResult,
        ] = await Promise.all([
            db.select({ count: count() }).from(users).execute(),
            db.select({ count: count() }).from(subscriptions).where(eq(subscriptions.status, "active")).execute(),
            db.select({ count: count() }).from(restaurants).where(eq(restaurants.active, true)).execute(),
            db.select({ count: count() }).from(cities).where(eq(cities.active, true)).execute(),
            db.select({ id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt })
                .from(users)
                .orderBy(users.createdAt)
                .limit(10)
                .execute(),
            db.select({
                id: subscriptions.id,
                userId: subscriptions.userId,
                planId: subscriptions.planId,
                status: subscriptions.status,
                startDate: subscriptions.startDate,
                endDate: subscriptions.endDate,
            })
                .from(subscriptions)
                .orderBy(subscriptions.startDate)
                .limit(10)
                .execute(),
        ]);

        return c.json({
            stats: {
                totalMembers: Number(totalUsersResult[0]?.count ?? 0),
                activeSubscriptions: Number(activeSubsResult[0]?.count ?? 0),
                totalRestaurants: Number(totalRestaurantsResult[0]?.count ?? 0),
                activeCities: Number(activeCitiesResult[0]?.count ?? 0),
            },
            recentUsers: recentUsersResult,
            recentSubscriptions: recentSubsResult,
        });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GET /api/admin/users — lista todos os usuários (admin)
adminRoutes.get("/users", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const result = await db
            .select({ id: users.id, name: users.name, email: users.email, role: users.role, emailVerified: users.emailVerified, createdAt: users.createdAt })
            .from(users)
            .orderBy(users.createdAt)
            .execute();

        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/admin/users/:id/role — promover/rebaixar usuário (admin)
adminRoutes.put("/users/:id/role", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = c.req.param("id");
        const { role } = await c.req.json();

        if (!["user", "admin"].includes(role)) {
            return c.json({ error: "Role inválida. Use 'user' ou 'admin'" }, 400);
        }

        const result = await db
            .update(users)
            .set({ role })
            .where(eq(users.id, id))
            .returning({ id: users.id, name: users.name, role: users.role })
            .execute();

        if (!result.length) return c.json({ error: "Usuário não encontrado" }, 404);
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
