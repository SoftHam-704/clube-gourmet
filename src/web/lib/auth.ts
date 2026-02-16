import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    // Since we are using Hono on the same origin /api/auth
    basePath: "/api/auth",
})
