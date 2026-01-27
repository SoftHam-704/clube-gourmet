import { useState, useEffect } from "react";
import { Link } from "wouter";

const NAV_LINKS = [
  { label: "Restaurantes", href: "/restaurants", isPage: true },
  { label: "Planos", href: "/plans", isPage: true },
  { label: "Benefícios", href: "#benefits", isPage: false },
  { label: "Como Funciona", href: "#how-it-works", isPage: false },
];

const BENEFITS = [
  {
    icon: "🍽️",
    title: "2 por 1 Sempre",
    description: "Peça dois pratos principais, pague apenas um. Sem restrições, sem letras miúdas. Simples assim.",
  },
  {
    icon: "⭐",
    title: "Restaurantes Top",
    description: "Seleção curada dos melhores restaurantes da sua cidade. Só os melhores entram na nossa lista.",
  },
  {
    icon: "♾️",
    title: "Experiências Ilimitadas",
    description: "Use sua assinatura quantas vezes quiser. Jante fora todos os dias, se preferir.",
  },
  {
    icon: "💰",
    title: "Se Paga Rapidinho",
    description: "Um jantar fora já cobre sua assinatura anual. Todo o resto é economia pura.",
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
            <span className="font-display text-xl font-bold text-white">Club Empar</span>
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzM0ZDM5OSIgb3BhY2l0eT0iLjA1IiBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">+500 Restaurantes Parceiros</span>
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
              <Link href="/restaurants" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 text-center">
                Ver Restaurantes
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/plans" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all text-center backdrop-blur-sm">
                Ver Planos
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-slate-700/50">
              <div>
                <div className="text-3xl font-bold text-white">50%</div>
                <div className="text-slate-500 text-sm">Economia Média</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <div className="text-3xl font-bold text-white">15mil+</div>
                <div className="text-slate-500 text-sm">Membros Felizes</div>
              </div>
              <div className="w-px h-12 bg-slate-700 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-slate-500 text-sm">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block animate-fade-in-delayed">
            <div className="relative">
              {/* Main card */}
              <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
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
                  <div className="text-emerald-400 font-bold">ATIVO</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                    <div>
                      <div className="text-slate-400 text-sm">Jantar de Hoje</div>
                      <div className="text-white font-medium">Bistrô Montmartre</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-sm line-through">R$ 280</div>
                      <div className="text-emerald-400 font-bold">R$ 140</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Economia do mês</span>
                    <span className="text-emerald-400 font-semibold">R$ 847 economizados</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-coral-400 to-coral-600 rounded-2xl flex items-center justify-center shadow-xl shadow-coral-500/30 rotate-12 animate-float">
                <span className="text-4xl">🍷</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 -rotate-12 animate-float-delayed">
                <span className="text-3xl">🥗</span>
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
    <section id="benefits" className="py-24 lg:py-32 bg-cream-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase">Por Que Escolher a Gente</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            A Forma Mais Inteligente de
            <span className="text-emerald-600"> Jantar Fora</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Mais que um cartão de desconto. É uma melhoria no estilo de vida para quem ama boa comida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-emerald-200 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
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
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iIzEwYjk4MSIgb3BhY2l0eT0iLjAzIiBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvc3ZnPg==')]" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">Processo Simples</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
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
                    ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30"
                    : "bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-display text-2xl font-bold ${activeStep === index ? "text-emerald-400" : "text-slate-600"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold mb-1 ${activeStep === index ? "text-white" : "text-slate-300"}`}>
                      {step.title}
                    </h3>
                    <p className={activeStep === index ? "text-slate-300" : "text-slate-500"}>
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
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-coral-500/20 animate-spin-slow-reverse" />
              
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
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-12 h-12 rounded-xl bg-gradient-to-br from-coral-400 to-coral-500 flex items-center justify-center shadow-lg transition-all ${activeStep === 0 ? 'scale-110 shadow-coral-500/40' : 'scale-100 shadow-coral-500/20'}`}>
                <span className="text-xl">📱</span>
              </div>
              <div className={`absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg transition-all ${activeStep === 1 ? 'scale-110 shadow-amber-500/40' : 'scale-100 shadow-amber-500/20'}`}>
                <span className="text-xl">🔍</span>
              </div>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg transition-all ${activeStep === 2 ? 'scale-110 shadow-blue-500/40' : 'scale-100 shadow-blue-500/20'}`}>
                <span className="text-xl">📅</span>
              </div>
              <div className={`absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-lg transition-all ${activeStep === 3 ? 'scale-110 shadow-pink-500/40' : 'scale-100 shadow-pink-500/20'}`}>
                <span className="text-xl">🎉</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 lg:py-32 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase">Depoimentos</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
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
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
            >
              {/* Quote decoration */}
              <div className="absolute -top-4 left-8 text-6xl text-emerald-500/20 font-serif">"</div>
              
              <p className="text-slate-700 leading-relaxed mb-6 relative z-10">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-coral-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
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

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-500/10 border border-coral-500/20 mb-8">
          <span className="text-coral-400 text-sm font-medium">🎁 Ganhe 10% de desconto na primeira assinatura</span>
        </div>

        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
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
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display text-lg font-bold text-white">Club Empar</span>
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
