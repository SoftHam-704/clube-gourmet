import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { authClient } from "../../lib/auth";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const NavItem = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) => (
    <Link href={href}>
        <div className={`relative flex items-center gap-4 px-8 py-5 transition-all duration-500 group cursor-pointer overflow-hidden ${active
            ? "text-gold"
            : "text-foreground/40 hover:text-white"
            }`}>
            {/* Active Indicator Bar */}
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold shadow-[0_0_15px_rgba(201,169,97,0.5)] rounded-r-full" />
            )}

            {/* Background Glow on Hover/Active */}
            <div className={`absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${active ? 'opacity-100' : ''}`} />

            <span className={`relative z-10 transition-all duration-500 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(201,169,97,0.4)]' : 'group-hover:scale-110'}`}>
                {icon}
            </span>
            <span className="relative z-10 font-body text-xs font-bold tracking-[0.2em] uppercase">
                {label}
            </span>

            {/* Cyber Detail */}
            <div className={`absolute right-4 bottom-2 h-[1px] bg-gold/20 transition-all duration-700 ${active ? 'w-12' : 'w-0 group-hover:w-8'}`} />
        </div>
    </Link>
);

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
    const [location, setLocation] = useLocation();
    const { data: session, isPending } = authClient.useSession();
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        // Ignora enquanto está carregando
        if (isPending) return;

        const user = session?.user as any;
        console.log("🛡️ [Admin Guard] Status:", { 
            hasSession: !!session, 
            role: user?.role, 
            email: user?.email,
            path: location 
        });
        
        // Se após o carregamento não houver sessão, aguardamos um pouco antes de redirecionar
        // Isso evita loops se houver latência na sincronização de cookies
        if (!session) {
            console.warn("🚫 [Admin Guard] Session missing. Starting exit protocol...");
            const timer = setTimeout(() => {
                // Verificação dupla antes do redirect final
                if (!session) {
                    console.log("↪️ [Admin Guard] Executing redirect to login.");
                    setLocation("/admin/login");
                }
            }, 1000); // 1s para garantir estabilidade em redes lentas
            return () => clearTimeout(timer);
        }

        if (user?.role !== "admin") {
            console.warn("🚫 [Admin Guard] Privilege violation. Role:", user?.role);
            setLocation("/admin/login");
        }
    }, [session, isPending, setLocation, location]);


    // Enquanto está carregando ou se não temos usuário válido (e vamos ser redirecionados),
    // mostramos um estado de carregamento elegante ao invés do layout vazio.
    if (isPending) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
                <span className="text-gold/60 font-body text-xs tracking-[0.3em] uppercase font-bold animate-pulse">
                    Verificando Protocolos...
                </span>
            </div>
        );
    }

    // Se o carregamento terminou e não há usuário admin, não renderiza nada 
    // enquanto o redirecionamento do useEffect acontece.
    if (!session?.user || (session.user as any).role !== "admin") {
        return null;
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div 
            className="flex min-h-screen bg-background text-foreground selection:bg-gold selection:text-background font-body"
            onMouseMove={handleMouseMove}
            style={{ 
                //@ts-ignore
                "--mouse-x": `${mousePos.x}%`, 
                "--mouse-y": `${mousePos.y}%` 
            }}
        >
            {/* Sidebar */}
            <aside className="w-80 border-r border-gold/10 bg-card/60 backdrop-blur-3xl flex flex-col relative z-20">
                {/* Logo Area */}
                <div className="p-10 border-b border-gold/5 relative group">
                    <Link href="/">
                        <div className="flex flex-col gap-1 cursor-pointer">
                            <h1 className="text-gold font-display text-4xl font-bold tracking-tight">CLUB EMPAR</h1>
                            <span className="text-gold/40 font-body text-xs tracking-[0.4em] uppercase font-bold">Modo Executivo</span>
                        </div>
                    </Link>
                    
                    {/* Decorative Corner */}
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/40" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8">
                    <NavItem
                        href="/admin"
                        label="Dashboard"
                        active={location === "/admin"}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                    />
                    <NavItem
                        href="/admin/plans"
                        label="Assinaturas"
                        active={location === "/admin/plans"}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                    <NavItem
                        href="/admin/cities"
                        label="Cidades"
                        active={location === "/admin/cities"}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    />
                    <NavItem
                        href="/admin/restaurants"
                        label="Restaurantes"
                        active={location === "/admin/restaurants"}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
                    />
                </nav>

                {/* User Info Bar */}
                <div className="mx-6 mb-8 p-6 bg-gold/5 border border-gold/10 rounded-2xl flex items-center justify-between gap-4 group hover:bg-gold/10 transition-colors">
                    <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-display text-gold font-bold text-xl border border-gold/20 shrink-0">
                            {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold tracking-tight truncate">{session?.user?.name ?? "Admin"}</span>
                            <span className="text-gold/60 text-[10px] uppercase font-bold tracking-widest">Administrador</span>
                        </div>
                    </div>
                    <button
                        onClick={() => authClient.signOut().then(() => setLocation("/admin/login"))}
                        className="p-2 text-gold/30 hover:text-red-400 transition-colors bg-card/60 rounded-lg border border-gold/5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Cyber Background Background */}
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

                {/* Navbar */}
                <header className="h-24 border-b border-gold/10 bg-card/40 backdrop-blur-xl flex items-center px-16 justify-between relative z-30">
                    <div className="flex flex-col">
                        <span className="text-gold/60 font-body text-xs tracking-[0.3em] uppercase font-bold mb-1">{title}</span>
                        <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase italic">{title}</h2>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-foreground/60 group-hover:text-foreground transition-colors">Sistema Online</span>
                        </div>

                        <div className="h-4 w-[1px] bg-gold/20" />
                        
                        <Link href="/">
                            <button className="h-10 px-6 font-body text-[10px] font-black border border-gold/30 rounded-full hover:bg-gold hover:text-background transition-all uppercase tracking-[0.2em]">
                                Site Público
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content Container */}
                <main className="flex-1 overflow-y-auto p-16 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Scanline Effect Overlay (Very Subtle) */}
                <div className="absolute inset-0 scanlines opacity-[0.02] pointer-events-none z-50" />
            </div>
        </div>
    );
};
