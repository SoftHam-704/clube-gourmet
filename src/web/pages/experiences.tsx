import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const EXPERIENCES = [
    {
        id: 1,
        title: "Noite de Degustação Michelin",
        date: "25 MARÇO, 2026",
        location: "São Paulo, SP",
        description: "Uma imersão sensorial com menu degustação assinado por chefs premiados, harmonizado com vinhos de safras exclusivas.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000",
        tag: "EVENTO VIP",
        price: "Exclusivo Membros"
    },
    {
        id: 2,
        title: "Workshop: Segredos do Sommelier",
        date: "12 ABRIL, 2026",
        location: "Curitiba, PR",
        description: "Aprenda a arte da harmonização em uma aula privativa com um dos maiores especialistas da América Latina.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000",
        tag: "CURADORIA",
        price: "Inscrições Abertas"
    },
    {
        id: 3,
        title: "Jantar sob as Estrelas",
        date: "05 MAIO, 2026",
        location: "Gramado, RS",
        description: "Uma experiência gastronômica ao ar livre, em meio às montanhas, com música ao vivo e gastronomia contemporânea.",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1000",
        tag: "EXPERIÊNCIA ÚNICA",
        price: "Em Breve"
    }
];

export default function Experiences() {
    return (
        <div className="bg-[#1a4d2e] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-56 pb-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#c9a961]/10 blur-[200px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a4d2e]/40 blur-[150px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
            // ALÉM DO PRATO
                    </span>

                    <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[0.85] tracking-tighter mb-12 uppercase">
                        Experiências<br />
                        <span className="text-gradient-gold animate-gradient">Memoráveis.</span>
                    </h1>

                    <p className="text-[#d4c5a0]/70 text-2xl lg:text-3xl font-light leading-relaxed italic font-display max-w-4xl mx-auto">
                        Eventos exclusivos e curadorias especiais desenhadas para elevar sua conexão com a alta gastronomia.
                    </p>
                </div>
            </section>

            {/* Experiences Grid */}
            <section className="py-32 bg-[#1a4d2e] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-1 gap-24">
                        {EXPERIENCES.map((exp, i) => (
                            <div
                                key={exp.id}
                                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center group`}
                            >
                                {/* Image Container */}
                                <div className="lg:w-1/2 relative aspect-[4/3] overflow-hidden border border-[#c9a961]/20 shadow-2xl">
                                    <div className="absolute inset-0 bg-[#0a0a0a]/40 group-hover:bg-transparent transition-all duration-700 z-10" />
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    {/* Floating Tag */}
                                    <div className="absolute top-8 left-8 bg-[#c9a961] text-[#0a0a0a] px-6 py-2 font-black text-[10px] tracking-[0.3em] uppercase z-20 shadow-2xl">
                                        {exp.tag}
                                    </div>
                                </div>

                                {/* Info Container */}
                                <div className="lg:w-1/2 space-y-8">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[#c9a961] font-mono text-xs font-black tracking-widest">{exp.date}</span>
                                        <div className="h-px w-12 bg-[#c9a961]/30" />
                                        <span className="text-white/40 font-mono text-xs tracking-widest uppercase">{exp.location}</span>
                                    </div>

                                    <h2 className="font-display text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-tight group-hover:text-gradient-gold transition-all">
                                        {exp.title}
                                    </h2>

                                    <p className="text-[#d4c5a0]/60 text-xl font-light leading-relaxed italic border-l-2 border-[#c9a961]/20 pl-8">
                                        {exp.description}
                                    </p>

                                    <div className="flex items-center gap-8 pt-4">
                                        <button className="px-12 py-5 bg-[#c9a961] text-[#0a0a0a] font-black text-[10px] tracking-[0.4em] uppercase hover:glow-green hover:-translate-y-1 transition-all shadow-2xl">
                                            Ver Detalhes
                                        </button>
                                        <span className="text-[#c9a961] font-mono text-[10px] font-black tracking-widest uppercase opacity-40">
                                            {exp.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Quote Section */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <span className="text-[20rem] font-black font-display rotate-12">EXCLUSIVO</span>
                </div>

                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
                    <div className="text-[#c9a961] text-6xl mb-12 animate-float">🍷</div>
                    <h3 className="text-[#d4c5a0]/80 text-3xl lg:text-5xl font-light leading-snug italic font-display">
                        "A gastronomia é a única arte que utiliza todos os cinco sentidos. Nossas experiências são desenhadas para que você os use ao máximo."
                    </h3>
                    <div className="mt-12 h-px w-24 bg-[#c9a961]/40 mx-auto" />
                    <p className="mt-8 text-[#c9a961] font-mono text-xs tracking-[0.4em] uppercase font-black">Conselho Deliberativo Club Empar</p>
                </div>
            </section>

            {/* Corporate/Private Request Section */}
            <section className="py-32 bg-[#1a4d2e] relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="p-16 border border-[#c9a961]/20 bg-[#0a0a0a]/60 backdrop-blur-3xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#c9a961]/40 transition-all group-hover:border-[#c9a961]" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#c9a961]/40 transition-all group-hover:border-[#c9a961]" />

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="max-w-2xl text-center lg:text-left">
                                <h3 className="text-white font-display text-4xl font-black uppercase mb-4 tracking-tighter">Eventos Privativos & Corporativos</h3>
                                <p className="text-[#d4c5a0]/60 text-lg font-light italic leading-relaxed">
                                    Deseja uma experiência personalizada para sua empresa ou grupo seleto de convidados? Nossa curadoria organiza momentos inesquecíveis sob demanda.
                                </p>
                            </div>
                            <button className="px-12 py-6 border-2 border-[#c9a961]/30 text-[#c9a961] font-black text-[10px] tracking-[0.4em] uppercase hover:bg-[#c9a961] hover:text-[#0a0a0a] hover:border-[#c9a961] transition-all">
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
