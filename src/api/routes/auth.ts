import { Hono } from 'hono';
import { getAuth } from '../auth.js';

export const authRoutes = new Hono();

authRoutes.on(['GET', 'POST'], '/*', async (c) => {
    try {
        console.log(`🔐 [Auth Server] Recebendo ${c.req.method} em ${c.req.url}`);
        const auth = getAuth(c.env, c.req.raw);
        
        // Timer para ver se trava
        const start = Date.now();
        const response = await auth.handler(c.req.raw);
        const duration = Date.now() - start;
        
        console.log(`✅ [Auth Server] Processado em ${duration}ms com status ${response.status}`);
        return response;
    } catch (e: any) {
        console.error('❌ [Auth Server] ERRO CRÍTICO:', e.message);
        return c.json({ 
            error: 'Authentication Internal Error', 
            message: e.message,
            stack: e.stack?.split('\n')[0] 
        }, 500);
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

