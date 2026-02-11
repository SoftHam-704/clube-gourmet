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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Large geometric shapes */}
      <div className="absolute top-20 right-10 w-80 h-80 border border-[#00ff88]/10 rotate-45" />
      <div className="absolute top-24 right-14 w-72 h-72 border border-[#00ff88]/20 rotate-45 animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-64 h-64 border border-[#ff3366]/10 rotate-12" />
      <div className="absolute bottom-24 left-14 w-56 h-56 border border-[#ff3366]/20 rotate-12" />

      {/* Hexagon shape */}
      <svg className="absolute top-1/4 left-[15%] w-24 h-24 text-[#222]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Triangle shapes */}
      <svg className="absolute bottom-1/4 right-[20%] w-16 h-16 text-[#00ff88]/20" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-20 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent animate-scan" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ff88]/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff3366]/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left side - Text */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#222] bg-[#111]">
              <span className="w-2 h-2 bg-[#00ff88] animate-pulse" />
              <span className="text-[#666] text-sm font-mono tracking-wider">500+ RESTAURANTES PARCEIROS</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
              Alta
              <br />
              Gastronomia,
              <span className="block mt-2 text-gradient animate-gradient">
                Metade do
                <br />
                Preço
              </span>
            </h1>

            <p className="text-xl text-[#666] max-w-xl leading-relaxed font-light">
              Junte-se a milhares de amantes da boa comida que economizam até 50% nos melhores restaurantes. Uma assinatura, experiências 2 por 1 ilimitadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/restaurants" className="group px-8 py-4 bg-[#00ff88] text-[#0a0a0a] font-bold text-sm tracking-wider uppercase hover:glow-green hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-3">
                Ver Restaurantes
                <span className="transition-transform group-hover:translate-x-1">{Icons.arrow}</span>
              </Link>
              <Link href="/plans" className="px-8 py-4 border border-[#333] text-white font-bold text-sm tracking-wider uppercase hover:border-[#00ff88] hover:text-[#00ff88] hover:-translate-y-1 transition-all text-center">
                Ver Planos
              </Link>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="lg:col-span-5 animate-fade-in-delayed">
            <div className="border border-[#222] bg-[#111]/80 backdrop-blur-sm p-8 space-y-8 relative">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00ff88]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00ff88]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00ff88]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00ff88]" />

              <div className="flex items-center justify-between border-b border-[#222] pb-6">
                <span className="text-[#666] text-sm font-mono tracking-wider uppercase">// Estatísticas</span>
                <span className="w-2 h-2 bg-[#00ff88] animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-[#00ff88]">{Math.round(count1)}<span className="text-[#ff3366]">%</span></div>
                  <div className="text-[#666] text-sm tracking-wider uppercase">Economia Média</div>
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-white">{Math.round(count2)}<span className="text-[#ff3366]">k</span><span className="text-[#666]">+</span></div>
                  <div className="text-[#666] text-sm tracking-wider uppercase">Membros</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-5xl font-bold text-white">4.9</span>
                    <span className="text-[#00ff88]">{Icons.star}</span>
                  </div>
                  <div className="text-[#666] text-sm tracking-wider uppercase">Avaliação</div>
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-5xl font-bold text-white">R$<span className="text-[#00ff88]">{Math.round(count3)}</span></div>
                  <div className="text-[#666] text-sm tracking-wider uppercase">Economizado/mês</div>
                </div>
              </div>

              {/* Live ticker */}
              <div className="border-t border-[#222] pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="w-2 h-2 bg-[#00ff88] absolute animate-ping" />
                    <span className="w-2 h-2 bg-[#00ff88] relative block" />
                  </div>
                  <span className="text-[#666] text-sm font-mono">
                    <span className="text-white">Mariana C.</span> economizou <span className="text-[#00ff88]">R$142</span> agora mesmo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666]">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#666] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
          <div>
            <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// Benefícios</span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-white tracking-tighter">
              A Forma Mais<br />
              <span className="text-gradient">Inteligente</span> de<br />
              Jantar Fora
            </h2>
          </div>
          <p className="text-[#666] text-lg max-w-md leading-relaxed">
            Mais que um cartão de desconto. É uma melhoria no estilo de vida para quem ama boa comida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="group bg-[#0a0a0a] p-8 hover:bg-[#111] transition-all duration-500 relative"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#333] opacity-0 group-hover:opacity-100 group-hover:border-[#00ff88] transition-all" />

              {/* Stat */}
              <div className="font-mono text-6xl font-bold text-[#222] group-hover:text-[#00ff88]/20 transition-colors mb-4">
                {benefit.stat}
              </div>

              <div className="text-[#666] text-xs font-mono tracking-widest uppercase mb-6">
                {benefit.statLabel}
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#00ff88] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-[#666] leading-relaxed text-sm">
                {benefit.description}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#00ff88] group-hover:w-full transition-all duration-500" />
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
    <section id="how-it-works" className="py-32 bg-[#111] relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-px h-40 bg-gradient-to-b from-[#00ff88] to-transparent" />
      <div className="absolute bottom-20 left-20 w-px h-40 bg-gradient-to-b from-transparent to-[#ff3366]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// Processo</span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white tracking-tighter mb-6">
            Quatro Passos para<br />
            <span className="text-gradient">Economizar</span>
          </h2>
          <p className="text-[#666] text-lg">
            Do cadastro à economia em menos de 5 minutos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps list */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[26px] top-12 bottom-12 w-px bg-gradient-to-b from-[#00ff88] via-[#222] to-[#ff3366] hidden lg:block" />

            <div className="space-y-2 relative">
              {STEPS.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-6 transition-all duration-300 border group relative ${activeStep === index
                    ? "bg-[#0a0a0a] border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.1)]"
                    : "bg-transparent border-[#222] hover:border-[#333] hover:bg-[#0a0a0a]/50"
                    }`}
                >
                  {/* Gradient border on hover for inactive */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${activeStep !== index ? "border-gradient" : ""}`} />

                  <div className="flex items-start gap-6 relative">
                    {/* Step indicator dot */}
                    <div className="relative">
                      <span className={`font-mono text-3xl font-bold transition-colors ${activeStep === index ? "text-[#00ff88]" : "text-[#333] group-hover:text-[#666]"}`}>
                        {step.number}
                      </span>
                      {/* Active indicator */}
                      {activeStep === index && (
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00ff88]" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-display text-xl font-bold mb-1 transition-colors ${activeStep === index ? "text-white" : "text-[#666] group-hover:text-white"}`}>
                        {step.title}
                      </h3>
                      <p className={`transition-colors text-sm ${activeStep === index ? "text-[#999]" : "text-[#444] group-hover:text-[#666]"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              {/* Outer border */}
              <div className="absolute inset-0 border border-[#222]" />

              {/* Inner content */}
              <div className="absolute inset-8 border border-[#00ff88]/30 bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-[120px] font-bold text-[#00ff88] leading-none">
                    {STEPS[activeStep].number}
                  </div>
                  <div className="text-white font-display text-2xl font-bold tracking-tight mt-4">
                    {STEPS[activeStep].title}
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff88]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff88]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff88]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff88]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// Depoimentos</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tighter">
            Membros Reais,<br />
            <span className="text-gradient">Economias Reais</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#222]">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-[#0a0a0a] p-8 relative group hover:bg-[#111] transition-all">
              <div className="absolute top-8 right-8">
                <svg className="w-8 h-8 text-[#222] group-hover:text-[#00ff88]/20 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <p className="text-[#999] text-lg leading-relaxed mb-8 font-light">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#333] flex items-center justify-center font-mono text-sm text-[#666]">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-[#666] text-sm font-mono">{testimonial.role}</div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#00ff88] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-32 bg-[#111] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// Newsletter</span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-6">
          Fique Por Dentro das<br />
          <span className="text-gradient">Novidades</span>
        </h2>
        <p className="text-[#666] text-lg mb-12">
          Receba ofertas exclusivas e novos restaurantes parceiros em primeira mão.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="seu@email.com"
            className="flex-1 px-6 py-4 bg-[#0a0a0a] border border-[#222] text-white placeholder-[#444] focus:border-[#00ff88] focus:outline-none font-mono text-sm"
          />
          <button className="px-8 py-4 bg-[#00ff88] text-[#0a0a0a] font-bold text-sm tracking-wider uppercase hover:glow-green transition-all">
            Inscrever
          </button>
        </div>

        <p className="text-[#444] text-xs mt-4 font-mono">
          Sem spam. Cancele quando quiser.
        </p>
      </div>
    </section>
  );
}

// Footer removed - using shared component

export default function Index() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
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
