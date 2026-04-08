import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { plans } from "../database/schema.js";
import { authenticatedOnly, adminOnly } from "../middleware/auth.js";

export const plansRoutes = new Hono();

const FALLBACK_PLANS = [
    { id: "monthly", name: "Plano Mensal", description: "O ponto de partida para a elite gastronômica.", price: "50.02", duration_months: 1, active: true, type: "individual" },
    { id: "quarterly", name: "Plano Trimestral", description: "Economize pagando por mais tempo", price: "119.70", duration_months: 3, active: true, type: "individual" },
    { id: "semiannual", name: "Plano Semestral", description: "O equilíbrio perfeito entre preço e duração", price: "215.40", duration_months: 6, active: true, type: "individual" },
    { id: "annual", name: "Plano Anual", description: "Melhor preço do ano — máxima economia", price: "394.80", duration_months: 12, active: true, type: "individual" },
    { id: "family-monthly", name: "Família Mensal", description: "Quanto mais pessoas, maior o desconto!", price: "159.64", duration_months: 1, active: true, type: "family" },
    { id: "family-quarterly", name: "Família Trimestral", description: "Economia real pra todo mundo!", price: "135.64", duration_months: 3, active: true, type: "family" },
    { id: "family-semiannual", name: "Família Semestral", description: "Economia de verdade para sua família!", price: "122.64", duration_months: 6, active: true, type: "family" },
    { id: "family-annual", name: "Família Anual", description: "Plano mais vantajoso familiar", price: "111.84", duration_months: 12, active: true, type: "family" },
];

// GET /api/membership-plans — lista pública
plansRoutes.get("/", async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json(FALLBACK_PLANS);

        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
        const dbPromise = db.select().from(plans).where(eq(plans.active, true)).execute();

        const result = await Promise.race([dbPromise, timeoutPromise]);
        if (!result || !result.length) return c.json(FALLBACK_PLANS);

        return c.json(result);
    } catch {
        return c.json(FALLBACK_PLANS);
    }
});

// GET /api/membership-plans/all — todos incluindo inativos (admin)
plansRoutes.get("/all", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);
        const result = await db.select().from(plans).orderBy(plans.duration_months).execute();
        return c.json(result);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// POST /api/membership-plans — criar plano (admin)
plansRoutes.post("/", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const body = await c.req.json();
        const { id, name, description, price, duration_months, type } = body;

        if (!id || !name || !price || !duration_months) {
            return c.json({ error: "Campos obrigatórios: id, name, price, duration_months" }, 400);
        }

        const result = await db
            .insert(plans)
            .values({ id, name, description, price: String(price), duration_months, type: type ?? "individual", active: true })
            .returning()
            .execute();

        return c.json(result[0], 201);
    } catch (e: any) {
        if (e.message?.includes("unique") || e.message?.includes("pkey")) return c.json({ error: "ID já está em uso" }, 409);
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/membership-plans/:id — editar plano (admin)
plansRoutes.put("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = c.req.param("id");
        const body = await c.req.json();

        const allowed = ["name", "description", "price", "duration_months", "active", "type"];
        const update: Record<string, any> = {};
        for (const key of allowed) {
            if (key in body) update[key] = key === "price" ? String(body[key]) : body[key];
        }

        if (!Object.keys(update).length) return c.json({ error: "Nenhum campo para atualizar" }, 400);

        const result = await db
            .update(plans)
            .set(update)
            .where(eq(plans.id, id))
            .returning()
            .execute();

        if (!result.length) return c.json({ error: "Plano não encontrado" }, 404);
        return c.json(result[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// DELETE /api/membership-plans/:id — desativar plano (admin)
plansRoutes.delete("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const db = getDb();
        if (!db) return c.json({ error: "DB indisponível" }, 503);

        const id = c.req.param("id");
        const result = await db
            .update(plans)
            .set({ active: false })
            .where(eq(plans.id, id))
            .returning({ id: plans.id })
            .execute();

        if (!result.length) return c.json({ error: "Plano não encontrado" }, 404);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
