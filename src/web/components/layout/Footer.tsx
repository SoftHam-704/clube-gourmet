import { Link } from "wouter";

export function Footer() {
    return (
        <footer className="py-16 bg-[#1a4d2e] border-t border-[#222]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <img src="/logo.png" alt="Club Empar" className="w-10 h-10 transition-transform group-hover:scale-110" />
                            <span className="font-display text-xl font-bold text-white tracking-tighter">Club Empar</span>
                        </Link>
                        <p className="text-[#666] text-sm leading-relaxed max-w-sm">
                            A forma mais inteligente de jantar fora. Economia de até 50% nos melhores restaurantes do Brasil.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Plataforma</h4>
                        <ul className="space-y-3">
                            <li><Link href="/restaurants" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm">Restaurantes</Link></li>
                            <li><Link href="/plans" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm">Planos</Link></li>
                            <li><Link href="/#benefits" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm">Benefícios</Link></li>
                            <li><Link href="/how-it-works" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm">Como Funciona</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contato</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://wa.me/5566992412448" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm flex items-center gap-2">
                                    <span>📱</span> (66) 99241-2448
                                </a>
                            </li>
                            <li>
                                <a href="mailto:contato@clubempar.com.br" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm flex items-center gap-2">
                                    <span>✉️</span> contato@clubempar.com.br
                                </a>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#666] hover:text-[#c9a961] transition-colors text-sm">Fale Conosco</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#444] text-xs font-mono">
                        © 2026 Club Empar. Todos os direitos reservados.
                        <Link href="/classic-vision" className="ml-4 text-[#222] hover:text-[#c9a961] transition-colors cursor-pointer">[ Classic Edition ]</Link>
                    </p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="text-[#444] hover:text-[#c9a961] transition-colors text-xs font-mono">Termos de Uso</Link>
                        <Link href="/privacy" className="text-[#444] hover:text-[#c9a961] transition-colors text-xs font-mono">Privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
