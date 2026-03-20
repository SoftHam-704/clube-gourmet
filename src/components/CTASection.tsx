import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => {
  return (
    <section id="planos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ctaBg}
          alt="Ambiente de restaurante sofisticado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <span className="text-sm font-body tracking-widest uppercase text-primary mb-4 block">
            Convite Exclusivo
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-tight mb-6">
            Receba Ofertas{" "}
            <span className="text-gradient-gold italic">Privilegiadas</span>
          </h2>
          <p className="text-muted-foreground font-body mb-10 leading-relaxed">
            Novos restaurantes parceiros e experiências de alta gastronomia em primeira mão.
            Vagas limitadas por categoria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" className="gap-2">
              Associar-se Agora
              <ArrowRight size={16} />
            </Button>
            <Button variant="gold-outline" size="lg">
              Solicitar Parceria
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
