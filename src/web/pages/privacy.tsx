import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function Privacy() {
    const sections = [
        {
            title: "1. Coleta de Informações",
            content: "Coletamos informações básicas para o funcionamento da plataforma, como nome, e-mail, telefone e dados de pagamento (processados de forma criptografada por parceiros certificados). Também coletamos dados de localização para sugerir restaurantes próximos, caso autorizado."
        },
        {
            title: "2. Uso dos Dados",
            content: "Seus dados são utilizados para: processar sua assinatura, personalizar sua experiência, enviar notificações importantes sobre sua conta e, caso autorizado, comunicações de marketing sobre novos parceiros."
        },
        {
            title: "3. Compartilhamento de Dados",
            content: "Não vendemos seus dados pessoais a terceiros. Compartilhamos apenas as informações necessárias com os restaurantes parceiros para validar seu benefício no momento do uso (apenas seu nome e status da assinatura)."
        },
        {
            title: "4. Segurança",
            content: "Implementamos protocolos de segurança rigorosos (SSL, criptografia de ponta a ponta) para proteger suas informações contra acesso não autorizado, alteração ou destruição."
        },
        {
            title: "5. Seus Direitos (LGPD)",
            content: "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Também pode solicitar a portabilidade dos seus dados ou revogar o consentimento para comunicações de marketing através das configurações da sua conta."
        }
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <section className="pt-80 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#d4c5a0]/5 blur-[200px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <span className="text-[#d4c5a0] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
                        // LGPD & PRIVACY
                    </span>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase">
                        Política de<br />
                        <span className="text-gradient-gold animate-gradient">Privacidade.</span>
                    </h1>
                    <p className="text-[#d4c5a0]/40 font-mono text-xs tracking-widest uppercase">Última atualização: 14 de Fevereiro de 2026</p>
                </div>
            </section>

            <section className="pb-32 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#111] border border-[#d4c5a0]/10 p-12 lg:p-20 space-y-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#d4c5a0] to-transparent opacity-20" />

                        {sections.map((section, i) => (
                            <div key={i} className="space-y-6 group">
                                <h2 className="text-[#d4c5a0] font-display text-2xl lg:text-3xl font-black uppercase tracking-tight group-hover:text-white transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-[#d4c5a0]/60 leading-relaxed text-lg lg:text-xl font-light italic">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        <div className="pt-16 border-t border-[#d4c5a0]/10">
                            <p className="text-[#d4c5a0]/30 text-sm font-mono tracking-widest leading-loose">
                                Para questões sobre privacidade e LGPD, entre em contato com nosso DPO (Data Protection Officer) em <a href="mailto:privacidade@clubempar.com" className="text-[#d4c5a0] hover:underline">privacidade@clubempar.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
