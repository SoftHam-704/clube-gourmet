import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const B2B_BENEFITS = [
    {
        title: "Retenção de Talentos",
        desc: "Ofereça o benefício mais desejado: acesso à alta gastronomia com economia real para seus colaboradores.",
        icon: "💎"
    },
    {
        title: "Faturamento Único",
        desc: "Gestão simplificada com nota fiscal única para toda a empresa, independente do número de licenças.",
        icon: "📑"
    },
    {
        title: "Painel de Gestão",
        desc: "Dashboard exclusivo para o RH gerenciar acessos, inclusões e exclusões de membros em segundos.",
        icon: "📊"
    }
];

export default function Business() {
    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
            // CLUB EMPRESAS
                    </span>

                    <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase">
                        Benefício de<br />
                        <span className="text-gradient-gold animate-gradient">Alto Impacto.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-display max-w-4xl mx-auto">
                        Eleve o patamar dos benefícios da sua empresa. Proporcione experiências memoráveis para seus times com a eficiência de um plano corporativo.
                    </p>
                </div>
            </section>

            {/* Corporate Benefits Grid */}
            <section className="py-40 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {B2B_BENEFITS.map((benefit, i) => (
                            <div key={i} className="p-10 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative group hover:border-[#c9a961] transition-all duration-700">
                                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{benefit.icon}</div>
                                <h3 className="text-2xl font-display font-black mb-6 text-[#c9a961] group-hover:text-white transition-colors uppercase tracking-widest">{benefit.title}</h3>
                                <p className="text-[#d4c5a0]/50 text-xl font-light leading-relaxed italic">"{benefit.desc}"</p>
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Request Form */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <span className="text-[#c9a961] font-mono text-xs tracking-[0.4em] uppercase">// SOLUÇÕES CORPORATIVAS</span>
                            <h2 className="font-display text-5xl lg:text-7xl font-black tracking-tighter leading-tight uppercase">
                                Planos para<br />
                                <span className="text-gradient-gold animate-gradient">Equipes de Elite.</span>
                            </h2>
                            <p className="text-[#d4c5a0]/60 text-xl font-light italic leading-relaxed">
                                Personalizamos pacotes para empresas de todos os tamanhos, com condições exclusivas a partir de 10 colaboradores.
                            </p>
                            <div className="inline-flex items-center gap-6 p-8 border border-[#c9a961]/10 bg-[#1a4d2e]/10">
                                <span className="text-4xl">🏢</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-widest text-sm">Escalabilidade Garantida</h4>
                                    <p className="text-[#d4c5a0]/40 text-sm">De startups a multinacionais, temos o plano ideal.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-10 lg:p-16 border border-[#c9a961]/20 relative shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#c9a961]" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#c9a961]" />

                                <h3 className="text-white font-display text-3xl font-black mb-12 uppercase tracking-tight">Cotação Corporativa</h3>

                                <form className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Empresa</label>
                                        <input type="text" className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium text-white" placeholder="Nome da Empresa" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">E-mail Corporativo</label>
                                            <input type="email" className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium text-white" placeholder="rh@empresa.com" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Nº de Colaboradores</label>
                                            <select className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium text-white/50 appearance-none cursor-pointer">
                                                <option>10 a 50</option>
                                                <option>51 a 200</option>
                                                <option>Acima de 200</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="button" className="w-full py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-xs tracking-[0.5em] uppercase hover:glow-green transition-all shadow-2xl">
                                        Solicitar Proposta
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
