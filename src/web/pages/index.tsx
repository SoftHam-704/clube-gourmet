import { useState, useEffect } from "react";
import { Link } from "wouter";

const NAV_LINKS = [
  { label: "Restaurantes", href: "/restaurants", isPage: true },
  { label: "Planos", href: "/plans", isPage: true },
  { label: "Benefícios", href: "#benefits", isPage: false },
  { label: "Como Funciona", href: "#how-it-works", isPage: false },
];

// Premium SVG Icons
const Icons = {
  twoForOne: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="8" y="16" width="20" height="32" rx="4" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="2"/>
      <rect x="36" y="16" width="20" height="32" rx="4" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="2"/>
      <path d="M28 32h8" className="stroke-emerald-400" strokeWidth="3" strokeLinecap="round"/>
      <text x="18" y="36" className="fill-emerald-500 text-[14px] font-bold" textAnchor="middle">2</text>
      <text x="46" y="36" className="fill-emerald-500 text-[14px] font-bold" textAnchor="middle">1</text>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M32 8l6.5 16.5L56 26l-13 11 4 17-15-10-15 10 4-17L8 26l17.5-1.5L32 8z" className="fill-amber-500/20 stroke-amber-500" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="32" cy="30" r="6" className="fill-amber-400/30 stroke-amber-400" strokeWidth="1.5"/>
    </svg>
  ),
  infinity: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M20 32c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10" className="stroke-coral-500" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M44 32c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10" className="stroke-coral-500" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="32" r="3" className="fill-coral-400"/>
      <circle cx="44" cy="32" r="3" className="fill-coral-400"/>
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="8" y="18" width="48" height="32" rx="6" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2"/>
      <rect x="8" y="18" width="48" height="10" className="fill-emerald-500/20"/>
      <circle cx="46" cy="38" r="4" className="fill-emerald-400"/>
      <path d="M16 12h24c2 0 4 1 5 3" className="stroke-emerald-400" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="12" y="4" width="24" height="40" rx="4" className="fill-slate-700 stroke-slate-500" strokeWidth="1.5"/>
      <rect x="16" y="10" width="16" height="24" rx="1" className="fill-emerald-500/20"/>
      <circle cx="24" cy="38" r="2" className="fill-slate-500"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="12" className="fill-amber-500/20 stroke-amber-400" strokeWidth="2"/>
      <path d="M30 30l10 10" className="stroke-amber-400" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="10" width="36" height="32" rx="4" className="fill-blue-500/20 stroke-blue-400" strokeWidth="2"/>
      <path d="M6 20h36" className="stroke-blue-400" strokeWidth="2"/>
      <path d="M14 6v8M34 6v8" className="stroke-blue-400" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="30" r="2" className="fill-blue-400"/>
      <circle cx="24" cy="30" r="2" className="fill-blue-400"/>
      <circle cx="32" cy="30" r="2" className="fill-blue-300"/>
    </svg>
  ),
  celebrate: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 8L26 16L34 14L28 20L34 26L26 24L24 32L22 24L14 26L20 20L14 14L22 16L24 8z" className="fill-pink-400"/>
      <circle cx="10" cy="10" r="2" className="fill-pink-300"/>
      <circle cx="38" cy="12" r="3" className="fill-pink-300"/>
      <circle cx="12" cy="36" r="2" className="fill-pink-200"/>
      <circle cx="36" cy="34" r="2" className="fill-pink-300"/>
    </svg>
  ),
  wine: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M16 8h16v8c0 8-6 12-8 12s-8-4-8-12V8z" className="fill-coral-500/20 stroke-coral-400" strokeWidth="2"/>
      <path d="M24 28v12" className="stroke-coral-400" strokeWidth="2"/>
      <path d="M16 40h16" className="stroke-coral-400" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="24" cy="14" rx="6" ry="3" className="fill-coral-400/40"/>
    </svg>
  ),
  salad: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="32" rx="18" ry="10" className="fill-amber-500/20 stroke-amber-400" strokeWidth="2"/>
      <path d="M12 26c4-6 8-10 12-10s8 4 12 10" className="stroke-emerald-400" strokeWidth="2" fill="none"/>
      <circle cx="18" cy="28" r="3" className="fill-emerald-400"/>
      <circle cx="28" cy="26" r="2" className="fill-coral-400"/>
      <circle cx="24" cy="30" r="2" className="fill-amber-400"/>
    </svg>
  ),
};

const BENEFITS = [
  {
    icon: "twoForOne",
    title: "2 por 1 Sempre",
    description: "Peça dois pratos principais, pague apenas um. Sem restrições, sem letras miúdas. Simples assim.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: "star",
    title: "Restaurantes Top",
    description: "Seleção curada dos melhores restaurantes da sua cidade. Só os melhores entram na nossa lista.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: "infinity",
    title: "Experiências Ilimitadas",
    description: "Use sua assinatura quantas vezes quiser. Jante fora todos os dias, se preferir.",
    gradient: "from-coral-500 to-rose-600",
  },
  {
    icon: "wallet",
    title: "Se Paga Rapidinho",
    description: "Um jantar fora já cobre sua assinatura anual. Todo o resto é economia pura.",
    gradient: "from-emerald-500 to-cyan-600",
  },
];

const STEPS = [
  { number: "01", title: "Assine", description: "Escolha seu plano e tenha acesso imediato à plataforma", icon: "phone" },
  { number: "02", title: "Explore", description: "Descubra mais de 500 restaurantes parceiros na sua região", icon: "search" },
  { number: "03", title: "Reserve", description: "Faça sua reserva pelo app ou pelo site", icon: "calendar" },
  { number: "04", title: "Aproveite", description: "Mostre seu cartão digital, peça dois pratos, pague um", icon: "celebrate" },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    role: "Membro desde 2023",
    quote: "No começo fiquei em dúvida, mas depois do terceiro jantar já tinha economizado mais que o valor da assinatura anual. Agora recomendo para todo mundo.",
    avatar: "MC",
  },
  {
    name: "Rafael Mendes",
    role: "Entusiasta gastronômico",
    quote: "A qualidade dos restaurantes é incrível. Não são lugares aleatórios — são exatamente onde eu já queria jantar. Mudou tudo.",
    avatar: "RM",
  },
  {
    name: "Ana Beatriz Silva",
    role: "Frequentadora assídua",
    quote: "Eu e meu parceiro saímos todo final de semana agora. O que custava R$300 agora custa R$150. É como ter um desconto permanente na vida.",
    avatar: "AS",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">Club Empar</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.isPage ? (
                <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors font-medium">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors font-medium">
                  {link.label}
                </a>
              )
            ))}
            <Link href="/plans" className="px-6 py-2.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-coral-500/30 transition-all hover:-translate-y-0.5">
              Começar Agora
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white" aria-label="Abrir menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 py-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 space-y-4">
          {NAV_LINKS.map((link) => (
            link.isPage ? (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white transition-colors font-medium py-2">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white transition-colors font-medium py-2">
                {link.label}
              </a>
            )
          ))}
          <Link href="/plans" className="block w-full text-center px-6 py-3 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold">
            Começar Agora
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/8 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral-500/6 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium tracking-wide">+500 Restaurantes Parceiros</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Alta Gastronomia,
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-emerald-300 to-coral-400 bg-clip-text text-transparent">
                Metade do Preço
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Junte-se a milhares de amantes da boa comida que economizam até 50% nos melhores restaurantes da cidade. Uma assinatura, experiências 2 por 1 ilimitadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/restaurants" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:-translate-y-1 text-center inline-flex items-center justify-center gap-2">
                Ver Restaurantes
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/plans" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all text-center backdrop-blur-sm">
                Ver Planos
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-slate-700/50">
              <div>
                <div className="text-3xl font-bold text-white font-display">50%</div>
                <div className="text-slate-500 text-sm">Economia Média</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <div className="text-3xl font-bold text-white font-display">15mil+</div>
                <div className="text-slate-500 text-sm">Membros Felizes</div>
              </div>
              <div className="w-px h-12 bg-slate-700 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-white font-display">4.9</span>
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-slate-500 text-sm">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block animate-fade-in-delayed">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-emerald-500/10 to-coral-500/10 blur-xl" />
              
              {/* Main card */}
              <div className="relative z-10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Club Empar</div>
                      <div className="text-slate-500 text-sm">Membro Premium</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold">ATIVO</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                    <div>
                      <div className="text-slate-400 text-sm">Jantar de Hoje</div>
                      <div className="text-white font-medium">Bistrô Montmartre</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 text-sm line-through">R$ 280</div>
                      <div className="text-emerald-400 font-bold text-lg">R$ 140</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Economia do mês</span>
                    <span className="text-emerald-400 font-semibold">R$ 847 economizados</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-600 rounded-2xl flex items-center justify-center shadow-xl shadow-coral-500/30 rotate-12 animate-float">
                <div className="w-12 h-12">{Icons.wine}</div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 -rotate-12 animate-float-delayed">
                <div className="w-10 h-10">{Icons.salad}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-coral-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-4 px-4 py-1.5 bg-emerald-50 rounded-full">Por Que Escolher a Gente</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6 tracking-tight">
            A Forma Mais Inteligente de
            <span className="text-emerald-600"> Jantar Fora</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Mais que um cartão de desconto. É uma melhoria no estilo de vida para quem ama boa comida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Top gradient line on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon container */}
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} p-0.5 shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-3">
                  {Icons[benefit.icon as keyof typeof Icons]}
                </div>
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover arrow */}
              <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = {
    phone: Icons.phone,
    search: Icons.search,
    calendar: Icons.calendar,
    celebrate: Icons.celebrate,
  };

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-4 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">Processo Simples</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
            Quatro Passos para
            <span className="text-emerald-400"> Economizar com Sabor</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Do cadastro à economia em menos de 5 minutos. Sem complicação, sem passos ocultos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps list */}
          <div className="space-y-4">
            {STEPS.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeStep === index
                    ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                    : "bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-display text-2xl font-bold transition-colors ${activeStep === index ? "text-emerald-400" : "text-slate-600"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold mb-1 transition-colors ${activeStep === index ? "text-white" : "text-slate-300"}`}>
                      {step.title}
                    </h3>
                    <p className={`transition-colors ${activeStep === index ? "text-slate-300" : "text-slate-500"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Animated circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-coral-500/15 animate-spin-slow-reverse" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform transition-all duration-500" style={{ transform: `rotate(${activeStep * 5}deg)` }}>
                  <div className="text-center text-white">
                    <div className="text-6xl font-display font-bold">{STEPS[activeStep].number}</div>
                    <div className="text-lg font-medium mt-2">{STEPS[activeStep].title}</div>
                  </div>
                </div>
              </div>

              {/* Floating icons */}
              {STEPS.map((step, index) => {
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-4",
                  "top-1/2 right-0 translate-x-4 -translate-y-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-4",
                  "top-1/2 left-0 -translate-x-4 -translate-y-1/2"
                ];
                const gradients = [
                  "from-coral-400 to-coral-500",
                  "from-amber-400 to-amber-500",
                  "from-blue-400 to-blue-500",
                  "from-pink-400 to-pink-500"
                ];
                const shadows = [
                  "shadow-coral-500",
                  "shadow-amber-500",
                  "shadow-blue-500",
                  "shadow-pink-500"
                ];
                return (
                  <div 
                    key={index}
                    className={`absolute ${positions[index]} w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center transition-all duration-300 ${
                      activeStep === index 
                        ? `scale-110 shadow-lg ${shadows[index]}/40` 
                        : `scale-100 shadow-md ${shadows[index]}/20`
                    }`}
                  >
                    <div className="w-7 h-7">
                      {stepIcons[step.icon as keyof typeof stepIcons]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-4 px-4 py-1.5 bg-emerald-50 rounded-full">Depoimentos</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6 tracking-tight">
            Amado por
            <span className="text-emerald-600"> Entusiastas da Gastronomia</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Não acredite só na nossa palavra. Veja o que nossos membros dizem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-500 group"
            >
              {/* Quote decoration */}
              <svg className="absolute -top-2 left-6 w-12 h-12 text-emerald-500/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              
              <p className="text-slate-700 leading-relaxed mb-6 relative z-10 pt-4">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-coral-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/10 border border-coral-500/20 mb-8">
          <svg className="w-5 h-5 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <span className="text-coral-400 text-sm font-medium">Ganhe 10% de desconto na primeira assinatura</span>
        </div>

        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
          Pronto para Começar a
          <span className="block text-emerald-400">Economizar?</span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Assine nossa newsletter e seja o primeiro a saber sobre novos restaurantes parceiros, ofertas exclusivas e benefícios para membros.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Obrigado por se inscrever! Verifique sua caixa de entrada.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-coral-500/30 transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Inscrever-se
            </button>
          </form>
        )}

        <p className="text-slate-600 text-sm mt-6">
          Sem spam, nunca. Cancele quando quiser.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">Club Empar</span>
          </div>

          <div className="flex items-center gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>

          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Club Empar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="font-sans antialiased">
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
