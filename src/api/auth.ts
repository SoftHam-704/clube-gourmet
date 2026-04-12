import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

let _authInstance: any = null;

export const getAuth = (env?: any) => {
    // Se já está inicializado neste ciclo, retornamos
    if (_authInstance) return _authInstance;

    const authSecret = env?.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET || "p0tato_secret_change_me_in_production";
    const authUrl = env?.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:5174";

    const db = getDb(env);
    if (!db) {
        throw new Error("Banco de dados indisponível.");
    }

    _authInstance = betterAuth({
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
            "https://clubempar.com.br"
        ],
        advanced: {
            // Em desenvolvimento local não usamos secure cookies para facilitar o login em localhost
            useSecureCookies: (env?.NODE_ENV || process.env.NODE_ENV) === "production"
        }
    });

    return _authInstance;
};

export const auth = {
    handler: (req: Request) => getAuth().handler(req),
};
