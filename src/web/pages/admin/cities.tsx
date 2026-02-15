import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

interface City {
    id: string;
    name: string;
    state: string;
    active: boolean;
    image?: string;
}

export default function AdminCities() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCity, setEditingCity] = useState<City | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCities = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/cities");
            const data = await res.json();
            setCities(data);
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCity) return;

        const exists = cities.find(c => c.id === editingCity.id);
        const method = exists ? "PUT" : "POST";
        const url = exists ? `/api/cities/${editingCity.id}` : "/api/cities";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingCity)
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchCities();
            }
        } catch (error) {
            console.error("Erro ao salvar cidade:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta cidade?")) return;
        try {
            const res = await fetch(`/api/cities/${id}`, { method: "DELETE" });
            if (res.ok) fetchCities();
        } catch (error) {
            console.error("Erro ao excluir cidade:", error);
        }
    };

    const openEditModal = (city: City | null) => {
        setEditingCity(city || {
            id: "",
            name: "",
            state: "",
            active: true,
            image: ""
        });
        setIsModalOpen(true);
    };

    return (
        <AdminLayout title="Cidades Ativas">
            <div className="flex justify-end mb-12">
                <button
                    onClick={() => openEditModal(null)}
                    className="bg-[#c9a961] text-[#0a0a0a] px-8 py-4 font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,97,0.3)]"
                >
                    Nova Cidade
                </button>
            </div>

            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center font-mono text-[#c9a961] animate-pulse">Consultando Cidades...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b border-[#c9a961]/20">
                            <tr>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">ID/Slug</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Nome da Cidade</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Estado (UF)</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Status</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map((city) => (
                                <tr key={city.id} className="border-b border-[#c9a961]/5 hover:bg-[#c9a961]/5 transition-colors group">
                                    <td className="p-8">
                                        <span className="bg-[#c9a961]/10 text-[#c9a961] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest">{city.id}</span>
                                    </td>
                                    <td className="p-8 font-bold text-white tracking-tight">
                                        {city.name}
                                    </td>
                                    <td className="p-8 text-[#d4c5a0]/60 font-mono text-[11px] uppercase tracking-wider">
                                        {city.state}
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${city.active ? "bg-green-500 shadow-[0_0_10px_green]" : "bg-red-500 opacity-30"}`} />
                                            <span className={`font-mono text-[9px] font-black uppercase tracking-widest ${city.active ? "text-green-500" : "text-red-500/50"}`}>
                                                {city.active ? "Ativa" : "Inativa"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(city)}
                                                className="p-3 border border-[#c9a961]/20 hover:border-[#c9a961] text-[#c9a961] transition-all" title="Editar"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(city.id)}
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

                {!loading && cities.length === 0 && (
                    <div className="p-20 text-center font-mono text-[#d4c5a0]/20 uppercase tracking-[0.5em]">Nenhuma cidade cadastrada</div>
                )}
            </div>

            {/* Modal de Cidade */}
            {isModalOpen && editingCity && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-[#111] border border-[#c9a961]/30 p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                        <h2 className="font-display text-4xl font-black text-white tracking-tighter uppercase mb-8">
                            {cities.find(c => c.id === editingCity.id) ? "Editar Cidade" : "Nova Cidade"}
                        </h2>

                        <form onSubmit={handleSave} className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">ID / Slug</label>
                                <input
                                    type="text"
                                    placeholder="ex: sao-paulo"
                                    value={editingCity.id}
                                    onChange={e => setEditingCity({ ...editingCity, id: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 font-mono text-sm outline-none focus:border-[#c9a961]"
                                    disabled={!!cities.find(c => c.id === editingCity.id)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">UF</label>
                                <input
                                    type="text"
                                    maxLength={2}
                                    placeholder="SP"
                                    value={editingCity.state}
                                    onChange={e => setEditingCity({ ...editingCity, state: e.target.value.toUpperCase() })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961] font-mono"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">Nome da Cidade</label>
                                <input
                                    type="text"
                                    value={editingCity.name}
                                    onChange={e => setEditingCity({ ...editingCity, name: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961]"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-2">URL da Imagem (Opcional)</label>
                                <input
                                    type="text"
                                    value={editingCity.image}
                                    onChange={e => setEditingCity({ ...editingCity, image: e.target.value })}
                                    className="w-full bg-white/5 border border-[#c9a961]/20 p-4 text-sm outline-none focus:border-[#c9a961]"
                                />
                            </div>
                            <div className="col-span-2 flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={editingCity.active}
                                    onChange={e => setEditingCity({ ...editingCity, active: e.target.checked })}
                                    className="w-5 h-5 accent-[#c9a961]"
                                />
                                <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white">Cidade Operante</label>
                            </div>
                            <div className="col-span-2 flex gap-4 mt-8">
                                <button className="flex-1 bg-[#c9a961] text-[#0a0a0a] py-4 font-black text-[11px] tracking-[0.5em] uppercase hover:glow-green transition-all shadow-2xl">
                                    Confirmar Localidade
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
