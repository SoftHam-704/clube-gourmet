import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function Contact() {
    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Hero Section - Identidade Visual Elite */}
            <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a4d2e]/40 blur-[150px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse lg:inline-block lg:mr-4">
            // CANAL EXCLUSIVO
                    </span>

                    <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase text-center lg:text-left">
                        Sempre à<br />
                        <span className="text-gradient-gold animate-gradient">Sua Disposição.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light max-w-3xl leading-relaxed italic font-display">
                        Nossa central de concierge está pronta para atender seus pedidos, dúvidas ou propostas de parceria com a agilidade que você merece.
                    </p>
                </div>
            </section>

            {/* Contact Content Grid */}
            <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-20 items-stretch">

                        {/* Left Side: Info & Channels */}
                        <div className="space-y-16">
                            <div className="space-y-6">
                                <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.4em] uppercase font-black">Canais de Atendimento</span>
                                <h2 className="font-display text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase whitespace-pre-line">
                                    Conecte-se com<br />o Extraordinário.
                                </h2>
                            </div>

                            <div className="grid gap-8">
                                {/* Whatsapp Card */}
                                <a
                                    href="https://wa.me/5566992412448"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-8 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative overflow-hidden transition-all duration-700 hover:border-[#c9a961]/40"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/5 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-[#c9a961]/20 transition-all" />
                                    <div className="relative flex items-center gap-8">
                                        <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center shrink-0 group-hover:border-[#c9a961] transition-colors">
                                            <span className="text-3xl">📱</span>
                                        </div>
                                        <div>
                                            <span className="block text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase mb-2">WhatsApp Concierge</span>
                                            <span className="text-2xl font-mono font-black text-white group-hover:text-gradient-gold transition-all">(66) 99241-2448</span>
                                        </div>
                                    </div>
                                </a>

                                {/* Email Card */}
                                <a
                                    href="mailto:contato@clubempar.com.br"
                                    className="group p-8 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative overflow-hidden transition-all duration-700 hover:border-[#c9a961]/40"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/5 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-[#c9a961]/20 transition-all" />
                                    <div className="relative flex items-center gap-8">
                                        <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center shrink-0 group-hover:border-[#c9a961] transition-colors">
                                            <span className="text-3xl">📧</span>
                                        </div>
                                        <div>
                                            <span className="block text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Suporte por E-mail</span>
                                            <span className="text-2xl font-mono font-black text-white group-hover:text-gradient-gold transition-all italic">contato@clubempar.com.br</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Social Linklets */}
                            <div className="pt-8">
                                <span className="block text-[#c9a961]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 ml-1">Presença Digital</span>
                                <div className="flex flex-wrap gap-4">
                                    {['Instagram', 'Linkedin', 'Twitter/X'].map(social => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="px-8 py-3 border border-[#c9a961]/10 bg-white/5 text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-[#c9a961] hover:border-[#c9a961] transition-all"
                                        >
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Message Form */}
                        <div className="relative">
                            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-10 lg:p-16 border border-[#c9a961]/20 relative shadow-[0_50px_100px_rgba(0,0,0,0.6)]">

                                {/* Fixed Brégnights for Form */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#c9a961]" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#c9a961]" />

                                <h3 className="text-white font-display text-3xl font-black mb-12 uppercase tracking-tight">Envie sua Mensagem</h3>

                                <form className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Seu Nome</label>
                                            <input
                                                type="text"
                                                className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10"
                                                placeholder="Nome Completo"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">E-mail Corporativo</label>
                                            <input
                                                type="email"
                                                className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10"
                                                placeholder="seu@dominio.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Assunto da Consulta</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium appearance-none cursor-pointer text-white/60"
                                            >
                                                <option className="bg-[#0a0a0a]">Suporte ao Membro</option>
                                                <option className="bg-[#0a0a0a]">Quero ser um Parceiro</option>
                                                <option className="bg-[#0a0a0a]">Club Empresas (B2B)</option>
                                                <option className="bg-[#0a0a0a]">Outros Assuntos</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a961] opacity-60">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Mensagem</label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium resize-none placeholder:text-white/10"
                                            placeholder="Como podemos ajudar você hoje?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-xs tracking-[0.5em] uppercase hover:glow-green hover:-translate-y-2 transition-all shadow-2xl"
                                    >
                                        Transmitir Mensagem
                                    </button>

                                    <div className="text-center">
                                        <p className="text-[#d4c5a0]/30 text-[9px] font-mono tracking-widest uppercase">
                                            Ao enviar, você concorda com nossos termos de privacidade de elite.
                                        </p>
                                    </div>
                                </form>

                                {/* Decorative scanline inside form */}
                                <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Decorative Final Section */}
            <section className="py-24 bg-[#0a0a0a] border-y border-[#c9a961]/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-12">
                    <div className="space-y-4">
                        <h4 className="text-[#c9a961] font-display text-2xl font-bold uppercase tracking-widest">Atendimento 24/7</h4>
                        <p className="text-white/40 text-lg font-light italic">"A excelência não faz pausas."</p>
                    </div>
                    <div className="flex gap-12">
                        <div className="text-center">
                            <div className="text-white font-mono text-xl font-black mb-1">98%</div>
                            <div className="text-[#c9a961]/40 text-[9px] tracking-widest uppercase font-black">Satisfeitos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-white font-mono text-xl font-black mb-1">2h</div>
                            <div className="text-[#c9a961]/40 text-[9px] tracking-widest uppercase font-black">Resp. Média</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
