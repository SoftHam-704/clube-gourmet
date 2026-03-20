import { Utensils, Star, Infinity, Zap } from "lucide-react";

const benefits = [
  {
    icon: Utensils,
    stat: "50%",
    statLabel: "economia",
    title: "2 por 1 Sempre",
    description: "Peça dois pratos principais, pague apenas um. Sem restrições, sem letras miúdas.",
  },
  {
    icon: Star,
    stat: "500+",
    statLabel: "parceiros",
    title: "Restaurantes Selecionados",
    description: "Acesso a restaurantes curados, onde qualidade e benefícios exclusivos se encontram.",
  },
  {
    icon: Infinity,
    stat: "∞",
    statLabel: "uso",
    title: "Experiências Ilimitadas",
    description: "Use sua assinatura quantas vezes quiser. Jante fora todos os dias, se preferir.",
  },
  {
    icon: Zap,
    stat: "1x",
    statLabel: "visita",
    title: "Se Paga Rapidinho",
    description: "Uma única experiência já paga a sua assinatura. O resto é pura vantagem.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body tracking-widest uppercase text-primary mb-4 block">
            Por que associar-se?
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-tight">
            A Forma Mais{" "}
            <span className="text-gradient-gold italic">Inteligente</span>{" "}
            de Jantar Fora
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <b.icon size={20} className="text-primary" />
                <div>
                  <span className="text-2xl font-display font-semibold text-primary">{b.stat}</span>
                  <span className="text-xs text-muted-foreground ml-1 tracking-wider uppercase">{b.statLabel}</span>
                </div>
              </div>
              <h3 className="text-lg font-display font-medium mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
