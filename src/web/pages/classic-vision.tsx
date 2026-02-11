import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const CLASSIC_BENEFITS = [
    {
        title: "Excelência em Cada Prato",
        description: "Uma seleção de parcerias com os chefs mais renomados do país.",
        icon: "✧",
    },
    {
        title: "Vinhos Selecionados",
        description: "Acesso a adegas exclusivas e harmonizações premiadas.",
        icon: "🍷",
    },
    {
        title: "Atendimento Preferencial",
        description: "Reservas garantidas e as melhores mesas da casa.",
        icon: "⚜",
    },
];

export default function ClassicVision() {
    const brandGreen = "#133c1a"; // Forest green from the image
    const brandGold = "#d9c18d";  // Gold/Beige from the image text

    return (
        <div style={{ backgroundColor: brandGreen }} className="min-h-screen text-white font-serif">
            <Navbar />

            {/* Luxury Hero */}
            <section className="pt-40 pb-24 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <span style={{ color: brandGold }} className="font-mono text-sm tracking-[0.3em] uppercase mb-6 block">
                        ESTILO CLÁSSICO // GOURMET
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
                        Elegância em cada<br />
                        <span style={{ color: brandGold }}>Experiência</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed italic">
                        "Para aqueles que apreciam a tradição da alta gastronomia com um toque de sofisticação atemporal."
                    </p>
                </div>
            </section>

            {/* Comparison Grid */}
            <section className="py-32 border-y border-white/5 bg-black/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {CLASSIC_BENEFITS.map((item, i) => (
                            <div key={i} className="text-center group">
                                <div style={{ color: brandGold }} className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signature Section */}
            <section className="py-32 px-6">
                <div style={{ borderColor: brandGold }} className="max-w-5xl mx-auto border p-12 lg:p-24 text-center relative overflow-hidden">
                    {/* Decorative corners */}
                    <div style={{ backgroundColor: brandGold }} className="absolute top-0 left-0 w-2 h-2" />
                    <div style={{ backgroundColor: brandGold }} className="absolute bottom-0 right-0 w-2 h-2" />

                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 italic">Onde o Tempo Para e o Sabor Floresce</h2>
                    <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                        Apresentamos a visão clássica do Club Empar. Menos neon, mais tradição. Um ambiente pensado para o paladar exigente de quem sabe que a verdadeira sofisticação é silenciosa.
                    </p>
                    <button style={{ backgroundColor: brandGold, color: brandGreen }} className="px-12 py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all">
                        Descobrir o Novo Velho
                    </button>
                </div>
            </section>

            {/* Callout */}
            <section className="py-20 text-center bg-black/20">
                <div className="font-mono text-xs opacity-30 select-none">
                    {Array(10).fill("PROPOSTA ESTÉTICA ").join(" • ")}
                </div>
            </section>

            <Footer />
        </div>
    );
}
