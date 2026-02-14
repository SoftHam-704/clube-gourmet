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
        <div className="bg-[#1a4d2e] min-h-screen text-white text-justify">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
                    <span className="text-[#c9a961] font-mono text-sm tracking-widest uppercase mb-4 block">// Legal</span>
                    <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter mb-8">
                        Termos de <span className="text-gradient">Uso</span>
                    </h1>
                    <p className="text-[#666] font-mono text-sm">Última atualização: 27 de Janeiro de 2026</p>
                </div>
            </section>

            <section className="pb-32 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 bg-[#111]/50 border border-[#222] p-8 lg:p-16 space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-4">
                            <h2 className="text-2xl font-bold text-white border-l-2 border-[#c9a961] pl-6">{section.title}</h2>
                            <p className="text-[#999] leading-relaxed text-lg pl-6">{section.content}</p>
                        </div>
                    ))}

                    <div className="pt-12 border-t border-[#222]">
                        <p className="text-[#666] text-sm">
                            Para dúvidas sobre nossos termos, entre em contato através do e-mail <a href="mailto:legal@clubempar.com" className="text-[#c9a961] hover:underline">legal@clubempar.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
