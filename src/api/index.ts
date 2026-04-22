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

// Logger de Emergência
app.use('*', async (c, next) => {
    console.log(`📡 [API REQ] ${c.req.method} ${c.req.url}`);
    await next();
    console.log(`✅ [API RES] ${c.req.method} ${c.req.url} -> Status: ${c.res.status}`);
});

app.use(cors({ 
    origin: (origin) => origin || 'https://www.clubempar.com.br',
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposeHeaders: ['Set-Cookie'],
}));

// Rotas PÚBLICAS do Mercado Pago (não precisam de cookie de login)
app.route('/api/webhooks', webhookRoutes);

// Demais rotas usam o middleware para identificar o usuário
app.use('/api/*', authMiddleware);

app.route('/api/auth', authRoutes);
app.route('/api/checkout', checkoutRoutes);
app.route('/api/membership-plans', plansRoutes);
app.route('/api/restaurants', restaurantsRoutes);
app.route('/api/cities', citiesRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/user', userRoutes);

app.get('/api/health', (c) => c.json({ status: 'ok', time: new Date().toISOString() }));

export default app;
