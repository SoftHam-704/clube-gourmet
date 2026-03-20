const Footer = () => {
  return (
    <footer className="bg-[#090d0b] pt-24 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand and Mission (Span 4) */}
          <div className="lg:col-span-5 pr-8">
            <a href="#" className="flex gap-4 items-center mb-8 group">
              <img 
                src="/src/assets/logo.png" 
                alt="Club Empar Logo" 
                className="w-12 h-12 object-contain transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-3xl text-white leading-none tracking-wide">
                  Club Empar
                </span>
                <span className="font-body text-[10px] tracking-[0.5em] text-primary uppercase mt-2">
                  Gourmet Edition
                </span>
              </div>
            </a>
            
            <p className="text-foreground/60 font-display italic text-lg leading-relaxed max-w-sm">
              Redefinindo a experiência gastronômica brasileira através de conexões exclusivas e vantagens inigualáveis.
            </p>
          </div>

          {/* Column 2: Explorar (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-body text-xs tracking-[0.3em] font-bold text-primary uppercase mb-8">
              // Explorar
            </h4>
            <div className="flex flex-col space-y-5">
              <a href="#restaurantes" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Restaurantes
              </a>
              <a href="#planos" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Nossos Planos
              </a>
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Experiências
              </a>
              <a href="#como-funciona" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Como Funciona
              </a>
            </div>
          </div>

          {/* Column 3: O Clube (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-body text-xs tracking-[0.3em] font-bold text-primary uppercase mb-8">
              // O Clube
            </h4>
            <div className="flex flex-col space-y-5">
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Sobre Nós
              </a>
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Dúvidas (FAQ)
              </a>
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Indique e Ganha
              </a>
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Fale Conosco
              </a>
            </div>
          </div>

          {/* Column 4: Parcerias (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-body text-xs tracking-[0.3em] font-bold text-primary uppercase mb-8">
              // Parcerias
            </h4>
            <div className="flex flex-col space-y-5">
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Seja Parceiro
              </a>
              <a href="#" className="font-body text-xs tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">
                Club Empresas
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-wrap justify-center md:justify-start gap-8 items-center text-[10px] sm:text-xs font-body tracking-[0.2em] text-muted-foreground uppercase">
            <span>© 2026 Club Empar Gourmet</span>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          </div>

          <div className="text-[10px] sm:text-xs font-body tracking-[0.2em] text-muted-foreground flex items-center gap-2 uppercase">
            <span>Desenvolvido por:</span>
            <a href="#" className="text-primary font-bold hover:text-white transition-colors">SoftHam Sistemas</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
