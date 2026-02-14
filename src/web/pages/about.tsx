import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function About() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ec985]/5 blur-[150px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="text-[#4ec985] font-mono text-sm tracking-widest uppercase mb-4 block">// Sobre Nós</span>
                        <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
                            Democratizando a<br />
                            <span className="text-gradient">Alta Gastronomia</span>
                        </h1>
                        <p className="text-[#666] text-xl leading-relaxed max-w-2xl">
                            Nascemos da paixão por comer bem e da convicção de que experiências memoráveis não devem ser um luxo inacessível.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-[#222] bg-[#111]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div>
                            <div className="font-mono text-4xl font-bold text-[#4ec985]">2022</div>
                            <div className="text-[#666] text-xs uppercase tracking-widest mt-2">Fundação</div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl font-bold text-white">500+</div>
                            <div className="text-[#666] text-xs uppercase tracking-widest mt-2">Restaurantes</div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl font-bold text-white">15k+</div>
                            <div className="text-[#666] text-xs uppercase tracking-widest mt-2">Membros</div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl font-bold text-[#d4c5a0]">R$2M+</div>
                            <div className="text-[#666] text-xs uppercase tracking-widest mt-2">Economizados</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="font-display text-4xl font-bold tracking-tight">O que nos move</h2>
                            <div className="space-y-6 text-[#999] leading-relaxed text-lg">
                                <p>
                                    O Club Empar não é apenas um guia de descontos. É um movimento para valorizar a cultura gastronômica regional e incentivar as pessoas a explorarem novos sabores com mais frequência.
                                </p>
                                <p>
                                    Acreditamos na economia circular: ajudamos restaurantes a preencherem suas mesas e ajudamos nossos membros a viverem experiências que antes eram reservadas apenas para ocasiões especiais.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 pt-8">
                                <div className="p-6 border border-[#222] bg-[#111]/50">
                                    <h3 className="text-[#4ec985] font-mono text-sm uppercase tracking-widest mb-3">// Missão</h3>
                                    <p className="text-sm text-[#666]">Tornar a gastronomia premium acessível a todos, promovendo o crescimento do setor.</p>
                                </div>
                                <div className="p-6 border border-[#222] bg-[#111]/50">
                                    <h3 className="text-[#d4c5a0] font-mono text-sm uppercase tracking-widest mb-3">// Visão</h3>
                                    <p className="text-sm text-[#666]">Ser a maior plataforma de benefícios gastronômicos da América Latina até 2028.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Abstract decorative graphic */}
                            <div className="aspect-square border border-[#222] bg-[#111] relative flex items-center justify-center">
                                <div className="absolute inset-4 border border-[#4ec985]/20" />
                                <div className="absolute inset-8 border border-[#d4c5a0]/20 rotate-12" />
                                <div className="font-mono text-8xl font-bold text-[#222]">CE</div>

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4ec985]" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4c5a0]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-[#111] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
                    <span className="text-[#4ec985] font-mono text-sm tracking-widest uppercase mb-4 block">// Nossos Valores</span>
                    <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter">O DNA do Club Empar</h2>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Transparência", desc: "Sem letras miúdas. O benefício é real, direto e simples.", color: "#4ec985" },
                        { title: "Qualidade", desc: "Curadoria rigorosa. Só os melhores restaurantes entram no nosso clube.", color: "#d4c5a0" },
                        { title: "Inovação", desc: "Tecnologia a serviço da experiência gastronômica.", color: "#4ec985" }
                    ].map((item, i) => (
                        <div key={i} className="p-8 border border-[#222] bg-[#0a0a0a] hover:border-[#333] transition-all group">
                            <div className="w-12 h-px mb-6 transition-all group-hover:w-full" style={{ backgroundColor: item.color }} />
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-[#666] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
