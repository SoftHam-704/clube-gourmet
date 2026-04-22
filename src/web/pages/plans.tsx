import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "../../assets/hero-bg.jpg"; // Using for the immersion effect
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex
} from "react-icons/fa";
import { 
  SiApplepay, 
  SiGooglepay, 
  SiPix 
} from "react-icons/si";
import { CheckCircle2, Info, Users } from "lucide-react";

const Icons = {
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

const PaymentBrands = () => (
  <div className="flex items-center gap-20 text-[#c9a961]/30 font-body text-xs tracking-[0.3em] uppercase font-bold">
    <div className="flex items-center gap-5"><FaCcVisa className="w-8 h-8" /><span>VISA</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-5"><FaCcMastercard className="w-8 h-8" /><span>MASTERCARD</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-5"><SiPix className="w-7 h-7" /><span>PIX</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-5"><FaCcAmex className="w-8 h-8" /><span>AMEX</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-5"><SiApplepay className="w-10 h-10" /><span>APPLE PAY</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-5"><SiGooglepay className="w-10 h-10" /><span>GOOGLE PAY</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-3 border border-current px-3 py-1 rounded scale-90"><span>ELO</span></div>
    <span className="text-[#c9a961]/40 text-lg">◆</span>
    <div className="flex items-center gap-3 border border-current px-3 py-1 rounded scale-90"><span>HIPER</span></div>
  </div>
);

const DEFAULT_BENEFITS = [
  "Experiência 2 por 1 ilimitada",
  "Acesso a mais de 500 restaurantes",
  "Cartão Digital de Membro",
  "Suporte via Central Gourmet",
  "Benefícios exclusivos do clube"
];

import { authClient } from "../lib/auth";

function PlanCard({ plan }: { plan: any }) {
  const { data: session } = authClient.useSession();
  const isFamily = plan.type === 'family' || plan.id?.includes('family') || plan.id?.includes('fam-');

  // Calculate months based on plan id or name (robust check)
  const planInfo = ((plan.id || '') + (plan.name || '')).toLowerCase();
  const duration = planInfo.includes('trimestral') ? 3 
                 : planInfo.includes('semestral') ? 6 
                 : planInfo.includes('anual') ? 12 : 1;
  
  // Monthly equivalent is the MAIN display (big)
  const totalPrice = Number(plan.price);
  const monthlyPrice = totalPrice / duration / (isFamily ? 4 : 1);
  const monthlyDisplay = monthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  
  // Total price is the secondary display (small)
  const totalFormatted = totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
  
  const isPopular = plan.id?.includes('semiannual') || plan.duration_months === 6 || plan.id?.includes('trimestral');

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
        <h3 className={`font-display text-3xl font-light tracking-tight ${isPopular ? "text-[#c9a961]" : "text-white"}`}>
          {plan.name}
        </h3>
        {plan.description && (
          <p className="text-[#d4c5a0]/40 text-sm mt-2 font-body italic">{plan.description}</p>
        )}
      </div>

      <div className="mb-10 lg:text-left">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[#c9a961] font-mono text-xl font-bold">R$</span>
          <span className={`font-mono text-6xl font-black tracking-tighter ${isPopular ? "text-gradient-gold animate-gradient" : "text-white"}`}>
            {monthlyDisplay}
          </span>
          <span className="text-[#d4c5a0]/30 font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap ml-1 self-end mb-2">
            /mês{isFamily ? ' por pessoa' : ''}
          </span>
        </div>
        {duration > 1 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 mt-2">
            <span className="text-white/60 font-mono text-[11px] font-bold tracking-widest uppercase">
              TOTAL:
            </span>
            <span className="text-[#c9a961] font-mono text-xs font-black">{totalFormatted}</span>
          </div>
        )}
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

      <Link href={session ? `/checkout?plan=${plan.id}` : `/sign-up?plan=${plan.id}`}>
        <button className={`w-full flex items-center justify-center gap-5 py-6 font-black text-xs tracking-[0.4em] uppercase transition-all duration-700 ${isPopular
          ? "bg-[#c9a961] text-[#0a0a0a] hover:glow-gold hover:-translate-y-2"
          : "border-2 border-[#c9a961]/20 text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0a0a0a]"
          }`}>
          Assinar Agora
        </button>
      </Link>
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
    </div>
  );
}

export default function Plans() {
  const [activeTab, setActiveTab] = useState<"individual" | "family">("individual");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Image Scale: 1 to 1.15
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  
  // Parallax Text Animation: moves 150px to the left
  const x = useTransform(scrollYProgress, [0, 1], [0, -250]);

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

    fetch(`/api/membership-plans?v=${Date.now()}`, { signal: controller.signal })
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

  const durationOrder: Record<string, number> = { mensal: 1, trimestral: 2, semestral: 3, anual: 4 };
  const getDurationOrder = (id: string) => {
    const lower = (id || '').toLowerCase();
    if (lower.includes('mensal')) return 1;
    if (lower.includes('trimestral')) return 2;
    if (lower.includes('semestral')) return 3;
    if (lower.includes('anual')) return 4;
    return 5;
  };

  const filteredPlans = dbPlans
    .filter(p => {
      const isFamilyPlan = p.type === 'family' || p.id?.toLowerCase().includes('family') || p.id?.toLowerCase().includes('fam-');
      return activeTab === "individual" ? !isFamilyPlan : isFamilyPlan;
    })
    .sort((a, b) => getDurationOrder(a.id || a.name) - getDurationOrder(b.id || b.name));

  return (
    <div ref={containerRef} className="bg-[#090d0b] min-h-screen selection:bg-[#c9a961] selection:text-[#0a0a0a] overflow-x-hidden">
      <Navbar />

      <section className="pt-64 pb-32 bg-[#090d0b] relative overflow-hidden min-h-[90svh] flex items-center">
        {/* Immersive Background Image with Scroll Scale */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            src={heroImg} 
            alt="Ambiente de restaurante sofisticado"
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          {/* Layered overlays to match landing page look */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090d0b] via-[#090d0b]/80 to-[#090d0b] z-10" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#090d0b] to-transparent z-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#c9a961] font-body text-xs tracking-[0.6em] uppercase mb-10 block animate-pulse font-bold">// INVISTA EM MOMENTOS MEMORÁVEIS</span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] font-light text-white leading-[0.95] tracking-tight mb-12">
              Escolha o Plano<br />
              <span className="text-gradient-gold italic">Ideal para Você</span>
            </h1>
            <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light max-w-3xl mx-auto italic mb-20 font-display">
              Planos exclusivos para quem aprecia o extraordinário. Aproveite o melhor da gastronomia investindo de forma inteligente.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto bg-[#0a0a0a]/60 backdrop-blur-3xl border border-[#c9a961]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10">
              <div className="font-display text-5xl font-light text-[#c9a961] mb-2 tracking-tighter">15k<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-bold">Membros De Elite</p>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-[#c9a961]/10">
              <div className="font-display text-5xl font-light text-white mb-2 tracking-tighter">4.9<span className="text-[#c9a961]">★</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-bold">Satisfação Total</p>
            </div>
            <div className="p-10">
              <div className="font-display text-5xl font-light text-white mb-2 tracking-tighter">500<span className="text-white/10">+</span></div>
              <p className="text-[#c9a961]/40 text-[10px] tracking-[0.4em] uppercase font-bold">Restaurantes Parceiros</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="selection-section" className="py-32 bg-[#090d0b] relative overflow-hidden">
        {/* Floating Horizontal Parallax Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] pointer-events-none opacity-[0.015] whitespace-nowrap z-0 overflow-hidden">
          <motion.span 
            style={{ x }} 
            className="text-[25rem] font-display font-bold text-white tracking-widest block"
          >
            EXCLUSIVIDADE • GASTRONOMIA • EXPERIÊNCIA • ELITE • MOMENTOS
          </motion.span>
        </div>

        {/* Layered background visual */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a961]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,97,0.05),transparent_50%)]" />

    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center mb-28 relative">
            <span className="text-[#c9a961] font-body text-[11px] tracking-[0.4em] uppercase mb-12 opacity-60 font-bold">Sua Categoria</span>
            <div className="flex p-2 bg-[#0a0a0a]/80 backdrop-blur-3xl border border-[#c9a961]/30 rounded-full">
              <button 
                onClick={() => setActiveTab("individual")} 
                className={`px-10 py-3 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === "individual" ? "bg-[#c9a961] text-[#0a0a0a] shadow-lg shadow-[#c9a961]/20" : "text-white/40 hover:text-white"}`}
              >
                Individual
              </button>
              <button 
                onClick={() => setActiveTab("family")} 
                className={`px-10 py-3 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === "family" ? "bg-[#c9a961] text-[#0a0a0a] shadow-lg shadow-[#c9a961]/20" : "text-white/40 hover:text-white"}`}
              >
                Plano Família
              </button>
            </div>
            <div className="mt-20 text-center max-w-2xl">
              <h2 className="font-display text-5xl lg:text-7xl font-light text-white tracking-tight mb-6">
                {activeTab === "individual" ? "Experiência Singular" : "Privilégio Família"}
              </h2>
              <p className="text-[#d4c5a0]/50 text-xl font-light italic leading-relaxed font-body">
                {activeTab === "individual"
                  ? "Para o apreciador que valoriza a independência e o acesso às melhores mesas do país."
                  : "A sofisticação de jantar fora, agora como um privilégio compartilhado com quem você ama."}
              </p>
            </div>
          </div>

          {activeTab === "family" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-12 mb-16 flex flex-col items-center gap-6"
            >
              {/* Header Badge for the Ribbon */}
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#c9a961]/10 border border-[#c9a961]/20 backdrop-blur-md">
                <Users size={14} className="text-[#c9a961]" />
                <span className="text-[#c9a961] text-[10px] font-black tracking-[0.3em] uppercase">Vantagem Progressiva Elite</span>
              </div>

              {/* The Horizontal Ribbon with Bouncing Effect */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-full max-w-5xl py-6 px-12 rounded-[2rem] bg-gradient-to-br from-[#0c120e]/80 to-[#050806]/90 backdrop-blur-2xl border border-[#c9a961]/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden group"
              >
                
                {/* Visual Accent Glows & "Dripping" Light Effect */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 2
                  }}
                  className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-[#c9a961]/10 to-transparent skew-x-[-20deg] blur-xl opacity-50" 
                />
                
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 relative z-10">
                  {[
                    { label: "2ª Pessoa", discount: "10% OFF" },
                    { label: "3ª Pessoa", discount: "20% OFF" },
                    { label: "4ª Pessoa", discount: "30% OFF" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 group/item">
                      <div className="flex flex-col items-start">
                        <span className="text-white/40 text-[9px] font-black tracking-[0.4em] uppercase mb-1">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-[#c9a961] opacity-70 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-white text-2xl font-display font-black tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(201,169,97,0.4)]">{item.discount}</span>
                        </div>
                      </div>
                      
                      {idx < 2 && (
                        <div className="hidden lg:block h-12 w-[1px] bg-gradient-to-b from-transparent via-[#c9a961]/20 to-transparent ml-8" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Subtle description banner at bottom of ribbon */}
                <div className="mt-6 flex items-center justify-center gap-3 pt-4 border-t border-white/5 opacity-60">
                   <Info size={12} className="text-[#c9a961]" />
                   <p className="text-[9px] text-[#d4c5a0] uppercase tracking-[0.4em] font-bold">Descontos aplicados automaticamente sobre o valor total do grupo</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          <div key={activeTab} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch animate-fade-in">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="w-full">
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: Trust & Security Guarantee */}
      <section className="py-28 bg-[#0a0a0a] border-y border-[#c9a961]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16 items-center text-center font-body">
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center transition-colors group-hover:border-[#c9a961] bg-[#c9a961]/5">
                {Icons.shield}
              </div>
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white uppercase font-bold mb-2">Pagamento Seguro</p>
                <p className="text-[10px] text-[#d4c5a0]/40 uppercase tracking-widest font-light">Criptografia de ponta a ponta</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center transition-colors group-hover:border-[#c9a961] bg-[#c9a961]/5">
                {Icons.creditCard}
              </div>
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white uppercase font-bold mb-2">Todas Bandeiras</p>
                <p className="text-[10px] text-[#d4c5a0]/40 uppercase tracking-widest font-light">Crédito, Débito e PIX</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-16 h-16 border border-[#c9a961]/20 flex items-center justify-center transition-colors group-hover:border-[#c9a961] bg-[#c9a961]/5">
                {Icons.refresh}
              </div>
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white uppercase font-bold mb-2">Cancelamento Simples</p>
                <p className="text-[10px] text-[#d4c5a0]/40 uppercase tracking-widest font-light">Sem multas ou carência</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Payment Brands Infinite Scroller */}
      <section className="py-20 bg-[#090d0b] border-y border-[#c9a961]/15 overflow-hidden">
        <div className="relative flex w-full overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="flex items-center gap-20 px-10">
              <PaymentBrands />
              <span className="text-[#c9a961]/30 text-lg">◆</span>
              <PaymentBrands />
              <span className="text-[#c9a961]/30 text-lg">◆</span>
            </div>
          </motion.div>
          {/* Faded edges - Matching the main background color #090d0b */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#090d0b] via-[#090d0b]/40 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#090d0b] via-[#090d0b]/40 to-transparent z-10" />
        </div>
      </section>

      <section className="py-32 bg-[#090d0b] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <h2 className="font-display text-7xl lg:text-[10rem] font-light text-white leading-[0.8] tracking-tight mb-16">
            Sua Mesa Está<br />
            <span className="text-gradient-gold italic">Pronta.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button
              onClick={() => document.getElementById('selection-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-16 py-7 bg-[#c9a961] text-[#0a0a0a] font-bold text-sm tracking-[0.4em] uppercase hover:glow-gold transition-all shadow-2xl"
            >
              Assinar Agora
            </button>
            <Link href="/" className="px-16 py-7 border border-[#c9a961]/30 text-[#c9a961] font-bold text-sm tracking-[0.4em] uppercase hover:bg-[#c9a961]/10 transition-all">Ver Destaques</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
