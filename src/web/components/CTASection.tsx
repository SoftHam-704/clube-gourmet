import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import ctaVideo from "../../assets/cta-video.mp4";


const CTASection = () => {
  return (
    <section id="planos" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background video with deep overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover"
        >
          <source src={ctaVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#090d0b]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-transparent to-[#090d0b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d0b]/60 via-transparent to-[#090d0b]/60" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#c9a961]/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#c9a961]/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-16 bg-[#c9a961]/40" />
            <span className="text-xs font-body tracking-[0.5em] uppercase text-[#c9a961]">
              Sua Mesa Está Reservada
            </span>
            <div className="h-px w-16 bg-[#c9a961]/40" />
          </motion.div>

          {/* Grand Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95] mb-10 tracking-tight"
          >
            Ainda Está{" "}
            <span className="text-gradient-gold italic">Esperando?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-foreground/50 font-body text-lg md:text-xl mb-16 leading-relaxed max-w-2xl mx-auto"
          >
            Cada dia sem o Club Empar é um jantar a mais pelo preço cheio.
            Junte-se aos membros que já economizam enquanto vivem o melhor da gastronomia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/plans">
              <Button 
                variant="gold" 
                size="lg" 
                asChild
                className="relative overflow-hidden group gap-3 px-14 h-16 shadow-[0_0_40px_rgba(201,169,97,0.3)] hover:shadow-[0_0_60px_rgba(201,169,97,0.5)] transition-all duration-500"
              >
                <a className="relative z-10 flex items-center gap-3 font-display text-lg tracking-widest">
                  ASSOCIAR-SE AGORA
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:duration-1000 group-hover:translate-x-[150%] transition-transform ease-out" />
                </a>
              </Button>
            </Link>
            
            <Link href="/restaurants">
              <a className="group flex items-center gap-3 text-sm font-body tracking-[0.2em] uppercase text-white/60 hover:text-[#c9a961] transition-colors py-4">
                <span className="border-b border-[#c9a961]/30 group-hover:border-[#c9a961] pb-1 transition-colors">Ver Restaurantes</span>
              </a>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 flex items-center justify-center gap-8 text-white/20 text-[10px] font-mono tracking-[0.3em] uppercase"
          >
            <span>Cancele quando quiser</span>
            <span className="text-[#c9a961]/30">◆</span>
            <span>Sem fidelidade</span>
            <span className="text-[#c9a961]/30">◆</span>
            <span>Acesso imediato</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
