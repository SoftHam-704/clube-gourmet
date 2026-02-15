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
    console.log("Fetching plans from database...");
    const allPlans = await db.select().from(plans).where(eq(plans.active, true));
    console.log(`Found ${allPlans.length} plans.`);
    return c.json(allPlans);
  } catch (error: any) {
    console.error("DATABASE_ERROR:", error);
    return c.json({
      error: "Internal Server Error",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, 500);
  }
});

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

export default app;