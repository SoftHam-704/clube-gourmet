import { Link } from "wouter";

export function Footer() {
    return (
        <footer className="py-24 bg-[#0a0a0a] border-t border-[#c9a961]/20 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c9a961]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="grid md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-4">
                        <Link href="/" className="flex items-center gap-6 mb-10 group inline-flex">
                            <img
                                src="/logo-final-gold.png"
                                alt="Club Empar Gourmet"
                                className="w-24 h-auto transition-all duration-500 saturate-[2.2] brightness-[1.1] [filter:drop-shadow(0_0_15px_rgba(201,169,97,0.3))] group-hover:scale-110 group-hover:brightness-[1.3]"
                            />
                            <div className="flex flex-col">
                                <span className="font-display text-3xl font-black text-white tracking-tighter leading-none">Club Empar</span>
                                <span className="font-mono text-[10px] tracking-[0.5em] text-[#c9a961] uppercase mt-2 opacity-60">Gourmet Edition</span>
                            </div>
                        </Link>
                        <p className="text-[#d4c5a0]/70 text-lg leading-relaxed max-w-sm font-light italic">
                            Redefinindo a experiência gastronômica brasileira através de conexões exclusivas e vantagens inigualáveis.
                        </p>
                    </div>

                    {/* Navigation - Explorar */}
                    <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
                        <h4 className="text-[#c9a961] font-black mb-8 text-[10px] tracking-[0.4em] uppercase font-mono">// EXPLORAR</h4>
                        <ul className="space-y-4">
                            <li><Link href="/restaurants" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Restaurantes</Link></li>
                            <li><Link href="/plans" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Nossos Planos</Link></li>
                            <li><Link href="/experiences" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Experiências</Link></li>
                            <li><Link href="/#how-it-works" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Como Funciona</Link></li>
                        </ul>
                    </div>

                    {/* Institutional - O Clube */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-[#c9a961] font-black mb-8 text-[10px] tracking-[0.4em] uppercase font-mono">// O CLUBE</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Sobre Nós</Link></li>
                            <li><Link href="/faq" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Dúvidas (FAQ)</Link></li>
                            <li><Link href="/referral" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Indique e Ganha</Link></li>
                            <li><Link href="/contact" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Fale Conosco</Link></li>
                        </ul>
                    </div>

                    {/* Partnership - Negócios */}
                    <div className="md:col-span-4 lg:col-span-2">
                        <h4 className="text-[#c9a961] font-black mb-8 text-[10px] tracking-[0.4em] uppercase font-mono">// PARCERIAS</h4>
                        <ul className="space-y-4">
                            <li><Link href="/partnerships" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Seja Parceiro</Link></li>
                            <li><Link href="/business" className="text-[#d4c5a0]/50 hover:text-[#c9a961] transition-all text-sm font-medium uppercase hover:translate-x-1 inline-block">Club Empresas</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#c9a961]/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p className="text-[#c9a961]/30 text-[10px] font-mono tracking-[0.3em] uppercase">
                            © 2026 Club Empar Gourmet
                        </p>
                        <div className="flex gap-8">
                            <Link href="/terms" className="text-[#c9a961]/30 hover:text-[#c9a961]/80 transition-colors text-[10px] font-mono tracking-[0.3em] uppercase">Termos</Link>
                            <Link href="/privacy" className="text-[#c9a961]/30 hover:text-[#c9a961]/80 transition-colors text-[10px] font-mono tracking-[0.3em] uppercase">Privacidade</Link>
                        </div>
                    </div>

                    {/* Credits SoftHam */}
                    <div className="flex items-center gap-3 group">
                        <span className="text-[#c9a961]/30 text-[10px] font-mono tracking-[0.3em] uppercase">Desenvolvido por</span>
                        <a
                            href="https://softham.com.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c9a961]/50 group-hover:text-[#c9a961] transition-all duration-500 font-display font-black text-sm tracking-tighter flex items-center gap-1"
                        >
                            SoftHam
                            <span className="w-1 h-1 bg-[#c9a961] rounded-full animate-pulse shadow-[0_0_8px_rgba(201,169,97,0.8)]" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
