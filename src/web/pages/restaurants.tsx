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

const RESTAURANTS = [
  {
    id: 1,
    name: "Trattoria Bella Vista",
    cuisine: "Italiana",
    price: 3,
    rating: 4.8,
    location: "São Paulo - Jardins",
    description: "Autêntica culinária italiana com massas artesanais e uma seleção curada de vinhos da Toscana.",
    image: "🍝",
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
    image: "🍣",
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
    image: "🥩",
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
    image: "🥐",
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
    image: "🌮",
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
    image: "🍛",
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
    image: "🍜",
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
    image: "🫒",
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
    image: "🍽️",
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
    image: "🦞",
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
    image: "🫘",
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
    image: "🔬",
    availability: "dinner",
  },
];

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
            <span className="font-display text-xl font-bold text-white">Club Empar</span>
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-500/10 rounded-full blur-[80px] -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
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
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Buscar restaurantes, cozinhas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">📍</span>
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
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              Buscar
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
        <h3 className="font-display text-lg font-bold text-slate-900 mb-6">Filtros</h3>

        {/* Cuisine Type */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Tipo de Cozinha</h4>
          <div className="space-y-2">
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine === "Todas as Cozinhas" ? "" : cuisine)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                  (cuisine === "Todas as Cozinhas" && !selectedCuisine) || selectedCuisine === cuisine
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Faixa de Preço</h4>
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selectedPrices.includes(range.value)
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 group-hover:border-emerald-400"
                  }`}
                >
                  {selectedPrices.includes(range.value) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-slate-600 cursor-pointer"
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
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Disponibilidade</h4>
          <div className="space-y-2">
            {[
              { label: "Qualquer Horário", value: "" },
              { label: "Apenas Almoço", value: "lunch" },
              { label: "Apenas Jantar", value: "dinner" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setAvailability(option.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                  availability === option.value
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
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

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  image: string;
  availability: string;
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const priceDisplay = "$".repeat(restaurant.price);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-500 hover:-translate-y-2">
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
        <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
          {restaurant.image}
        </span>
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-emerald-700">
          2 por 1
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-slate-500 text-sm">{restaurant.cuisine} · {priceDisplay}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
            <span className="text-amber-500">★</span>
            <span className="text-sm font-semibold text-amber-700">{restaurant.rating}</span>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {restaurant.description}
        </p>

        <div className="flex items-center gap-2 text-slate-400 text-sm mb-5">
          <span>📍</span>
          <span>{restaurant.location}</span>
        </div>

        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors group-hover:bg-emerald-600">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, setCurrentPage }: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        ←
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-12 h-12 rounded-xl font-medium transition-all ${
            currentPage === page
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        →
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white">Club Empar</span>
          </Link>
          <p className="text-slate-500 text-sm">
            © 2024 Club Empar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Restaurants() {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [availability, setAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter restaurants
  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    if (selectedCuisine && restaurant.cuisine !== selectedCuisine) return false;
    if (selectedPrices.length > 0 && !selectedPrices.includes(restaurant.price)) return false;
    if (availability && restaurant.availability !== availability && restaurant.availability !== "both") return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCuisine, selectedPrices, availability]);

  return (
    <div className="font-sans antialiased min-h-screen bg-cream-50">
      <Navbar />
      <HeroSection />

      <section className="py-12 lg:py-16">
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
              <div className="flex items-center justify-between mb-8">
                <p className="text-slate-600">
                  Mostrando <span className="font-semibold text-slate-900">{filteredRestaurants.length}</span> restaurantes
                </p>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-emerald-500">
                  <option>Ordenar por: Recomendados</option>
                  <option>Avaliação: Maior para Menor</option>
                  <option>Preço: Menor para Maior</option>
                  <option>Preço: Maior para Menor</option>
                </select>
              </div>

              {/* Restaurant grid */}
              {paginatedRestaurants.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <span className="text-6xl mb-4 block">🍽️</span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Nenhum restaurante encontrado</h3>
                  <p className="text-slate-600">Tente ajustar seus filtros para ver mais resultados</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
