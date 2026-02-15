import { useState } from "react";
import { useLocation, Link } from "wouter";

export default function AdminLogin() {
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Lógica de autenticação simplificada para o cliente testar
        // Futuramente conectaremos com o Better Auth
        if (email === "admin@emparclub.com.br" && password === "admin123") {
            setTimeout(() => {
                setLocation("/admin");
            }, 1500);
        } else {
            setTimeout(() => {
                setError("Credenciais inválidas. Verifique os dados de acesso.");
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a4d2e] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#c9a961]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c9a961]/5 blur-[150px] rounded-full" />
            <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-[#c9a961]/20 p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <Link href="/">
                            <div className="cursor-pointer group mb-4">
                                <h1 className="text-[#c9a961] font-display text-3xl font-black tracking-tighter transition-transform group-hover:scale-105">CLUB EMPAR</h1>
                                <div className="h-[2px] w-0 bg-[#c9a961] group-hover:w-full transition-all duration-500 mx-auto" />
                            </div>
                        </Link>
                        <p className="text-[#d4c5a0]/40 font-mono text-[9px] tracking-[0.5em] uppercase font-black">Admin Access Protocol</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[#d4c5a0]/60 font-mono text-[9px] font-black uppercase tracking-[0.2em] ml-1">Identity / Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@emparclub.com.br"
                                className="w-full bg-[#1a1a1a] border border-[#c9a961]/10 px-4 py-4 text-white font-mono text-sm focus:border-[#c9a961] focus:outline-none transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#d4c5a0]/60 font-mono text-[9px] font-black uppercase tracking-[0.2em] ml-1">Security / Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full bg-[#1a1a1a] border border-[#c9a961]/10 px-4 py-4 text-white font-mono text-sm focus:border-[#c9a961] focus:outline-none transition-all placeholder:text-white/10"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 animate-shake">
                                <p className="text-red-500 font-mono text-[10px] text-center uppercase tracking-wider">{error}</p>
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className={`w-full py-4 font-black text-[11px] tracking-[0.4em] uppercase transition-all relative overflow-hidden group
                ${isLoading ? "bg-[#c9a961]/20 text-[#c9a961]/40 cursor-wait" : "bg-[#c9a961] text-[#0a0a0a] hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_-5px_rgba(201,169,97,0.3)]"}`}
                        >
                            <span className="relative z-10">{isLoading ? "Autenticando..." : "Entrar no Sistema"}</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#c9a961]/5 flex flex-col items-center gap-4">
                        <Link href="/">
                            <span className="text-[#d4c5a0]/30 hover:text-[#d4c5a0]/60 text-[9px] font-mono uppercase tracking-[0.3em] cursor-pointer transition-colors border-b border-transparent hover:border-[#d4c5a0]/30 pb-1">Retornar à Home</span>
                        </Link>
                    </div>
                </div>

                {/* Console info */}
                <div className="mt-6 flex justify-between px-2 opacity-20 hover:opacity-100 transition-opacity">
                    <span className="text-[#c9a961] font-mono text-[8px] uppercase tracking-widest font-black">Server Status: Online</span>
                    <span className="text-[#c9a961] font-mono text-[8px] uppercase tracking-widest font-black">V.1.0.4-Stable</span>
                </div>
            </div>
        </div>
    );
}
