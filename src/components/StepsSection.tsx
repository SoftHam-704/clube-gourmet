import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { num: "01", title: "Assine", desc: "Escolha seu plano e tenha acesso imediato à plataforma" },
  { num: "02", title: "Explore", desc: "Descubra mais de 500 restaurantes parceiros na sua região" },
  { num: "03", title: "Reserve", desc: "Faça sua reserva pelo app ou pelo site" },
  { num: "04", title: "Aproveite", desc: "Mostre seu cartão digital, peça dois pratos, pague um" },
];

const CornerAccents = ({ size = "w-4 h-4", weight = "border", color = "border-primary" }: { size?: string; weight?: string; color?: string }) => (
  <>
    <div className={`absolute top-0 left-0 ${size} ${weight}-t ${weight}-l ${color}`} />
    <div className={`absolute top-0 right-0 ${size} ${weight}-t ${weight}-r ${color}`} />
    <div className={`absolute bottom-0 left-0 ${size} ${weight}-b ${weight}-l ${color}`} />
    <div className={`absolute bottom-0 right-0 ${size} ${weight}-b ${weight}-r ${color}`} />
  </>
);

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-green-deep">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-sm font-body tracking-widest uppercase text-primary mb-4 block">
            O Processo
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-tight mb-4">
            Quatro Passos para{" "}
            <span className="text-gradient-gold italic">Economizar</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto mb-16">
          O Club Empar foi criado para oferecer vantagens reais, exclusivas e acessíveis aos seus membros.
          Ao fazer parte do clube, você passa a ter acesso a benefícios cuidadosamente selecionados.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* Steps list */}
          <div className="space-y-3">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left relative group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div
                    className={`relative p-5 transition-all duration-500 ${
                      isActive ? "bg-secondary/50" : "bg-card/30 hover:bg-card/50"
                    }`}
                  >
                    {/* Corner accents - only on active */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CornerAccents size="w-5 h-5" />
                      </motion.div>
                    )}

                    <div className="flex items-center gap-5">
                      <span
                        className={`text-3xl font-display font-light transition-all duration-500 ${
                          isActive ? "text-gradient-gold" : "text-muted-foreground/30"
                        }`}
                      >
                        {step.num}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-display font-semibold transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-muted-foreground/70"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm font-body leading-relaxed mt-1 transition-colors duration-300 ${
                            isActive ? "text-muted-foreground" : "text-muted-foreground/40"
                          }`}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active step detail card */}
          <div className="flex items-start justify-center md:pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md aspect-square flex flex-col items-center justify-center text-center relative bg-card/40"
              >
                {/* Gold corner accents */}
                <CornerAccents size="w-6 h-6" weight="border-2" />

                {/* Large number */}
                <motion.span
                  key={`num-${activeStep}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[8rem] md:text-[10rem] font-display font-bold leading-none text-gradient-gold opacity-90"
                >
                  {steps[activeStep].num}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-2"
                >
                  <span className="text-xs font-body tracking-[0.3em] uppercase text-primary block mb-3">
                    Passo Selecionado
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-medium mb-4">
                    {steps[activeStep].title}
                  </h3>
                  <div className="w-12 h-px bg-primary mx-auto mb-4" />
                  <p className="text-muted-foreground font-body leading-relaxed italic max-w-xs mx-auto">
                    "{steps[activeStep].desc}"
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
