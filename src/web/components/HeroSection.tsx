import { API_BASE } from "@/lib/config";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Star, ChevronDown } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";
import ctaBg from "../../assets/cta-bg.jpg";

const images = [heroBg, ctaBg];

const stats = [
  { value: "15k+", label: "Membros" },
  { value: "50%", label: "Economia Média" },
  { value: "4.9★", label: "Avaliação" },
  { value: "R$847", label: "Economizado/mês" },
];

const fomoNotifications = [
  { initials: "RS", name: "Rafael S.", action: "acabou de se associar ao clube", time: "agora" },
  { initials: "CF", name: "Camila F.", action: "economizou R$160 no jantar de ontem", time: "2 min" },
  { initials: "ML", name: "Marcos L.", action: "acabou de se associar ao clube", time: "5 min" },
  { initials: "AT", name: "Ana T.", action: "convidou 2 amigos para o clube", time: "8 min" },
  { initials: "GB", name: "Guilherme B.", action: "economizou R$240 este mês", time: "12 min" },
  { initials: "LP", name: "Lívia P.", action: "acabou de se associar ao clube", time: "15 min" },
];

const FOUNDER_TOTAL = 200;
const FOUNDER_TAKEN = 73;
const FOUNDER_PCT = (FOUNDER_TAKEN / FOUNDER_TOTAL) * 100;
const AVG_SAVING_PER_DINNER = 85;

// Plano selecionado na calculadora
interface Plan {
  id: string;
  name: string;
  price: string;
  duration_months: number;
  type: string;
  active?: boolean;
}

const PLAN_LABELS: Record<string, string> = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  semiannual: "Semestral",
  annual: "Anual",
};

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFomo, setCurrentFomo] = useState<number | null>(null);
  const [jantares, setJantares] = useState(3);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState("monthly");
  const fomoIdxRef = useRef(0);

  // Fetch planos individuais da API
  useEffect(() => {
    fetch(`${API_BASE}/api/membership-plans`)
      .then((r) => r.json())
      .then((data: Plan[]) => {
        const individual = data.filter((p) => p.type === "individual" && p.active !== false);
        if (individual.length) {
          setPlans(individual);
          setSelectedPlanId(individual.find((p) => p.duration_months === 1)?.id ?? individual[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const planMonthlyCost = selectedPlan
    ? Number(selectedPlan.price) / selectedPlan.duration_months
    : 0;
  const grossMonthly = jantares * AVG_SAVING_PER_DINNER;
  const netMonthly = Math.max(0, grossMonthly - planMonthlyCost);
  const netYearly = Math.round(netMonthly * 12);
  // aliases usados no JSX da calculadora
  const monthlyEconomy = netMonthly;
  const yearlyEconomy = netYearly;

  // Image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // FOMO notifications
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleInterval: ReturnType<typeof setInterval>;

    const showNotification = () => {
      setCurrentFomo(fomoIdxRef.current);
      fomoIdxRef.current = (fomoIdxRef.current + 1) % fomoNotifications.length;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setCurrentFomo(null), 4500);
    };

    const initialDelay = setTimeout(() => {
      showNotification();
      cycleInterval = setInterval(showNotification, 12000);
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(hideTimer);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center overflow-hidden bg-[#090d0b]">

      {/* Background image slider */}
      <div className="absolute inset-0 bg-background overflow-hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Fine dining ambiance"
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "easeOut" },
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#090d0b] via-[#090d0b]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-transparent to-[#090d0b]/40 z-10 pointer-events-none" />
      </div>

      {/* FOMO Toast */}
      <AnimatePresence>
        {currentFomo !== null && (
          <motion.div
            key={currentFomo}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-6 z-50 bg-[#0c120e]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4 shadow-2xl max-w-xs"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-display font-bold text-xs shrink-0">
              {fomoNotifications[currentFomo].initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-display text-white font-semibold truncate">
                {fomoNotifications[currentFomo].name}
              </div>
              <div className="text-xs font-body text-white/55 leading-snug">
                {fomoNotifications[currentFomo].action}
              </div>
            </div>
            <div className="text-[10px] font-body text-primary/70 tracking-wider shrink-0">
              {fomoNotifications[currentFomo].time}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20 pt-40 pb-24 grid lg:grid-cols-2 gap-12 items-center flex-1 w-full">

        {/* Left Column */}
        <div className="max-w-3xl">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 group inline-block"
          >
            <img
              src="/logo-club.png"
              alt="Club Empar Brand"
              className="h-28 md:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(201,169,97,0.3)] group-hover:scale-105 group-hover:drop-shadow-[0_0_35px_rgba(201,169,97,0.5)] transition-all duration-700"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-primary" />
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
              Lançamento Oficial · Sinop/MT
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-light leading-[1.1] mb-8 tracking-tight">
            <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Alta Gastronomia,
              </motion.span>
            </span>
            <br />
            <span className="overflow-hidden inline-block align-bottom pb-4 -mb-4">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="block"
              >
                <span className="text-gradient-gold italic pr-4">Metade do Preço</span>
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mb-10"
          >
            <p className="text-lg md:text-xl text-foreground/70 font-light font-body leading-relaxed">
              O Club Empar conecta paladares exigentes aos melhores restaurantes da cidade.
              Ao assinar o clube, você pede dois pratos principais e paga apenas um.
              Uma curadoria exclusiva de alto padrão.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-8"
          >
            <Link href="/plans">
              <Button
                variant="gold"
                size="lg"
                className="relative overflow-hidden group w-full sm:w-auto gap-3 px-10 h-14 shadow-[0_0_30px_rgba(201,169,97,0.3)] hover:shadow-[0_0_50px_rgba(201,169,97,0.5)] transition-all duration-500 font-display text-lg tracking-widest"
              >
                ASSOCIAR-SE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-12 group-hover:duration-1000 group-hover:translate-x-[150%] transition-transform ease-out" />
              </Button>
            </Link>
            <a href="/restaurants" className="group flex items-center gap-3 text-sm font-body tracking-[0.2em] uppercase text-white hover:text-primary transition-colors py-4">
              <span className="border-b border-primary/30 group-hover:border-primary pb-1 transition-colors">Ver Restaurantes</span>
            </a>
          </motion.div>

          {/* Urgency bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mb-10 max-w-sm"
          >
            <div className="flex justify-between items-center text-[10px] font-body uppercase tracking-widest mb-2">
              <span className="text-white/40">Plano Fundador · vagas limitadas</span>
              <span className="text-primary">{FOUNDER_TAKEN} / {FOUNDER_TOTAL} vagas</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${FOUNDER_PCT}%` }}
                transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-display font-semibold text-primary">
                  {stat.value}
                </span>
                <span className="text-[10px] font-body tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Calculator + Floating Cards */}
        <div className="hidden lg:flex relative h-[620px] items-start justify-center pt-4">

          {/* Savings Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-0 bg-[#0c120e]/85 backdrop-blur-md border border-primary/20 p-7 rounded-2xl shadow-2xl"
          >
            <div className="text-[10px] font-body tracking-[0.25em] uppercase text-primary mb-1">Simulador</div>
            <div className="text-xl font-display text-white mb-5">Calcule sua economia líquida</div>

            {/* Seletor de plano */}
            {plans.length > 0 && (
              <div className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-body uppercase tracking-widest transition-all duration-300 ${
                      selectedPlanId === p.id
                        ? "bg-primary text-[#090d0b] font-semibold"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    {PLAN_LABELS[p.id] ?? p.name}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-body text-white/55">Jantares por mês</span>
              <span className="text-primary font-display font-semibold text-xl">{jantares}x</span>
            </div>

            <input
              type="range"
              min={1}
              max={8}
              value={jantares}
              onChange={(e) => setJantares(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:shadow-[0_0_14px_rgba(201,169,97,0.6)]
                [&::-webkit-slider-thumb]:cursor-pointer
                mb-6"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                <div className="text-[10px] font-body text-white/35 uppercase tracking-widest mb-2">Por mês</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={monthlyEconomy}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-display font-semibold text-primary"
                  >
                    R${Math.round(monthlyEconomy)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="bg-primary/10 border border-primary/25 rounded-xl p-4 text-center">
                <div className="text-[10px] font-body text-primary/55 uppercase tracking-widest mb-2">Por ano</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={yearlyEconomy}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-display font-semibold text-white"
                  >
                    R${yearlyEconomy}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {selectedPlan && (
              <p className="mt-4 text-center text-[10px] font-body text-white/25 leading-relaxed">
                Já descontada a mensalidade de R${(Number(selectedPlan.price) / selectedPlan.duration_months).toFixed(2).replace(".", ",")} do {PLAN_LABELS[selectedPlan.id] ?? selectedPlan.name}
              </p>
            )}
          </motion.div>

          {/* Floating card: members */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 bottom-10 bg-[#0c120e]/75 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-52"
          >
            <div className="flex -space-x-2 shrink-0">
              {["AL", "BR", "CF"].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-[#0c120e] flex items-center justify-center text-primary text-[9px] font-display font-bold">
                  {i}
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-display text-white font-semibold">+15.000</div>
              <div className="text-[10px] font-body text-white/45">membros ativos</div>
            </div>
          </motion.div>

          {/* Floating card: rating */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute right-0 bottom-16 bg-[#0c120e]/75 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl"
          >
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-primary text-primary" />)}
            </div>
            <div className="text-2xl font-display font-bold text-white">4.9</div>
            <div className="text-[10px] font-body text-white/40 mt-0.5">avaliação média</div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-20 pb-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-white/30">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-primary/60" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
