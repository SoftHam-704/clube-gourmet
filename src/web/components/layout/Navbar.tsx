import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "Restaurantes", href: "/restaurants", isPage: true },
  { label: "Planos", href: "/plans", isPage: true },
  { label: "Benefícios", href: "/#benefits", isPage: false },
  { label: "Como Funciona", href: "/#how-it-works", isPage: false },
];

const Icons = {
  menu: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-[#222]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-4 group">
            <img src="/logo.png" alt="Club Empar" className="w-16 h-16 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold text-[#c9a961] tracking-widest leading-none">CLUB EMPAR</span>
              <span className="font-display text-xs font-medium text-[#c9a961]/70 tracking-[0.3em] uppercase mt-1">Gourmet</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.isPage ? (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`transition-colors font-medium text-sm tracking-wide uppercase ${
                    location === link.href ? "text-[#c9a961]" : "text-[#666] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-[#666] hover:text-white transition-colors font-medium text-sm tracking-wide uppercase"
                >
                  {link.label}
                </a>
              )
            ))}
            <Link href="/plans" className="px-6 py-2.5 bg-[#c9a961] text-[#0a0a0a] font-semibold text-sm tracking-wide uppercase hover:glow-green transition-all">
              Começar
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white" aria-label="Abrir menu">
            {isOpen ? Icons.close : Icons.menu}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 py-4 glass border-t border-[#222] space-y-4">
          {NAV_LINKS.map((link) => (
            link.isPage ? (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-[#666] hover:text-white transition-colors font-medium py-2 text-sm tracking-wide uppercase">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-[#666] hover:text-white transition-colors font-medium py-2 text-sm tracking-wide uppercase">
                {link.label}
              </a>
            )
          ))}
          <Link href="/plans" className="block w-full text-center px-6 py-3 bg-[#c9a961] text-[#0a0a0a] font-semibold text-sm tracking-wide uppercase">
            Começar
          </Link>
        </div>
      </div>
    </nav>
  );
}
