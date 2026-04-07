import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { authClient } from "../../lib/auth";

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
  const [hidden, setHidden] = useState(false);
  const [location] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      // Smart Navbar logic: hide on scroll down, show on scroll up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScroll && !isOpen) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScroll = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check session
    authClient.getSession().then(session => {
      if (session && session.data) setUser(session.data.user);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${hidden ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "bg-[#0a0a0a] border-b border-[#c9a961]/20 py-2 shadow-2xl" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "min-h-[70px]" : "min-h-[100px]"}`}>
          <Link href="/" className="flex items-center group py-2">
            <img
              src="/logo-icon.png"
              alt="Club Empar Icon"
              className={`w-auto transition-all duration-700 
                group-hover:scale-110 
                ${scrolled ? "h-10 md:h-12 opacity-100" : "h-14 md:h-20"}
                ${!scrolled && location === "/" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-bold text-sm tracking-[0.2em] uppercase px-2 ${location === link.href ? "text-[#c9a961]" : "text-[#d4c5a0]/50 hover:text-white"}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors font-bold text-sm tracking-[0.2em] uppercase px-2 text-[#d4c5a0]/50 hover:text-white"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-[#d4c5a0]/60 hover:text-[#c9a961] transition-colors font-bold text-[10px] tracking-widest uppercase"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="bg-[#c9a961] text-[#0a0a0a] px-8 py-3 font-black text-[10px] tracking-widest uppercase hover:glow-gold transition-all"
              >
                Dashboard
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#c9a961]" aria-label="Abrir menu">
            {isOpen ? Icons.close : Icons.menu}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 py-8 glass border-t border-[#c9a961]/20 space-y-6">
          {NAV_LINKS.map((link) => (
            link.isPage ? (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-[#d4c5a0] hover:text-white transition-colors font-bold py-2 text-sm tracking-widest uppercase">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-[#d4c5a0] hover:text-white transition-colors font-bold py-2 text-sm tracking-widest uppercase">
                {link.label}
              </a>
            )
          ))}
          {user ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-[#c9a961] hover:text-white transition-colors font-black py-4 text-xs tracking-[0.3em] uppercase border-t border-[#c9a961]/20 mt-4 pt-6 text-center">
              Acessar Dashboard
            </Link>
          ) : (
            <div className="border-t border-[#c9a961]/20 mt-4 pt-6 flex justify-center">
              <Link href="/sign-in" onClick={() => setIsOpen(false)} className="block text-[#d4c5a0] hover:text-[#c9a961] transition-colors font-black py-4 text-[10px] tracking-[0.3em] uppercase text-center w-full border border-[#c9a961]/20">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
