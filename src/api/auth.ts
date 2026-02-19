import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '../db/index.js';
import * as schema from './database/schema.js';

const db = getDb();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    // Permite que o auth aceite requisições vindas destas URLs
    trustedOrigins: [
        process.env.BETTER_AUTH_URL || "",
        "http://localhost:5173",
        "https://clube-gourmet.vercel.app",
        "https://clubempar.com.br",
        "https://www.clubempar.com.br"
    ],
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production"
    }
});
