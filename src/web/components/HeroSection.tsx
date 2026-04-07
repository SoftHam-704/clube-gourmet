import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Star } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";
import ctaBg from "../../assets/cta-bg.jpg";

const images = [heroBg, ctaBg];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000); // Switch image every 8 seconds for a slower pace
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#090d0b]">
      {/* Background image slider */}
      <div className="absolute inset-0 bg-background overflow-hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Fine dining ambiance"
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeOut" }
            }}
          />
        </AnimatePresence>
        
        {/* Deep, layered gradients to embed the content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d0b] via-[#090d0b]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-transparent to-[#090d0b]/40 z-10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-40 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & CTAs */}
        <div className="max-w-3xl">
          {/* Full Brand Identity Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 group inline-block"
          >
            <img 
              src="/logo-club.png" 
              alt="Club Empar Brand" 
              className="h-28 md:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(201,169,97,0.3)] group-hover:scale-105 group-hover:drop-shadow-[0_0_35px_rgba(201,169,97,0.5)] transition-all duration-700"
            />
          </motion.div>

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-primary" />
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
              Lançamento Oficial
            </span>
          </motion.div>

          {/* Theatrical Headline Reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light leading-[1.1] mb-8 tracking-tight">
            <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
              <motion.span 
                initial={{ y: "110%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                className="block"
              >
                Alta Gastronomia,
              </motion.span>
            </span>
            <br />
            <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
              <motion.span 
                initial={{ y: "110%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} 
                className="block"
              >
                <span className="text-gradient-gold italic pr-4">Metade do Preço</span>
              </motion.span>
            </span>
          </h1>

          {/* Majestic Description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mb-12"
          >
            <p className="text-lg md:text-xl text-foreground/70 font-light font-body leading-relaxed mb-6">
              O Club Empar conecta paladares exigentes aos melhores restaurantes da cidade. 
              Ao assinar o clube, você pede dois pratos principais e paga apenas um.
              Uma curadoria exclusiva de alto padrão.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link href="/plans">
              <Button 
                variant="gold" 
                size="lg" 
                asChild
                className="relative overflow-hidden group w-full sm:w-auto gap-3 px-10 h-14 shadow-[0_0_30px_rgba(201,169,97,0.3)] hover:shadow-[0_0_50px_rgba(201,169,97,0.5)] transition-all duration-500"
              >
                <a className="relative z-10 flex items-center gap-2 font-display text-lg tracking-widest">
                  ASSOCIAR-SE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  {/* Shimmer Effect Inside Button */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-12 group-hover:duration-1000 group-hover:translate-x-[150%] transition-transform ease-out" />
                </a>
              </Button>
            </Link>
            
            <a href="/restaurants" className="group flex items-center gap-3 text-sm font-body tracking-[0.2em] uppercase text-white hover:text-primary transition-colors py-4">
              <span className="border-b border-primary/30 group-hover:border-primary pb-1 transition-colors">Ver Restaurantes</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Floating Elements (Hidden on small screens) */}
        <div className="hidden lg:flex relative h-[600px] items-center justify-center pointer-events-none">
          
          {/* Floating Card 1: Review Badge */}
          <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-24 bg-[#0c120e]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl w-80"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
            </div>
            <p className="text-base font-body text-white/90 italic mb-6 leading-relaxed">
              "A melhor decisão gastronômica do ano. Já no terceiro jantar a assinatura se pagou."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-display font-bold">MC</div>
              <div className="flex flex-col">
                <span className="text-sm font-display text-white">Membro Elite</span>
                <span className="text-[10px] font-body text-primary uppercase tracking-widest">Verificada</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
