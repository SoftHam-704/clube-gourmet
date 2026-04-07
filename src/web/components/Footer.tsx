import { Link } from "wouter";

const Footer = () => {
    return (
        <footer className="relative py-24 bg-[#0a0a0a] border-t border-[#c9a961]/20 overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c9a961]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-20">
                    
                    {/* Brand Masterpiece Section */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start">
                        <Link href="/" className="group mb-10 block transition-transform duration-500 hover:-translate-y-1">
                            <div className="relative">
                                {/* Glow behind logo */}
                                <div className="absolute inset-0 bg-[#c9a961]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <img
                                    src="/logo-club.png"
                                    alt="Club Empar Gourmet"
                                    className="h-32 md:h-40 w-auto object-contain relative saturate-[1.2] brightness-[1.1] transition-all duration-700 [filter:drop-shadow(0_10px_30px_rgba(201,169,97,0.2))] group-hover:brightness-[1.2] group-hover:scale-105"
                                />
                            </div>
                        </Link>
                        
                        <h3 className="text-[#c9a961] font-heading font-light text-2xl md:text-3xl mb-6 tracking-tight leading-tight">
                            A elite da gastronomia <br />
                            <span className="font-serif italic font-medium">em um clique.</span>
                        </h3>
                        
                        <p className="text-[#d4c5a0]/60 text-lg leading-relaxed max-w-md font-light mb-10">
                            Redefinindo a experiência gastronômica brasileira através de conexões exclusivas e vantagens inigualáveis para paladares exigentes.
                        </p>
                        
                        {/* Social Links Hero */}
                        <div className="flex gap-6 items-center">
                            {['instagram', 'facebook', 'linkedin'].map((social) => (
                                <a 
                                    key={social} 
                                    href={`#${social}`} 
                                    className="w-12 h-12 rounded-full border border-[#c9a961]/20 flex items-center justify-center text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0a0a0a] transition-all duration-500 group"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-tighter group-hover:scale-110 transition-transform">{social.substring(0, 2)}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links Grid */}
                    <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
                        {/* Explorar */}
                        <div>
                            <h4 className="text-[#c9a961] font-black mb-8 text-[11px] tracking-[0.5em] uppercase flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#c9a961]/30" />
                                Explorar
                            </h4>
                            <ul className="space-y-4">
                                {['Restaurantes', 'Nossos Planos', 'Experiências', 'Como Funciona'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#d4c5a0]/40 hover:text-white transition-all text-sm font-medium uppercase tracking-widest hover:translate-x-2 inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* O Clube */}
                        <div>
                            <h4 className="text-[#c9a961] font-black mb-8 text-[11px] tracking-[0.5em] uppercase flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#c9a961]/30" />
                                O Clube
                            </h4>
                            <ul className="space-y-4">
                                {['Sobre Nós', 'Dúvidas (FAQ)', 'Indique e Ganhe', 'Fale Conosco'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#d4c5a0]/40 hover:text-white transition-all text-sm font-medium uppercase tracking-widest hover:translate-x-2 inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Parcerias */}
                        <div>
                            <h4 className="text-[#c9a961] font-black mb-8 text-[11px] tracking-[0.5em] uppercase flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#c9a961]/30" />
                                Parcerias
                            </h4>
                            <ul className="space-y-4">
                                {['Seja Parceiro', 'Club Empresas', 'Para Imprensa'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#d4c5a0]/40 hover:text-white transition-all text-sm font-medium uppercase tracking-widest hover:translate-x-2 inline-block">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Ornamental Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a961]/30 to-transparent mb-12" />

                {/* Bottom Bar: Copyright & Credits */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <span className="text-[#c9a961]/80 text-[11px] font-mono tracking-[0.4em] uppercase whitespace-nowrap">
                            © 2026 Club Empar Gourmet • Todos os direitos reservados
                        </span>
                        <div className="flex gap-10">
                            {['Termos', 'Privacidade'].map((legal) => (
                                <Link 
                                    key={legal} 
                                    href={`/${legal.toLowerCase()}`} 
                                    className="text-[#c9a961]/80 hover:text-[#c9a961] transition-colors text-[11px] font-mono tracking-[0.4em] uppercase"
                                >
                                    {legal}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Developer Signature - SoftHam */}
                    <div className="flex items-center gap-4 py-2 px-5 rounded-full bg-[#c9a961]/10 border border-[#c9a961]/30 group hover:bg-[#c9a961]/20 transition-all duration-500">
                        <span className="text-[#c9a961]/60 text-[10px] font-mono tracking-[0.2em] uppercase whitespace-nowrap">Crafted by</span>
                        <a
                            href="https://softham.com.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#c9a961] group-hover:text-white transition-all duration-500 font-heading font-black text-xs tracking-tighter"
                        >
                            SoftHam
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a961] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a961]"></span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
