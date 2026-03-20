import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FiCalendar, FiMapPin, FiChevronRight, FiStar } from "react-icons/fi";

const EXPERIENCES = [
    {
        id: 1,
        title: "Noite de Degustação Michelin",
        date: "25 MARÇO, 2026",
        location: "São Paulo, SP",
        description: "Uma imersão sensorial com menu degustação assinado por chefs premiados, harmonizado com vinhos de safras exclusivas e raras.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
        tag: "EXPERIÊNCIA DIAMANTE",
        price: "Exclusivo Membros"
    },
    {
        id: 2,
        title: "Workshop: Segredos do Sommelier",
        date: "12 ABRIL, 2026",
        location: "Curitiba, PR",
        description: "Aprenda a arte da harmonização em uma aula privativa com um dos maiores especialistas da América Latina, incluindo vinhos raros.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200",
        tag: "CURADORIA",
        price: "Inscrições Abertas"
    },
    {
        id: 3,
        title: "Jantar sob as Estrelas",
        date: "05 MAIO, 2026",
        location: "Gramado, RS",
        description: "Uma experiência gastronômica ao ar livre, em meio às montanhas, com música ao vivo e gastronomia contemporânea de autor.",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200",
        tag: "EDITION LIMITADA",
        price: "Lista de Espera"
    }
];

export default function Experiences() {
    const { scrollYProgress } = useScroll();
    
    // Parallax background text transforms
    const textX1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
    const textX2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);
    
    // Hero scaling effect
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

    return (
        <div className="bg-[#090d0b] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a] overflow-x-hidden font-body">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090d0b]/40 to-[#090d0b] z-10" />
                    <img 
                        src="https://images.unsplash.com/photo-1550966842-30cae01a2b74?auto=format&fit=crop&q=80&w=1200" 
                        className="w-full h-full object-cover brightness-50"
                        alt="Background"
                    />
                </motion.div>

                <div className="relative z-20 text-center px-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-[#c9a961] font-mono text-xs tracking-[0.5em] uppercase mb-6"
                    >
                        // Momentos Inesquecíveis
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-7xl md:text-8xl lg:text-9xl font-light mb-8"
                    >
                        CURADORIA <br /> <span className="italic text-[#c9a961]">Exclusiva</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[#d4c5a0]/60 text-lg max-w-2xl mx-auto font-light leading-relaxed px-4"
                    >
                        Conectando nossos membros às experiências mais autênticas e luxuosas que o mundo gastronômico pode oferecer.
                    </motion.p>
                </div>
            </section>

            {/* Background Parallax Layer - Subtle Watermark */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden whitespace-nowrap opacity-[0.012] z-0 flex flex-col justify-center gap-10">
                <motion.h2 
                    style={{ x: textX1 }}
                    className="text-[150px] font-display leading-none select-none uppercase"
                >
                    EXPERIÊNCIAS • DINING • EXCLUSIVIDADE • MOMENTOS •
                </motion.h2>
                <motion.h2 
                    style={{ x: textX2 }}
                    className="text-[150px] font-display italic leading-none select-none uppercase pl-[500px]"
                >
                    RESERVE • VIVA • SABOREIE • DESFRUTE •
                </motion.h2>
            </div>

            {/* Experience Cards */}
            <section className="relative z-10 py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-40">
                    {EXPERIENCES.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                        >
                            <div className="w-full lg:w-3/5 group">
                                <div className="aspect-[16/10] overflow-hidden relative rounded-sm shadow-2xl border border-white/5">
                                    <div className="absolute inset-0 bg-[#090d0b]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img 
                                        src={exp.image} 
                                        alt={exp.title}
                                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute top-6 left-6 z-20 bg-[#c9a961] text-[#090d0b] px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                                        {exp.tag}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/5 space-y-8">
                                <div className="flex items-center gap-4 text-[#c9a961]">
                                    <FiCalendar className="w-4 h-4" />
                                    <span className="text-xs font-mono tracking-widest">{exp.date}</span>
                                    <span className="opacity-20">|</span>
                                    <FiMapPin className="w-4 h-4" />
                                    <span className="text-xs font-mono tracking-widest">{exp.location}</span>
                                </div>

                                <h3 className="font-display text-4xl lg:text-7xl text-white leading-tight">
                                    {exp.title}
                                </h3>

                                <p className="text-[#d4c5a0]/60 text-lg font-light leading-relaxed">
                                    {exp.description}
                                </p>

                                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                                    <button id={`reserve-${exp.id}`} className="group flex items-center gap-3 bg-white text-black px-10 py-5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#c9a961] hover:text-white transition-all shadow-xl">
                                        RESERVAR VAGA
                                        <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[#c9a961] font-mono tracking-[0.2em] uppercase mb-1">Status</span>
                                        <span className="text-sm font-medium tracking-wide uppercase opacity-80">{exp.price}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Inquiries Section */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#0f1411] border border-[#c9a961]/20 p-12 lg:p-24 text-center space-y-8 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <FiStar className="w-32 h-32 text-[#c9a961]" />
                        </div>
                        <h2 className="font-display text-4xl lg:text-6xl text-white">Eventos Sob Medida</h2>
                        <p className="max-w-2xl mx-auto text-[#d4c5a0]/60 text-lg font-light italic">
                            Deseja organizar uma experiência exclusiva para sua empresa ou grupo privado? 
                            Nossa equipe de curadoria está pronta para criar um momento único.
                        </p>
                        <div className="pt-6">
                            <button id="corporate-inquiry" className="border-b-2 border-[#c9a961] text-[#c9a961] pb-2 text-xs font-bold tracking-[0.3em] uppercase hover:text-white hover:border-white transition-all">
                                Solicitar Proposta Exclusiva
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
