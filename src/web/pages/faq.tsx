import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const FAQ_CATEGORIES = [
    { id: "general", name: "Geral" },
    { id: "payments", name: "Pagamentos" },
    { id: "usage", name: "Como Usar" },
    { id: "restaurants", name: "Restaurantes" }
];

const FAQS = [
    {
        category: "general",
        question: "O que é o Club Empar?",
        answer: "O Club Empar é um clube de benefícios exclusivo para amantes da gastronomia. Membros têm direito ao benefício '2 por 1' em todos os restaurantes parceiros: você compra um prato principal e ganha outro de igual ou menor valor."
    },
    {
        category: "general",
        question: "Qual o valor da assinatura?",
        answer: "Temos três planos: o Mensal (R$29,90), o Anual (R$299,00) e o Família (R$449,00 para até 4 pessoas). O plano anual é o mais popular pois oferece o melhor custo-benefício."
    },
    {
        category: "payments",
        question: "Quais as formas de pagamento?",
        answer: "Aceitamos todos os principais cartões de crédito e PIX. As assinaturas anuais e mensais são renovadas automaticamente, mas você pode cancelar quando quiser."
    },
    {
        category: "payments",
        question: "Como faço para cancelar?",
        answer: "O cancelamento é simples e pode ser feito diretamente na sua dashboard de usuário. Não cobramos taxas de cancelamento e você mantém o acesso até o fim do período já pago."
    },
    {
        category: "usage",
        question: "Como utilizo o benefício no restaurante?",
        answer: "Ao pedir a conta, basta abrir o seu cartão digital no app ou site e mostrar ao atendente. Ele registrará o benefício e aplicará o desconto no prato de menor valor."
    },
    {
        category: "usage",
        question: "Posso usar o benefício mais de uma vez no mesmo lugar?",
        answer: "Sim! Não há limites de uso por restaurante. Você pode voltar no seu lugar favorito quantas vezes quiser, respeitando apenas a política de uso diário (limite de 1 resgate por dia)."
    },
    {
        category: "restaurants",
        question: "Como vejo os restaurantes parceiros?",
        answer: "Você pode ver a lista completa na nossa página de Restaurantes, com filtros por tipo de cozinha, cidade e faixa de preço."
    },
    {
        category: "restaurants",
        question: "Posso sugerir um restaurante?",
        answer: "Com certeza! Adoramos ouvir nossos membros. Você pode sugerir novos parceiros através da nossa página de contato ou diretamente pelo app."
    }
];

export default function Faq() {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = FAQS.filter(faq => faq.category === activeCategory);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />

                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// FAQ Completo</span>
                    <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter mb-8">
                        Dúvidas <span className="text-gradient">Frequentes</span>
                    </h1>
                    <p className="text-[#666] text-lg max-w-2xl mx-auto">
                        Tudo o que você precisa saber sobre o Club Empar em um só lugar.
                    </p>
                </div>
            </section>

            <section className="pb-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
                    {/* Categories Sidebar */}
                    <aside className="lg:w-64 space-y-2">
                        {FAQ_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setOpenIndex(0);
                                }}
                                className={`w-full text-left px-6 py-4 border transition-all font-mono text-sm uppercase tracking-wider ${activeCategory === cat.id
                                        ? "bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]"
                                        : "border-[#222] text-[#666] hover:border-[#333] hover:text-white"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </aside>

                    {/* Faq List */}
                    <div className="flex-1 space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <div key={index} className="border border-[#222] bg-[#111]/50 overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-[#111] transition-colors"
                                >
                                    <span className="text-xl font-bold tracking-tight pr-8">{faq.question}</span>
                                    <span className={`text-[#666] transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#00ff88]" : ""}`}>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"}`}>
                                    <p className="px-8 pb-8 text-[#999] leading-relaxed text-lg border-t border-[#222]/50 pt-6">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#111] border-t border-[#222]">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-6">Não encontrou o que procurava?</h2>
                    <p className="text-[#666] mb-8">Nossa equipe de suporte está pronta para ajudar você.</p>
                    <a href="/contact" className="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#00ff88] transition-all">
                        Falar com Suporte
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
