import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const REWARDS = [
    {
        title: "1 Mês de Cortesia",
        desc: "A cada amigo que assinar o plano anual através do seu link, você desbloqueia 30 dias de bônus.",
        icon: "🎁"
    },
    {
        title: "Créditos em Dinheiro",
        desc: "Acumule créditos para abater na sua próxima renovação ou use em eventos especiais do clube.",
        icon: "💰"
    },
    {
        title: "Ranking de Elite",
        desc: "Os maiores indicadores do mês recebem jantares exclusivos e mimos dos nossos parceiros.",
        icon: "🏆"
    }
];

export default function Referral() {
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
            // PROGRAMA DE PRESTÍGIO
                    </span>

                    <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-12 uppercase">
                        Indique e<br />
                        <span className="text-gradient-gold animate-gradient">Ganhe Vantagens.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-display max-w-4xl mx-auto">
                        Compartilhe a experiência do Club Empar com seus amigos e seja recompensado por expandir nossa elite gastronômica.
                    </p>
                </div>
            </section>

            {/* Rewards Grid */}
            <section className="py-40 bg-[#1a4d2e] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="font-display text-4xl lg:text-6xl font-black uppercase tracking-tighter">Recompensas de <span className="text-gradient-gold">Destaque</span></h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {REWARDS.map((reward, i) => (
                            <div key={i} className="p-10 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 relative group hover:border-[#c9a961] transition-all duration-700">
                                <div className="text-5xl mb-8 group-hover:rotate-12 transition-transform duration-500">{reward.icon}</div>
                                <h3 className="text-2xl font-display font-black mb-6 text-[#c9a961] group-hover:text-white transition-colors uppercase tracking-widest">{reward.title}</h3>
                                <p className="text-[#d4c5a0]/50 text-xl font-light leading-relaxed italic">"{reward.desc}"</p>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Referral Link Simulation Section */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-block p-12 bg-[#1a4d2e]/10 border border-[#c9a961]/20 relative">
                        {/* Fixed Brégnights for Link Box */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#c9a961]/40" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c9a961]/40" />

                        <h3 className="text-white font-display text-3xl font-black mb-8 uppercase tracking-widest">Seu Link de Convite</h3>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex-1 bg-white/5 border border-[#c9a961]/10 px-6 py-5 font-mono text-sm text-[#c9a961] select-all flex items-center justify-center">
                                clubempar.com.br/convite/vip-user-123
                            </div>
                            <button className="px-12 py-5 bg-[#c9a961] text-[#0a0a0a] font-black text-xs tracking-[0.4em] uppercase hover:glow-green transition-all shadow-2xl">
                                Copiar Link
                            </button>
                        </div>
                        <p className="text-[#d4c5a0]/40 text-sm italic font-light">"Ao convidar, você reforça nossa comunidade de apaixonados pela boa mesa."</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
