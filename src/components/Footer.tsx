const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-xl font-semibold text-gradient-gold tracking-wide">
              CLUB EMPAR
            </span>
            <span className="text-muted-foreground text-xs ml-2 tracking-[0.3em] uppercase">
              Gourmet
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-body">
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            © 2025 Club Empar Gourmet. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
