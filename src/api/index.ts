import { Hono } from 'hono';
import { cors } from "hono/cors";

import { authRoutes } from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';
import { plansRoutes } from './routes/plans.js';
import { restaurantsRoutes } from './routes/restaurants.js';
import { citiesRoutes } from './routes/cities.js';
import { adminRoutes } from './routes/admin.js';
import { userRoutes } from './routes/user.js';
import { checkoutRoutes } from './routes/checkout.js';
import { webhookRoutes } from './routes/webhooks.js';

const app = new Hono();

// Middleware Global para CORS
app.use(cors({ 
    origin: (origin) => origin, // Retorna o próprio origin para permitir credentials
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposeHeaders: ['Set-Cookie'],
}));



// Agrupamos as rotas de API
const api = new Hono();

// !!! O AuthMiddleware agora só roda para rotas de /api !!!
api.use(authMiddleware);

api.route('/', authRoutes);
api.route('/membership-plans', plansRoutes);
api.route('/restaurants', restaurantsRoutes);
api.route('/cities', citiesRoutes);
api.route('/admin', adminRoutes);
api.route('/user', userRoutes);
api.route('/checkout', checkoutRoutes);
api.route('/webhooks', webhookRoutes);

api.get('/debug', (c) => c.json({ status: 'ok', message: "Club Empar API v2 — Online" }));

app.onError((err, c) => {
    console.error("🔥 [FATAL API ERROR]:", err);
    return c.json({ 
        error: "Internal Server Error", 
        message: err.message, 
        path: c.req.path
    }, 500);
});

// Montamos a API no path /api
app.route('/api', api);

export default app;
