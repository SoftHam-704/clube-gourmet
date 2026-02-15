import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

interface Plan {
    id: string;
    name: string;
    price: number;
    duration_months: number;
    description: string;
    active: boolean;
    type: string;
}

export default function AdminPlans() {
    const [activeTab, setActiveTab] = useState<"individual" | "family">("individual");
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/membership-plans");
            const data = await res.json();
            setPlans(data);
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPlan) return;

        const method = plans.find(p => p.id === editingPlan.id) ? "PUT" : "POST";
        const url = method === "PUT" ? `/api/membership-plans/${editingPlan.id}` : "/api/membership-plans";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingPlan)
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchPlans();
            }
        } catch (error) {
            console.error("Erro ao salvar plano:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este plano?")) return;
        try {
            const res = await fetch(`/api/membership-plans/${id}`, { method: "DELETE" });
            if (res.ok) fetchPlans();
        } catch (error) {
            console.error("Erro ao excluir plano:", error);
        }
    };

    const openEditModal = (plan: Plan | null) => {
        setEditingPlan(plan || {
            id: "",
            name: "",
            price: 0,
            duration_months: 1,
            description: "",
            active: true,
            type: activeTab
        });
        setIsModalOpen(true);
    };

    const filteredPlans = plans.filter(p => {
        const isFamily = p.type === 'family' || p.id?.toLowerCase().includes('family') || p.id?.toLowerCase().includes('fam-');
        return activeTab === "individual" ? !isFamily : isFamily;
    });

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

                <button
                    onClick={() => openEditModal(null)}
                    className="bg-[#c9a961] text-[#0a0a0a] px-8 py-4 font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,97,0.3)]"
                >
                    Novo Plano {activeTab === "family" ? "Família" : "Individual"}
                </button>
            </div>

            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center font-mono text-[#c9a961] animate-pulse">Sincronizando com SaveInCloud...</div>
                ) : (
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
                                        <span className="text-white font-mono font-bold text-lg">R$ {Number(plan.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
                                            <button
                                                onClick={() => openEditModal(plan)}
                                                className="p-3 border border-[#c9a961]/20 hover:border-[#c9a961] text-[#c9a961] transition-all" title="Editar"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(plan.id)}
                                                className="p-3 border border-red-900/40 hover:border-red-500 text-red-900 hover:text-red-500 transition-all" title="Excluir"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="p-8 bg-[#0a0a0a]/20 border-t border-[#c9a961]/10 flex justify-center">
                    <p className="text-[#c9a961]/40 font-mono text-[8px] tracking-[0.5em] uppercase font-black italic">Security Key Required for Bulk Changes</p>
                </div>
            </div>

            {/* Modal de Edição */}
            {isModalOpen && editingPlan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-[#111] border border-[#c9a961]/30 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                        <h2 className="font-display text-4xl font-black text-white tracking-tighter uppercase mb-8">
                            {plans.find(p => p.id === editingPlan.id) ? "Editar Plano" : "Novo Plano"}
                        </h2>

                        <form onSubmit={handleSave} className="grid grid-cols-2 gap-8">
                            <div className="col-span-2">
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">ID / Slug</label>
                                <input
                                    type="text"
                                    value={editingPlan.id}
                                    onChange={e => setEditingPlan({ ...editingPlan, id: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 font-mono text-sm outline-none focus:border-[#c9a961]"
                                    disabled={!!plans.find(p => p.id === editingPlan.id)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Nome</label>
                                <input
                                    type="text"
                                    value={editingPlan.name}
                                    onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Preço (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={editingPlan.price}
                                    onChange={e => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Meses</label>
                                <input
                                    type="number"
                                    value={editingPlan.duration_months}
                                    onChange={e => setEditingPlan({ ...editingPlan, duration_months: Number(e.target.value) })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Tipo</label>
                                <select
                                    value={editingPlan.type}
                                    onChange={e => setEditingPlan({ ...editingPlan, type: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961] appearance-none"
                                >
                                    <option value="individual" className="bg-[#111]">Individual</option>
                                    <option value="family" className="bg-[#111]">Família</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Descrição</label>
                                <textarea
                                    value={editingPlan.description}
                                    onChange={e => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961] h-24 resize-none"
                                    required
                                />
                            </div>
                            <div className="col-span-2 flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={editingPlan.active}
                                    onChange={e => setEditingPlan({ ...editingPlan, active: e.target.checked })}
                                    className="w-5 h-5 accent-[#c9a961]"
                                />
                                <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white">Plano Ativo</label>
                            </div>
                            <div className="col-span-2 flex gap-4 mt-8">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#c9a961] text-[#0a0a0a] py-4 font-black text-[11px] tracking-[0.5em] uppercase hover:glow-green transition-all"
                                >
                                    Salvar Alterações
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-4 border border-[#c9a961]/20 text-white/40 font-black text-[11px] tracking-[0.5em] uppercase hover:text-white transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
