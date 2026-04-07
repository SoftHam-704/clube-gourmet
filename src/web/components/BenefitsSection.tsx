import { useRef } from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    stat: "50%",
    statLabel: "Economia",
    title: "Dois por Um Sempre",
    description: "Peça dois pratos principais, pague apenas um. Sem restrições, sem letras miúdas.",
  },
  {
    stat: "500+",
    statLabel: "Parceiros",
    title: "Restaurantes Selecionados",
    description: "Acesso a restaurantes exclusivos, oferecendo experiências gastronômicas onde qualidade e benefícios exclusivos se encontram.",
  },
  {
    stat: "∞",
    statLabel: "Uso",
    title: "Experiências Ilimitadas",
    description: "Use sua assinatura quantas vezes quiser. Jante fora todos os dias, se preferir.",
  },
  {
    stat: "1x",
    statLabel: "Visita",
    title: "Você economiza desde o início",
    description: "Uma única experiência já paga a sua assinatura. O resto é vantagem.",
  },
];

const FlashlightCard = ({ b, i }: { b: typeof benefits[0], i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Increased duration and stagger delay for cards
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.2 }}
      className="flashlight-card relative p-10 bg-[#0c120e]/60 backdrop-blur-sm border border-white/5 overflow-hidden group min-h-[400px] flex flex-col justify-start"
    >
      {/* Giant Watermark Background Stat */}
      <span className="absolute -top-4 -right-4 text-9xl font-display font-bold text-white/[0.03] select-none transition-transform duration-700 group-hover:scale-110 z-0">
        {b.stat}
      </span>

      <div className="relative z-10">
        <div className="mb-12">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-primary block mb-2 font-medium">
            {b.statLabel}
          </span>
          <span className="text-4xl font-display font-light text-white/10 group-hover:text-primary transition-colors duration-500">
            {b.stat}
          </span>
        </div>

        <h3 className="text-2xl font-display font-light mb-4 text-foreground tracking-wide">
          {b.title}
        </h3>
        <p className="text-sm text-foreground/40 font-body leading-relaxed">
          {b.description}
        </p>
        
        {/* Accent Line */}
        <div className="w-12 h-px bg-primary/30 mt-8 group-hover:w-24 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header with Masked Text Reveal */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // Increased label duration
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-body tracking-[0.4em] uppercase text-primary mb-6 block"
            >
              // Por que associar-se?
            </motion.span>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1] text-foreground tracking-tight pb-2">
              <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
                <motion.span 
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  // Slower mask reveal
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  A Forma Mais
                </motion.span>
              </span>
              <br />
              <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
                <motion.span 
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="block"
                >
                  <span className="text-gradient-gold italic pr-2">Inteligente</span> de
                </motion.span>
              </span>
              <br />
              <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
                <motion.span 
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="block"
                >
                  Jantar Fora
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            // Greatly slowed right-to-left slide with a later delay
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="border-l border-white/10 pl-8 pt-4 lg:mt-48 max-w-sm"
          >
            <p className="text-lg text-foreground/60 font-body leading-relaxed">
              Mais que um cartão de desconto. É uma curadoria de experiências para quem não abre mão da excelência.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <FlashlightCard key={b.title} b={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
