import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

export const getAuth = (env?: any, request?: Request) => {
    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
    
    if (!authSecret) {
        console.warn("⚠️ [Auth] BETTER_AUTH_SECRET não detectado.");
    }
    
    // Tenta pegar a URL base de variáveis de ambiente
    let authUrl = env?.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    
    // Se não houver variável, mas houver uma requisição, detectamos o host atual
    // Isso é vital para funcionar tanto em www.clubempar.com.br quanto em clubempar.com.br
    if (!authUrl && request) {
        const host = request.headers.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        if (host) authUrl = `${protocol}://${host}`;
    }

    // Fallback final para produção
    if (!authUrl) {
        authUrl = (process.env.NODE_ENV === "production" || env?.NODE_ENV === "production") 
            ? "https://clubempar.com.br" 
            : "http://localhost:5174";
    }

    // Normalização
    authUrl = authUrl.replace(/\/$/, "");

    console.log("🚦 [Auth] Initializing with URL:", authUrl);


    const db = getDb(env);
    if (!db) {
        console.error("❌ [Auth] Database connection failed");
        throw new Error("Banco de dados não disponível.");
    }

    const authInstance = betterAuth({
        database: drizzleAdapter(db, {
            provider: 'pg',
            schema: {
                user: schema.users,
                session: schema.sessions,
                account: schema.accounts,
                verification: schema.verifications,
            }
        }),
        user: {
            additionalFields: {
                role: {
                    type: "string",
                    required: false,
                    defaultValue: "user",
                    input: false,
                }
            }
        },
        emailAndPassword: {
            enabled: true,
        },
        secret: authSecret,
        baseURL: authUrl,
        trustedOrigins: [
            "https://clubempar.com.br",
            "https://www.clubempar.com.br",
            "https://clube-gourmet-five.vercel.app", // Adicionado fallback Vercel
            "http://localhost:5173",
            "http://localhost:5174"
        ],
        advanced: {
            useSecureCookies: true, // Forçamos secure em produção/https
            trustHost: true
        }
    });

    return authInstance;
};

export const auth = {
    handler: (req: Request) => getAuth().handler(req),
};

