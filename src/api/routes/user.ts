import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { users, subscriptions, favorites, restaurants, plans, redeemedBenefits } from "../database/schema.js";
import { authenticatedOnly } from "../middleware/auth.js";

export const userRoutes = new Hono();

// GET /api/user/dashboard — dados completos do painel do usuário
userRoutes.get("/dashboard", authenticatedOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;

        const [userResult, subsResult, favoritesResult, benefitsResult] = await Promise.all([
            db.select({
                id: users.id, name: users.name, email: users.email,
                image: users.image, cityId: users.cityId, createdAt: users.createdAt,
            })
                .from(users)
                .where(eq(users.id, sessionUser.id))
                .limit(1)
                .execute(),

            db.select({
                id: subscriptions.id, planId: subscriptions.planId,
                status: subscriptions.status, startDate: subscriptions.startDate,
                endDate: subscriptions.endDate,
                planName: plans.name, planPrice: plans.price,
                planDuration: plans.duration_months, planType: plans.type,
            })
                .from(subscriptions)
                .leftJoin(plans, eq(subscriptions.planId, plans.id))
                .where(eq(subscriptions.userId, sessionUser.id))
                .orderBy(subscriptions.startDate)
                .limit(1)
                .execute(),

            db.select({
                id: favorites.id, restaurantId: favorites.restaurantId,
                restaurantName: restaurants.name, restaurantCuisine: restaurants.cuisine,
                restaurantImage: restaurants.image, restaurantSlug: restaurants.slug,
                restaurantCity: restaurants.city_slug,
            })
                .from(favorites)
                .leftJoin(restaurants, eq(favorites.restaurantId, restaurants.id))
                .where(eq(favorites.userId, sessionUser.id))
                .execute(),

            db.select({ count: redeemedBenefits.id })
                .from(redeemedBenefits)
                .where(eq(redeemedBenefits.userId, sessionUser.id))
                .execute(),
        ]);

        return c.json({
            user: userResult[0] ?? null,
            subscription: subsResult[0] ?? null,
            favorites: favoritesResult,
            totalBenefitsRedeemed: benefitsResult.length,
        });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/user/profile — atualizar perfil
userRoutes.put("/profile", authenticatedOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;
        const body = await c.req.json();

        const allowed = ["name", "image", "cityId"];
        const update: Record<string, any> = {};
        for (const key of allowed) {
            if (key in body) update[key] = body[key];
        }

        if (!Object.keys(update).length) return c.json({ error: "Nenhum campo para atualizar" }, 400);

        const result = await db
            .update(users)
            .set({ ...update, updatedAt: new Date() })
            .where(eq(users.id, sessionUser.id))
            .returning({ id: users.id, name: users.name, email: users.email, image: users.image })
            .execute();

        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GET /api/user/favorites — lista favoritos
userRoutes.get("/favorites", authenticatedOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;

        const result = await db
            .select({
                id: favorites.id, restaurantId: favorites.restaurantId,
                name: restaurants.name, cuisine: restaurants.cuisine,
                image: restaurants.image, slug: restaurants.slug,
                city: restaurants.city_slug, createdAt: favorites.createdAt,
            })
            .from(favorites)
            .leftJoin(restaurants, eq(favorites.restaurantId, restaurants.id))
            .where(eq(favorites.userId, sessionUser.id))
            .execute();

        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// POST /api/user/favorites — adicionar favorito
userRoutes.post("/favorites", authenticatedOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;
        const { restaurantId } = await c.req.json();

        if (!restaurantId) return c.json({ error: "restaurantId obrigatório" }, 400);

        // Evita duplicata
        const existing = await db
            .select()
            .from(favorites)
            .where(and(eq(favorites.userId, sessionUser.id), eq(favorites.restaurantId, restaurantId)))
            .limit(1)
            .execute();

        if (existing.length) return c.json({ error: "Já está nos favoritos" }, 409);

        const result = await db
            .insert(favorites)
            .values({ userId: sessionUser.id, restaurantId })
            .returning()
            .execute();

        return c.json(result[0], 201);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// DELETE /api/user/favorites/:restaurantId — remover favorito
userRoutes.delete("/favorites/:restaurantId", authenticatedOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;
        const restaurantId = parseInt(c.req.param("restaurantId"));

        await db
            .delete(favorites)
            .where(and(eq(favorites.userId, sessionUser.id), eq(favorites.restaurantId, restaurantId)))
            .execute();

        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GET /api/user/subscription — assinatura ativa
userRoutes.get("/subscription", authenticatedOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const sessionUser = c.get("user") as any;

        const result = await db
            .select({
                id: subscriptions.id, status: subscriptions.status,
                startDate: subscriptions.startDate, endDate: subscriptions.endDate,
                planId: subscriptions.planId, planName: plans.name,
                planPrice: plans.price, planDuration: plans.duration_months, planType: plans.type,
            })
            .from(subscriptions)
            .leftJoin(plans, eq(subscriptions.planId, plans.id))
            .where(and(eq(subscriptions.userId, sessionUser.id), eq(subscriptions.status, "active")))
            .limit(1)
            .execute();

        return c.json(result[0] ?? null);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
