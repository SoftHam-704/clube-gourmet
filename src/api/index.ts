import { Hono } from 'hono';
import { cors } from "hono/cors";

import { authRoutes } from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';
import { plansRoutes } from './routes/plans.js';
import { restaurantsRoutes } from './routes/restaurants.js';
import { citiesRoutes } from './routes/cities.js';
import { adminRoutes } from './routes/admin.js';
import { userRoutes } from './routes/user.js';

const app = new Hono();

app.use(cors({ origin: "*" }));
app.use(authMiddleware);

const api = new Hono();

api.route('/', authRoutes);
api.route('/membership-plans', plansRoutes);
api.route('/restaurants', restaurantsRoutes);
api.route('/cities', citiesRoutes);
api.route('/admin', adminRoutes);
api.route('/user', userRoutes);

api.get('/debug', (c) => c.json({ status: 'ok', message: "Club Empar API v2 — Online" }));

app.onError((err, c) => {
    console.error("🔥 API ERROR:", err.message);
    return c.json({ error: "Internal Error", message: err.message }, 500);
});

app.route('/api', api);

export default app;
