import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const FAQ_CATEGORIES = [
    { id: "general", name: "ESTRUTURA GERAL", icon: "🏛️" },
    { id: "usage", name: "COMO UTILIZAR", icon: "🍽️" },
    { id: "payments", name: "ASSINATURAS", icon: "💳" },
    { id: "restaurants", name: "PARCEIROS ELITE", icon: "⭐" },
    { id: "safety", name: "SEGURANÇA & PRIVACIDADE", icon: "🔐" }
];

const FAQS = [
    {
        category: "general",
        question: "O que é exatamente o Club Empar Gourmet?",
        answer: "O Club Empar é um ecossistema de alta gastronomia que oferece aos seus membros o privilégio '2 por 1'. Na compra de um prato principal, o segundo prato (de igual ou menor valor) é uma cortesia exclusiva do clube. É o passaporte para explorar o melhor da culinária regional com inteligência financeira."
    },
    {
        category: "general",
        question: "O benefício é vitalício ou tem validade?",
        answer: "O benefício permanece ativo enquanto sua assinatura estiver vigente. Você pode utilizar o clube 365 dias por ano, respeitando apenas a política de uso diário de um resgate por dia."
    },
    {
        category: "usage",
        question: "Como resgato meu benefício no restaurante?",
        answer: "A experiência é 100% digital e elegante. Ao pedir a conta, informe ao atendente que é membro do Club Empar. Abra seu app ou site, gere o código de validação e apresente-o. O desconto será aplicado imediatamente no prato de menor valor."
    },
    {
        category: "usage",
        question: "Preciso reservar mesa com antecedência?",
        answer: "Não é uma regra do clube, mas alguns restaurantes de alta demanda podem exigir reserva. Recomendamos sempre checar a página individual do restaurante no nosso catálogo para verificar horários e políticas específicas."
    },
    {
        category: "payments",
        question: "Quais são as modalidades de investimento?",
        answer: "Oferecemos três níveis de acesso: Mensal (Flexibilidade absoluta), Semestral (O favorito pelos membros) e Anual (A máxima economia). Todos podem ser parcelados e pagos via Cartão de Crédito ou PIX."
    },
    {
        category: "payments",
        question: "Posso cancelar minha renovação quando desejar?",
        answer: "Sim. A liberdade é um dos nossos pilares. Você pode gerenciar ou cancelar sua renovação automática diretamente na sua área logada, sem burocracias ou multas escondidas."
    },
    {
        category: "restaurants",
        question: "Quais critérios definem um Restaurante Parceiro?",
        answer: "Nossa curadoria é rigorosa. Avaliamos excelência no atendimento, qualidade gastronômica superior e ambiente excepcional. Apenas estabelecimentos que entregam uma experiência de elite entram para o catálogo do Club Empar."
    },
    {
        category: "restaurants",
        question: "Posso sugerir um novo restaurante para o clube?",
        answer: "Com absoluta certeza. Valorizamos a curadoria colaborativa de nossos membros. Envie sua sugestão através do suporte ou concierge; nossa equipe de expansão fará a análise técnica do estabelecimento sugerido."
    },
    {
        category: "safety",
        question: "Como meus dados de pagamento são protegidos?",
        answer: "Utilizamos as tecnologias de criptografia de ponta (SSL/TLS) e gateways de pagamento certificados com PCI Compliance Nível 1. Seus dados de cartão nunca são armazenados em nossos servidores internos."
    },
    {
        category: "safety",
        question: "O Club Empar compartilha meus dados com terceiros?",
        answer: "Absolutamente não. Seus dados são utilizados exclusivamente para gerenciar sua assinatura e melhorar sua experiência no clube. Respeitamos integralmente a LGPD (Lei Geral de Proteção de Dados)."
    }
];

export default function Faq() {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = FAQS.filter(faq => faq.category === activeCategory);

    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a4d2e]/40 blur-[150px]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
            // SUPORTE AO MEMBRO
                    </span>

                    <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-12 uppercase">
                        Centro de<br />
                        <span className="text-gradient-gold animate-gradient">Respostas.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-heading">
                        Tudo o que você precisa entender para elevar sua experiência gastronômica ao próximo nível.
                    </p>
                </div>
            </section>

            <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative flex flex-col lg:flex-row gap-20">

                    <aside className="lg:w-80 space-y-4">
                        <div className="mb-10 lg:sticky lg:top-32">
                            <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.4em] uppercase font-black block mb-8">Categorias</span>
                            <div className="space-y-3">
                                {FAQ_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveCategory(cat.id);
                                            setOpenIndex(0);
                                        }}
                                        className={`w-full flex items-center gap-4 px-6 py-6 border transition-all duration-500 relative overflow-hidden group ${activeCategory === cat.id
                                            ? "bg-[#0a0a0a] border-[#c9a961] text-[#c9a961] shadow-2xl"
                                            : "border-[#c9a961]/10 bg-[#0a0a0a]/40 text-white/40 hover:border-[#c9a961]/40 hover:text-white"
                                            }`}
                                    >
                                        {activeCategory === cat.id && (
                                            <div className="absolute left-0 top-0 w-1 h-full bg-[#c9a961]" />
                                        )}
                                        <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">{cat.icon}</span>
                                        <span className="font-mono text-[10px] font-black tracking-[0.2em] uppercase">{cat.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-[#0a0a0a]/60 border border-[#c9a961]/10 hidden lg:block">
                                <p className="text-[#c9a961] font-mono text-[9px] tracking-widest uppercase mb-4">Ainda com Dúvidas?</p>
                                <p className="text-white/40 text-sm font-light leading-relaxed italic mb-6">Nossa equipe de concierge está disponível 24/7 para atendê-lo.</p>
                                <a href="/contact" className="text-[#c9a961] font-black text-[10px] tracking-widest uppercase border-b border-[#c9a961]/20 hover:border-[#c9a961] transition-all pb-1">Falar com Concierge →</a>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1 space-y-6">
                        <div className="mb-10">
                            <h2 className="text-white font-heading text-4xl font-black uppercase tracking-tight">
                                Perguntas sobre {FAQ_CATEGORIES.find(c => c.id === activeCategory)?.name}
                            </h2>
                        </div>

                        {filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/10 overflow-hidden relative group hover:border-[#c9a961]/40 transition-all duration-700"
                            >
                                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c9a961]/20 group-hover:border-[#c9a961] transition-all" />

                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-[#c9a961]/5"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-[#c9a961]/20 font-mono text-xs font-black">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="text-white text-xl font-bold tracking-tight uppercase leading-snug pr-8">{faq.question}</span>
                                    </div>
                                    <div className={`text-[#c9a961] transition-transform duration-500 shrink-0 ${openIndex === index ? "rotate-180" : ""}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openIndex === index ? "max-h-[400px] border-t border-[#c9a961]/10" : "max-h-0"}`}>
                                    <div className="p-10 pl-24 text-[#d4c5a0]/60 text-lg font-light leading-relaxed italic relative">
                                        <span className="absolute left-10 top-10 text-4xl text-[#c9a961]/10 font-serif">"</span>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#0a0a0a] border-y border-[#c9a961]/10 text-center">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <h3 className="text-white font-heading text-4xl font-black uppercase mb-8 tracking-tighter">Precisa de suporte agora?</h3>
                    <a href="/contact" className="px-16 py-6 bg-[#c9a961] text-[#0a0a0a] font-black text-xs tracking-[0.4em] uppercase hover:glow-green transition-all shadow-2xl">
                        Falar com Suporte
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
