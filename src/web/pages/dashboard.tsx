import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { authClient } from "../lib/auth";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

interface DashboardData {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
        subscription: {
            status: string;
            plan: string;
            price: string;
            expiresAt: string;
        } | null;
    };
    stats: {
        totalResgates: number;
        economizado: number;
    };
    activeQr: {
        id: number;
        restaurant_name: string;
        codigo_qr: string;
        data_validade: string;
    } | null;
    favorites: Array<{
        id: number;
        name: string;
        image: string;
        cuisine: string;
        slug: string;
    }>;
    history: Array<{
        id: number;
        restaurant: string;
        cuisine: string;
        date: string;
        status: string;
        image: string;
    }>;
}

export default function Dashboard() {
    const [, setLocation] = useLocation();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDashboard = async () => {
            const session = await authClient.getSession();
            if (!session || !session.data) {
                setLocation("/sign-in");
                return;
            }

            try {
                // Fetch dashboard data and favorites
                const [dashRes, favRes] = await Promise.all([
                    fetch("/api/user-dashboard"),
                    fetch("/api/favorites")
                ]);

                const dashJson = await dashRes.json();
                const favJson = await favRes.json();

                if (dashJson.isError) throw new Error(dashJson.message);

                setData({
                    ...dashJson,
                    favorites: Array.isArray(favJson) ? favJson : []
                });
            } catch (err) {
                console.error("Erro ao carregar dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDashboard();
    }, [setLocation]);

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-2 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin" />
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#c9a961] animate-pulse">Autenticando Identidade...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Header / Hero Section */}
            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#c9a961]/10 to-transparent opacity-30" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block animate-pulse">
                                // Bem-vindo ao Clube
                            </span>
                            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                                {data.user.name.split(' ')[0]} <span className="text-gradient-gold">Gourmet.</span>
                            </h1>
                            <div className="flex items-center gap-4 text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">
                                <span>{data.user.email}</span>
                                <span className="w-1 h-1 bg-[#c9a961]/30 rounded-full" />
                                <span className="text-[#c9a961]">ID: #{data.user.id.slice(0, 8)}</span>
                                <span className="w-1 h-1 bg-[#c9a961]/30 rounded-full" />
                                <Link href="/profile" className="text-[#c9a961] hover:underline hover:text-white transition-colors cursor-pointer capitalize">
                                    Editar Perfil
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#111] border border-[#c9a961]/20 p-6 flex flex-col gap-1 min-w-[200px]">
                                <span className="text-[#d4c5a0]/30 text-[9px] font-mono uppercase tracking-widest font-black">Membership Status</span>
                                <span className={`text-sm font-black uppercase tracking-tighter ${data.user.subscription ? 'text-[#c9a961]' : 'text-white/20'}`}>
                                    {data.user.subscription ? data.user.subscription.plan : 'Sem Assinatura Ativa'}
                                </span>
                            </div>
                            <div className="bg-[#c9a961] text-[#0a0a0a] p-6 flex flex-col gap-1 min-w-[150px] shadow-[0_0_30px_rgba(201,169,97,0.2)]">
                                <span className="text-[#0a0a0a]/40 text-[9px] font-mono uppercase tracking-widest font-black">Wallet Eco</span>
                                <span className="text-xl font-black tracking-tighter leading-none">
                                    R$ {data.stats.economizado}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="pb-32 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: QR Code & Quick Actions */}
                    <div className="space-y-12">
                        {/* QR Code Section */}
                        <div className="bg-[#111] border border-[#c9a961]/30 p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/5 blur-3xl -translate-y-12 translate-x-12" />
                            <h3 className="font-display text-xl font-black uppercase tracking-tighter text-[#c9a961] mb-8">
                                Próximo Resgate
                            </h3>

                            {data.activeQr ? (
                                <div className="text-center space-y-8">
                                    <div className="relative inline-block p-4 bg-white rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${data.activeQr.codigo_qr}`}
                                            alt="Voucher QR Code"
                                            className="w-48 h-48"
                                        />
                                        <div className="absolute inset-0 border-4 border-[#c9a961]/20 rounded-xl pointer-events-none" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg mb-1">{data.activeQr.restaurant_name}</div>
                                        <div className="text-[#d4c5a0]/40 font-mono text-[9px] uppercase tracking-[0.3em]">
                                            Expira em: {new Date(data.activeQr.data_validade).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-[#c9a961]/10 font-mono text-[10px] text-[#c9a961] uppercase tracking-[0.25em] font-black">
                                        Apresente no Local
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10 space-y-6">
                                    <div className="text-4xl opacity-20 group-hover:scale-110 transition-transform duration-700">🎟️</div>
                                    <p className="text-[#d4c5a0]/40 text-xs italic">Nenhum resgate ativo no momento.</p>
                                    <Link href="/restaurants">
                                        <button className="w-full py-4 border border-[#c9a961]/20 text-white font-black text-[10px] tracking-widest uppercase hover:bg-[#c9a961] hover:text-[#0a0a0a] transition-all">
                                            Explorar Restaurantes
                                        </button>
                                    </Link>
                                </div>
                            )}

                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all duration-700" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all duration-700" />
                        </div>

                        {/* Subscription Management */}
                        <div className="bg-[#111] border border-[#c9a961]/10 p-10">
                            <h3 className="font-display text-lg font-black uppercase tracking-tighter text-white mb-6">Assinatura</h3>
                            {data.user.subscription ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-[#d4c5a0]/40 text-xs font-light">Plano Atual</span>
                                        <span className="font-bold text-xs uppercase text-[#c9a961]">{data.user.subscription.plan}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                                        <span className="text-[#d4c5a0]/40 text-xs font-light">Renovação</span>
                                        <span className="font-bold text-xs uppercase">{new Date(data.user.subscription.expiresAt).toLocaleDateString()}</span>
                                    </div>
                                    <button className="w-full mt-6 py-4 bg-white/5 text-white/40 font-black text-[9px] tracking-widest uppercase hover:text-[#c9a961] transition-all">
                                        Gerenciar Pagamento
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="text-[#d4c5a0]/40 text-xs font-light leading-relaxed">
                                        Você ainda não possui um plano ativo. Ative agora para desbloquear benefícios exclusivos.
                                    </p>
                                    <Link href="/plans">
                                        <button className="w-full py-5 bg-[#c9a961] text-[#0a0a0a] font-black text-[10px] tracking-widest uppercase hover:glow-gold transition-all">
                                            Assinar Agora
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: History & Stats */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-[#111] border border-[#c9a961]/10 p-8">
                                <div className="text-3xl font-display font-black text-[#c9a961] mb-1">{data.stats.totalResgates}</div>
                                <div className="text-[#d4c5a0]/40 font-mono text-[9px] uppercase tracking-[0.2em] font-black">Restaurantes Visitados</div>
                            </div>
                            <div className="bg-[#111] border border-[#c9a961]/10 p-8">
                                <div className="text-3xl font-display font-black text-[#c9a961] mb-1">Top 5%</div>
                                <div className="text-[#d4c5a0]/40 font-mono text-[9px] uppercase tracking-[0.2em] font-black">Elite Ranking</div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#111] border border-[#c9a961]/10 overflow-hidden">
                            <div className="p-8 border-b border-[#c9a961]/10 flex justify-between items-center">
                                <h3 className="font-display text-xl font-black uppercase tracking-tighter text-white">Atividade Recente</h3>
                            </div>

                            <div className="p-0">
                                {data.history.length === 0 ? (
                                    <div className="p-20 text-center text-[#d4c5a0]/20 font-mono text-[10px] uppercase tracking-widest">
                                        Nenhuma atividade registrada.
                                    </div>
                                ) : (
                                    data.history.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-8 border-b border-white/5 hover:bg-white/5 transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-20 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                    <img src={item.image} alt={item.restaurant} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[#c9a961] font-mono text-[8px] uppercase tracking-widest font-black">{item.cuisine}</span>
                                                    <span className="text-white font-bold text-lg tracking-tight group-hover:text-gradient-gold transition-all">{item.restaurant}</span>
                                                    <span className="text-[#d4c5a0]/40 text-[10px] font-mono">{item.date}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-4 py-1 font-mono text-[9px] font-black uppercase tracking-widest ${item.status === 'Utilizado' ? 'bg-white/5 text-white/20' : 'bg-[#c9a961]/10 text-[#c9a961]'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Favorites */}
                        <div className="bg-[#111] border border-[#c9a961]/10 overflow-hidden mt-12">
                            <div className="p-8 border-b border-[#c9a961]/10 flex justify-between items-center">
                                <h3 className="font-display text-xl font-black uppercase tracking-tighter text-white">Meus Favoritos</h3>
                            </div>

                            <div className="p-8">
                                {data.favorites.length === 0 ? (
                                    <div className="py-10 text-center text-[#d4c5a0]/20 font-mono text-[10px] uppercase tracking-widest border border-dashed border-white/5">
                                        Nenhum restaurante favoritado.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {data.favorites.map((fav) => (
                                            <Link key={fav.id} href={`/restaurants#${fav.slug}`}>
                                                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-[#c9a961]/30 transition-all cursor-pointer group/fav">
                                                    <div className="w-16 h-16 overflow-hidden">
                                                        <img src={fav.image} alt={fav.name} className="w-full h-full object-cover grayscale group-hover/fav:grayscale-0 transition-all" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[8px] font-mono text-[#c9a961] uppercase tracking-widest">{fav.cuisine}</div>
                                                        <div className="text-white font-bold text-sm tracking-tight">{fav.name}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
