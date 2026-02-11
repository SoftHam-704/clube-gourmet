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
        <div className="bg-[#0a0a0a] min-h-screen text-white text-justify">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
                    <span className="text-[#ff3366] font-mono text-sm tracking-widest uppercase mb-4 block">// LGPD</span>
                    <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter mb-8">
                        Política de <span className="text-gradient">Privacidade</span>
                    </h1>
                    <p className="text-[#666] font-mono text-sm">Última atualização: 27 de Janeiro de 2026</p>
                </div>
            </section>

            <section className="pb-32 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 bg-[#111]/50 border border-[#222] p-8 lg:p-16 space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-4">
                            <h2 className="text-2xl font-bold text-white border-l-2 border-[#ff3366] pl-6">{section.title}</h2>
                            <p className="text-[#999] leading-relaxed text-lg pl-6">{section.content}</p>
                        </div>
                    ))}

                    <div className="pt-12 border-t border-[#222]">
                        <p className="text-[#666] text-sm">
                            Para questões sobre privacidade e LGPD, entre em contato com nosso DPO (Data Protection Officer) em <a href="mailto:privacidade@clubempar.com" className="text-[#ff3366] hover:underline">privacidade@clubempar.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
