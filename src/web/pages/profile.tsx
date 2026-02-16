import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { authClient } from "../lib/auth";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function Profile() {
    const [, setLocation] = useLocation();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: ""
    });

    useEffect(() => {
        const checkSession = async () => {
            const session = await authClient.getSession();
            if (!session || !session.data) {
                setLocation("/sign-in");
                return;
            }
            setFormData({
                name: session.data.user.name,
                email: session.data.user.email,
                image: session.data.user.image || ""
            });
            setLoading(false);
        };
        checkSession();
    }, [setLocation]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    image: formData.image
                })
            });

            if (res.ok) {
                setMessage({ type: 'success', text: "Perfil atualizado com sucesso!" });
            } else {
                throw new Error("Erro ao salvar");
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Erro ao atualizar perfil. Tente novamente." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <main className="pt-40 pb-20 relative overflow-hidden flex items-center justify-center min-h-screen">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="max-w-2xl w-full px-6 relative">
                    <div className="bg-[#111]/80 backdrop-blur-3xl border border-[#c9a961]/20 p-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/5 blur-3xl -translate-y-16 translate-x-16" />

                        <div className="mb-12">
                            <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block animate-pulse">
                                // Identidade Gourmet
                            </span>
                            <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
                                Meu <span className="text-gradient-gold">Perfil</span>
                            </h1>
                        </div>

                        {message && (
                            <div className={`p-4 font-mono text-[10px] uppercase tracking-widest text-center mb-8 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 bg-[#c9a961]/10 border border-[#c9a961]/30 flex items-center justify-center relative overflow-hidden group/avatar">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-display font-black text-[#c9a961]">{formData.name[0]}</span>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-white">Alterar</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961]/40 px-6 py-4 outline-none transition-all text-sm font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">E-mail (Inalterável)</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full bg-white/5 border border-white/5 px-6 py-4 outline-none text-sm font-medium opacity-30 cursor-not-allowed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">URL da Imagem de Perfil</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961]/40 px-6 py-4 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full bg-[#c9a961] text-[#0a0a0a] py-5 font-black text-[10px] tracking-[0.4em] uppercase hover:glow-gold transition-all disabled:opacity-50"
                                >
                                    {saving ? 'Sincronizando...' : 'Salvar Alterações'}
                                </button>

                                <button
                                    type="button"
                                    onClick={async () => {
                                        await authClient.signOut();
                                        setLocation("/");
                                    }}
                                    className="w-full border border-red-500/20 text-red-500/60 py-4 font-black text-[10px] tracking-[0.3em] uppercase hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Encerrar Sessão
                                </button>
                            </div>
                        </form>

                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all duration-700" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all duration-700" />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
