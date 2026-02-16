import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useLocation, Link } from 'wouter';
import { authClient } from '../../lib/auth';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

interface SignUpForm {
    name: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const [, setLocation] = useLocation();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();

    const onSubmit = async (data: SignUpForm) => {
        setError(null);
        const { error: signUpError } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        if (signUpError) {
            setError(signUpError.message || 'Erro ao criar conta. Tente novamente.');
            return;
        }

        setLocation('/plans'); // Redirect to plans after registration to choose a membership
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c9a961] selection:text-[#0a0a0a]">
            <Navbar />

            <main className="pt-40 pb-20 relative overflow-hidden flex items-center justify-center min-h-screen">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full" />

                <div className="relative w-full max-w-md px-6">
                    <div className="bg-[#111]/80 backdrop-blur-3xl border border-[#c9a961]/20 p-10 shadow-2xl">
                        <div className="text-center mb-10">
                            <span className="text-[#c9a961] font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block animate-pulse">
                // Junte-se à Elite
                            </span>
                            <h1 className="font-display text-4xl font-black uppercase tracking-tighter">
                                Criar <span className="text-gradient-gold">Conta</span>
                            </h1>
                            <p className="text-[#d4c5a0]/40 text-xs mt-4 font-light tracking-wide">
                                Sua porta de entrada para experiências gastronômicas exclusivas.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] font-mono mb-8 uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">Nome Completo</label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="w-full bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961]/40 px-6 py-4 outline-none transition-all text-sm font-medium focus:bg-[#c9a961]/5"
                                    placeholder="Seu nome"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">E-mail</label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="w-full bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961]/40 px-6 py-4 outline-none transition-all text-sm font-medium focus:bg-[#c9a961]/5"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#c9a961]/60 font-mono text-[9px] tracking-widest uppercase ml-1">Senha</label>
                                <input
                                    type="password"
                                    {...register('password', { required: true, minLength: 6 })}
                                    className="w-full bg-white/5 border border-[#c9a961]/10 focus:border-[#c9a961]/40 px-6 py-4 outline-none transition-all text-sm font-medium focus:bg-[#c9a961]/5"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#c9a961] text-[#0a0a0a] py-5 font-black text-[10px] tracking-[0.4em] uppercase hover:glow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {isSubmitting ? 'Gerando Acesso...' : 'Confirmar Registro'}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-[#c9a961]/10 text-center">
                            <p className="text-[#d4c5a0]/30 text-[10px] font-mono uppercase tracking-widest">
                                Já possui uma credencial? <Link href="/sign-in" className="text-[#c9a961] hover:underline">Fazer Login</Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-8 font-mono text-[8px] tracking-[0.4em] text-[#d4c5a0]/20 uppercase font-black">
                        <span>Encrypted Access</span>
                        <span>Premium Only</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
