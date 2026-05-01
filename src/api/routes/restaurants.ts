import { Hono } from "hono";
import { getPool } from "../../db/index.js";
import { authenticatedOnly, adminOnly } from "../middleware/auth.js";

export const restaurantsRoutes = new Hono();

const FALLBACK_RESTAURANTS = [
    { id: 1, name: "Aska Sushi Premium", cuisine: "Japonesa", description: "O melhor omakase da cidade", address: "Av. Paulista, 1200 - São Paulo", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "aska-sushi", highlighted: true, active: true, city_slug: "sao-paulo", createdAt: new Date() },
    { id: 2, name: "La Trattoria Roma", cuisine: "Italiana", description: "Massas artesanais e vinhos selecionados", address: "R. Oscar Freire, 350 - São Paulo", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "la-trattoria-roma", highlighted: true, active: true, city_slug: "sao-paulo", createdAt: new Date() },
    { id: 3, name: "Fogo de Minas", cuisine: "Churrasco", description: "Churrascaria premium com cortes especiais", address: "R. Haddock Lobo, 180 - São Paulo", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "fogo-de-minas", highlighted: false, active: true, city_slug: "sao-paulo", createdAt: new Date() },
    { id: 4, name: "Le Jardin Français", cuisine: "Francesa", description: "Bistrô clássico com menu degustação", address: "Al. Lorena, 480 - São Paulo", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "le-jardin-francais", highlighted: true, active: true, city_slug: "sao-paulo", createdAt: new Date() },
    { id: 5, name: "Verde & Vida", cuisine: "Vegano", description: "Gastronomia vegana de alto nível", address: "R. Augusta, 900 - São Paulo", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "verde-vida", highlighted: false, active: true, city_slug: "sao-paulo", createdAt: new Date() },
    { id: 6, name: "Boteco do Chef", cuisine: "Brasileira", description: "Culinária brasileira contemporânea", address: "R. Consolação, 700 - São Paulo", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop", image2: null, image3: null, slug: "boteco-do-chef", highlighted: false, active: true, city_slug: "sao-paulo", createdAt: new Date() },
];

const SELECT_COLS = `id, nome AS name, categoria AS cuisine, descricao AS description,
    endereco AS address, imagem_url AS image, imagem_url_2 AS image2, imagem_url_3 AS image3,
    slug, destaque AS highlighted, ativo AS active, cidade_slug AS city_slug, data_cadastro AS "createdAt"`;

// GET /api/restaurants — lista pública (apenas ativos)
restaurantsRoutes.get("/", async (c) => {
    try {
        const pool = getPool(c.env);
        if (!pool) return c.json(FALLBACK_RESTAURANTS);

        const city = c.req.query("cidade");
        const highlighted = c.req.query("destaque");

        const params: any[] = [true];
        let where = `WHERE r.ativo = $1`;
        if (city) { params.push(city); where += ` AND r.cidade_slug = $${params.length}`; }
        if (highlighted === "true") { params.push(true); where += ` AND r.destaque = $${params.length}`; }

        const sql = `SELECT ${SELECT_COLS} FROM emparclub.restaurantes r ${where} ORDER BY r.destaque DESC, r.id`;
        const { rows } = await pool.query(sql, params);

        if (!rows.length) return c.json(FALLBACK_RESTAURANTS);
        return c.json(rows);
    } catch (e: any) {
        console.error('[restaurants] fallback ativado:', e.message);
        return c.json(FALLBACK_RESTAURANTS);
    }
});

// GET /api/restaurants/:id — detalhe público
restaurantsRoutes.get("/:id", async (c) => {
    try {
        const pool = getPool(c.env);
        if (!pool) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const { rows } = await pool.query(
            `SELECT ${SELECT_COLS} FROM emparclub.restaurantes r WHERE r.id = $1 AND r.ativo = true LIMIT 1`,
            [id]
        );

        if (!rows.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json(rows[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// POST /api/restaurants — criar (admin)
restaurantsRoutes.post("/", authenticatedOnly, adminOnly, async (c) => {
    try {
        const pool = getPool(c.env);
        if (!pool) return c.json({ error: "DB indisponível" }, 503);

        const body = await c.req.json();
        const { name, cuisine, description, address, image, image2, image3, slug, highlighted, city_slug } = body;

        if (!name || !cuisine || !slug) {
            return c.json({ error: "Campos obrigatórios: name, cuisine, slug" }, 400);
        }

        const { rows } = await pool.query(
            `INSERT INTO emparclub.restaurantes (nome, categoria, descricao, endereco, imagem_url, imagem_url_2, imagem_url_3, slug, destaque, cidade_slug, ativo)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true)
             RETURNING id, nome AS name, categoria AS cuisine, slug`,
            [name, cuisine, description ?? null, address ?? null, image ?? null, image2 ?? null, image3 ?? null, slug, highlighted ?? false, city_slug ?? null]
        );

        return c.json(rows[0], 201);
    } catch (e: any) {
        if (e.message?.includes("unique") || e.message?.includes("duplicate")) return c.json({ error: "Slug já está em uso" }, 409);
        return c.json({ error: e.message }, 500);
    }
});

// PUT /api/restaurants/:id — editar (admin)
restaurantsRoutes.put("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const pool = getPool(c.env);
        if (!pool) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const body = await c.req.json();

        const colMap: Record<string, string> = {
            name: "nome", cuisine: "categoria", description: "descricao",
            address: "endereco", image: "imagem_url", image2: "imagem_url_2",
            image3: "imagem_url_3", slug: "slug", highlighted: "destaque",
            active: "ativo", city_slug: "cidade_slug",
        };

        const sets: string[] = [];
        const params: any[] = [];
        for (const [key, col] of Object.entries(colMap)) {
            if (key in body) { params.push(body[key]); sets.push(`${col} = $${params.length}`); }
        }
        if (!sets.length) return c.json({ error: "Nenhum campo para atualizar" }, 400);

        params.push(id);
        const { rows } = await pool.query(
            `UPDATE emparclub.restaurantes SET ${sets.join(", ")} WHERE id = $${params.length} RETURNING id, nome AS name`,
            params
        );

        if (!rows.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json(rows[0]);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// DELETE /api/restaurants/:id — soft delete (admin)
restaurantsRoutes.delete("/:id", authenticatedOnly, adminOnly, async (c) => {
    try {
        const pool = getPool(c.env);
        if (!pool) return c.json({ error: "DB indisponível" }, 503);

        const id = parseInt(c.req.param("id"));
        const { rows } = await pool.query(
            `UPDATE emparclub.restaurantes SET ativo = false WHERE id = $1 RETURNING id`,
            [id]
        );

        if (!rows.length) return c.json({ error: "Restaurante não encontrado" }, 404);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
