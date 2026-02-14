import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const PLANS = [
  {
    id: "monthly",
    name: "Mensal",
    price: "29,90",
    period: "/mês",
    description: "Perfeito para experimentar",
    popular: false,
    benefits: [
      "2 por 1 em todos os restaurantes",
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
    description: "Melhor custo-benefício",
    popular: true,
    savings: "-16%",
    benefits: [
      "2 por 1 em todos os restaurantes",
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
    description: "Para até 4 membros",
    popular: false,
    benefits: [
      "2 por 1 para até 4 membros",
      "Uso ilimitado para todos",
      "4 cartões digitais de membro",
      "Suporte prioritário",
      "Cancele quando quiser",
      "Acesso antecipado a novos restaurantes",
      "Oferta de aniversário para todos",
      "Destaque família-friendly",
    ],
  },
];

const FAQS = [
  {
    question: "Como funciona a oferta 2 por 1?",
    answer: "Ao jantar em qualquer restaurante parceiro, peça dois pratos principais e pague apenas um. O prato de menor valor é cortesia. Sem vouchers, sem valor mínimo.",
  },
  {
    question: "Posso usar em qualquer restaurante, qualquer dia?",
    answer: "Sim! Sua assinatura funciona em todos os 500+ restaurantes parceiros. Alguns têm disponibilidade específica (almoço ou jantar), mas não há datas bloqueadas.",
  },
  {
    question: "Em quanto tempo terei retorno do investimento?",
    answer: "A maioria dos membros economiza mais que o valor da assinatura anual em apenas 2-3 visitas. Com pratos custando R$70-150, você economiza isso por visita.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim. Cancele pela sua conta quando quiser. Seus benefícios permanecem ativos até o final do período de cobrança atual.",
  },
  {
    question: "Como funciona o Plano Família?",
    answer: "Até 4 pessoas em uma única conta. Cada membro recebe seu cartão digital e pode usar o benefício de forma independente.",
  },
  {
    question: "E se meu restaurante favorito não for parceiro?",
    answer: "Estamos sempre expandindo! Sugira restaurantes pelo app e entramos em contato. Muitos parceiros vieram de sugestões de membros.",
  },
];

const Icons = {
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  creditCard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  refresh: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  lightning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// Navbar removed

function HeroSection() {
  return (
    <section className="pt-32 pb-16 bg-[#1a4d2e] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#c9a961]/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4c5a0]/5 blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-[#c9a961] font-mono text-sm tracking-widest uppercase mb-4 block">// Planos</span>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
          Escolha Sua<br />
          <span className="text-gradient">Economia</span>
        </h1>

        <p className="text-[#666] text-lg max-w-xl mx-auto">
          Um jantar fora já paga sua assinatura do ano inteiro. Pare de pagar preço cheio.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-[#c9a961]">15k<span className="text-[#d4c5a0]">+</span></div>
            <div className="text-[#666] text-xs tracking-widest uppercase mt-1">membros</div>
          </div>
          <div className="w-px h-12 bg-[#222]" />
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-white">4.9<span className="text-[#c9a961]">★</span></div>
            <div className="text-[#666] text-xs tracking-widest uppercase mt-1">avaliação</div>
          </div>
          <div className="w-px h-12 bg-[#222]" />
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-white">500<span className="text-[#d4c5a0]">+</span></div>
            <div className="text-[#666] text-xs tracking-widest uppercase mt-1">restaurantes</div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: typeof PLANS[0];
}

function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={`relative transition-all duration-300 ${plan.popular
      ? "border-2 border-[#c9a961] bg-[#111] scale-105 z-10"
      : "border border-[#222] bg-[#111] hover:border-[#333]"
      }`}>
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-px left-0 right-0 h-1 bg-[#c9a961]" />
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-1">
              {plan.name}
            </h3>
            <p className="text-[#666] text-sm">{plan.description}</p>
          </div>
          {plan.savings && (
            <span className="px-3 py-1 bg-[#c9a961]/10 border border-[#c9a961] text-[#c9a961] font-mono text-sm">
              {plan.savings}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-[#222]">
          <span className="text-[#666] font-mono">R$</span>
          <span className="font-mono text-5xl font-bold text-white">{plan.price}</span>
          <span className="text-[#666] font-mono">{plan.period}</span>
        </div>

        {/* Benefits */}
        <ul className="space-y-4 mb-8">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className={`mt-0.5 ${plan.popular ? "text-[#c9a961]" : "text-[#666]"}`}>
                {Icons.check}
              </span>
              <span className="text-[#999] text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className={`w-full flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wider uppercase transition-all ${plan.popular
          ? "bg-[#c9a961] text-[#0a0a0a] hover:glow-green"
          : "border border-[#333] text-white hover:border-[#c9a961] hover:text-[#c9a961]"
          }`}>
          <span>{Icons.lightning}</span>
          Assinar Agora
        </button>

        {plan.id === "annual" && (
          <p className="text-center text-[#666] text-xs mt-4 font-mono">
            = R$24,92/mês
          </p>
        )}
      </div>
    </div>
  );
}

function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");

  return (
    <section className="py-20 bg-[#1a4d2e] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 font-mono text-sm transition-all ${billingPeriod === "monthly" ? "text-white" : "text-[#666] hover:text-white"
              }`}
          >
            Mensal
          </button>
          <div className="w-px h-4 bg-[#333]" />
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-6 py-2 font-mono text-sm transition-all flex items-center gap-2 ${billingPeriod === "annual" ? "text-white" : "text-[#666] hover:text-white"
              }`}
          >
            Anual
            <span className="px-2 py-0.5 bg-[#c9a961]/10 text-[#c9a961] text-xs">-16%</span>
          </button>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center">
          <p className="text-[#666] mb-8 text-xs font-mono tracking-widest uppercase">Garantias</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 border border-[#222] bg-[#111]">
              <span className="text-[#c9a961]">{Icons.shield}</span>
              <span className="text-sm text-[#999]">Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 border border-[#222] bg-[#111]">
              <span className="text-[#c9a961]">{Icons.creditCard}</span>
              <span className="text-sm text-[#999]">Todos os Cartões</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 border border-[#222] bg-[#111]">
              <span className="text-[#c9a961]">{Icons.refresh}</span>
              <span className="text-sm text-[#999]">Cancele Quando Quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const features = [
    { name: "2 por 1 em restaurantes", monthly: true, annual: true, family: true },
    { name: "Uso ilimitado", monthly: true, annual: true, family: true },
    { name: "Cartão digital", monthly: "1", annual: "1", family: "4" },
    { name: "Suporte prioritário", monthly: false, annual: true, family: true },
    { name: "Acesso antecipado", monthly: false, annual: true, family: true },
    { name: "Oferta de aniversário", monthly: false, annual: true, family: true },
    { name: "Eventos VIP", monthly: false, annual: true, family: false },
    { name: "Destaque família-friendly", monthly: false, annual: false, family: true },
  ];

  return (
    <section className="py-20 bg-[#111] relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#c9a961] font-mono text-sm tracking-widest uppercase mb-4 block">// Comparativo</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tighter">
            Compare os <span className="text-gradient">Planos</span>
          </h2>
        </div>

        <div className="border border-[#222] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 bg-[#1a4d2e] border-b border-[#222]">
            <div className="p-4 text-[#666] text-sm font-mono">Recurso</div>
            <div className="p-4 text-white text-sm font-mono text-center border-l border-[#222]">Mensal</div>
            <div className="p-4 text-[#c9a961] text-sm font-mono text-center border-l border-[#222]">Anual</div>
            <div className="p-4 text-white text-sm font-mono text-center border-l border-[#222]">Família</div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-4 border-b border-[#222] last:border-b-0 hover:bg-[#1a4d2e]/50 transition-colors">
              <div className="p-4 text-[#999] text-sm">{feature.name}</div>
              <div className="p-4 text-center border-l border-[#222]">
                {typeof feature.monthly === "boolean" ? (
                  feature.monthly ? (
                    <span className="text-[#c9a961]">{Icons.check}</span>
                  ) : (
                    <span className="text-[#333]">—</span>
                  )
                ) : (
                  <span className="text-white font-mono text-sm">{feature.monthly}</span>
                )}
              </div>
              <div className="p-4 text-center border-l border-[#222]">
                {typeof feature.annual === "boolean" ? (
                  feature.annual ? (
                    <span className="text-[#c9a961]">{Icons.check}</span>
                  ) : (
                    <span className="text-[#333]">—</span>
                  )
                ) : (
                  <span className="text-white font-mono text-sm">{feature.annual}</span>
                )}
              </div>
              <div className="p-4 text-center border-l border-[#222]">
                {typeof feature.family === "boolean" ? (
                  feature.family ? (
                    <span className="text-[#c9a961]">{Icons.check}</span>
                  ) : (
                    <span className="text-[#333]">—</span>
                  )
                ) : (
                  <span className="text-white font-mono text-sm">{feature.family}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#1a4d2e] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#c9a961] font-mono text-sm tracking-widest uppercase mb-4 block">// FAQ</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tighter">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, index) => (
            <div key={index} className="border border-[#222] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#111] transition-colors"
              >
                <span className="flex items-center gap-4">
                  <span className="text-[#333] font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-white font-medium">{faq.question}</span>
                </span>
                <span className={`text-[#666] transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                  {Icons.chevronDown}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-48" : "max-h-0"}`}>
                <p className="px-6 pb-6 pl-16 text-[#666] text-sm leading-relaxed">
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
    <section className="py-20 bg-[#111] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-[#c9a961]/20 rotate-45" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-[#d4c5a0]/20 -rotate-12" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-6">
          Pronto para <span className="text-gradient">Economizar</span>?
        </h2>
        <p className="text-[#666] text-lg mb-8 max-w-xl mx-auto">
          Junte-se a mais de 15.000 membros que já economizaram milhares de reais em restaurantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-[#c9a961] text-[#0a0a0a] font-bold text-sm tracking-wider uppercase hover:glow-green transition-all">
            Começar Agora
          </button>
          <Link href="/restaurants" className="px-8 py-4 border border-[#333] text-white font-bold text-sm tracking-wider uppercase hover:border-[#c9a961] hover:text-[#c9a961] transition-all">
            Ver Restaurantes
          </Link>
        </div>
      </div>
    </section>
  );
}

// Footer removed

export default function Plans() {
  return (
    <div className="bg-[#1a4d2e] min-h-screen">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <ComparisonTable />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
