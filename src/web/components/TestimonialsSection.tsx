import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "No começo fiquei em dúvida, mas depois do terceiro jantar já tinha economizado mais que o valor da assinatura anual.",
    name: "Mariana Costa",
    role: "Membro desde 2023",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "A qualidade dos restaurantes é incrível. Não são lugares aleatórios — são exatamente onde eu já queria jantar.",
    name: "Rafael Mendes",
    role: "Entusiasta gastronômico",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "Eu e meu parceiro saímos todo final de semana agora. O que custava R$300 agora custa R$150.",
    name: "Ana Beatriz Silva",
    role: "Frequentadora assídua",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32 relative bg-[#090d0b]">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          className="max-w-5xl mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-body tracking-[0.4em] uppercase text-primary mb-6 block font-medium">
            // CLUBE DE ELITE
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1] text-foreground tracking-tight pb-2">
            Membros Reais,<br />
            <span className="text-gradient-gold italic">Economias Reais</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-12 max-w-7xl mx-auto pt-24">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 flex flex-col rounded-2xl border border-primary/20 bg-[#0c120e]/80 backdrop-blur-sm shadow-2xl mt-20 hover:border-primary/50 transition-all duration-500 group"
            >
              {/* Giant Overlapping Avatar Circle */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-4 border-primary/80 overflow-hidden shadow-[0_0_40px_rgba(201,169,97,0.2)] bg-background">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              </div>

              {/* Card Inner Content - Aligned to Left */}
              <div className="pt-24 flex flex-col text-left h-full">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm text-foreground/70 font-body leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
                
                <div className="mt-auto">
                  <div className="text-lg font-display font-semibold text-foreground mb-1">{t.name}</div>
                  <div className="text-xs font-body tracking-wider text-primary/70 uppercase">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
