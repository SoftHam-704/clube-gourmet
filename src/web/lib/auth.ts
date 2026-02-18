import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Since we are using Hono on the same origin /api/auth
    basePath: "/api/auth",
})
