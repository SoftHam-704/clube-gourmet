import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Restaurantes", href: "#restaurantes" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#planos" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger solid background somewhat early so it's ready when hitting text
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#090d0b]/95 backdrop-blur-xl border-b border-white/10 shadow-xl" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
        <a href="#" className="flex items-center group">
          <img 
            src="/logo-icon.png" 
            alt="Club Empar Icon" 
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-110 ${
              scrolled ? "h-10" : "h-14"
            }`}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-xs font-body tracking-widest uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="gold" size="sm">
            Associar-se
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-glass px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-body tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="gold" size="sm" className="w-full mt-2">
            Associar-se
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
