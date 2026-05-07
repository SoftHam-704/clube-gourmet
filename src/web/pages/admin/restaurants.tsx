import { API_BASE } from "@/lib/config";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { FiEdit2, FiTrash2, FiPlus, FiStar, FiCheck, FiX } from "react-icons/fi";

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
    image2?: string;
    image3?: string;
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
                fetch(`${API_BASE}/api/restaurants`, { credentials: 'include' }),
                fetch(`${API_BASE}/api/cities`, { credentials: 'include' })
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
        if (!confirm("Confirmar a exclusão permanente deste restaurante da curadoria?")) return;
        try {
            const res = await fetch(`${API_BASE}/api/restaurants/${id}`, { method: "DELETE", credentials: 'include' });
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
            image2: "",
            image3: "",
            slug: "",
            highlighted: false,
            active: true,
            city_slug: cities[0]?.slug || ""
        });
        setIsModalOpen(true);
    };

    return (
        <AdminLayout title="Curadoria de Restaurantes">
            <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                    <span className="text-gold/60 font-body text-xs tracking-[0.3em] uppercase font-bold">Gestão de Parceiros</span>
                    <h1 className="font-display text-4xl font-bold text-white tracking-tight uppercase italic">{restaurants.length} Estabelecimentos</h1>
                </div>
                <button
                    onClick={() => openEditModal(null)}
                    className="flex items-center gap-3 bg-gold text-background px-10 py-5 font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.3)]"
                >
                    <FiPlus size={18} /> Novo Restaurante
                </button>
            </div>

            <div className="bg-card/40 backdrop-blur-2xl border border-gold/10 rounded-[32px] overflow-hidden">
                {loading ? (
                    <div className="p-32 text-center">
                        <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
                        <div className="font-body text-xs text-gold/40 tracking-widest uppercase font-bold">Sincronizando Curadoria...</div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gold/10 bg-gold/5">
                                    <th className="p-10 font-body text-xs tracking-widest uppercase text-gold/60 font-bold">Estabelecimento</th>
                                    <th className="p-10 font-body text-xs tracking-widest uppercase text-gold/60 font-bold">Localização</th>
                                    <th className="p-10 font-body text-xs tracking-widest uppercase text-gold/60 font-bold">Categoria</th>
                                    <th className="p-10 font-body text-xs tracking-widest uppercase text-gold/60 font-bold">Status</th>
                                    <th className="p-10 font-body text-xs tracking-widest uppercase text-gold/60 font-bold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((res) => (
                                    <tr key={res.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors group">
                                        <td className="p-10">
                                            <div className="flex items-center gap-6">
                                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gold/20 group-hover:border-gold/40 transition-colors shrink-0">
                                                    {res.image ? (
                                                        <img src={res.image} className="w-full h-full object-cover" alt={res.name} />
                                                    ) : (
                                                        <div className="w-full h-full bg-gold/5 flex items-center justify-center text-gold/40 text-xl italic">R</div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-white group-hover:text-gold transition-colors">{res.name}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-gold/40 font-body text-[10px] tracking-widest uppercase font-bold">{res.slug}</span>
                                                        {res.highlighted && <span className="flex items-center gap-1 text-gold text-[8px] font-black uppercase tracking-[0.2em] bg-gold/10 px-2 py-0.5 rounded-full">✨ Destaque</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-10">
                                            <div className="flex flex-col">
                                                <span className="text-white/80 text-sm font-medium">{res.city_name || "Cidade não vinculada"}</span>
                                                <span className="text-gold/40 text-[10px] uppercase tracking-wider mt-1 font-bold">{res.address.split(',')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="p-10">
                                            <span className="text-gold/80 bg-gold/5 border border-gold/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase italic">
                                                {res.cuisine}
                                            </span>
                                        </td>
                                        <td className="p-10">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2.5 h-2.5 rounded-full ${res.active ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-red-500/20"}`} />
                                                <span className={`font-body text-[10px] font-bold uppercase tracking-widest ${res.active ? "text-green-500" : "text-white/20"}`}>
                                                    {res.active ? "Publicado" : "Pausado"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-10">
                                            <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all">
                                                <button
                                                    onClick={() => openEditModal(res)}
                                                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gold/5 border border-gold/10 text-gold hover:bg-gold hover:text-background transition-all"
                                                    title="Editar"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(res.id!)}
                                                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                    title="Excluir"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && restaurants.length === 0 && (
                    <div className="p-32 text-center bg-gold/5 italic">
                        <div className="text-gold/20 font-display text-4xl mb-4">Nenhum restaurante mapeado</div>
                        <p className="text-gold/40 font-body text-xs tracking-widest uppercase">Inicie sua curadoria clicando em "Novo Restaurante".</p>
                    </div>
                )}
            </div>

            {/* Modal Glassmorphism de Edição */}
            {isModalOpen && editingRes && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-background/90 backdrop-blur-xl transition-all animate-fade-in overflow-y-auto">
                    <div className="relative bg-card border border-gold/20 p-16 max-w-5xl w-full shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-[48px] my-auto">
                        <div className="flex justify-between items-start mb-16">
                            <div className="flex flex-col">
                                <span className="text-gold font-body text-xs tracking-[0.4em] uppercase font-bold mb-2">Protocolo de Registro</span>
                                <h2 className="font-display text-5xl font-bold text-white tracking-tight uppercase italic drop-shadow-md">
                                    {editingRes.id ? "Ajustar Estabelecimento" : "Criar Novo Registro"}
                                </h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-background transition-all">
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Dados Básicos */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="block text-gold/60 font-body text-xs tracking-widest uppercase font-bold mb-3">Nome da Casa</label>
                                        <input
                                            type="text"
                                            value={editingRes.name}
                                            onChange={e => setEditingRes({ ...editingRes, name: e.target.value })}
                                            className="w-full bg-background border border-gold/10 p-5 rounded-2xl outline-none focus:border-gold/40 transition-all font-bold text-lg"
                                            placeholder="Ex: Trattoria Di Napoli"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gold/60 font-body text-xs tracking-widest uppercase font-bold mb-3">Categoria</label>
                                        <input
                                            type="text"
                                            value={editingRes.cuisine}
                                            onChange={e => setEditingRes({ ...editingRes, cuisine: e.target.value })}
                                            className="w-full bg-background border border-gold/10 p-5 rounded-2xl outline-none focus:border-gold/40 transition-all"
                                            placeholder="Ex: Italiana"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gold/60 font-body text-xs tracking-widest uppercase font-bold mb-3">Cidade Operante</label>
                                        <select
                                            value={editingRes.city_slug}
                                            onChange={e => setEditingRes({ ...editingRes, city_slug: e.target.value })}
                                            className="w-full bg-background border border-gold/10 p-5 rounded-2xl outline-none focus:border-gold/40 transition-all appearance-none text-white/80"
                                            required
                                        >
                                            <option value="" disabled className="bg-card">Selecione</option>
                                            {cities.map(city => (
                                                <option key={city.slug} value={city.slug} className="bg-card">{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gold/60 font-body text-xs tracking-widest uppercase font-bold mb-3">Endereço Executivo</label>
                                    <input
                                        type="text"
                                        value={editingRes.address}
                                        onChange={e => setEditingRes({ ...editingRes, address: e.target.value })}
                                        className="w-full bg-background border border-gold/10 p-5 rounded-2xl outline-none focus:border-gold/40 transition-all"
                                        placeholder="Rua, Número, Bairro"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gold/60 font-body text-xs tracking-widest uppercase font-bold mb-3">Descrição Premium</label>
                                    <textarea
                                        value={editingRes.description}
                                        onChange={e => setEditingRes({ ...editingRes, description: e.target.value })}
                                        className="w-full bg-background border border-gold/10 p-6 rounded-2xl min-h-[160px] outline-none focus:border-gold/40 transition-all resize-none shadow-inner"
                                        placeholder="Conte a história e o diferencial gastronômico deste parceiro..."
                                        required
                                    />
                                </div>
                                
                                <div className="flex gap-10 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setEditingRes({ ...editingRes, highlighted: !editingRes.highlighted })}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all font-bold text-[10px] tracking-widest uppercase
                                            ${editingRes.highlighted ? 'bg-gold text-background border-gold' : 'border-gold/20 text-gold/40 hover:border-gold/40'}`}
                                    >
                                        <FiStar fill={editingRes.highlighted ? 'currentColor' : 'none'} />
                                        Destaque na Home
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setEditingRes({ ...editingRes, active: !editingRes.active })}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all font-bold text-[10px] tracking-widest uppercase
                                            ${editingRes.active ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20' : 'border-gold/20 text-gold/40 hover:border-gold/40'}`}
                                    >
                                        <FiCheck />
                                        Visível no App
                                    </button>
                                </div>
                            </div>

                            {/* Área de Mídia (Imagens com Compactação) */}
                            <div className="bg-gold/5 rounded-[32px] p-10 border border-gold/10 space-y-10">
                                <h3 className="font-display text-xl font-bold text-gold/80 italic border-b border-gold/10 pb-4">Identidade Visual (Compactação Ativa)</h3>
                                
                                <div className="space-y-8">
                                    <ImageUploader 
                                        label="Imagem Principal / Logo"
                                        currentImage={editingRes.image}
                                        onImageProcessed={(base64) => setEditingRes({...editingRes, image: base64})}
                                    />
                                    
                                    <div className="grid grid-cols-2 gap-8">
                                        <ImageUploader 
                                            label="Imagem de Capa"
                                            currentImage={editingRes.image2}
                                            onImageProcessed={(base64) => setEditingRes({...editingRes, image2: base64})}
                                        />
                                        <ImageUploader 
                                            label="Galeria de Pratos"
                                            currentImage={editingRes.image3}
                                            onImageProcessed={(base64) => setEditingRes({...editingRes, image3: base64})}
                                        />
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-background/50 rounded-2xl border border-gold/5">
                                    <label className="block text-gold/60 font-body text-[10px] tracking-widest uppercase font-bold mb-3">Slug (Gerado Automaticamente)</label>
                                    <input
                                        type="text"
                                        value={editingRes.slug}
                                        onChange={e => setEditingRes({ ...editingRes, slug: e.target.value })}
                                        className="w-full bg-transparent border-none p-0 outline-none font-mono text-xs text-gold transition-all"
                                        placeholder="nome-do-restaurante"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Ações Finais */}
                            <div className="col-span-full flex gap-6 pt-10 border-t border-gold/10 mt-4">
                                <button className="flex-1 bg-gold text-background py-6 rounded-2xl font-bold text-sm tracking-[0.4em] uppercase hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(201,169,97,0.2)]">
                                    Confirmar Curadoria
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-12 py-6 border border-gold/20 text-white/30 rounded-2xl font-bold text-sm tracking-[0.4em] uppercase hover:text-white transition-all"
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
