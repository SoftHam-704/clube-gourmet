import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Fine dining ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="h-px w-10 bg-primary" />
            <MapPin size={14} className="text-primary" />
            <span className="text-sm font-body tracking-widest uppercase text-primary">
              Lançamento Oficial em Sinop/MT
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95] mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Alta Gastronomia,{" "}
            <span className="text-gradient-gold italic">
              Metade do Preço
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mb-10 opacity-0 animate-fade-up font-body leading-relaxed" style={{ animationDelay: "0.5s" }}>
            Mensalidade fixa. Marketing contínuo. Mais mesas ocupadas. 
            Seu restaurante com movimento constante, sem pagar comissão.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <Button variant="gold" size="lg" className="gap-2">
              Solicitar Parceria
              <ArrowRight size={16} />
            </Button>
            <Button variant="gold-outline" size="lg">
              Ver Restaurantes
            </Button>
          </div>
        </div>

        {/* Stats card */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
          {[
            { value: "50%", label: "Economia Média" },
            { value: "15k+", label: "Membros" },
            { value: "4.9★", label: "Avaliação" },
            { value: "R$847", label: "Economizado/mês" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-display font-semibold text-primary">
                {stat.value}
              </div>
              <div className="text-xs font-body tracking-wider uppercase text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
