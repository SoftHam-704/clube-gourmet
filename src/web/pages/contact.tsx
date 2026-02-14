import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function Contact() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#d4c5a0]/5 blur-[150px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div>
                            <span className="text-[#4ec985] font-mono text-sm tracking-widest uppercase mb-4 block">// Contato</span>
                            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter mb-8">
                                Estamos a um<br />
                                <span className="text-gradient">Clique</span> de Distância
                            </h1>

                            <div className="space-y-12 pt-8">
                                <div>
                                    <h3 className="text-[#666] font-mono text-xs uppercase tracking-widest mb-4">E-mail de Suporte</h3>
                                    <a href="mailto:suporte@clubempar.com" className="text-2xl font-bold hover:text-[#4ec985] transition-colors">suporte@clubempar.com</a>
                                </div>

                                <div>
                                    <h3 className="text-[#666] font-mono text-xs uppercase tracking-widest mb-4">Comercial & Parcerias</h3>
                                    <a href="mailto:parcerias@clubempar.com" className="text-2xl font-bold hover:text-[#4ec985] transition-colors">parcerias@clubempar.com</a>
                                </div>

                                <div>
                                    <h3 className="text-[#666] font-mono text-xs uppercase tracking-widest mb-4">Telefone/WhatsApp</h3>
                                    <p className="text-2xl font-bold text-white">(11) 99999-9999</p>
                                </div>

                                <div className="pt-8 flex gap-6">
                                    {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                                        <a key={social} href="#" className="px-4 py-2 border border-[#222] text-[#666] text-xs font-mono uppercase hover:border-[#4ec985] hover:text-[#4ec985] transition-all">
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="p-8 lg:p-12 border border-[#222] bg-[#111]/80 backdrop-blur-md relative">
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#4ec985]" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4c5a0]" />

                                <h2 className="text-2xl font-bold mb-8">Envie uma mensagem</h2>

                                <form className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[#666] text-xs font-mono uppercase tracking-widest">Nome Completo</label>
                                            <input type="text" className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-[#4ec985] outline-none transition-all font-mono text-sm" placeholder="Seu nome" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[#666] text-xs font-mono uppercase tracking-widest">E-mail</label>
                                            <input type="email" className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-[#4ec985] outline-none transition-all font-mono text-sm" placeholder="seu@email.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[#666] text-xs font-mono uppercase tracking-widest">Assunto</label>
                                        <select className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-[#4ec985] outline-none transition-all font-mono text-sm appearance-none cursor-pointer">
                                            <option>Dúvidas Gerais</option>
                                            <option>Problemas com Assinatura</option>
                                            <option>Seja um Parceiro</option>
                                            <option>Sugestão de Restaurante</option>
                                            <option>Outros</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[#666] text-xs font-mono uppercase tracking-widest">Mensagem</label>
                                        <textarea rows={5} className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] focus:border-[#4ec985] outline-none transition-all font-mono text-sm resize-none" placeholder="Como podemos ajudar?"></textarea>
                                    </div>

                                    <button type="button" className="w-full py-4 bg-[#4ec985] text-[#0a0a0a] font-bold uppercase tracking-wider text-sm hover:glow-green transition-all">
                                        Enviar Mensagem
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
