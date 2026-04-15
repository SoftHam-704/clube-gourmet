import { createAuthClient } from "better-auth/react"

const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
const baseURL = typeof window !== "undefined" ? window.location.origin : "https://www.clubempar.com.br";

console.log("🌐 [Auth Client] Base URL:", baseURL);

export const authClient = createAuthClient({
    baseURL,
    basePath: "/api/auth",
})

