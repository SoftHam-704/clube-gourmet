import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

// Cache da instância do Better Auth para evitar recriar a cada request
let cachedAuth: ReturnType<typeof betterAuth> | null = null;
let cachedAuthUrl: string | null = null;

export const getAuth = (env?: any, request?: Request) => {
    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
    
    // Usamos a URL da request se existir, senão um fallback
    let authUrl = "https://www.clubempar.com.br";
    if (request) {
        try {
            authUrl = new URL(request.url).origin;
        } catch (e) {
            // mantém fallback
        }
    } else if (process.env.NODE_ENV === "development" || env?.NODE_ENV === "development") {
        authUrl = "http://localhost:8787";
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
        password: {
            hashOptions: {
                scrypt: {
                    cost: 1024, // Muito menor que o padrão (16384) para rodar rápido no serverless
                }
            }
        },
        secret: authSecret,
        baseURL: authUrl,
        trustedOrigins: [
            "https://clubempar.com.br",
            "https://www.clubempar.com.br",
            "https://clube-gourmet-five.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "http://localhost:8787"
        ],
        advanced: {
            useSecureCookies: authUrl.startsWith("https"),
            trustHost: true,
        },
        logger: {
            level: "debug",
            disabled: false,
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

