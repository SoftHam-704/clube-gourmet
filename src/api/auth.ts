import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

export const getAuth = (env?: any) => {
    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
    
    if (!authSecret) {
        console.warn("⚠️ [Auth] BETTER_AUTH_SECRET não detectado. Usando valor de fallback para desenvolvimento.");
    }
    
    // Detectamos a URL base dinamicamente com prioridades
    let authUrl = env?.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    
    if (!authUrl) {
        if (process.env.NODE_ENV === "production" || env?.NODE_ENV === "production") {
            // Em produção, tentamos usar o host da Vercel ou o domínio fixo
            authUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://clubempar.com.br";
        } else {
            authUrl = "http://localhost:5174";
        }
    }

    // Normalização: Remove barra final se existir
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

