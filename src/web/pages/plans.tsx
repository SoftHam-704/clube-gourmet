import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

// Ícones Premium
const Icons = {
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6 text-[#c9a961]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  creditCard: (
    <svg className="w-6 h-6 text-[#c9a961]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  refresh: (
    <svg className="w-6 h-6 text-[#c9a961]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
};

const FAQS = [
  {
    question: "Como funciona a oferta 2 por 1?",
    answer: "Ao jantar em qualquer restaurante parceiro, peça dois pratos principais e pague apenas um. O prato de menor valor é cortesia. Sem vouchers, sem valor mínimo.",
  },
  {
    question: "Posso usar em qualquer restaurante parceiro?",
    answer: "Sim! Sua assinatura funciona em todos os 500+ restaurantes parceiros brasileiros. Verifique a disponibilidade de cada casa no catálogo.",
  },
  {
    question: "Em quanto tempo terei retorno do valor pago?",
    answer: "Geralmente em apenas 2 visitas! Com pratos custando em média R$80, em duas experiências você já economizou o valor da anuidade.",
  },
  {
    question: "É seguro pagar pelo site?",
    answer: "Absolutamente. Utilizamos criptografia de nível bancário e as operadoras de pagamento mais confiáveis do mercado brasileiro.",
  },
];

const DEFAULT_BENEFITS = [
  "Experiência 2 por 1 ilimitada",
  "Acesso a mais de 500 restaurantes",
  "Cartão Digital de Membro",
  "Suporte via Central Gourmet",
  "Benefícios exclusivos do clube"
];

function PlanCard({ plan }: { plan: any }) {
  // Parsing dinâmico dos dados do banco para o layout
  const isFamily = plan.type === 'family' || plan.id.startsWith('family');
  const priceDisplay = (Number(plan.price) / (isFamily ? 4 : 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const totalDisplay = Number(plan.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  const isPopular = plan.id.includes('semiannual') || plan.duration_months === 6;

  return (
    <div className={`group relative transition-all duration-700 ${isPopular
      ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-2 border-[#c9a961] scale-105 z-10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
      : "bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#c9a961]/10 hover:border-[#c9a961]/40"
      } p-10 flex flex-col h-full overflow-hidden`}>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />

      {/* Floating Popular Label */}
      {isPopular && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#c9a961] text-[#0a0a0a] text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl skew-x-[-12deg]">
          Recomendado
        </div>
      )}

      {/* Header Area */}
      <div className="mb-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <h3 className={`font-display text-2xl font-black tracking-tight ${isPopular ? "text-[#c9a961]" : "text-white"}`}>
            {plan.name}
          </h3>
        </div>
        <p className="text-[#d4c5a0]/40 text-sm leading-relaxed font-light italic">"{plan.description}"</p>
      </div>

      {/* Price Area */}
      <div className="mb-10 text-center lg:text-left">
        <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-3">
          <span className="text-[#c9a961] font-mono text-xl font-bold">R$</span>
          <span className={`font-mono text-6xl font-black tracking-tighter ${isPopular ? "text-gradient-gold animate-gradient" : "text-white"}`}>
            {priceDisplay}
          </span>
          <span className="text-[#d4c5a0]/30 font-mono text-sm tracking-widest uppercase">
            {isFamily ? "/pessoa" : "/mês"}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-none">
          <span className="text-white/60 font-mono text-[11px] font-bold tracking-widest uppercase opacity-60">
            {isFamily ? "Lote p/ 4:" : "Total:"}
          </span>
          <span className="text-[#c9a961] font-mono text-xs font-black">{totalDisplay}</span>
        </div>
      </div>

      {/* Benefits List */}
      <ul className="space-y-5 mb-12 flex-grow">
        {(isFamily ? ["2 por 1 para todos", "Economia compartilhada"] : []).concat(DEFAULT_BENEFITS).slice(0, 5).map((benefit: string, index: number) => (
          <li key={index} className="flex items-start gap-4 group/item">
            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-[#c9a961]/30 flex items-center justify-center transition-all ${isPopular ? "bg-[#c9a961]/10 border-[#c9a961]" : "group-hover/item:border-[#c9a961]"}`}>
              <span className="text-[#c9a961] scale-75">{Icons.check}</span>
            </div>
            <span className="text-[#d4c5a0]/60 text-sm font-light leading-snug group-hover/item:text-white transition-colors">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* Button CTA */}
      <button className={`w-full flex items-center justify-center gap-5 py-6 font-black text-xs tracking-[0.4em] uppercase transition-all duration-700 ${isPopular
        ? "bg-[#c9a961] text-[#0a0a0a] hover:glow-green hover:-translate-y-2 shadow-[0_20px_40px_rgba(201,169,97,0.3)]"
        : "border-2 border-[#c9a961]/20 text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0a0a0a] hover:border-[#c9a961] shadow-2xl"
        }`}>
        Assinar Agora
      </button>

      {/* Decorative scanline */}
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
    </div>
  );
}

export default function Plans() {
  const [activeTab, setActiveTab] = useState<"individual" | "family">("individual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dbPlans, setDbPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackPlans = [
    { id: "mensal", name: "Plano Mensal", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-semes", name: "Família Semestral", description: "Momentos compartilhados", price: 122.64, type: "family", active: true }
  ];

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch('/api/plans', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("API Indisponível");
        return res.json();
      })
      .then(data => {
        clearTimeout(timeoutId);
        if (data && Array.isArray(data) && data.length > 0) {
          setDbPlans(data);
        } else {
          setDbPlans(fallbackPlans);
        }
        setLoading(false);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.warn("Usando planos de backup (Timeout ou Erro):", err.message);
        setDbPlans(fallbackPlans);
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const filteredPlans = Array.isArray(dbPlans) ? dbPlans.filter(p =>
    activeTab === "individual" ? p.type === 'individual' : p.type === 'family'
  ) : [];

  return (
    <div className="bg-[#1a4d2e] min-h-screen selection:bg-[#c9a961] selection:text-[#0a0a0a]">
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
            // INVISTA EM MOMENTOS MEMORÁVEIS
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12">
            Escolha o Plano<br />
            <span className="text-gradient-gold animate-gradient">Ideal para Você</span>
          </h1>

          <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light max-w-3xl mx-auto leading-relaxed italic mb-20 font-display">
            Planos exclusivos para quem aprecia o extraordinário. Aproveite o melhor da gastronomia investindo de forma inteligente.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10 group transition-all duration-500 hover:bg-[#c9a961]/5">
              <div className="font-mono text-5xl font-black text-[#c9a961] mb-2">15k<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Membros De Elite</p>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10 group transition-all duration-500 hover:bg-[#c9a961]/5">
              <div className="font-mono text-5xl font-black text-white mb-2">4.9<span className="text-[#c9a961]">★</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Satisfação Total</p>
            </div>
            <div className="p-10 group transition-all duration-500 hover:bg-[#c9a961]/5">
              <div className="font-mono text-5xl font-black text-white mb-2">500<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Restaurantes Parceiros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Tab Switcher */}
      <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/10 blur-[180px] pointer-events-none rounded-full" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center mb-28">
            <span className="text-[#c9a961] font-mono text-[11px] tracking-[0.4em] uppercase mb-12 opacity-60 font-black">Seleção De Categoria</span>

            <div className="flex p-3 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/30 rounded-none shadow-2xl scale-110 lg:scale-125">
              <button
                onClick={() => setActiveTab("individual")}
                className={`px-12 py-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${activeTab === "individual" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/30 hover:text-white"}`}
              >
                Individual
              </button>
              <button
                onClick={() => setActiveTab("family")}
                className={`px-12 py-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${activeTab === "family" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/30 hover:text-white"}`}
              >
                Plano Família
              </button>
            </div>

            <div className="mt-20 text-center max-w-2xl">
              <h2 className="font-display text-4xl lg:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
                {activeTab === "individual" ? "Experiência Singular" : "Privilégio Família"}
              </h2>
              <p className="text-[#d4c5a0]/50 text-xl font-light italic leading-relaxed">
                {activeTab === "individual"
                  ? "Para o apreciador que valoriza a independência e o acesso às melhores mesas do país."
                  : "A sofisticação de jantar fora, agora como um privilégio compartilhado com quem você ama."}
              </p>
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-16 h-16 border-2 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin" />
              <p className="font-mono text-[10px] text-[#c9a961] tracking-[0.5em] uppercase font-black">Sincronizando com Banco SaveInCloud...</p>
            </div>
          ) : (
            <div key={activeTab} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch animate-fade-in">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="w-full">
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          )}

          {/* Family Plan Footer Note */}
          {activeTab === "family" && (
            <div className="mt-24 p-16 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#c9a961]/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#c9a961]/40" />

              <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                <div className="text-[#c9a961] text-7xl animate-float">👨‍👩‍👧‍👦</div>
                <div className="flex-1">
                  <h3 className="text-white font-display text-3xl font-black mb-6 uppercase tracking-widest">Upgrade Progressivo</h3>
                  <p className="text-[#d4c5a0]/60 text-xl font-light leading-relaxed italic max-w-3xl">
                    "Elevamos sua experiência através de descontos estruturais: o 2º membro recebe 10% OFF, o 3º 20% e a partir do 4º integrante, garantimos 30% de anuidade especial."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Guarantees Bar */}
      <section className="py-20 bg-[#0a0a0a] border-y border-[#c9a961]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center text-center font-mono">
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center group-hover:border-[#c9a961] transition-colors">{Icons.shield}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Ambiente de Pagamento Seguro</p>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center group-hover:border-[#c9a961] transition-colors">{Icons.creditCard}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Aceitamos Todas as Bandeiras</p>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center group-hover:border-[#c9a961] transition-colors">{Icons.refresh}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Gestão e Cancelamento Simples</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a961]/30 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <span className="text-[#c9a961] font-mono text-[11px] tracking-[0.5em] uppercase mb-10 block animate-pulse">// CENTRAL DE DÚVIDAS</span>
            <h2 className="font-display text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
              Esclareça Seus <span className="text-gradient-gold animate-gradient">Desejos</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-[#c9a961]/10 overflow-hidden group">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left transition-all hover:bg-[#c9a961]/5"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[#c9a961]/20 font-mono text-xs font-black">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-white text-lg font-bold tracking-tight uppercase">{faq.question}</span>
                  </div>
                  <div className={`text-[#c9a961] transition-transform duration-500 ${openFaq === index ? "rotate-180" : ""}`}>
                    {Icons.chevronDown}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openFaq === index ? "max-h-[300px] border-t border-[#c9a961]/10" : "max-h-0"}`}>
                  <div className="p-8 pb-10 pl-24 text-[#d4c5a0]/60 text-lg font-light leading-relaxed italic">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-full bg-[#c9a961]/5 blur-[200px]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-6xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-12 uppercase">
            Sua Mesa Está<br />
            <span className="text-gradient-gold animate-gradient">Pronta.</span>
          </h2>
          <p className="text-[#d4c5a0]/70 text-2xl font-light mb-16 max-w-2xl mx-auto italic">
            Não perca mais tempo. Junte-se à elite gastronômica e descubra um novo mundo de sabores e economia.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="px-16 py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-sm tracking-[0.4em] uppercase hover:glow-green hover:-translate-y-2 transition-all shadow-2xl">
              Assinar Agora
            </button>
            <Link href="/" className="px-16 py-7 border-2 border-[#c9a961]/30 text-[#c9a961] font-black text-sm tracking-[0.4em] uppercase hover:bg-[#c9a961]/10 hover:border-[#c9a961] transition-all">
              Ver Destaques
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
