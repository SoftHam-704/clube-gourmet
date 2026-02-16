import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/api')
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

app.get('/membership-plans', async (c) => {
    try {
        console.log("Tentando carregar banco dinamicamente...");
        // Importação dinâmica para evitar crash de inicialização na Vercel
        const { default: pg } = await import('pg');
        const { drizzle } = await import('drizzle-orm/node-postgres');
        const { pgSchema, varchar, decimal, text, integer, boolean, timestamp } = await import("drizzle-orm/pg-core");
        const { eq } = await import('drizzle-orm');

        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) return c.json(FALLBACK_PLANS);

        const emparclubSchema = pgSchema("emparclub");
        const plansTable = emparclubSchema.table("plans", {
            id: varchar("id", { length: 50 }).primaryKey(),
            name: varchar("name", { length: 255 }).notNull(),
            description: text("description"),
            price: decimal("price", { precision: 10, scale: 2 }).notNull(),
            duration_months: integer("duration_months").default(1),
            active: boolean("active").default(true),
            type: varchar("type", { length: 20 }).default("individual"),
            createdAt: timestamp("created_at").defaultNow(),
        });

        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 3000,
        });

        await client.connect();
        const db = drizzle(client);
        const result = await db.select().from(plansTable).execute();
        await client.end();

        return c.json(Array.isArray(result) && result.length > 0 ? result : FALLBACK_PLANS);
    } catch (e: any) {
        console.error("❌ ERRO API:", e.message);
        return c.json(FALLBACK_PLANS);
    }
});

app.get('/debug', (c) => c.json({ status: 'ok', msg: 'Vercel Debug OK' }));

export default handle(app)
