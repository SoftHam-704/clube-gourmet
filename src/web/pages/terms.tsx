import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function Terms() {
    const sections = [
        {
            title: "1. Aceitação dos Termos",
            content: "Ao acessar e utilizar a plataforma Club Empar, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços."
        },
        {
            title: "2. O Serviço",
            content: "O Club Empar oferece uma assinatura que concede benefícios do tipo 'compre um prato principal e ganhe outro de igual ou menor valor' em estabelecimentos parceiros. Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento."
        },
        {
            title: "3. Assinaturas e Pagamentos",
            content: "As assinaturas são processadas através de gateways de pagamento seguros. Planos anuais e mensais são renovados automaticamente, a menos que sejam cancelados pelo usuário antes da data de renovação. Não oferecemos reembolsos para períodos parciais de utilização."
        },
        {
            title: "4. Regras de Utilização",
            content: "O benefício do Club Empar é válido para o titular da assinatura (ou dependentes no plano família). É proibida a venda, empréstimo ou uso comercial dos benefícios. O restaurante parceiro tem o direito de verificar a identidade do membro através do cartão digital e documento oficial."
        },
        {
            title: "5. Limitação de Responsabilidade",
            content: "O Club Empar atua como intermediário. Não somos responsáveis pela qualidade da comida, atendimento ou segurança nos estabelecimentos parceiros. Qualquer reclamação sobre o serviço do restaurante deve ser dirigida diretamente ao estabelecimento."
        }
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <section className="pt-56 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c9a961]/5 blur-[200px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
                        // LEGAL & COMPLIANCE
                    </span>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase">
                        Termos de<br />
                        <span className="text-gradient-gold animate-gradient">Uso.</span>
                    </h1>
                    <p className="text-[#d4c5a0]/40 font-mono text-xs tracking-widest uppercase">Última atualização: 14 de Fevereiro de 2026</p>
                </div>
            </section>

            <section className="pb-32 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#111] border border-[#c9a961]/10 p-12 lg:p-20 space-y-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#c9a961] to-transparent opacity-20" />

                        {sections.map((section, i) => (
                            <div key={i} className="space-y-6 group">
                                <h2 className="text-[#c9a961] font-display text-2xl lg:text-3xl font-black uppercase tracking-tight group-hover:text-white transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-[#d4c5a0]/60 leading-relaxed text-lg lg:text-xl font-light italic">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        <div className="pt-16 border-t border-[#c9a961]/10">
                            <p className="text-[#d4c5a0]/30 text-sm font-mono tracking-widest leading-loose">
                                Para esclarecimentos adicionais sobre nossas diretrizes jurídicas, contate nosso departamento via <a href="mailto:legal@clubempar.com" className="text-[#c9a961] hover:underline">legal@clubempar.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
