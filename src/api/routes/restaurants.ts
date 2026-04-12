import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { restaurants } from "../database/schema.js";
import { authenticatedOnly, adminOnly } from "../middleware/auth.js";

export const restaurantsRoutes = new Hono();

// GET /api/restaurants — lista pública (apenas ativos)
restaurantsRoutes.get("/", async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const city = c.req.query("cidade");
        const highlighted = c.req.query("destaque");

        let conditions: any[] = [eq(restaurants.active, true)];
        if (city) conditions.push(eq(restaurants.city_slug, city));
        if (highlighted === "true") conditions.push(eq(restaurants.highlighted, true));

        const result = await db
            .select()
            .from(restaurants)
            .where(and(...conditions))
            .execute();

        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GET /api/restaurants/:id — detalhe público
restaurantsRoutes.get("/:id", async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const result = await db
            .select()
            .from(restaurants)
            .where(and(eq(restaurants.id, id), eq(restaurants.active, true)))
            .limit(1)
            .execute();

        if (!result.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// POST /api/restaurants — criar (admin)
restaurantsRoutes.post("/", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const body = await c.req.json();
        const { name, cuisine, description, address, image, slug, highlighted, city_slug } = body;

        if (!name || !cuisine || !slug) {
            return c.json({ error: "Campos obrigatórios: name, cuisine, slug" }, 400);
        }

        const result = await db
            .insert(restaurants)
            .values({ name, cuisine, description, address, image, slug, highlighted: highlighted ?? false, city_slug, active: true })
            .returning()
            .execute();

        return c.json(result[0], 201);
    } catch (e: any) {
        if (e.message?.includes("unique")) return c.json({ error: "Slug já está em uso" }, 409);
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/restaurants/:id — editar (admin)
restaurantsRoutes.put("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const body = await c.req.json();

        const allowed = ["name", "cuisine", "description", "address", "image", "slug", "highlighted", "active", "city_slug"];
        const update: Record<string, any> = {};
        for (const key of allowed) {
            if (key in body) update[key] = body[key];
        }

        if (!Object.keys(update).length) return c.json({ error: "Nenhum campo para atualizar" }, 400);

        const result = await db
            .update(restaurants)
            .set(update)
            .where(eq(restaurants.id, id))
            .returning()
            .execute();

        if (!result.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// DELETE /api/restaurants/:id — soft delete (admin)
restaurantsRoutes.delete("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const result = await db
            .update(restaurants)
            .set({ active: false })
            .where(eq(restaurants.id, id))
            .returning({ id: restaurants.id })
            .execute();

        if (!result.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
