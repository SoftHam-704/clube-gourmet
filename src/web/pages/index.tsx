import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const BENEFITS = [
  {
    title: "2 por 1 Sempre",
    description: "Peça dois pratos principais, pague apenas um. Sem restrições, sem letras miúdas.",
    stat: "50%",
    statLabel: "economia",
  },
  {
    title: "Restaurantes Top",
    description: "Seleção curada dos melhores restaurantes da sua cidade. Só os melhores entram.",
    stat: "500+",
    statLabel: "parceiros",
  },
  {
    title: "Experiências Ilimitadas",
    description: "Use sua assinatura quantas vezes quiser. Jante fora todos os dias, se preferir.",
    stat: "∞",
    statLabel: "uso",
  },
  {
    title: "Se Paga Rapidinho",
    description: "Um jantar fora já cobre sua assinatura anual. Todo o resto é economia pura.",
    stat: "1x",
    statLabel: "visita",
  },
];

const STEPS = [
  { number: "01", title: "Assine", description: "Escolha seu plano e tenha acesso imediato à plataforma" },
  { number: "02", title: "Explore", description: "Descubra mais de 500 restaurantes parceiros na sua região" },
  { number: "03", title: "Reserve", description: "Faça sua reserva pelo app ou pelo site" },
  { number: "04", title: "Aproveite", description: "Mostre seu cartão digital, peça dois pratos, pague um" },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    role: "Membro desde 2023",
    quote: "No começo fiquei em dúvida, mas depois do terceiro jantar já tinha economizado mais que o valor da assinatura anual.",
    avatar: "MC",
  },
  {
    name: "Rafael Mendes",
    role: "Entusiasta gastronômico",
    quote: "A qualidade dos restaurantes é incrível. Não são lugares aleatórios — são exatamente onde eu já queria jantar.",
    avatar: "RM",
  },
  {
    name: "Ana Beatriz Silva",
    role: "Frequentadora assídua",
    quote: "Eu e meu parceiro saímos todo final de semana agora. O que custava R$300 agora custa R$150.",
    avatar: "AS",
  },
];

// Minimal stroke icons
const Icons = {
  arrow: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  arrowDown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
};

// Navbar removed - using shared component

import { useState, useEffect } from "react";
import { Link } from "wouter";

function HeroSection() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer1 = setInterval(() => setCount1((prev: number) => prev < 50 ? prev + 1 : 50), interval);
    const timer2 = setInterval(() => setCount2((prev: number) => prev < 15 ? prev + 0.3 : 15), interval);
    const timer3 = setInterval(() => setCount3((prev: number) => prev < 847 ? prev + 15 : 847), interval);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a4d2e]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Large geometric shapes */}
      <div className="absolute top-20 right-10 w-80 h-80 border border-[#c9a961]/10 rotate-45" />
      <div className="absolute top-24 right-14 w-72 h-72 border border-[#c9a961]/20 rotate-45 animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-64 h-64 border border-[#d4c5a0]/10 rotate-12" />
      <div className="absolute bottom-24 left-14 w-56 h-56 border border-[#d4c5a0]/20 rotate-12" />

      {/* Hexagon shape */}
      <svg className="absolute top-1/4 left-[15%] w-24 h-24 text-[#222]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Triangle shapes */}
      <svg className="absolute bottom-1/4 right-[20%] w-16 h-16 text-[#c9a961]/20" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-20 bg-gradient-to-b from-transparent via-[#4ec985]/5 to-transparent animate-scan" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4c5a0]/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Text */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in pr-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#c9a961]/20 bg-[#0a0a0a]/40 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#c9a961] animate-pulse" />
              <span className="text-[#d4c5a0] text-sm font-mono tracking-[0.2em]">500+ RESTAURANTES PARCEIROS</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter">
              Alta
              <br />
              Gastronomia,
              <span className="block mt-4 text-gradient-gold animate-gradient">
                Metade do
                <br />
                Preço
              </span>
            </h1>

            <p className="text-xl text-[#d4c5a0]/80 max-w-xl leading-relaxed font-light">
              O Club Empar Gourmet é um clube de benefícios gastronômicos que conecta consumidores a restaurantes parceiros, oferecendo experiências exclusivas, vantagens reais e valorização da boa gastronomia. Criamos conexões que fortalecem restaurantes e proporcionam experiências únicas aos associados.
              <Link href="/about" className="ml-2 text-[#c9a961] font-bold border-b border-[#c9a961]/20 hover:border-[#c9a961] transition-all">Conheça mais sobre nós →</Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/restaurants" className="group min-w-[260px] px-8 py-4 bg-[#c9a961] text-[#0a0a0a] font-bold text-sm tracking-wider uppercase hover:glow-green hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-3">
                Ver Restaurantes
                <span className="transition-transform group-hover:translate-x-1">{Icons.arrow}</span>
              </Link>
              <Link href="/plans" className="px-8 py-4 border border-[#c9a961]/30 text-white font-bold text-sm tracking-wider uppercase hover:border-[#c9a961] hover:text-[#c9a961] hover:-translate-y-1 transition-all text-center flex-1 sm:flex-none sm:min-w-[180px]">
                Ver Planos
              </Link>
              <Link href="/plans" className="group min-w-[260px] px-8 py-4 bg-[#c9a961] text-[#0a0a0a] font-bold text-sm tracking-wider uppercase hover:glow-green hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-3 animate-pulse-glow shadow-[0_0_20px_rgba(201,169,97,0.3)]">
                Associar-se
                <span className="transition-transform group-hover:translate-x-1">{Icons.arrow}</span>
              </Link>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="lg:col-span-5 flex justify-end animate-fade-in-delayed">
            <div className="border border-[#c9a961]/30 bg-[#0a0a0a]/60 backdrop-blur-xl p-10 space-y-10 relative shadow-2xl">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c9a961]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c9a961]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c9a961]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c9a961]" />

              <div className="flex items-center justify-between border-b border-[#c9a961]/20 pb-6">
                <span className="text-[#c9a961] text-sm font-mono tracking-[0.2em] uppercase">// Estatísticas</span>
                <span className="w-3 h-3 bg-[#c9a961] animate-pulse rounded-full shadow-[0_0_15px_#c9a961]" />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-[#c9a961]">{Math.round(count1)}<span className="text-[#d4c5a0]">%</span></div>
                  <div className="text-[#d4c5a0]/60 text-xs tracking-[0.15em] uppercase font-bold">Economia Média</div>
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-white">{Math.round(count2)}<span className="text-[#d4c5a0]">k</span><span className="text-[#c9a961]">+</span></div>
                  <div className="text-[#d4c5a0]/60 text-xs tracking-[0.15em] uppercase font-bold">Membros</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-5xl font-bold text-white">4.9</span>
                    <span className="text-[#c9a961]">{Icons.star}</span>
                  </div>
                  <div className="text-[#d4c5a0]/60 text-xs tracking-[0.15em] uppercase font-bold">Avaliação</div>
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-white">R$<span className="text-[#c9a961]">{Math.round(count3)}</span></div>
                  <div className="text-[#d4c5a0]/60 text-xs tracking-[0.15em] uppercase font-bold">Economizado/mês</div>
                </div>
              </div>

              {/* Live ticker */}
              <div className="border-t border-[#c9a961]/20 pt-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="w-2 h-2 bg-[#c9a961] absolute animate-ping rounded-full" />
                    <span className="w-2 h-2 bg-[#c9a961] relative block rounded-full" />
                  </div>
                  <span className="text-[#d4c5a0]/70 text-sm font-mono tracking-tight">
                    <span className="text-white font-bold">Mariana C.</span> economizou <span className="text-[#c9a961] font-bold">R$142</span> agora mesmo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="py-32 bg-[#1a4d2e] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a961]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <span className="text-[#c9a961] font-mono text-sm tracking-[0.4em] uppercase mb-6 block">// Por que associar-se?</span>
            <h2 className="font-display text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              A Forma Mais<br />
              <span className="text-gradient-gold animate-gradient">Inteligente</span> de<br />
              Jantar Fora
            </h2>
          </div>
          <p className="text-[#d4c5a0]/70 text-xl max-w-sm leading-relaxed font-light border-l border-[#c9a961]/20 pl-8 py-2">
            Mais que um cartão de desconto. É uma curadoria de experiências para quem não abre mão da excelência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="group bg-[#0a0a0a]/60 backdrop-blur-xl p-10 border border-[#c9a961]/10 hover:border-[#c9a961]/40 transition-all duration-700 relative shadow-2xl"
            >
              {/* Corner accents - Permanently visible */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />

              {/* Stat Background */}
              <div className="absolute -top-4 -right-2 font-mono text-8xl font-black text-[#c9a961]/5 group-hover:text-[#c9a961]/10 transition-colors pointer-events-none italic">
                {benefit.stat}
              </div>

              <div className="text-[#c9a961] text-[10px] font-mono tracking-[0.3em] uppercase mb-10 font-black opacity-60 group-hover:opacity-100 transition-opacity">
                {benefit.statLabel}
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-6 tracking-tight leading-tight">
                {benefit.title}
              </h3>

              <p className="text-[#d4c5a0]/60 leading-relaxed text-sm font-light mb-8 group-hover:text-[#d4c5a0]/90 transition-colors">
                {benefit.description}
              </p>

              {/* Accent Line */}
              <div className="w-12 h-0.5 bg-[#c9a961] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid pattern refined */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Luxury glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a961]/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-[#c9a961] font-mono text-sm tracking-[0.4em] uppercase mb-6 block">// O Processo</span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase">
            Quatro Passos para<br />
            <span className="text-gradient-gold animate-gradient">Economizar</span>
          </h2>
          <p className="text-[#d4c5a0]/70 text-xl font-light max-w-2xl mx-auto">
            Da assinatura à primeira experiência gastronômica em poucos minutos. Simples, rápido e exclusivo.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Steps list - Left */}
          <div className="lg:col-span-6 space-y-4">
            {STEPS.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-10 transition-all duration-700 border relative group ${activeStep === index
                  ? "bg-[#c9a961]/5 border-[#c9a961]/40 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]"
                  }`}
              >
                {/* Visual indicator for active state */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#c9a961] transition-all duration-500 ${activeStep === index ? "opacity-100 h-full" : "opacity-0 h-0"}`} />

                <div className="flex items-start gap-8">
                  <span className={`font-mono text-4xl font-black transition-all duration-500 ${activeStep === index ? "text-[#c9a961] scale-110" : "text-white/10 group-hover:text-white/20"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`font-display text-2xl font-bold mb-3 transition-colors ${activeStep === index ? "text-[#c9a961]" : "text-white/40 group-hover:text-white/70"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${activeStep === index ? "text-white/80" : "text-white/10 group-hover:text-white/30"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Large Card Visual - Right */}
          <div className="lg:col-span-6 relative aspect-square lg:aspect-auto lg:h-[600px] animate-fade-in">
            <div className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#c9a961]/20 p-12 flex flex-col items-center justify-center text-center shadow-[0_40px_80px_rgba(0,0,0,0.6)]">

              {/* Corner accents - Permanently visible & larger */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#c9a961]/40" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#c9a961]/40" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#c9a961]/40" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c9a961]/40" />

              {/* Holographic Number */}
              <div className="relative mb-8">
                <div className="absolute inset-0 blur-[40px] bg-[#c9a961]/20 animate-pulse-glow" />
                <span className="relative font-mono text-[180px] lg:text-[240px] font-black leading-none text-gradient-gold animate-gradient">
                  {STEPS[activeStep].number}
                </span>
              </div>

              <div className="space-y-6 max-w-md">
                <h4 className="text-[#c9a961] font-mono text-sm tracking-[0.5em] uppercase opacity-60">Passo Selecionado</h4>
                <p className="text-3xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                  {STEPS[activeStep].title}
                </p>
                <div className="w-20 h-1 bg-[#c9a961] mx-auto opacity-40" />
                <p className="text-[#d4c5a0]/60 text-lg font-light leading-relaxed italic">
                  "{STEPS[activeStep].description}"
                </p>
              </div>

              {/* Decorative scanline effect inside the card */}
              <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />
            </div>

            {/* Background decorative circles */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 border border-[#c9a961]/10 rounded-full animate-float" />
            <div className="absolute -z-10 -bottom-20 -left-20 w-60 h-60 border border-[#c9a961]/5 rounded-full animate-float" style={{ animationDelay: '-1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[120px] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a961]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-[#c9a961] font-mono text-sm tracking-[0.4em] uppercase mb-6 block">// Clube de Elite</span>
          <h2 className="font-display text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Membros Reais,<br />
            <span className="text-gradient-gold animate-gradient">Economias Reais</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-[#0a0a0a]/60 backdrop-blur-xl p-12 border border-[#c9a961]/10 relative group hover:border-[#c9a961]/40 transition-all duration-700 shadow-2xl">

              {/* Corner accents - Permanently visible */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a961]/30 group-hover:border-[#c9a961] transition-all duration-500" />

              <div className="mb-10 text-[#c9a961] opacity-40 group-hover:opacity-100 transition-opacity">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <p className="text-white/80 text-xl leading-relaxed mb-12 font-light italic tracking-tight">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-6 mt-auto">
                <div className="w-16 h-16 border-2 border-[#c9a961]/30 rounded-full flex items-center justify-center font-mono text-lg font-black text-[#c9a961] bg-[#0a0a0a]/80 shadow-lg group-hover:border-[#c9a961] transition-all">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold tracking-tight text-xl mb-1">{testimonial.name}</div>
                  <div className="text-[#c9a961] text-xs font-mono tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">{testimonial.role}</div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute top-12 right-12 w-12 h-px bg-[#c9a961]/10 group-hover:w-20 group-hover:bg-[#c9a961]/40 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
      {/* Refined background elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#c9a961]/20 to-transparent" />

      {/* Center luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#c9a961]/10 blur-[180px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-[#c9a961] font-mono text-sm tracking-[0.5em] uppercase mb-10 block animate-pulse">// Convite Exclusivo</span>
        <h2 className="font-display text-6xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
          Receba Ofertas<br />
          <span className="text-gradient-gold animate-gradient">Privilegiadas</span>
        </h2>
        <p className="text-[#d4c5a0]/70 text-2xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
          Novos restaurantes parceiros e experiências de alta gastronomia em primeira mão na sua caixa de entrada.
        </p>

        <div className="flex flex-col sm:flex-row gap-0 max-w-3xl mx-auto border border-[#c9a961]/20 p-2 bg-white/5 backdrop-blur-md shadow-2xl">
          <input
            type="email"
            placeholder="SEU MELHOR E-MAIL"
            className="flex-1 px-10 py-6 bg-transparent text-white placeholder-[#c9a961]/20 focus:outline-none font-mono text-sm tracking-[0.2em]"
          />
          <button className="group px-14 py-6 bg-[#c9a961] text-[#0a0a0a] font-black text-sm tracking-[0.3em] uppercase hover:glow-green hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3">
            Associar-se
            <span className="transition-transform group-hover:translate-x-1">{Icons.arrow}</span>
          </button>
        </div>

        <p className="text-[#c9a961]/30 text-xs mt-12 font-mono tracking-[0.4em] uppercase">
          RESERVADO APENAS PARA VERDADEIROS APRECIADORES.
        </p>
      </div>
    </section>
  );
}

// Footer removed - using shared component

export default function Index() {
  return (
    <div className="bg-[#1a4d2e] min-h-screen">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
