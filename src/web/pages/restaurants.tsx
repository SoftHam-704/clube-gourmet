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

// Navbar removed

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  return (
    <section className="pt-32 pb-16 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/5 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-4 block">// Restaurantes</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6">
            Descubra Onde<br />
            <span className="text-gradient">Economizar</span>
          </h1>
          <p className="text-[#666] text-lg mb-8">
            Mais de 500 restaurantes parceiros esperando por você.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]">{Icons.search}</span>
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#111] border border-[#222] text-white placeholder-[#444] focus:border-[#00ff88] focus:outline-none font-mono text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full md:w-48 px-4 py-4 bg-[#111] border border-[#222] text-white focus:border-[#00ff88] focus:outline-none appearance-none font-mono text-sm cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FilterSidebarProps {
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  selectedPrice: number | null;
  setSelectedPrice: (price: number | null) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

function FilterSidebar({ selectedCuisine, setSelectedCuisine, selectedPrice, setSelectedPrice, showFilters, setShowFilters }: FilterSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setShowFilters(false)} />
      )}

      <aside className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-[#111] lg:bg-transparent z-50 lg:z-auto transform transition-transform lg:transform-none ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 lg:p-0 h-full lg:h-auto overflow-y-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <span className="text-white font-semibold">Filtros</span>
            <button onClick={() => setShowFilters(false)} className="text-[#666] hover:text-white">
              {Icons.close}
            </button>
          </div>

          {/* Cuisine filter */}
          <div className="mb-8">
            <h3 className="text-[#666] font-mono text-xs tracking-widest uppercase mb-4">Cozinha</h3>
            <div className="space-y-2">
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`w-full text-left px-4 py-2 text-sm transition-all border ${selectedCuisine === cuisine
                    ? "bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]"
                    : "bg-transparent border-[#222] text-[#666] hover:border-[#333] hover:text-white"
                    }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="mb-8">
            <h3 className="text-[#666] font-mono text-xs tracking-widest uppercase mb-4">Faixa de Preço</h3>
            <div className="space-y-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedPrice(selectedPrice === range.value ? null : range.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-all border ${selectedPrice === range.value
                    ? "bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]"
                    : "bg-transparent border-[#222] text-[#666] hover:border-[#333] hover:text-white"
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          <button
            onClick={() => {
              setSelectedCuisine("Todas");
              setSelectedPrice(null);
            }}
            className="w-full px-4 py-3 border border-[#333] text-[#666] hover:border-[#ff3366] hover:text-[#ff3366] transition-all text-sm font-mono"
          >
            Limpar Filtros
          </button>
        </div>
      </aside>
    </>
  );
}

interface RestaurantCardProps {
  restaurant: typeof RESTAURANTS[0];
  index: number;
}

function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  return (
    <div
      className="group border border-[#222] bg-[#111] hover:border-[#00ff88]/50 transition-all duration-300 relative overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image placeholder with abstract design */}
      <div className="relative h-48 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-mono text-6xl font-bold text-[#222] group-hover:text-[#00ff88]/20 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-[#0a0a0a]/90 border border-[#222]">
          <span className="text-[#00ff88]">{Icons.star}</span>
          <span className="text-white font-mono text-sm">{restaurant.rating}</span>
        </div>

        {/* Cuisine tag */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-[#0a0a0a]/90 border border-[#222] text-[#666] font-mono text-xs uppercase">
            {restaurant.cuisine}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">
            {restaurant.name}
          </h3>
          <span className="text-[#666] font-mono text-sm">
            {"$".repeat(restaurant.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#444]">{Icons.location}</span>
          <span className="text-[#666] text-sm">{restaurant.location}</span>
        </div>

        <p className="text-[#666] text-sm leading-relaxed mb-6 line-clamp-2">
          {restaurant.description}
        </p>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#333] text-[#666] hover:border-[#00ff88] hover:text-[#00ff88] transition-all text-sm font-mono group/btn">
          Ver Detalhes
          <span className="transition-transform group-hover/btn:translate-x-1">{Icons.arrow}</span>
        </button>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-[#00ff88] group-hover:w-full transition-all duration-500" />
    </div>
  );
}

function RestaurantsGrid() {
  const [selectedCuisine, setSelectedCuisine] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    const cuisineMatch = selectedCuisine === "Todas" || restaurant.cuisine === selectedCuisine;
    const priceMatch = !selectedPrice || restaurant.price === selectedPrice;
    return cuisineMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex lg:gap-12">
          <FilterSidebar
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#222]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#222] text-[#666] hover:border-[#333]"
                >
                  {Icons.filter}
                  <span className="text-sm">Filtros</span>
                </button>
                <span className="text-[#666] font-mono text-sm">
                  <span className="text-white">{filteredRestaurants.length}</span> restaurantes encontrados
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border transition-all ${viewMode === "grid" ? "border-[#00ff88] text-[#00ff88]" : "border-[#222] text-[#666] hover:border-[#333]"}`}
                >
                  {Icons.grid}
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 border transition-all ${viewMode === "map" ? "border-[#00ff88] text-[#00ff88]" : "border-[#222] text-[#666] hover:border-[#333]"}`}
                >
                  {Icons.map}
                </button>
              </div>
            </div>

            {/* Restaurant grid */}
            {viewMode === "grid" ? (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
                  ))}
                </div>

                {/* Empty state */}
                {filteredRestaurants.length === 0 && (
                  <div className="text-center py-20">
                    <div className="font-mono text-6xl text-[#222] mb-4">404</div>
                    <p className="text-[#666]">Nenhum restaurante encontrado com esses filtros.</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 font-mono text-sm transition-all border ${currentPage === page
                          ? "bg-[#00ff88] text-[#0a0a0a] border-[#00ff88]"
                          : "bg-transparent text-[#666] border-[#222] hover:border-[#333]"
                          }`}
                      >
                        {String(page).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-[600px] border border-[#222] bg-[#111] flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-[#222] text-6xl mb-4">{Icons.map}</div>
                  <p className="text-[#666]">Visualização de mapa em breve</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer removed

export default function Restaurants() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <HeroSection />
      <RestaurantsGrid />
      <Footer />
    </div>
  );
}
