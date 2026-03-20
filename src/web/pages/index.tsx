import { Navbar } from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import StepsSection from "../components/StepsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import { Footer } from "../components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body antialiased">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <StepsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
