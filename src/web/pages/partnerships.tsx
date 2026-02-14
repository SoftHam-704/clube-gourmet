import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const BENEFITS = [
    {
        title: "Aumento de Fluxo",
        desc: "Preencha suas mesas em horários de menor movimento com um público altamente qualificado.",
        icon: "📈"
    },
    {
        title: "Marketing de Elite",
        desc: "Sua marca exposta para mais de 15 mil membros que buscam ativamente novas experiências.",
        icon: "✨"
    },
    {
        title: "Ticket Médio Elevado",
        desc: "O incentivo do 2 por 1 encoraja o consumo de entradas, vinhos e sobremesas adicionais.",
        icon: "🍷"
    }
];

const STEPS = [
    {
        num: "01",
        title: "Solicitação",
        desc: "Preencha o formulário de interesse com os dados do seu estabelecimento."
    },
    {
        num: "02",
        title: "Curadoria",
        desc: "Nossa equipe avalia a compatibilidade do seu restaurante com o padrão do clube."
    },
    {
        num: "03",
        title: "Onboarding",
        desc: "Configuramos sua página no app e treinamos sua equipe para as validações."
    }
];

export default function Partnerships() {
    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a4d2e]/40 blur-[150px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
            // EXPANSÃO E PRESTÍGIO
                    </span>

                    <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-12 uppercase">
                        Seu Restaurante<br />
                        <span className="text-gradient-gold animate-gradient">Na Elite.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-display max-w-4xl mx-auto">
                        Junte-se ao Club Empar Gourmet e conecte seu estabelecimento ao público mais exclusivo da região. Otimize sua operação com inteligência.
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-40 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {BENEFITS.map((benefit, i) => (
                            <div key={i} className="p-10 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative group hover:border-[#c9a961] transition-all duration-700">
                                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{benefit.icon}</div>
                                <h3 className="text-2xl font-display font-black mb-6 text-[#c9a961] group-hover:text-white transition-colors uppercase tracking-widest">{benefit.title}</h3>
                                <p className="text-[#d4c5a0]/50 text-xl font-light leading-relaxed italic">"{benefit.desc}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative & Process Section */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <span className="text-[#c9a961] font-mono text-xs tracking-[0.4em] uppercase">// ALIANÇA ESTRATÉGICA</span>
                            <h2 className="font-display text-5xl lg:text-7xl font-black tracking-tighter leading-tight uppercase">
                                O Próximo Passo do<br />
                                <span className="text-gradient-gold animate-gradient">Seu Negócio.</span>
                            </h2>

                            <div className="space-y-8">
                                {STEPS.map((step, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <span className="font-mono text-4xl font-black text-[#c9a961]/20 group-hover:text-[#c9a961] transition-colors">{step.num}</span>
                                        <div>
                                            <h4 className="text-white font-bold text-xl uppercase tracking-wider mb-2">{step.title}</h4>
                                            <p className="text-[#d4c5a0]/50 font-light italic text-lg leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Application Form Card */}
                        <div className="relative">
                            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-10 lg:p-16 border border-[#c9a961]/20 relative shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
                                {/* Fixed Brégnights for Partner Form */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#c9a961]" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#c9a961]" />

                                <h3 className="text-white font-display text-3xl font-black mb-12 uppercase tracking-tight">Solicitar Parceria</h3>

                                <form className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Nome do Estabelecimento</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10 text-white"
                                            placeholder="Ex: Ristorante di Milano"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">E-mail Comercial</label>
                                            <input
                                                type="email"
                                                className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10 text-white"
                                                placeholder="comercial@restaurante.com"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">WhatsApp / Telefone</label>
                                            <input
                                                type="tel"
                                                className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10 text-white"
                                                placeholder="(00) 00000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[#c9a961] font-mono text-[10px] tracking-[0.3em] uppercase font-black">Cidade de Atuação</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-5 bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961] focus:bg-[#c9a961]/5 outline-none transition-all text-sm font-medium placeholder:text-white/10 text-white"
                                            placeholder="Cidade, Estado"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-xs tracking-[0.5em] uppercase hover:glow-green hover:-translate-y-2 transition-all shadow-2xl"
                                    >
                                        Enviar Candidatura
                                    </button>

                                    <p className="text-center text-[#d4c5a0]/30 text-[9px] font-mono tracking-widest uppercase">
                                        Ao enviar, você autoriza nossa equipe de curadoria a realizar o contato comercial.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Quote Section */}
            <section className="py-40 bg-[#1a4d2e] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div className="text-white/10 font-display text-[15rem] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                        ROI
                    </div>
                    <h3 className="text-white text-3xl lg:text-5xl font-light leading-snug italic font-display relative z-10">
                        "Não somos apenas um clube de descontos. Somos um selo de prestígio que valida a excelência do seu restaurante aos olhos dos membros."
                    </h3>
                    <div className="mt-12 h-px w-24 bg-[#c9a961]/40 mx-auto" />
                    <p className="mt-8 text-[#c9a961] font-mono text-xs tracking-[0.4em] uppercase font-black">DIRETORIA DE EXPANSÃO</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
