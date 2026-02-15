import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

interface Plan {
    id: string;
    name: string;
    price: number;
    duration_months: number;
    description: string;
    active: boolean;
}

export default function AdminPlans() {
    const [activeTab, setActiveTab] = useState<"individual" | "family">("individual");

    const [plans] = useState<Plan[]>([
        { id: "monthly", name: "Plano Mensal", price: 49.90, duration_months: 1, description: "Ideal para quem quer começar agora", active: true },
        { id: "quarterly", name: "Plano Trimestral", price: 119.70, duration_months: 3, description: "Economize pagando por mais tempo", active: true },
        { id: "semiannual", name: "Plano Semestral", price: 215.40, duration_months: 6, description: "O equilíbrio perfeito entre preço e duração", active: true },
        { id: "annual", name: "Plano Anual", price: 394.80, duration_months: 12, description: "Melhor preço do ano — máxima economia", active: true },
        { id: "family-monthly", name: "Família Mensal", price: 159.64, duration_months: 1, description: "Quanto mais pessoas, maior o desconto!", active: true },
        { id: "family-quarterly", name: "Família Trimestral", price: 406.92, duration_months: 3, description: "Economia real pra todo mundo!", active: true },
        { id: "family-semiannual", name: "Família Semestral", price: 735.84, duration_months: 6, description: "Economia de verdade para sua família!", active: true },
        { id: "family-annual", name: "Família Anual", price: 1342.08, duration_months: 12, description: "Plano mais vantajoso familiar", active: true },
    ]);

    const filteredPlans = plans.filter(p =>
        activeTab === "individual" ? !p.id.startsWith("family") : p.id.startsWith("family")
    );

    return (
        <AdminLayout title="Gestão de Planos">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div className="flex p-2 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20">
                    <button
                        onClick={() => setActiveTab("individual")}
                        className={`px-8 py-2 font-black text-[9px] tracking-[0.3em] uppercase transition-all duration-500 ${activeTab === "individual" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/40 hover:text-white"}`}
                    >
                        Individual
                    </button>
                    <button
                        onClick={() => setActiveTab("family")}
                        className={`px-8 py-2 font-black text-[9px] tracking-[0.3em] uppercase transition-all duration-500 ${activeTab === "family" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/40 hover:text-white"}`}
                    >
                        Família
                    </button>
                </div>

                <button className="bg-[#c9a961] text-[#0a0a0a] px-8 py-3 font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,97,0.3)]">
                    Novo Plano {activeTab === "family" ? "Família" : "Individual"}
                </button>
            </div>

            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10">
                <table className="w-full text-left">
                    <thead className="border-b border-[#c9a961]/20">
                        <tr>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">ID/Slug</th>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Nome do Plano</th>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Preço (R$)</th>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Duração</th>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Status</th>
                            <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961] text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlans.map((plan) => (
                            <tr key={plan.id} className="border-b border-[#c9a961]/5 hover:bg-[#c9a961]/5 transition-colors group">
                                <td className="p-8">
                                    <span className="bg-[#c9a961]/10 text-[#c9a961] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest">{plan.id}</span>
                                </td>
                                <td className="p-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-white tracking-tight">{plan.name}</span>
                                        <span className="text-[#d4c5a0]/30 text-[10px] font-light max-w-xs">{plan.description}</span>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="text-white font-mono font-bold text-lg">R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </td>
                                <td className="p-8 text-[#d4c5a0]/60 font-mono text-[11px] uppercase tracking-wider">
                                    {plan.duration_months} Meses
                                </td>
                                <td className="p-8">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${plan.active ? "bg-green-500 shadow-[0_0_10px_green]" : "bg-red-500 opacity-30"}`} />
                                        <span className={`font-mono text-[9px] font-black uppercase tracking-widest ${plan.active ? "text-green-500" : "text-red-500/50"}`}>
                                            {plan.active ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 border border-[#c9a961]/20 hover:border-[#c9a961] text-[#c9a961] transition-all" title="Editar">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button className="p-3 border border-red-900/40 hover:border-500 text-red-900 hover:text-red-500 transition-all" title="Excluir">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-8 bg-[#0a0a0a]/20 border-t border-[#c9a961]/10 flex justify-center">
                    <p className="text-[#c9a961]/40 font-mono text-[8px] tracking-[0.5em] uppercase font-black italic">Security Key Required for Bulk Changes</p>
                </div>
            </div>
        </AdminLayout>
    );
}
