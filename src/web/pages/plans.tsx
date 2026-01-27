import { useState, useEffect } from "react";
import { Link } from "wouter";

const PLANS = [
  {
    id: "monthly",
    name: "Mensal",
    price: "29,90",
    period: "/mês",
    description: "Perfeito para experimentar",
    popular: false,
    benefits: [
      "2 por 1 em todos os restaurantes parceiros",
      "Uso ilimitado no mês",
      "Cartão digital de membro",
      "Suporte por e-mail",
      "Cancele quando quiser",
    ],
  },
  {
    id: "annual",
    name: "Anual",
    price: "299",
    period: "/ano",
    description: "Melhor custo-benefício para amantes da gastronomia",
    popular: true,
    savings: "Economize 16%",
    benefits: [
      "2 por 1 em todos os restaurantes parceiros",
      "Uso ilimitado o ano todo",
      "Cartão digital de membro",
      "Suporte prioritário",
      "Cancele quando quiser",
      "Acesso antecipado a novos restaurantes",
      "Oferta especial de aniversário",
      "Acesso a eventos VIP",
    ],
  },
  {
    id: "family",
    name: "Família",
    price: "449",
    period: "/ano",
    description: "Compartilhe a economia com quem você ama",
    popular: false,
    benefits: [
      "2 por 1 para até 4 membros",
      "Uso ilimitado para todos",
      "4 cartões digitais de membro",
      "Suporte prioritário",
      "Cancele quando quiser",
      "Acesso antecipado a novos restaurantes",
      "Oferta de aniversário para todos",
      "Destaque de restaurantes família-friendly",
    ],
  },
];

const FAQS = [
  {
    question: "Como funciona a oferta 2 por 1?",
    answer: "Ao jantar em qualquer um dos nossos restaurantes parceiros, basta pedir dois pratos principais e pagar apenas um. O prato de menor valor (ou igual) é cortesia. Simples assim – sem vouchers complicados, sem valor mínimo de consumo.",
  },
  {
    question: "Posso usar minha assinatura em qualquer restaurante, qualquer dia?",
    answer: "Sim! Sua assinatura funciona em todos os mais de 500 restaurantes parceiros. Alguns estabelecimentos podem ter disponibilidade específica (almoço ou jantar), mas não há datas bloqueadas ou restrições de dia da semana.",
  },
  {
    question: "Em quanto tempo terei retorno do meu investimento?",
    answer: "A maioria dos membros economiza mais que o valor da assinatura anual em apenas 2-3 visitas a restaurantes. Com um prato principal custando em média R$70-150 nos nossos parceiros, você economiza R$70-150 por visita.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Com certeza. Você pode cancelar sua assinatura a qualquer momento pelas configurações da sua conta. Seus benefícios permanecerão ativos até o final do período de cobrança atual.",
  },
  {
    question: "Como funciona o Plano Família?",
    answer: "O Plano Família permite que até 4 pessoas sejam cadastradas em uma única conta. Cada membro recebe seu próprio cartão digital e pode usar o benefício 2 por 1 de forma independente. Perfeito para famílias ou casais que jantam fora frequentemente.",
  },
  {
    question: "E se meu restaurante favorito não for parceiro?",
    answer: "Estamos sempre expandindo nossa rede! Você pode sugerir restaurantes pelo nosso app, e nós entramos em contato ativamente com estabelecimentos populares. Muitos dos nossos melhores parceiros vieram de sugestões de membros.",
  },
];

// Premium SVG Icons
const Icons = {
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  creditCard: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  refresh: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  lightning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/20" : "bg-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">Club Empar</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors font-medium">Início</Link>
            <Link href="/restaurants" className="text-slate-300 hover:text-white transition-colors font-medium">Restaurantes</Link>
            <Link href="/plans" className="text-emerald-400 font-medium">Planos</Link>
            <Link href="/plans" className="px-6 py-2.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-coral-500/30 transition-all hover:-translate-y-0.5">
              Começar Agora
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-coral-500/6 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Junte-se a mais de 15.000 membros felizes</span>
        </span>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Escolha Seu Plano de
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-coral-400 bg-clip-text text-transparent">
            Economia
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Um jantar fora já paga sua assinatura do ano inteiro. Pare de pagar preço cheio nos restaurantes que você ama.
        </p>
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: typeof PLANS[0];
}

function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={`relative rounded-3xl transition-all duration-500 ${
      plan.popular 
        ? "bg-gradient-to-b from-emerald-600 via-emerald-600 to-emerald-700 text-white scale-105 shadow-2xl shadow-emerald-600/30 lg:-mt-6 lg:mb-6 ring-1 ring-emerald-400/30" 
        : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl"
    }`}>
      {/* Glass effect overlay for popular */}
      {plan.popular && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      )}
      
      <div className="relative p-8">
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white text-sm font-bold rounded-full shadow-lg shadow-coral-500/30">
              <span className="text-coral-200">{Icons.star}</span>
              Mais Popular
            </span>
          </div>
        )}

        {/* Savings badge */}
        {plan.savings && (
          <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full text-sm font-semibold ${
            plan.popular ? "bg-white/20 text-white backdrop-blur-sm" : "bg-emerald-100 text-emerald-700"
          }`}>
            {plan.savings}
          </div>
        )}

        <div className="text-center mb-8 pt-4">
          <h3 className={`font-display text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
            {plan.name}
          </h3>
          <p className={`text-sm ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
            {plan.description}
          </p>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-lg ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>R$</span>
            <span className={`font-display text-5xl font-bold tracking-tight ${plan.popular ? "text-white" : "text-slate-900"}`}>
              {plan.price}
            </span>
            <span className={plan.popular ? "text-emerald-100" : "text-slate-500"}>
              {plan.period}
            </span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                plan.popular ? "bg-white/20" : "bg-emerald-100"
              }`}>
                <span className={plan.popular ? "text-white" : "text-emerald-600"}>
                  {Icons.check}
                </span>
              </div>
              <span className={`text-sm leading-relaxed ${plan.popular ? "text-emerald-50" : "text-slate-600"}`}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
          plan.popular 
            ? "bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-lg shadow-lg shadow-black/10"
            : "bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
        }`}>
          <span>{Icons.lightning}</span>
          Assinar Agora
        </button>

        {plan.id === "annual" && (
          <p className={`text-center text-sm mt-4 ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
            Equivalente a apenas R$24,92/mês
          </p>
        )}
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-8 text-sm uppercase tracking-wider font-medium">Confiado por amantes da gastronomia em todo o Brasil</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
              <span className="text-emerald-600">{Icons.shield}</span>
              <span className="text-sm font-medium text-slate-700">Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
              <span className="text-blue-600">{Icons.creditCard}</span>
              <span className="text-sm font-medium text-slate-700">Todos os Cartões</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
              <span className="text-amber-600">{Icons.refresh}</span>
              <span className="text-sm font-medium text-slate-700">7 Dias de Garantia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ROICalculator() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              Veja Como Você Economiza Rápido
            </h2>
            <p className="text-slate-400">
              O membro médio recupera o valor da assinatura em apenas 2 jantares
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-display">R$ 75</div>
              <div className="text-slate-300 font-medium mb-1">Economia Média</div>
              <div className="text-slate-500 text-sm">Por visita ao restaurante</div>
            </div>
            <div className="p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 hover:border-coral-500/30 transition-colors">
              <div className="text-4xl font-bold text-coral-400 mb-2 font-display">4x</div>
              <div className="text-slate-300 font-medium mb-1">Visitas Mensais</div>
              <div className="text-slate-500 text-sm">Média dos nossos membros</div>
            </div>
            <div className="p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 hover:border-amber-500/30 transition-colors">
              <div className="text-4xl font-bold text-amber-400 mb-2 font-display">R$ 3.600</div>
              <div className="text-slate-300 font-medium mb-1">Economia Anual</div>
              <div className="text-slate-500 text-sm">Em média por membro</div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center backdrop-blur-sm">
            <p className="text-emerald-300 font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Com o Plano Anual de R$299, você tem um <span className="text-white font-bold">retorno de 12x</span> sobre seu investimento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-4 px-4 py-1.5 bg-emerald-50 rounded-full">Perguntas Frequentes</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Tem Dúvidas?
            <span className="text-emerald-600"> Temos Respostas</span>
          </h2>
          <p className="text-slate-600">
            Tudo que você precisa saber sobre sua assinatura
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? "border-emerald-200 bg-emerald-50/50 shadow-lg shadow-emerald-500/5" 
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4"
              >
                <span className={`font-semibold transition-colors ${openIndex === index ? "text-emerald-700" : "text-slate-900"}`}>
                  {faq.question}
                </span>
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === index 
                    ? "bg-emerald-500 text-white rotate-180" 
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {Icons.chevronDown}
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"}`}>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
          Pronto para Economizar?
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Junte-se a milhares de membros que já economizaram em média R$3.600 por ano em restaurantes premium.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#pricing" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 inline-flex items-center justify-center gap-2">
            <span>{Icons.lightning}</span>
            Começar Agora
          </a>
          <Link href="/restaurants" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
            Ver Restaurantes
          </Link>
        </div>

        <p className="text-slate-500 text-sm mt-8">
          Cancele quando quiser • Satisfação garantida ou seu dinheiro de volta em 7 dias
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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display text-lg font-bold text-white">Club Empar</span>
          </Link>

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

export default function Plans() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <ROICalculator />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
