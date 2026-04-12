import { Hono } from "hono";
import { eq, ilike, and, or } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { cities } from "../database/schema.js";
import { authenticatedOnly, adminOnly } from "../middleware/auth.js";

export const citiesRoutes = new Hono();

// GET /api/cities — lista todas as cidades ativas (com busca opcional)
citiesRoutes.get("/", async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const search = c.req.query("q");
        const state = c.req.query("uf");
        const activeOnly = c.req.query("ativas") !== "false";

        let conditions: any[] = [];
        if (activeOnly) conditions.push(eq(cities.active, true));
        if (state) conditions.push(eq(cities.state, state.toUpperCase()));
        if (search) conditions.push(ilike(cities.name, `%${search}%`));

        const result = await db
            .select()
            .from(cities)
            .where(conditions.length ? and(...conditions) : undefined)
            .orderBy(cities.name)
            .limit(100)
            .execute();

        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GET /api/cities/all — todas as cidades (admin, sem limite)
citiesRoutes.get("/all", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const search = c.req.query("q");
        const state = c.req.query("uf");
        const page = parseInt(c.req.query("page") || "1");
        const limit = 200;
        const offset = (page - 1) * limit;

        let conditions: any[] = [];
        if (state) conditions.push(eq(cities.state, state.toUpperCase()));
        if (search) conditions.push(
            or(ilike(cities.name, `%${search}%`), ilike(cities.state, `%${search}%`))
        );

        const result = await db
            .select()
            .from(cities)
            .where(conditions.length ? and(...conditions) : undefined)
            .orderBy(cities.name)
            .limit(limit)
            .offset(offset)
            .execute();

        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/cities/:id — ativar/desativar ou editar (admin)
citiesRoutes.put("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb(c.env);
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const body = await c.req.json();

        const allowed = ["active", "slug"];
        const update: Record<string, any> = {};
        for (const key of allowed) {
            if (key in body) update[key] = body[key];
        }

        if (!Object.keys(update).length) return c.json({ error: "Nenhum campo para atualizar" }, 400);

        const result = await db
            .update(cities)
            .set(update)
            .where(eq(cities.id, id))
            .returning()
            .execute();

        if (!result.length) return c.json({ error: "Cidade não encontrada" }, 404);
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
