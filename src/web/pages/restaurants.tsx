import { useState, useEffect } from "react";
import { Link } from "wouter";

const CUISINES = [
  "Todas as Cozinhas",
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

const PRICE_RANGES = [
  { label: "$ Econômico", value: 1 },
  { label: "$$ Moderado", value: 2 },
  { label: "$$$ Sofisticado", value: 3 },
  { label: "$$$$ Premium", value: 4 },
];

const CITIES = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Brasília"];

// Cuisine color schemes for visual distinction
const CUISINE_COLORS: Record<string, { bg: string; accent: string; gradient: string }> = {
  Italiana: { bg: "bg-red-50", accent: "text-red-600", gradient: "from-red-500 to-orange-500" },
  Japonesa: { bg: "bg-rose-50", accent: "text-rose-600", gradient: "from-rose-500 to-pink-500" },
  Brasileira: { bg: "bg-emerald-50", accent: "text-emerald-600", gradient: "from-emerald-500 to-teal-500" },
  Francesa: { bg: "bg-indigo-50", accent: "text-indigo-600", gradient: "from-indigo-500 to-violet-500" },
  Mexicana: { bg: "bg-amber-50", accent: "text-amber-600", gradient: "from-amber-500 to-orange-500" },
  Indiana: { bg: "bg-orange-50", accent: "text-orange-600", gradient: "from-orange-500 to-red-500" },
  Tailandesa: { bg: "bg-lime-50", accent: "text-lime-600", gradient: "from-lime-500 to-green-500" },
  Mediterrânea: { bg: "bg-cyan-50", accent: "text-cyan-600", gradient: "from-cyan-500 to-blue-500" },
  Contemporânea: { bg: "bg-slate-100", accent: "text-slate-600", gradient: "from-slate-600 to-slate-800" },
};

// SVG Icons for cuisine types
const CuisineIcons: Record<string, JSX.Element> = {
  Italiana: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="28" rx="16" ry="12" className="fill-current opacity-20" />
      <path d="M12 24c0-8 5.4-14 12-14s12 6 12 14" className="stroke-current" strokeWidth="2" fill="none"/>
      <circle cx="18" cy="26" r="2" className="fill-current opacity-60"/>
      <circle cx="26" cy="24" r="2.5" className="fill-current opacity-60"/>
      <circle cx="22" cy="30" r="1.5" className="fill-current opacity-60"/>
    </svg>
  ),
  Japonesa: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="20" width="32" height="14" rx="7" className="fill-current opacity-20" />
      <rect x="10" y="22" width="28" height="10" rx="5" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <circle cx="18" cy="27" r="3" className="fill-current opacity-60"/>
      <circle cx="30" cy="27" r="3" className="fill-current opacity-60"/>
      <path d="M24 18v-6M24 12l-3 3M24 12l3 3" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Brasileira: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 32c0-6 7-12 16-12s16 6 16 12c0 4-7 8-16 8s-16-4-16-8z" className="fill-current opacity-20"/>
      <ellipse cx="24" cy="32" rx="14" ry="6" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M14 28c2-4 6-6 10-6s8 2 10 6" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="30" r="2" className="fill-current opacity-60"/>
      <circle cx="28" cy="31" r="1.5" className="fill-current opacity-60"/>
    </svg>
  ),
  Francesa: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 8c-4 0-6 4-6 8 0 6 3 10 6 14 3-4 6-8 6-14 0-4-2-8-6-8z" className="fill-current opacity-20"/>
      <path d="M24 10c-3 0-4 3-4 6 0 5 2 8 4 11 2-3 4-6 4-11 0-3-1-6-4-6z" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M20 38h8M24 30v8" className="stroke-current" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Mexicana: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 28c0 0 4-12 16-12s16 12 16 12l-4 8H12l-4-8z" className="fill-current opacity-20"/>
      <path d="M10 28c0 0 4-10 14-10s14 10 14 10" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M12 36h24" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="30" r="2" className="fill-current opacity-60"/>
      <circle cx="28" cy="28" r="1.5" className="fill-current opacity-60"/>
    </svg>
  ),
  Indiana: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="30" rx="14" ry="10" className="fill-current opacity-20"/>
      <ellipse cx="24" cy="30" rx="12" ry="8" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M16 26c0-4 3.5-8 8-8s8 4 8 8" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M24 18v-6" className="stroke-current" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Tailandesa: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="30" rx="12" ry="10" className="fill-current opacity-20"/>
      <ellipse cx="24" cy="28" rx="10" ry="8" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <path d="M18 10c0 0 2 8 6 12M30 10c0 0-2 8-6 12" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="28" r="2" className="fill-current opacity-60"/>
      <circle cx="28" cy="28" r="2" className="fill-current opacity-60"/>
    </svg>
  ),
  Mediterrânea: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="32" rx="16" ry="8" className="fill-current opacity-20"/>
      <ellipse cx="24" cy="32" rx="14" ry="6" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <ellipse cx="24" cy="24" rx="6" ry="10" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <ellipse cx="24" cy="22" rx="2" ry="4" className="fill-current opacity-40"/>
    </svg>
  ),
  Contemporânea: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="10" y="14" width="28" height="24" rx="2" className="fill-current opacity-20"/>
      <rect x="12" y="16" width="24" height="20" rx="1" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="26" r="6" className="stroke-current" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="26" r="2" className="fill-current opacity-40"/>
    </svg>
  ),
};

const RESTAURANTS = [
  {
    id: 1,
    name: "Trattoria Bella Vista",
    cuisine: "Italiana",
    price: 3,
    rating: 4.8,
    location: "São Paulo - Jardins",
    description: "Autêntica culinária italiana com massas artesanais e uma seleção curada de vinhos da Toscana.",
    availability: "dinner",
  },
  {
    id: 2,
    name: "Sakura House",
    cuisine: "Japonesa",
    price: 4,
    rating: 4.9,
    location: "São Paulo - Liberdade",
    description: "Experiência omakase premium com peixes importados semanalmente do mercado Tsukiji de Tóquio.",
    availability: "both",
  },
  {
    id: 3,
    name: "Churrascaria Gaúcha",
    cuisine: "Brasileira",
    price: 3,
    rating: 4.7,
    location: "São Paulo - Moema",
    description: "Rodízio tradicional com 18 cortes de carnes nobres e salad bar premiado.",
    availability: "both",
  },
  {
    id: 4,
    name: "Le Petit Bistro",
    cuisine: "Francesa",
    price: 4,
    rating: 4.9,
    location: "Rio de Janeiro - Leblon",
    description: "Clássica culinária francesa reimaginada com ingredientes brasileiros pelo Chef Pierre Laurent.",
    availability: "dinner",
  },
  {
    id: 5,
    name: "Casa Oaxaca",
    cuisine: "Mexicana",
    price: 2,
    rating: 4.6,
    location: "São Paulo - Vila Madalena",
    description: "Sabores vibrantes mexicanos com mezcal artesanal e receitas tradicionais de mole.",
    availability: "both",
  },
  {
    id: 6,
    name: "Spice Garden",
    cuisine: "Indiana",
    price: 2,
    rating: 4.5,
    location: "São Paulo - Pinheiros",
    description: "Especialidades do norte da Índia com pratos do forno tandoor e receitas autênticas de curry.",
    availability: "both",
  },
  {
    id: 7,
    name: "Bangkok Street",
    cuisine: "Tailandesa",
    price: 2,
    rating: 4.6,
    location: "Rio de Janeiro - Ipanema",
    description: "Pratos inspirados na comida de rua com sabores intensos e ingredientes frescos.",
    availability: "lunch",
  },
  {
    id: 8,
    name: "Mediterrâneo",
    cuisine: "Mediterrânea",
    price: 3,
    rating: 4.7,
    location: "Belo Horizonte - Savassi",
    description: "Frutos do mar frescos e mezze com vista para o mar e azeite importado da Grécia.",
    availability: "both",
  },
  {
    id: 9,
    name: "Mesa Moderna",
    cuisine: "Contemporânea",
    price: 4,
    rating: 4.9,
    location: "São Paulo - Itaim Bibi",
    description: "Menu degustação de vanguarda com gastronomia molecular e ingredientes locais.",
    availability: "dinner",
  },
  {
    id: 10,
    name: "Osteria del Mare",
    cuisine: "Italiana",
    price: 3,
    rating: 4.7,
    location: "Curitiba - Batel",
    description: "Especialidades italianas costeiras com frutos do mar frescos e limoncello artesanal.",
    availability: "dinner",
  },
  {
    id: 11,
    name: "Feijoada da Vovó",
    cuisine: "Brasileira",
    price: 1,
    rating: 4.8,
    location: "Rio de Janeiro - Centro",
    description: "Feijoada tradicional servida todo sábado com samba ao vivo e caipirinhas.",
    availability: "lunch",
  },
  {
    id: 12,
    name: "Fusion Lab",
    cuisine: "Contemporânea",
    price: 4,
    rating: 4.8,
    location: "Brasília - Lago Sul",
    description: "Cozinha experimental que mistura sabores asiáticos e latino-americanos de formas surpreendentes.",
    availability: "dinner",
  },
];

// Premium SVG Icons
const Icons = {
  search: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  location: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  filter: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  grid: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  map: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  check: (
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/20" : "bg-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">Club Empar</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors font-medium">Início</Link>
            <Link href="/restaurants" className="text-emerald-400 font-medium">Restaurantes</Link>
            <Link href="/plans" className="text-slate-300 hover:text-white transition-colors font-medium">Planos</Link>
            <Link href="/plans" className="px-6 py-2.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-coral-500/30 transition-all hover:-translate-y-0.5">
              Começar Agora
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("São Paulo");

  return (
    <section className="relative pt-32 pb-16 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-500/6 rounded-full blur-[80px] -translate-x-1/3" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Descubra Sua Próxima
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-coral-400 bg-clip-text text-transparent">
              Aventura Gastronômica
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            Explore mais de 500 restaurantes parceiros e aproveite experiências exclusivas 2 por 1
          </p>

          {/* Search bar */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                {Icons.search}
              </span>
              <input
                type="text"
                placeholder="Buscar restaurantes, cozinhas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                {Icons.location}
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full md:w-48 pl-12 pr-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city} className="bg-slate-800 text-white">
                    {city}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                {Icons.chevronDown}
              </span>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
              {Icons.search}
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FiltersProps {
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  selectedPrices: number[];
  setSelectedPrices: (prices: number[]) => void;
  availability: string;
  setAvailability: (availability: string) => void;
}

function FilterSidebar({
  selectedCuisine,
  setSelectedCuisine,
  selectedPrices,
  setSelectedPrices,
  availability,
  setAvailability,
}: FiltersProps) {
  const togglePrice = (price: number) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter((p) => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-slate-500">{Icons.filter}</span>
          <h3 className="font-display text-lg font-bold text-slate-900">Filtros</h3>
        </div>

        {/* Cuisine Type */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
            Tipo de Cozinha
          </h4>
          <div className="space-y-1">
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine === "Todas as Cozinhas" ? "" : cuisine)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                  (cuisine === "Todas as Cozinhas" && !selectedCuisine) || selectedCuisine === cuisine
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cuisine !== "Todas as Cozinhas" && CuisineIcons[cuisine] && (
                  <span className={`w-5 h-5 ${CUISINE_COLORS[cuisine]?.accent || 'text-slate-400'}`}>
                    {CuisineIcons[cuisine]}
                  </span>
                )}
                <span>{cuisine}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
            Faixa de Preço
          </h4>
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div
                  onClick={() => togglePrice(range.value)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                    selectedPrices.includes(range.value)
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 group-hover:border-emerald-400"
                  }`}
                >
                  {selectedPrices.includes(range.value) && Icons.check}
                </div>
                <span
                  className="text-slate-600 cursor-pointer flex-1"
                  onClick={() => togglePrice(range.value)}
                >
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-coral-500 rounded-full"></span>
            Disponibilidade
          </h4>
          <div className="space-y-1">
            {[
              { label: "Qualquer Horário", value: "", icon: null },
              { label: "Apenas Almoço", value: "lunch", icon: Icons.clock },
              { label: "Apenas Jantar", value: "dinner", icon: Icons.clock },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setAvailability(option.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
                  availability === option.value
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {option.icon && <span className="text-slate-400">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setSelectedCuisine("");
            setSelectedPrices([]);
            setAvailability("");
          }}
          className="w-full mt-8 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          Limpar Filtros
        </button>
      </div>
    </aside>
  );
}

interface RestaurantCardProps {
  restaurant: typeof RESTAURANTS[0];
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const colors = CUISINE_COLORS[restaurant.cuisine] || { bg: "bg-slate-100", accent: "text-slate-600", gradient: "from-slate-500 to-slate-600" };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image placeholder with cuisine-specific styling */}
      <div className={`relative h-48 ${colors.bg} overflow-hidden`}>
        {/* Abstract food pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id={`pattern-${restaurant.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" className={colors.accent} fillOpacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${restaurant.id})`}/>
          </svg>
        </div>
        
        {/* Cuisine icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-24 h-24 ${colors.accent} opacity-60 transform group-hover:scale-110 transition-transform duration-500`}>
            {CuisineIcons[restaurant.cuisine] || CuisineIcons.Contemporânea}
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent`} />
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
          <span className="font-semibold text-slate-700">{"$".repeat(restaurant.price)}</span>
          <span className="text-slate-300">{"$".repeat(4 - restaurant.price)}</span>
        </div>

        {/* 2-for-1 badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${colors.gradient} text-white text-xs font-bold rounded-full shadow-lg`}>
          2 por 1
        </div>
      </div>

      <div className="p-6">
        {/* Cuisine tag */}
        <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.accent} text-xs font-semibold rounded-full mb-3`}>
          {restaurant.cuisine}
        </span>

        <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <span className="text-slate-400">{Icons.location}</span>
          {restaurant.location}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {restaurant.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <span className="text-amber-400">{Icons.star}</span>
            <span className="font-semibold text-slate-900">{restaurant.rating}</span>
            <span className="text-slate-400 text-sm">(120+)</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-emerald-600 transition-colors group/btn">
            <span>Ver Detalhes</span>
            <span className="transform group-hover/btn:translate-x-1 transition-transform">
              {Icons.arrow}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantsGrid() {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [availability, setAvailability] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    if (selectedCuisine && restaurant.cuisine !== selectedCuisine) return false;
    if (selectedPrices.length > 0 && !selectedPrices.includes(restaurant.price)) return false;
    if (availability === "lunch" && restaurant.availability === "dinner") return false;
    if (availability === "dinner" && restaurant.availability === "lunch") return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            availability={availability}
            setAvailability={setAvailability}
          />

          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {filteredRestaurants.length} Restaurantes
                </h2>
                <p className="text-slate-500 text-sm mt-1">Encontrados na sua região</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-emerald-100 text-emerald-600" : "text-slate-400 hover:bg-slate-100"}`}
                >
                  {Icons.grid}
                </button>
                <button 
                  onClick={() => setViewMode("map")}
                  className={`p-2.5 rounded-lg transition-colors ${viewMode === "map" ? "bg-emerald-100 text-emerald-600" : "text-slate-400 hover:bg-slate-100"}`}
                >
                  {Icons.map}
                </button>
              </div>
            </div>

            {/* Restaurant grid */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-slate-300">
                    {Icons.map}
                  </div>
                  <p className="text-slate-500">Vista de mapa em breve</p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && viewMode === "grid" && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display text-lg font-bold text-white">Club Empar</span>
          </Link>

          <div className="flex items-center gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>

          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Club Empar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Restaurants() {
  return (
    <div className="font-sans antialiased min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <RestaurantsGrid />
      <Footer />
    </div>
  );
}
