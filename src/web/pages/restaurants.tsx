import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const CUISINES = [
  "Todas",
  "Italiana",
  "Japonesa",
  "Brasileira",
  "Francesa",
  "Mexicana",
  "Indiana",
  "Tailandesa",
  "Mediterrânea",
  "Contemporânea",
];



const CITIES = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Brasília"];

const RESTAURANTS = [
  {
    id: 1,
    name: "Trattoria Bella Vista",
    cuisine: "Italiana",
    price: 3,
    rating: 4.8,
    location: "São Paulo - Jardins",
    description: "Autêntica culinária italiana com massas artesanais e uma seleção curada de vinhos da Toscana.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    name: "Sakura House",
    cuisine: "Japonesa",
    price: 4,
    rating: 4.9,
    location: "São Paulo - Liberdade",
    description: "Experiência omakase premium com peixes importados semanalmente do mercado Tsukiji de Tóquio.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    name: "Churrascaria Gaúcha",
    cuisine: "Brasileira",
    price: 3,
    rating: 4.7,
    location: "São Paulo - Moema",
    description: "Rodízio tradicional com 18 cortes de carnes nobres e salad bar premiado.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    name: "Le Petit Bistro",
    cuisine: "Francesa",
    price: 4,
    rating: 4.9,
    location: "Rio de Janeiro - Leblon",
    description: "Clássica culinária francesa reimaginada com ingredientes brasileiros pelo Chef Pierre Laurent.",
    image: "https://images.unsplash.com/photo-1550966842-28a2a2d3ef8a?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 5,
    name: "Casa Oaxaca",
    cuisine: "Mexicana",
    price: 2,
    rating: 4.6,
    location: "São Paulo - Vila Madalena",
    description: "Sabores vibrantes mexicanos com mezcal artesanal e receitas tradicionais de mole.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 6,
    name: "Spice Garden",
    cuisine: "Indiana",
    price: 2,
    rating: 4.5,
    location: "São Paulo - Pinheiros",
    description: "Especialidades do norte da Índia com pratos do forno tandoor e receitas autênticas de curry.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 7,
    name: "Bangkok Street",
    cuisine: "Tailandesa",
    price: 2,
    rating: 4.6,
    location: "Rio de Janeiro - Ipanema",
    description: "Pratos inspirados na comida de rua com sabores intensos e ingredientes frescos.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 8,
    name: "Mediterrâneo",
    cuisine: "Mediterrânea",
    price: 3,
    rating: 4.7,
    location: "Belo Horizonte - Savassi",
    description: "Frutos do mar frescos e mezze com vista para o mar e azeite importado da Grécia.",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f8?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 9,
    name: "Mesa Moderna",
    cuisine: "Contemporânea",
    price: 4,
    rating: 4.9,
    location: "São Paulo - Itaim Bibi",
    description: "Menu degustação de vanguarda com gastronomia molecular e ingredientes locais.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 10,
    name: "Osteria del Mare",
    cuisine: "Italiana",
    price: 3,
    rating: 4.7,
    location: "Curitiba - Batel",
    description: "Especialidades italianas costeiras com frutos do mar frescos e limoncello artesanal.",
    image: "https://images.unsplash.com/photo-1534080564607-4e37cc66810c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 11,
    name: "Feijoada da Vovó",
    cuisine: "Brasileira",
    price: 1,
    rating: 4.8,
    location: "Rio de Janeiro - Centro",
    description: "Feijoada tradicional servida todo sábado com samba ao vivo e caipirinhas.",
    image: "https://images.unsplash.com/photo-1625938140722-234d967189c7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 12,
    name: "Fusion Lab",
    cuisine: "Contemporânea",
    price: 4,
    rating: 4.8,
    location: "Brasília - Lago Sul",
    description: "Cozinha experimental que mistura sabores asiáticos e latino-americanos de formas surpreendentes.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e0349b?auto=format&fit=crop&q=80&w=1000",
  },
];

const Icons = {
  search: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  location: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="square" strokeLinejoin="miter" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  grid: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M4 6h4v4H4zM14 6h4v4h-4zM4 16h4v4H4zM14 16h4v4h-4z" />
    </svg>
  ),
  map: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" strokeLinejoin="miter" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  filter: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M3 4h18M3 12h12M3 20h6" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const queryMatch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineMatch = selectedCuisine === "Todas" || r.cuisine === selectedCuisine;
    return queryMatch && cuisineMatch;
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-48 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c9a961]/5 blur-[200px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-[#c9a961] font-mono text-sm tracking-[0.6em] uppercase mb-10 block animate-pulse">
                // Onde a Experiência Começa
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.85] tracking-tighter mb-8 italic lg:not-italic">
                Curadoria de<br />
                <span className="text-gradient-gold animate-gradient">Elite.</span>
              </h1>
              <p className="text-[#d4c5a0]/60 text-xl font-light max-w-xl leading-relaxed">
                Navegue por um ecossistema seletivo de gastronomia. Onde cada parceiro é uma promessa de excelência.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-8 border-l border-[#c9a961]/20 pl-12 h-fit">
              <div>
                <div className="text-4xl font-mono font-black text-white">500+</div>
                <div className="text-[#c9a961] text-[10px] tracking-[0.3em] uppercase font-bold mt-1">Acordos Ativos</div>
              </div>
              <div>
                <div className="text-4xl font-mono font-black text-white">22</div>
                <div className="text-[#c9a961] text-[10px] tracking-[0.3em] uppercase font-bold mt-1">Cidades</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar - Floating Glassmorphic */}
      <section className="sticky top-20 z-40 px-6 lg:px-8 -mt-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111]/80 backdrop-blur-3xl border border-[#c9a961]/20 p-2 shadow-2xl flex flex-col lg:flex-row gap-2">
            {/* Search */}
            <div className="flex-1 relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#c9a961]/40 group-focus-within:text-[#c9a961] transition-colors">
                {Icons.search}
              </span>
              <input
                type="text"
                placeholder="Buscar por nome ou região..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-transparent focus:border-[#c9a961]/30 focus:bg-[#c9a961]/5 pl-16 pr-8 py-5 outline-none transition-all text-sm font-medium"
              />
            </div>

            {/* Cuisine Select */}
            <div className="lg:w-64 relative">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full bg-white/5 border border-transparent focus:border-[#c9a961]/30 px-8 py-5 outline-none transition-all text-sm font-medium appearance-none cursor-pointer text-[#d4c5a0]/80"
              >
                {CUISINES.map((c) => (
                  <option key={c} value={c} className="bg-[#111]">{c}</option>
                ))}
              </select>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a961]/40 text-[10px]">▼</span>
            </div>

            {/* City Select */}
            <div className="lg:w-48 relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white/5 border border-transparent focus:border-[#c9a961]/30 px-8 py-5 outline-none transition-all text-sm font-medium appearance-none cursor-pointer text-[#d4c5a0]"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#111]">{city}</option>
                ))}
              </select>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a961]/40 text-[10px]">▼</span>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredRestaurants.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredRestaurants.map((res, i) => (
                <div
                  key={res.id}
                  className="group relative bg-[#111] border border-[#c9a961]/10 hover:border-[#c9a961]/40 transition-all duration-700 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={res.image}
                      alt={res.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                    {/* Floating Info */}
                    <div className="absolute top-6 right-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#c9a961]/20 px-3 py-1 flex items-center gap-2">
                      <span className="text-[#c9a961]">{Icons.star}</span>
                      <span className="text-white font-mono text-xs font-black">{res.rating}</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block bg-[#c9a961] text-[#0a0a0a] px-3 py-1 text-[9px] font-black tracking-widest uppercase mb-4">
                        {res.cuisine}
                      </span>
                      <h3 className="text-white font-display text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-gradient-gold transition-all">
                        {res.name}
                      </h3>
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between text-[#d4c5a0]/40 font-mono text-[10px] tracking-[0.2em] uppercase">
                      <div className="flex items-center gap-2">
                        {Icons.location}
                        {res.location}
                      </div>
                      <div className="text-[#c9a961]">
                        {"$".repeat(res.price)}
                      </div>
                    </div>

                    <p className="text-[#d4c5a0]/60 text-sm font-light leading-relaxed italic line-clamp-2">
                      "{res.description}"
                    </p>

                    <button className="w-full py-5 bg-white/5 border border-[#c9a961]/10 text-white font-black text-[10px] tracking-[0.4em] uppercase hover:bg-[#c9a961] hover:text-[#0a0a0a] hover:border-[#c9a961] hover:-translate-y-1 transition-all">
                      Garantir Reserva VIP
                    </button>
                  </div>

                  {/* Corner Brégnights */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a961]/0 group-hover:border-[#c9a961]/100 transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a961]/0 group-hover:border-[#c9a961]/100 transition-all duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center space-y-8">
              <div className="text-[#c9a961] text-6xl animate-bounce">🍽️</div>
              <h2 className="text-4xl font-display font-black uppercase tracking-widest text-[#d4c5a0]">Nenhum local encontrado</h2>
              <p className="text-[#d4c5a0]/40 max-w-sm mx-auto italic">Refine sua curadoria para encontrar o extraordinário.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCuisine("Todas");
                }}
                className="px-12 py-4 border border-[#c9a961]/40 text-[#c9a961] font-black text-xs tracking-widest uppercase hover:bg-[#c9a961] hover:text-[#0a0a0a] transition-all"
              >
                Resetar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-24 bg-[#1a4d2e] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <h2 className="text-white font-display text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-8 max-w-4xl mx-auto">
            Não encontrou seu restaurante favorito?<br />
            <span className="text-gradient-gold">Sugira um novo parceiro.</span>
          </h2>
          <button className="px-12 py-6 bg-white text-[#0a0a0a] font-black text-xs tracking-[0.5em] uppercase hover:glow-green hover:-translate-y-2 transition-all">
            Fazer Indicação
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
