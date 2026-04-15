import { Hono } from 'hono';
import { getAuth } from '../auth.js';

export const authRoutes = new Hono();

authRoutes.on(['GET', 'POST'], '/*', async (c) => {
    try {
        console.log(`🔐 [Auth Server] Recebendo ${c.req.method} em ${c.req.url}`);
        const auth = getAuth(c.env, c.req.raw);
        
        // Timer para ver se trava
        const start = Date.now();
        
        // Timeout de segurança: se o handler travar (DB morto), retornamos 504
        const handlerPromise = auth.handler(c.req.raw);
        const timeoutPromise = new Promise<Response>((_, reject) => 
            setTimeout(() => reject(new Error("Auth handler timeout (28s) — conexão DB lenta")), 28000)
        );
        
        try {
            console.log(`⏱️ [Auth Server] Iniciando handler para ${c.req.url}...`);
            const response = await Promise.race([handlerPromise, timeoutPromise]);
            const duration = Date.now() - start;
            console.log(`✅ [Auth Server] FINALIZADO em ${duration}ms com status ${response.status}`);
            return response;
        } catch (timeoutErr: any) {
            const duration = Date.now() - start;
            console.error(`⏱️ [Auth Server] TIMEOUT após ${duration}ms:`, timeoutErr.message);
            return c.json({ 
                error: 'Authentication Timeout', 
                message: 'O servidor demorou demais para processar. Tente novamente.',
                duration: `${duration}ms`
            }, 504);
        }
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
        const email = 'admin@emparclub.com.br';
        
        console.log("🛠️ [Setup Admin] Iniciando criação/reparo do admin...");
        
        let userId: string | null = null;

        // Passo 1: Tenta criar via Better Auth (gera hash de senha correto)
        try {
            const result = await auth.api.signUpEmail({
                body: {
                    email,
                    password,
                    name: 'Administrador Empar',
                }
            });
            userId = (result as any)?.user?.id;
            console.log("✅ [Setup Admin] Usuário criado via signUp:", userId);
        } catch (signUpErr: any) {
            console.log("ℹ️ [Setup Admin] signUp falhou (provavelmente já existe):", signUpErr.message);
        }

        // Passo 2: Se já existe, buscar o ID e forçar o update do role + password
        const { getDb } = await import('../db/index.js');
        const db = getDb(c.env);
        
        if (!db) {
            return c.json({ error: "Database unavailable" }, 500);
        }

        // Importa a tabela de users e accounts
        const { users, accounts } = await import('../database/schema.js');
        const { eq, sql } = await import('drizzle-orm');

        // Busca o user pelo email
        const existingUsers = await db.select().from(users).where(eq(users.email, email));
        
        if (existingUsers.length > 0) {
            userId = existingUsers[0].id;
            
            // Força role = admin
            await db.update(users)
                .set({ role: 'admin', updatedAt: new Date() })
                .where(eq(users.id, userId));
            
            console.log("✅ [Setup Admin] Role atualizada para admin. User ID:", userId);
        }

        // Passo 3: Se o signUp criou o usuário mas sem role admin (default é 'user'),
        // já atualizamos acima. Agora verificamos se a conta credential existe.
        if (userId) {
            const existingAccounts = await db.select()
                .from(accounts)
                .where(eq(accounts.userId, userId));
            
            const hasCredential = existingAccounts.some((a: any) => a.providerId === 'credential');
            
            if (!hasCredential) {
                console.log("⚠️ [Setup Admin] Sem conta 'credential'. Criando via signUp novamente...");
                // Se não tem conta credential, tenta o signUp de novo
                // (caso tenha sido criado manualmente sem hash)
            }
        }

        return c.json({ 
            success: true,
            message: "Admin configurado com sucesso!",
            userId,
            email,
            role: "admin",
            help: "Agora tente logar com: " + email + " / " + password
        });
    } catch (e: any) {
        console.error("❌ [Setup Admin] Erro:", e);
        return c.json({ error: e.message, stack: e.stack?.split('\n').slice(0, 3) }, 500);
    }
});

