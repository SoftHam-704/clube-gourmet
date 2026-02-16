import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { pgSchema, varchar, decimal, text, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { eq } from 'drizzle-orm'

// Schema Replicado para Performance Máxima na Vercel
const emparclubSchema = pgSchema("emparclub");
const plans = emparclubSchema.table("plans", {
    id: varchar("id", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    duration_months: integer("duration_months").default(1),
    active: boolean("active").default(true),
    type: varchar("type", { length: 20 }).default("individual"),
    createdAt: timestamp("created_at").defaultNow(),
});

const app = new Hono()
app.use('*', cors())

const FALLBACK_PLANS = [
    { id: "mensal", name: "Plano Mensal", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-mensal", name: "Família Mensal", description: "A elite para todos", price: 159.64, type: "family", active: true },
    { id: "fam-trimestral", name: "Família Trimestral", description: "Economia e lazer", price: 135.64, type: "family", active: true },
    { id: "fam-semestral", name: "Família Semestral", description: "Momentos compartilhados", price: 122.64, type: "family", active: true },
    { id: "fam-anual", name: "Família Anual", description: "O ápice do Club Empar", price: 111.84, type: "family", active: true }
];

// O Roteamento agora é relativo ao Vercel Rewrite (/api/...)
app.get('/membership-plans', async (c) => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) return c.json(FALLBACK_PLANS);

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 3000,
    });

    try {
        await client.connect();
        const db = drizzle(client);
        const result = await db.select().from(plans).execute();
        await client.end();
        return c.json(Array.isArray(result) && result.length > 0 ? result : FALLBACK_PLANS);
    } catch (e: any) {
        console.error("❌ DB_FAIL:", e.message);
        try { await client.end(); } catch (err) { }
        return c.json(FALLBACK_PLANS);
    }
});

app.get('/debug', (c) => c.json({
    status: 'ok',
    message: 'API V5 - Configuração Definitiva Vercel Ativa',
    env: process.env.NODE_ENV
}));

app.put('/membership-plans/:id', async (c) => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) return c.json({ error: "No DB URL" }, 500);

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();
        const db = drizzle(client);
        const id = c.req.param('id');
        const body = await c.req.json();
        const { createdAt, id: _, ...data } = body;
        const result = await db.update(plans).set(data).where(eq(plans.id, id)).returning();
        await client.end();
        return c.json(result[0]);
    } catch (e: any) {
        try { await client.end(); } catch (err) { }
        return c.json({ error: e.message }, 500);
    }
});

export default handle(app)
