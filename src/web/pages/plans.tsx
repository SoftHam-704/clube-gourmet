import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

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
    answer: "Ao jantar em qualquer restaurante parceiro, peça dois pratos principais e pague apenas um. O prato de menor valor é cortesia.",
  },
  {
    question: "Posso usar em qualquer restaurante parceiro?",
    answer: "Sim! Sua assinatura funciona em todos os 500+ restaurantes parceiros brasileiros.",
  }
];

const DEFAULT_BENEFITS = [
  "Experiência 2 por 1 ilimitada",
  "Acesso a mais de 500 restaurantes",
  "Cartão Digital de Membro",
  "Suporte via Central Gourmet",
  "Benefícios exclusivos do clube"
];

function PlanCard({ plan }: { plan: any }) {
  const isFamily = plan.type === 'family' || plan.id?.includes('family');
  const priceDisplay = (Number(plan.price) / (isFamily ? 4 : 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const totalDisplay = Number(plan.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  const isPopular = plan.id?.includes('semiannual') || plan.duration_months === 6;

  return (
    <div className={`group relative transition-all duration-700 ${isPopular
      ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-2 border-[#c9a961] scale-105 z-10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
      : "bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#c9a961]/10 hover:border-[#c9a961]/40"
      } p-10 flex flex-col h-full overflow-hidden`}>

      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961]" />

      {isPopular && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#c9a961] text-[#0a0a0a] text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl skew-x-[-12deg]">
          Recomendado
        </div>
      )}

      <div className="mb-10 lg:text-left">
        <h3 className={`font-display text-2xl font-black tracking-tight ${isPopular ? "text-[#c9a961]" : "text-white"}`}>
          {plan.name}
        </h3>
        <p className="text-[#d4c5a0]/40 text-sm leading-relaxed font-light italic mt-2">"{plan.description}"</p>
      </div>

      <div className="mb-10 lg:text-left">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[#c9a961] font-mono text-xl font-bold">R$</span>
          <span className={`font-mono text-6xl font-black tracking-tighter ${isPopular ? "text-gradient-gold animate-gradient" : "text-white"}`}>
            {priceDisplay}
          </span>
          <span className="text-[#d4c5a0]/30 font-mono text-sm tracking-widest uppercase">
            {isFamily ? "/pessoa" : "/mês"}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5">
          <span className="text-white/60 font-mono text-[11px] font-bold tracking-widest uppercase">
            {isFamily ? "Lote p/ 4:" : "Total:"}
          </span>
          <span className="text-[#c9a961] font-mono text-xs font-black">{totalDisplay}</span>
        </div>
      </div>

      <ul className="space-y-5 mb-12 flex-grow">
        {(isFamily ? ["2 por 1 para todos", "Economia compartilhada"] : []).concat(DEFAULT_BENEFITS).slice(0, 5).map((benefit, index) => (
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

      <button className={`w-full flex items-center justify-center gap-5 py-6 font-black text-xs tracking-[0.4em] uppercase transition-all duration-700 ${isPopular
        ? "bg-[#c9a961] text-[#0a0a0a] hover:glow-green hover:-translate-y-2"
        : "border-2 border-[#c9a961]/20 text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0a0a0a]"
        }`}>
        Assinar Agora
      </button>
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
    </div>
  );
}

export default function Plans() {
  const [activeTab, setActiveTab] = useState<"individual" | "family">("individual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fallbackPlans = [
    { id: "mensal", name: "Plano Mensal", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-mensal", name: "Família Mensal", description: "A elite para todos", price: 159.64, type: "family", active: true },
    { id: "fam-trimestral", name: "Família Trimestral", description: "Economia e lazer", price: 135.64, type: "family", active: true },
    { id: "fam-semestral", name: "Família Semestral", description: "Momentos compartilhados", price: 122.64, type: "family", active: true },
    { id: "fam-anual", name: "Família Anual", description: "O ápice do Club Empar", price: 111.84, type: "family", active: true }
  ];

  const [dbPlans, setDbPlans] = useState<any[]>(fallbackPlans);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch('/api/plans', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data && Array.isArray(data) && data.length > 0) {
          setDbPlans(data);
        }
      })
      .catch(() => clearTimeout(timeoutId));

    return () => clearTimeout(timeoutId);
  }, []);

  const filteredPlans = dbPlans.filter(p =>
    activeTab === "individual" ? p.type === 'individual' : p.type === 'family'
  );

  return (
    <div className="bg-[#1a4d2e] min-h-screen selection:bg-[#c9a961] selection:text-[#0a0a0a]">
      <Navbar />

      <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">// INVISTA EM MOMENTOS MEMORÁVEIS</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12">
            Escolha o Plano<br />
            <span className="text-gradient-gold animate-gradient">Ideal para Você</span>
          </h1>
          <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light max-w-3xl mx-auto italic mb-20 font-display">
            Planos exclusivos para quem aprecia o extraordinário. Aproveite o melhor da gastronomia investindo de forma inteligente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20">
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10">
              <div className="font-mono text-5xl font-black text-[#c9a961] mb-2">15k<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Membros De Elite</p>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10">
              <div className="font-mono text-5xl font-black text-white mb-2">4.9<span className="text-[#c9a961]">★</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Satisfação Total</p>
            </div>
            <div className="p-10">
              <div className="font-mono text-5xl font-black text-white mb-2">500<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-black">Restaurantes Parceiros</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center mb-28">
            <span className="text-[#c9a961] font-mono text-[11px] tracking-[0.4em] uppercase mb-12 opacity-60 font-black">Seleção De Categoria</span>
            <div className="flex p-3 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/30">
              <button onClick={() => setActiveTab("individual")} className={`px-12 py-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${activeTab === "individual" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/30 hover:text-white"}`}>Individual</button>
              <button onClick={() => setActiveTab("family")} className={`px-12 py-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${activeTab === "family" ? "bg-[#c9a961] text-[#0a0a0a]" : "text-white/30 hover:text-white"}`}>Plano Família</button>
            </div>
            <div className="mt-20 text-center max-w-2xl">
              <h2 className="font-display text-4xl lg:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
                {activeTab === "individual" ? "Experiência Singular" : "Privilégio Família"}
              </h2>
            </div>
          </div>

          <div key={activeTab} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch animate-fade-in">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="w-full">
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a] border-y border-[#c9a961]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center text-center font-mono">
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center">{Icons.shield}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Pagamento Seguro</p>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center">{Icons.creditCard}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Todas Bandeiras</p>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center">{Icons.refresh}</div>
              <p className="text-[10px] tracking-[0.3em] text-[#d4c5a0]/40 uppercase font-black">Cancelamento Simples</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <h2 className="font-display text-6xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-12 uppercase">
            Sua Mesa Está<br />
            <span className="text-gradient-gold animate-gradient">Pronta.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="px-16 py-7 bg-[#c9a961] text-[#0a0a0a] font-black text-sm tracking-[0.4em] uppercase hover:glow-green transition-all shadow-2xl">Assinar Agora</button>
            <Link href="/" className="px-16 py-7 border-2 border-[#c9a961]/30 text-[#c9a961] font-black text-sm tracking-[0.4em] uppercase hover:bg-[#c9a961]/10 transition-all">Ver Destaques</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
