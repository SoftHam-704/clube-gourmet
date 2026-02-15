import { AdminLayout } from "../../components/admin/AdminLayout";

const StatCard = ({ label, value, trend, icon }: { label: string; value: string; trend?: string; icon: React.ReactNode }) => (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 p-8 relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
        <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 bg-[#c9a961]/10 border border-[#c9a961]/20 flex items-center justify-center text-[#c9a961]">
                {icon}
            </div>
            {trend && <span className="font-mono text-[9px] font-black text-[#c9a961] bg-[#c9a961]/10 px-3 py-1 tracking-widest uppercase">{trend}</span>}
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[#d4c5a0]/40 font-mono text-[10px] tracking-[0.3em] uppercase font-black">{label}</span>
            <span className="text-4xl font-black tracking-tighter text-white">{value}</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a961]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
);

export default function AdminDashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <StatCard
                    label="Total de Membros"
                    value="1,248"
                    trend="+12% / m"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                />
                <StatCard
                    label="Receita Mensal"
                    value="R$ 45.920"
                    trend="+5% / m"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <StatCard
                    label="Cidades Ativas"
                    value="12"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <StatCard
                    label="Vouchers Resgatados"
                    value="352"
                    trend="Hoje"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Members */}
                <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 overflow-hidden">
                    <div className="p-8 border-b border-[#c9a961]/10 flex justify-between items-center">
                        <h3 className="font-display text-lg font-black tracking-tight uppercase">Membros Recentes</h3>
                        <button className="text-[#c9a961] font-mono text-[9px] font-black tracking-widest uppercase hover:underline">Ver Todos</button>
                    </div>
                    <div className="p-0">
                        {[
                            { name: "Hamilton Silva", email: "h...n@gmail.com", date: "Há 10 min", plan: "Platinum Family" },
                            { name: "Beatriz Oliveira", email: "b...z@outlook.com", date: "Há 25 min", plan: "Gold Individual" },
                            { name: "Ricardo Santos", email: "r...o@uol.com.br", date: "Há 1 hora", plan: "Platinum Family" },
                            { name: "Juliana Costa", email: "j...a@icloud.com", date: "Há 3 horas", plan: "Gold Individual" },
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-6 border-b border-[#c9a961]/5 hover:bg-[#c9a961]/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#c9a961]/10 border border-[#c9a961]/30 flex items-center justify-center font-mono text-[#c9a961] font-black text-xs">
                                        {user.name[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold tracking-tight">{user.name}</span>
                                        <span className="text-[#d4c5a0]/40 text-[10px] font-mono uppercase">{user.email}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <span className="text-[#c9a961] text-[10px] font-black tracking-widest uppercase">{user.plan}</span>
                                    <span className="text-[#d4c5a0]/30 text-[9px] font-mono">{user.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health / Logs */}
                <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 p-8 relative overflow-hidden h-full">
                    <h3 className="font-display text-lg font-black tracking-tight uppercase mb-8">Estado do Sistema</h3>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                <span className="text-white">Conexão com Banco de Dados</span>
                                <span className="text-[#c9a961]">Estável (24ms)</span>
                            </div>
                            <div className="h-1 bg-[#c9a961]/10">
                                <div className="h-full bg-[#c9a961] w-full shadow-[0_0_10px_#c9a961]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                <span className="text-white">Sincronização SaveInCloud</span>
                                <span className="text-[#c9a961]">100% Sincronizado</span>
                            </div>
                            <div className="h-1 bg-[#c9a961]/10">
                                <div className="h-full bg-[#c9a961] w-full opacity-80" />
                            </div>
                        </div>

                        <div className="mt-12 p-6 border border-[#c9a961]/10 bg-[#0a0a0a]/40 font-mono text-[10px] space-y-3">
                            <p className="text-[#c9a961]/40 border-b border-[#c9a961]/10 pb-2 mb-4 tracking-[0.2em] font-black uppercase">Recent System Logs</p>
                            <p className="text-[#c9a961]">[05:30:12] :: User login detected within 'campo-grande-ms'</p>
                            <p className="text-white/40">[05:28:45] :: Plan 'Annual Platinum' updated by admin</p>
                            <p className="text-white/40">[05:25:01] :: Database backup completed successfully</p>
                            <p className="text-white/40">[05:20:10] :: SSL Certificates verified</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
