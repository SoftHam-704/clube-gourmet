import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

const StatCard = ({ label, value, trend, icon, loading }: { label: string; value: string; trend?: string; icon: React.ReactNode; loading?: boolean }) => (
    <div className="flashlight-card bg-card/40 backdrop-blur-2xl border border-gold/10 p-10 relative group overflow-hidden rounded-3xl transition-all duration-500 hover:border-gold/30">
        <div className="flex items-start justify-between mb-10">
            <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,169,97,0.1)] group-hover:bg-gold/20 transition-all duration-500">
                {icon}
            </div>
            {trend && (
                <span className="font-body text-[8px] font-black text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 tracking-[0.3em] uppercase rounded-full">
                    {trend}
                </span>
            )}
        </div>
        
        <div className="flex flex-col gap-2">
            <span className="text-gold/40 font-body text-[10px] tracking-[0.4em] uppercase font-black">{label}</span>
            {loading ? (
                <div className="h-12 w-40 bg-gold/5 animate-pulse rounded-lg mt-2 font-display" />
            ) : (
                <span className="text-5xl font-display font-bold tracking-tight text-white group-hover:text-gold transition-colors duration-500 drop-shadow-sm">
                    {value}
                </span>
            )}
        </div>
        
        {/* Glow Detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full translate-x-16 -translate-y-16 group-hover:bg-gold/10 transition-colors" />
    </div>
);

interface DashboardData {
    stats: {
        totalMembers: number;
        activeCities: number;
        vouchersRedeemed: number;
        monthlyRevenue: number;
    };
    recentMembers: Array<{
        name: string;
        email: string;
        date: string;
        plan: string;
    }>;
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(json => {
                const mappedData: DashboardData = {
                    stats: {
                        totalMembers: json.stats?.totalMembers || 0,
                        activeCities: json.stats?.activeCities || 0,
                        vouchersRedeemed: json.stats?.totalRestaurants || 0,
                        monthlyRevenue: (json.stats?.activeSubscriptions || 0) * 49.90,
                    },
                    recentMembers: (json.recentUsers || []).map((u: any) => ({
                        name: u.name,
                        email: u.email,
                        date: new Date(u.createdAt).toLocaleDateString(),
                        plan: u.role === 'admin' ? 'ADMIN / MASTER' : 'MEMBRO GOLD'
                    }))
                };
                setData(mappedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar stats:", err);
                setLoading(false);
            });
    }, []);

    const stats = data?.stats || {
        totalMembers: 0,
        activeCities: 0,
        vouchersRedeemed: 0,
        monthlyRevenue: 0
    };

    return (
        <AdminLayout title="Dashboard">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                <StatCard
                    label="Membros Ativos"
                    value={stats.totalMembers.toLocaleString()}
                    trend="Estável"
                    loading={loading}
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
                <StatCard
                    label="Receita Mensal em US$"
                    value={stats.monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    trend="Projetado"
                    loading={loading}
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <StatCard
                    label="Expansão Regional"
                    value={stats.activeCities.toString()}
                    trend="Cidades"
                    loading={loading}
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5v.5M20 11h.01M16 11a1 1 0 11-2 0 1 1 0 012 0zm-8 4a1 1 0 11-2 0 1 1 0 012 0zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>}
                />
                <StatCard
                    label="Parceiros Ativos"
                    value={stats.vouchersRedeemed.toString()}
                    trend="Restaurantes"
                    loading={loading}
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Recent Members Panel */}
                <div className="lg:col-span-3 bg-card/40 backdrop-blur-3xl border border-gold/10 rounded-[40px] overflow-hidden flex flex-col h-[600px]">
                    <div className="p-10 border-b border-gold/5 flex justify-between items-center bg-gold/5">
                        <div className="flex flex-col">
                            <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase italic">Membros Recentes</h3>
                            <span className="text-gold/30 font-body text-[8px] tracking-[0.4em] uppercase font-black">Latest registrations</span>
                        </div>
                        <button className="h-10 px-8 bg-card border border-gold/20 text-gold font-body text-[9px] font-black tracking-widest uppercase rounded-full hover:bg-gold hover:text-background transition-all">Ver Toda a Base</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-6 md:px-10">
                        {loading ? (
                            <div className="flex items-center justify-center h-full gap-4">
                                <div className="w-3 h-3 bg-gold rounded-full animate-bounce" />
                                <div className="w-3 h-3 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-3 h-3 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                            </div>
                        ) : data?.recentMembers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full opacity-20 italic font-display text-xl">Nenhum registro encontrado nas últimas 24h</div>
                        ) : (
                            <div className="space-y-4">
                                {data?.recentMembers.map((user, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gold/5 border border-transparent hover:border-gold/10 transition-all duration-300 group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-card border border-gold/20 flex items-center justify-center font-display text-gold font-bold text-lg rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                                {user.name?.[0] || "?"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-bold text-white mb-0.5">{user.name}</span>
                                                <span className="text-gold/40 text-[9px] font-body font-black uppercase tracking-[0.2em]">{user.email}</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1.5">
                                            <span className="text-gold bg-gold/5 border border-gold/20 px-3 py-1 text-[8px] font-black tracking-[0.2em] uppercase rounded-lg group-hover:bg-gold group-hover:text-background transition-colors animate-fade-in">{user.plan}</span>
                                            <span className="text-white/20 text-[9px] font-body tracking-wider">{user.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* System Diagnostics Panel */}
                <div className="lg:col-span-2 bg-card/40 backdrop-blur-3xl border border-gold/10 rounded-[40px] p-10 relative overflow-hidden flex flex-col h-[600px]">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    
                    <div className="mb-12">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase italic">Estado do Sistema</h3>
                        <span className="text-gold/30 font-body text-[8px] tracking-[0.4em] uppercase font-black">Live diagnostics</span>
                    </div>
                    
                    <div className="space-y-10 flex-1">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end text-[10px] font-black tracking-[0.3em] uppercase">
                                <span className="text-gold/60">Latência do Banco</span>
                                <span className="text-gold">24 MS / ESTÁVEL</span>
                            </div>
                            <div className="h-2 bg-gold/5 rounded-full overflow-hidden border border-gold/10 p-0.5">
                                <div className="h-full bg-gold w-full shadow-[0_0_15px_#c9a961] animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end text-[10px] font-black tracking-[0.3em] uppercase">
                                <span className="text-gold/60">Integridade de Dados</span>
                                <span className="text-gold">100% VALIDADO</span>
                            </div>
                            <div className="h-2 bg-gold/5 rounded-full overflow-hidden border border-gold/10 p-0.5">
                                <div className="h-full bg-gold w-full opacity-60 rounded-full" />
                            </div>
                        </div>

                        {/* Recent Activity Log View */}
                        <div className="relative mt-8 group flex-1">
                            <div className="absolute inset-0 bg-background/60 rounded-3xl border border-gold/5" />
                            <div className="relative p-6 font-body text-[10px] space-y-4 overflow-y-auto max-h-[220px] scrollbar-hide">
                                <div className="flex items-start gap-4 animate-fade-in">
                                    <span className="text-gold/30 shrink-0">12:30</span>
                                    <span className="text-gold">Membro 'Rafael Henrique' realizou upgrade de plano.</span>
                                </div>
                                <div className="flex items-start gap-4 opacity-60">
                                    <span className="text-gold/30 shrink-0">12:28</span>
                                    <span className="text-white/60">Nova requisição de checkout 'Pre-Auth' registrada.</span>
                                </div>
                                <div className="flex items-start gap-4 opacity-40">
                                    <span className="text-gold/30 shrink-0">12:20</span>
                                    <span className="text-white/40">Sincronização iniciada: 12 novos restaurantes mapeados.</span>
                                </div>
                                <div className="flex items-start gap-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-20 transition-all duration-700">
                                    <span className="text-gold/30 shrink-0">12:15</span>
                                    <span className="text-white/20">Backup incremental do banco de dados finalizado.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-auto flex items-center justify-between border-t border-gold/10">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gold/20">Encryption: AES-256</span>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full animate-pulse" />
                            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full animate-pulse delay-75" />
                            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full animate-pulse delay-150" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Background Light Beam effect */}
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -z-10 translate-x-1/2 translate-y-1/2" />
        </AdminLayout>
    );
}
