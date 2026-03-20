import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "No começo fiquei em dúvida, mas depois do terceiro jantar já tinha economizado mais que o valor da assinatura anual.",
    name: "Mariana Costa",
    role: "Membro desde 2023",
    initials: "MC",
  },
  {
    quote: "A qualidade dos restaurantes é incrível. Não são lugares aleatórios — são exatamente onde eu já queria jantar.",
    name: "Rafael Mendes",
    role: "Entusiasta gastronômico",
    initials: "RM",
  },
  {
    quote: "Eu e meu parceiro saímos todo final de semana agora. O que custava R$300 agora custa R$150.",
    name: "Ana Beatriz Silva",
    role: "Frequentadora assídua",
    initials: "AS",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body tracking-widest uppercase text-primary mb-4 block">
            Clube de Elite
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-tight">
            Membros Reais,{" "}
            <span className="text-gradient-gold italic">Economias Reais</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-display font-semibold text-primary">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
