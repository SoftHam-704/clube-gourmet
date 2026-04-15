import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

// Cache da instância do Better Auth para evitar recriar a cada request
let cachedAuth: ReturnType<typeof betterAuth> | null = null;
let cachedAuthUrl: string | null = null;

export const getAuth = (env?: any, request?: Request) => {
    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
    
    // Forçamos a URL de produção para evitar qualquer erro de detecção
    let authUrl = "https://www.clubempar.com.br";

    // Se estiver em ambiente local, mudamos
    if (process.env.NODE_ENV === "development" || env?.NODE_ENV === "development") {
        authUrl = "http://localhost:5174";
    }

    // Se já temos uma instância cacheada com a mesma URL, reutilizamos
    if (cachedAuth && cachedAuthUrl === authUrl) {
        return cachedAuth;
    }

    console.log("🚦 [Auth] Initializing with Fixed URL:", authUrl);

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
            "https://clube-gourmet-five.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174"
        ],
        advanced: {
            useSecureCookies: authUrl.startsWith("https"),
            trustHost: true,
        }
    });

    // Cache para próximos requests
    cachedAuth = authInstance;
    cachedAuthUrl = authUrl;

    return authInstance;
};


export const auth = {
    handler: (req: Request) => getAuth().handler(req),
};

