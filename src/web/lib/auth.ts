import { createAuthClient } from "better-auth/react"
import { API_BASE } from "./config";

const baseURL = API_BASE || (typeof window !== "undefined" ? window.location.origin : "https://www.clubempar.com.br");

console.log("🌐 [Auth Client] Base URL:", baseURL);

export const authClient = createAuthClient({
    baseURL,
    basePath: "/api/auth",
})
