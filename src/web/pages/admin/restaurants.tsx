import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";

interface City {
    id: string;
    name: string;
    slug: string;
}

interface Restaurant {
    id?: number;
    name: string;
    cuisine: string;
    description: string;
    address: string;
    image: string;
    slug: string;
    highlighted: boolean;
    active: boolean;
    city_slug: string;
    city_name?: string;
}

export default function AdminRestaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingRes, setEditingRes] = useState<Restaurant | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resRes, cityRes] = await Promise.all([
                fetch("/api/restaurants"),
                fetch("/api/cities")
            ]);
            const resData = await resRes.json();
            const cityData = await cityRes.json();

            setRestaurants(Array.isArray(resData) ? resData : []);
            setCities(Array.isArray(cityData) ? cityData.filter((c: any) => c.active) : []);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRes) return;

        const isEdit = !!editingRes.id;
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api/restaurants/${editingRes.id}` : "/api/restaurants";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingRes)
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error("Erro ao salvar restaurante:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este restaurante?")) return;
        try {
            const res = await fetch(`/api/restaurants/${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Erro ao excluir restaurante:", error);
        }
    };

    const openEditModal = (res: Restaurant | null) => {
        setEditingRes(res || {
            name: "",
            cuisine: "",
            description: "",
            address: "",
            image: "",
            slug: "",
            highlighted: false,
            active: true,
            city_slug: cities[0]?.id || ""
        });
        setIsModalOpen(true);
    };

    return (
        <AdminLayout title="Restaurantes Parceiros">
            <div className="flex justify-end mb-12">
                <button
                    onClick={() => openEditModal(null)}
                    className="bg-[#c9a961] text-[#0a0a0a] px-8 py-4 font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,97,0.3)]"
                >
                    Novo Restaurante
                </button>
            </div>

            <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#c9a961]/10 overflow-hidden text-white">
                {loading ? (
                    <div className="p-20 text-center font-mono text-[#c9a961] animate-pulse">Consultando Restaurantes...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="border-b border-[#c9a961]/20">
                            <tr>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Logo/Slug</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Nome do Estabelecimento</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Cidade</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Categoria</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961]">Status</th>
                                <th className="p-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#c9a961] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants.map((res) => (
                                <tr key={res.id} className="border-b border-[#c9a961]/5 hover:bg-[#c9a961]/5 transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            {res.image ? (
                                                <img src={res.image} className="w-10 h-10 object-cover bg-white/5 border border-[#c9a961]/20 grayscale group-hover:grayscale-0 transition-all" />
                                            ) : (
                                                <div className="w-10 h-10 bg-white/5 border border-[#c9a961]/10 flex items-center justify-center text-[#c9a961]/40">🍽️</div>
                                            )}
                                            <span className="bg-[#c9a961]/10 text-[#c9a961] px-2 py-1 font-mono text-[8px] font-black uppercase tracking-widest">{res.slug}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white tracking-tight uppercase">{res.name}</span>
                                            {res.highlighted && <span className="text-[#c9a961] text-[8px] font-black uppercase tracking-[0.2em] mt-1">✨ Destaque</span>}
                                        </div>
                                    </td>
                                    <td className="p-8 text-[#d4c5a0]/60 font-mono text-[10px] uppercase tracking-wider">
                                        {res.city_name || "N/A"}
                                    </td>
                                    <td className="p-8 text-[#d4c5a0]/60 font-mono text-[10px] uppercase tracking-wider">
                                        {res.cuisine}
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${res.active ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500 opacity-30"}`} />
                                            <span className={`font-mono text-[8px] font-black uppercase tracking-widest ${res.active ? "text-green-500" : "text-red-500/50"}`}>
                                                {res.active ? "Ativo" : "Pausado"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(res)}
                                                className="p-2.5 border border-[#c9a961]/20 hover:border-[#c9a961] text-[#c9a961] transition-all"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(res.id!)}
                                                className="p-2.5 border border-red-900/40 hover:border-red-500 text-red-900 hover:text-red-500 transition-all"
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

                {!loading && restaurants.length === 0 && (
                    <div className="p-24 text-center">
                        <div className="text-[#c9a961]/20 font-mono text-sm uppercase tracking-[0.5em] mb-4">Sem registros ativos</div>
                        <p className="text-[#d4c5a0]/10 text-xs uppercase tracking-widest italic">A curadoria começa aqui.</p>
                    </div>
                )}
            </div>

            {/* Modal de Restaurante */}
            {isModalOpen && editingRes && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md overflow-y-auto pt-24 pb-24">
                    <div className="relative bg-[#0a0a0a] border border-[#c9a961]/30 p-12 max-w-4xl w-full shadow-[0_0_100px_rgba(0,0,0,0.8)] text-white">
                        <h2 className="font-display text-4xl font-black text-white tracking-tighter uppercase mb-10">
                            {editingRes.id ? "Ajustar Curadoria" : "Novo Restaurante"}
                        </h2>

                        <form onSubmit={handleSave} className="grid grid-cols-2 gap-x-12 gap-y-8">
                            <div className="col-span-2 lg:col-span-1">
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Nome da Casa</label>
                                <input
                                    type="text"
                                    value={editingRes.name}
                                    onChange={e => setEditingRes({ ...editingRes, name: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 outline-none focus:border-[#c9a961] transition-all"
                                    required
                                />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Slug / Link Único</label>
                                <input
                                    type="text"
                                    placeholder="ex: trattoria-bella-vista"
                                    value={editingRes.slug}
                                    onChange={e => setEditingRes({ ...editingRes, slug: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 font-mono text-xs outline-none focus:border-[#c9a961] transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Categoria / Culinária</label>
                                <input
                                    type="text"
                                    placeholder="ex: Italiana, Japonesa"
                                    value={editingRes.cuisine}
                                    onChange={e => setEditingRes({ ...editingRes, cuisine: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 outline-none focus:border-[#c9a961] transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Cidade Operante</label>
                                <select
                                    value={editingRes.city_slug}
                                    onChange={e => setEditingRes({ ...editingRes, city_slug: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 outline-none focus:border-[#c9a961] appearance-none"
                                    required
                                >
                                    <option value="" disabled className="bg-[#0a0a0a]">Selecione a cidade</option>
                                    {cities.map(city => (
                                        <option key={city.slug} value={city.slug} className="bg-[#0a0a0a]">{city.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Endereço Completo</label>
                                <input
                                    type="text"
                                    value={editingRes.address}
                                    onChange={e => setEditingRes({ ...editingRes, address: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 outline-none focus:border-[#c9a961] transition-all"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">Descrição Premium</label>
                                <textarea
                                    value={editingRes.description}
                                    onChange={e => setEditingRes({ ...editingRes, description: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 min-h-[120px] outline-none focus:border-[#c9a961] transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-[#c9a961]/60 mb-3">URL da Imagem de Destaque</label>
                                <input
                                    type="text"
                                    value={editingRes.image}
                                    onChange={e => setEditingRes({ ...editingRes, image: e.target.value })}
                                    className="w-full bg-[#c9a961]/5 border border-[#c9a961]/20 p-5 outline-none focus:border-[#c9a961] transition-all"
                                    required
                                />
                            </div>

                            <div className="flex gap-12">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        id="highlighted"
                                        checked={editingRes.highlighted}
                                        onChange={e => setEditingRes({ ...editingRes, highlighted: e.target.checked })}
                                        className="w-5 h-5 accent-[#c9a961]"
                                    />
                                    <label htmlFor="highlighted" className="font-mono text-[9px] tracking-[0.3em] uppercase text-white cursor-pointer italic">✨ Marcar como Destaque</label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={editingRes.active}
                                        onChange={e => setEditingRes({ ...editingRes, active: e.target.checked })}
                                        className="w-5 h-5 accent-[#c9a961]"
                                    />
                                    <label htmlFor="active" className="font-mono text-[9px] tracking-[0.3em] uppercase text-white cursor-pointer italic">Publicado no App</label>
                                </div>
                            </div>

                            <div className="col-span-2 flex gap-4 mt-12 pt-8 border-t border-[#c9a961]/10">
                                <button className="flex-1 bg-[#c9a961] text-[#0a0a0a] py-5 font-black text-xs tracking-[0.5em] uppercase hover:glow-green transition-all shadow-2xl">
                                    Salvar Estabelecimento
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-10 py-5 border border-[#c9a961]/20 text-white/40 font-black text-xs tracking-[0.5em] uppercase hover:text-white transition-all underline-offset-8 hover:underline"
                                >
                                    Descartar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
