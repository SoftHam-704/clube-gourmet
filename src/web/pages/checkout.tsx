import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { authClient } from "../lib/auth";

export default function Checkout() {
    const [, setLocation] = useLocation();
    const queryParams = new URLSearchParams(window.location.search);
    const planId = queryParams.get('plan');
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        console.log("🔄 [Checkout] Verificando sessão:", { session, isPending, planId });
        
        if (!isPending && !session) {
            console.log("🚫 [Checkout] Sem sessão, redirecionando para sign-up");
            setLocation(`/sign-up?plan=${planId}`);
            return;
        }

        if (!planId) {
            setLocation('/plans');
            return;
        }

        fetch(`/api/membership-plans`)
            .then(res => res.json())
            .then(data => {
                const foundPlan = data.find((p: any) => p.id === planId);
                setPlan(foundPlan);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ [Checkout] Erro ao carregar planos:", err);
                setLoading(false);
            });
    }, [planId, session, isPending]);

    const handleCheckout = async () => {
        console.log("🚀 [Checkout] Iniciando processo de pagamento...");
        setIsProcessing(true);
        setError(null);

        try {
            console.log("📡 [Checkout] Chamando create-preference...");
            const response = await fetch('/api/checkout/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    planId,
                    userId: session?.user.id,
                    email: session?.user.email,
                })
            });

            console.log("📩 [Checkout] Resposta recebida status:", response.status);
            const data = await response.json();

            if (!response.ok) {
                console.error("❌ [Checkout] Erro da API:", data);
                setError(data.error || 'Erro ao processar pagamento.');
                return;
            }

            const redirectUrl = data.init_point || data.sandbox_init_point;
            console.log("🔗 [Checkout] Redirecionando para:", redirectUrl);
            
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                setError('Não foi possível gerar o link de pagamento. Tente novamente.');
            }
        } catch (err: any) {
            console.error('🔥 [Checkout] Erro fatal:', err);
            setError('Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-2 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin" />
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#c9a961] animate-pulse">
                    Preparando Checkout...
                </p>
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
                <Navbar />
                <main className="pt-40 pb-20 flex items-center justify-center min-h-screen">
                    <div className="text-center space-y-8">
                        <div className="text-6xl opacity-20">🔍</div>
                        <h2 className="font-heading text-3xl font-black uppercase tracking-tighter">
                            Plano não <span className="text-gradient-gold">encontrado</span>
                        </h2>
                        <p className="text-[#d4c5a0]/40 text-sm max-w-md">
                            O plano selecionado não está mais disponível. Escolha outro plano para continuar.
                        </p>
                        <Link href="/plans">
                            <button className="px-12 py-5 bg-[#c9a961] text-[#0a0a0a] font-black text-[10px] tracking-[0.4em] uppercase hover:glow-gold transition-all">
                                Ver Planos Disponíveis
                            </button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <main className="pt-40 pb-20 relative overflow-hidden flex items-center justify-center min-h-screen">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full" />

                <div className="relative w-full max-w-2xl px-6">
                    <div className="bg-[#111]/80 backdrop-blur-3xl border border-[#c9a961]/20 p-10 shadow-2xl">
                        <div className="text-center mb-10">
                            <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block">
                                // Finalizar Assinatura
                            </span>
                            <h1 className="font-heading text-4xl font-black uppercase tracking-tighter">
                                Resumo do <span className="text-gradient-gold">Pedido</span>
                            </h1>
                        </div>

                        {/* Detalhes do Plano */}
                        <div className="space-y-0 mb-10">
                            <div className="flex justify-between items-center py-5 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Plano Selecionado</span>
                                <span className="text-white font-bold">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-5 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Duração</span>
                                <span className="text-white font-bold">{plan.duration_months} {plan.duration_months === 1 ? 'Mês' : 'Meses'}</span>
                            </div>
                            <div className="flex justify-between items-center py-5 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Assinante</span>
                                <span className="text-white font-bold text-sm">{session?.user?.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-5 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Valor Total</span>
                                <span className="text-[#c9a961] font-mono text-2xl font-black">
                                    {Number(plan.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        </div>

                        {/* Métodos de Pagamento */}
                        <div className="mb-8 p-5 bg-white/5 border border-[#c9a961]/10">
                            <span className="text-[#d4c5a0]/30 font-mono text-[9px] uppercase tracking-widest block mb-4">Formas de Pagamento Aceitas</span>
                            <div className="flex items-center gap-6 text-[#c9a961]/50 text-xs">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                                    Cartão
                                </span>
                                <span className="text-[#c9a961]/20">|</span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                    PIX
                                </span>
                                <span className="text-[#c9a961]/20">|</span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                                    Boleto
                                </span>
                            </div>
                        </div>

                        {/* Erro */}
                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-[10px] font-mono uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        {/* Botão de Pagamento */}
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing || isPending || loading || !plan}
                            className="w-full bg-[#c9a961] text-[#0a0a0a] py-6 font-black text-[12px] tracking-[0.4em] uppercase hover:glow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#0a0a0a]/20 border-t-[#0a0a0a] rounded-full animate-spin" />
                                    Redirecionando ao Mercado Pago...
                                </>
                            ) : (
                                <>
                                    Pagar com Mercado Pago
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <p className="mt-8 text-center text-[#d4c5a0]/20 font-mono text-[8px] uppercase tracking-widest leading-relaxed">
                            Você será redirecionado para o ambiente seguro do Mercado Pago. Ao confirmar, concorda com nossos{' '}
                            <Link href="/terms" className="text-[#c9a961]/40 hover:underline">termos de serviço</Link>{' '}e{' '}
                            <Link href="/privacy" className="text-[#c9a961]/40 hover:underline">política de privacidade</Link>.
                            O acesso será liberado imediatamente após a confirmação.
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center gap-8 font-mono text-[8px] tracking-[0.4em] text-[#d4c5a0]/20 uppercase font-black">
                        <span className="flex items-center gap-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
                            Checkout Seguro
                        </span>
                        <span>Mercado Pago Secured</span>
                        <span>SSL Encrypted</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
