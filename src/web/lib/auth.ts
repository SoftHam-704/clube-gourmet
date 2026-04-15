import { createAuthClient } from "better-auth/react"

const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
const baseURL = isLocal ? `http://localhost:${window.location.port || "5174"}` : "https://www.clubempar.com.br";

console.log("🌐 [Auth Client] Base URL:", baseURL);

export const authClient = createAuthClient({
    baseURL,
    basePath: "/api/auth",
})

