import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

export const getAuth = (env?: any) => {
    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET;
    
    // Prioridade total para BETTER_AUTH_URL definida manualmente
    let authUrl = env?.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    
    if (!authUrl) {
        if (process.env.NODE_ENV === "production" || env?.NODE_ENV === "production") {
            authUrl = "https://clubempar.com.br";
        } else if (process.env.VERCEL_URL) {
            authUrl = `https://${process.env.VERCEL_URL}`;
        } else {
            authUrl = "http://localhost:5174";
        }
    }

    console.log("🚦 [Auth] Init with URL:", authUrl);

    const db = getDb(env);
    if (!db) {
        console.error("❌ [Auth] Database not available");
        throw new Error("Banco de dados indisponível.");
    }

    console.log("🗄️ [Auth] DB connection ready");

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
            authUrl,
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "https://clubempar.com.br",
            "https://www.clubempar.com.br"
        ],
        advanced: {
            useSecureCookies: (env?.NODE_ENV === "production" || process.env.NODE_ENV === "production" || authUrl.startsWith("https")),
            trustHost: true
        }
    });

    return authInstance;
};

export const auth = {
    handler: (req: Request) => getAuth().handler(req),
};
