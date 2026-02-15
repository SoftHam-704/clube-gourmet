import { Hono } from 'hono';
import { cors } from "hono/cors"
import { db } from '../db';
import { plans } from './database/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.use(cors({
  origin: "*"
}))

app.get('/plans', async (c) => {
  try {
    const allPlans = await db.select().from(plans).where(eq(plans.active, true));
    return c.json(allPlans);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

export default app;