import { Hono } from 'hono';
import { getAuth } from '../auth.js';

export const authRoutes = new Hono();

authRoutes.all('/auth/*', async (c) => {
    try {
        const auth = getAuth();
        return auth.handler(c.req.raw);
    } catch (e: any) {
        console.error('❌ Auth handler error:', e.message);
        return c.json({ error: 'Auth service unavailable', detail: e.message }, 503);
    }
});
