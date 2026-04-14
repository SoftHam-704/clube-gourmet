import { Hono } from 'hono';
import { getAuth } from '../auth.js';

export const authRoutes = new Hono();

authRoutes.all('/auth/*', async (c) => {
    try {
        const auth = getAuth(c.env, c.req.raw);
        return auth.handler(c.req.raw);
    } catch (e: any) {
        console.error('❌ Auth handler error:', e.message);
        return c.json({ error: 'Auth service unavailable', detail: e.message }, 503);
    }
});

// Rota de Emergência para configurar o Admin
authRoutes.get('/setup-admin', async (c) => {
    try {
        const password = c.req.query('password') || 'admin123';
        const auth = getAuth(c.env, c.req.raw);
        
        console.log("🛠️ [Setup Admin] Iniciando criação do admin...");
        
        const result = await auth.api.signUpEmail({
            body: {
                email: 'admin@emparclub.com.br',
                password: password,
                name: 'Administrador Empar',
            }
        });

        // Se o usuário já existe, vamos apenas promovê-lo no banco via DB se necessário,
        // mas o signUpEmail do better-auth já deve lidar com a criação da conta.
        
        return c.json({ 
            message: "Setup concluído ou usuário já existe.", 
            result: !!result,
            help: "Tente logar agora. Se falhar, verifique se a role 'admin' está no banco."
        });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

