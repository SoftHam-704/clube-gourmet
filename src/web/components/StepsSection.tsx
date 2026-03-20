import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { num: "01", title: "Assine", desc: "Escolha seu plano e tenha acesso imediato à plataforma" },
  { num: "02", title: "Explore", desc: "Descubra mais de 500 restaurantes parceiros na sua região" },
  { num: "03", title: "Reserve", desc: "Faça sua reserva pelo app ou pelo site" },
  { num: "04", title: "Aproveite", desc: "Mostre seu cartão digital, peça dois pratos, pague um" },
];

const descriptionParagraphs = [
  "O Club Empar foi criado para oferecer vantagens reais, exclusivas e acessíveis aos seus membros.",
  "Ao fazer parte do clube, você passa a ter acesso a benefícios cuidadosamente selecionados, pensados para gerar economia, praticidade e experiências diferenciadas."
];

const CornerAccents = () => (
  <>
    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/40" />
    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/40" />
    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary/40" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/40" />
  </>
);

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % descriptionParagraphs.length);
    }, 8000); // 8 seconds per paragraph
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#0d1410] relative overflow-hidden border-t border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Harmonized 2-Column Header matching Benefits Section */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-body tracking-[0.4em] uppercase text-primary mb-6 block font-medium"
            >
              // COMO FUNCIONA
            </motion.span>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1] text-foreground tracking-tight pb-2">
              <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
                <motion.span 
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Quatro Passos
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
                  para <span className="text-gradient-gold italic pr-2">Economizar</span>
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="border-l border-white/10 pl-8 pt-4 lg:mt-32 max-w-sm relative min-h-[160px] w-full"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTextIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.8 } }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-foreground/60 font-body leading-relaxed text-lg absolute top-4 left-8 pr-4"
              >
                {descriptionParagraphs[activeTextIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Steps Interaction Grid - Left Aligned to match header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Steps List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-8 transition-all duration-500 border border-transparent ${
                    isActive 
                      ? "bg-white/[0.03] border-white/5 border-l-[3px] border-l-primary" 
                      : "bg-[#0c120e] hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex gap-8 items-start">
                    <span className={`text-3xl lg:text-4xl font-body font-black tracking-tighter ${isActive ? "text-primary" : "text-white/20"}`}>
                      {step.num}
                    </span>
                    <div>
                      <h3 className={`text-2xl font-body font-bold tracking-wide mb-2 ${isActive ? "text-primary" : "text-white/40"}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm font-body leading-relaxed max-w-sm ${isActive ? "text-white/70" : "text-white/20"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: Active Card Display (High Impact) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center py-10 lg:pl-10"
          >
            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/[0.05] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/[0.02] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md aspect-square bg-[#0a0f0c] border border-white/5 flex flex-col items-center justify-center p-12 relative shadow-2xl z-10"
              >
                {/* Gold Frame Corners */}
                <CornerAccents />
                
                {/* Glowing Number */}
                <span className="text-[12rem] lg:text-[14rem] font-body font-black leading-none text-gradient-gold drop-shadow-[0_0_40px_rgba(201,169,97,0.3)] select-none tracking-tighter mb-4">
                  {steps[activeStep].num}
                </span>

                {/* Card Text Content */}
                <div className="text-center relative z-10 flex flex-col items-center w-full">
                  <span className="text-[10px] font-body tracking-[0.4em] uppercase text-primary/80 block mb-4 font-semibold">
                    Passo Selecionado
                  </span>
                  
                  <h3 className="text-4xl font-body font-bold text-white mb-6 tracking-wide">
                    {steps[activeStep].title}
                  </h3>
                  
                  <p className="text-white/50 font-body leading-relaxed italic text-sm max-w-[250px]">
                    "{steps[activeStep].desc}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StepsSection;
