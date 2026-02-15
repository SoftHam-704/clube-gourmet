import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const NavItem = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) => (
    <Link href={href}>
        <div className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 group cursor-pointer ${active
            ? "bg-[#c9a961] text-[#0a0a0a]"
            : "text-[#d4c5a0]/60 hover:bg-[#c9a961]/10 hover:text-white"
            }`}>
            <span className={`transition-transform duration-300 group-hover:scale-110`}>
                {icon}
            </span>
            <span className="font-mono text-[10px] font-black tracking-[0.3em] uppercase">
                {label}
            </span>
        </div>
    </Link>
);

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
    const [location, setLocation] = useLocation();

    // Proteção de Rota: Verifica se o admin está logado
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("clube_gourmet_admin") === "true";
        if (!isAuthenticated) {
            setLocation("/admin/login");
        }
    }, [location, setLocation]);

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            {/* Sidebar */}
            <aside className="w-80 border-r border-[#c9a961]/10 bg-[#0a0a0a] flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

                {/* Logo Area */}
                <div className="p-10 border-b border-[#c9a961]/10 relative group">
                    <Link href="/">
                        <div className="flex flex-col gap-1 cursor-pointer">
                            <span className="text-[#c9a961] font-display text-2xl font-black tracking-tighter">CLUB EMPAR</span>
                            <span className="text-[#c9a961]/40 font-mono text-[8px] tracking-[0.5em] uppercase font-black">Admin Console</span>
                        </div>
                    </Link>
                    <div className="absolute top-0 right-0 w-1 h-full bg-[#c9a961] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8">
                    <NavItem
                        href="/admin"
                        label="Dashboard"
                        active={location === "/admin"}
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                    />
                    <NavItem
                        href="/admin/plans"
                        label="Planos de Assinatura"
                        active={location === "/admin/plans"}
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                    <NavItem
                        href="/admin/cities"
                        label="Cidades Ativas"
                        active={location === "/admin/cities"}
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    />
                    <NavItem
                        href="/admin/restaurants"
                        label="Restaurantes"
                        active={location === "/admin/restaurants"}
                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                    />
                </nav>

                {/* User Footer */}
                <div className="p-8 border-t border-[#c9a961]/10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#c9a961]/10 border border-[#c9a961]/30 flex items-center justify-center font-mono text-[#c9a961] font-black">
                        W
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest uppercase">Webadmin</span>
                        <span className="text-[#c9a961]/40 text-[8px] uppercase tracking-tighter">Superuser</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative flex flex-col bg-[#1a4d2e] overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                {/* Header */}
                <header className="h-24 border-b border-[#c9a961]/10 bg-[#0a0a0a]/40 backdrop-blur-3xl flex items-center px-12 justify-between relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[#c9a961] font-mono text-[8px] tracking-[0.5em] uppercase font-black mb-1">Navigation / {title}</span>
                        <h1 className="font-display text-2xl font-black tracking-tighter uppercase">{title}</h1>
                    </div>

                    <div className="flex items-center gap-8">
                        <button className="text-[#d4c5a0]/40 hover:text-[#c9a961] transition-colors relative group">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c9a961] rounded-full animate-pulse" />
                        </button>
                        <div className="h-8 w-[1px] bg-[#c9a961]/20" />
                        <Link href="/">
                            <button className="font-mono text-[9px] font-black p-3 border border-[#c9a961]/30 hover:bg-[#c9a961] hover:text-[#0a0a0a] transition-all uppercase tracking-widest">
                                Voltar ao Site
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-12 relative z-0">
                    {children}
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none z-50" />
            </main>
        </div>
    );
};
