import { useState, useEffect } from "react";
import { useLocation } from "wouter";
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
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (!session && !authClient.useSession().isPending) {
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
            .catch(() => setLoading(false));
    }, [planId, session]);

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch('/api/checkout/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planId,
                    userId: session?.user.id,
                    email: session?.user.email,
                })
            });

            const data = await response.json();
            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                alert('Erro ao criar preferência de pagamento. Tente novamente.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Erro ao processar checkout.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen text-white flex items-center justify-center font-mono uppercase tracking-[0.4em]">
                Carregando...
            </div>
        );
    }

    if (!plan) return null;

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
                            <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
                                Resumo do <span className="text-gradient-gold">Pedido</span>
                            </h1>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center py-4 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Plano Selecionado</span>
                                <span className="text-white font-bold">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Duração</span>
                                <span className="text-white font-bold">{plan.duration_months} {plan.duration_months === 1 ? 'Mês' : 'Meses'}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-[#c9a961]/10">
                                <span className="text-[#d4c5a0]/40 font-mono text-[10px] uppercase tracking-widest">Valor Total</span>
                                <span className="text-[#c9a961] font-mono text-xl font-black">
                                    {Number(plan.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-[#c9a961] text-[#0a0a0a] py-6 font-black text-[12px] tracking-[0.4em] uppercase hover:glow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                        >
                            {isProcessing ? 'Processando...' : (
                                <>
                                    Pagar com Mercado Pago
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <p className="mt-8 text-center text-[#d4c5a0]/20 font-mono text-[8px] uppercase tracking-widest leading-relaxed">
                            Ao confirmar o pagamento, você concorda com nossos termos de serviço e política de privacidade. O acesso será liberado imediatamente após a confirmação.
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center gap-8 font-mono text-[8px] tracking-[0.4em] text-[#d4c5a0]/20 uppercase font-black">
                        <span>Safe Checkout</span>
                        <span>Mercado Pago Secured</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
