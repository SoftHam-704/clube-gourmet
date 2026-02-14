import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const STATS = [
    { label: "FUNDAÇÃO", value: "2022", icon: "🏛️" },
    { label: "RESTAURANTES", value: "500+", icon: "🍽️" },
    { label: "MEMBROS ELITE", value: "15k+", icon: "👥" },
    { label: "ECONOMIA REAL", value: "R$ 2M+", icon: "💰" }
];

const VALUES = [
    {
        title: "EXCLUSIVIDADE",
        desc: "Acesso curado aos estabelecimentos mais prestigiados da região.",
        icon: "💎"
    },
    {
        title: "TRANSPARÊNCIA",
        desc: "Sem letras miúdas. Benefícios diretos, claros e imediatos em cada visita.",
        icon: "🤝"
    },
    {
        title: "INOVAÇÃO",
        desc: "Tecnologia de ponta para simplificar sua jornada gastronômica.",
        icon: "🚀"
    }
];

export default function About() {
    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Hero Section - Identidade Visual Home/Plans */}
            <section className="pt-56 pb-32 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a4d2e]/40 blur-[150px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
                        <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
                        // NOSSO MANIFESTO
                        </span>

                        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.85] tracking-tighter mb-12">
                            A Arte de<br />
                            <span className="text-gradient-gold animate-gradient">Viver Bem.</span>
                        </h1>
                        <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-display max-w-3xl">
                            Nascemos da convicção de que experiências memoráveis são o verdadeiro luxo. O Club Empar não é apenas um guia, é o seu passe para o extraordinário.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section - Estilo Glassmorphic de Luxo */}
            <section className="py-24 bg-[#1a4d2e] relative">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                        {STATS.map((stat, i) => (
                            <div key={i} className={`p-10 group hover:bg-[#c9a961]/5 transition-all duration-500 ${i !== STATS.length - 1 ? 'md:border-r border-[#c9a961]/10' : ''} border-b md:border-b-0 border-[#c9a961]/10`}>
                                <div className="text-2xl mb-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">{stat.icon}</div>
                                <div className="font-mono text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-[#c9a961] transition-colors">
                                    {stat.value}
                                </div>
                                <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative Section - Equilíbrio Visual */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <span className="text-[#c9a961] font-mono text-xs tracking-[0.4em] uppercase">// O QUE NOS MOVE</span>
                            <h2 className="font-display text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                                Mais que um Benefício,<br />
                                <span className="text-gradient-gold animate-gradient">Uma Cultura.</span>
                            </h2>
                            <div className="space-y-6 text-[#d4c5a0]/60 leading-relaxed text-xl font-light italic">
                                <p>
                                    "O Club Empar Gourmet surgiu para preencher o espaço entre o desejo por experiências autênticas e a acessibilidade inteligente."
                                </p>
                                <p>
                                    Fomentamos uma economia circular onde restaurantes parceiros operam em sua capacidade máxima e nossos membros redescobrem o prazer de jantar fora, sem restrições.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 pt-10">
                                <div className="p-8 bg-[#1a4d2e]/20 border border-[#c9a961]/10 relative group hover:border-[#c9a961]/40 transition-all">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />
                                    <h3 className="text-[#c9a961] font-mono text-[10px] uppercase font-black tracking-[0.3em] mb-4">Nossa Missão</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">Tornar a alta gastronomia o novo padrão de lazer para nossos membros, democratizando o acesso ao extraordinário.</p>
                                </div>
                                <div className="p-8 bg-[#1a4d2e]/20 border border-[#c9a961]/10 relative group hover:border-[#c9a961]/40 transition-all">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />
                                    <h3 className="text-[#d4c5a0] font-mono text-[10px] uppercase font-black tracking-[0.3em] mb-4">Nossa Visão</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">Ser o selo de qualidade indispensável para o amante da boa mesa em todo o território nacional.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Luxury Graphic Element */}
                            <div className="aspect-square bg-[#0a0a0a] border border-[#c9a961]/20 relative flex items-center justify-center overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 grid-bg opacity-20" />
                                <div className="absolute inset-10 border border-[#c9a961]/10 animate-spin-slow" />
                                <div className="absolute inset-20 border border-[#c9a961]/5 rotate-45" />

                                <span className="relative font-display text-9xl font-black text-gradient-gold opacity-40 animate-pulse">
                                    CE
                                </span>

                                {/* Corner accents - Brégnights */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#c9a961]" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c9a961]/40" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c9a961]/40" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#c9a961]" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#c9a961] text-[#0a0a0a] flex flex-col items-center justify-center rounded-none shadow-2xl p-6 rotate-12 group hover:rotate-0 transition-transform duration-700">
                                <span className="text-4xl mb-2">🏅</span>
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-center">Padrão de Excelência Certificado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Estilo Grid Premium */}
            <section className="py-40 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-28">
                    <span className="text-[#c9a961] font-mono text-[11px] tracking-[0.5em] uppercase mb-10 block animate-pulse">// FUNDAMENTOS</span>
                    <h2 className="font-display text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase whitespace-pre-line">
                        O DNA do<br />
                        <span className="text-gradient-gold animate-gradient">Club Empar</span>
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-10">
                    {VALUES.map((item, i) => (
                        <div key={i} className="p-12 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative group hover:border-[#c9a961] transition-all duration-700">
                            {/* Fixed Brégnights for values */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all" />

                            <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 block">{item.icon}</div>
                            <h3 className="text-2xl font-display font-black mb-6 tracking-widest text-[#c9a961] group-hover:text-white transition-colors">{item.title}</h3>
                            <p className="text-[#d4c5a0]/50 text-lg leading-relaxed font-light italic">"{item.desc}"</p>

                            {/* Decorative scanline */}
                            <div className="absolute inset-0 scanlines opacity-[0.02] pointer-events-none" />
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden text-center">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <h2 className="font-display text-5xl lg:text-7xl font-black text-white tracking-tighter mb-12 uppercase">
                        Faça Parte da<br />
                        <span className="text-gradient-gold animate-gradient">Nossa História.</span>
                    </h2>
                    <button className="px-16 py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-sm tracking-[0.4em] uppercase hover:glow-green hover:-translate-y-2 transition-all shadow-2xl">
                        Escolher Meu Plano
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
