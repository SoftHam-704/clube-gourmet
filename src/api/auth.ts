import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

let _auth: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
    if (_auth) return _auth;

    const db = getDb();
    if (!db) throw new Error("DATABASE_URL não definida ou DB inacessível");

    _auth = betterAuth({
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
                    input: false, // Prevent user from setting their own role during sign-up
                }
            }
        },
        emailAndPassword: {
            enabled: true,
        },
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        trustedOrigins: [
            process.env.BETTER_AUTH_URL || "",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "https://clubempar.com.br",
            "https://www.clubempar.com.br"
        ],
        advanced: {
            useSecureCookies: process.env.NODE_ENV === "production"
        }
    });

    return _auth;
};

// Mantém compatibilidade com imports legados que usam `auth` diretamente
export const auth = {
    handler: (req: Request) => getAuth().handler(req),
    api: new Proxy({} as ReturnType<typeof betterAuth>['api'], {
        get(_target, prop) {
            return (getAuth().api as any)[prop as string];
        }
    })
};
