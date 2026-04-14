import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://www.clubempar.com.br",
    basePath: "/api/auth",
})

