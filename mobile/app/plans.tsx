import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Check, ShieldCheck, Crown } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/utils/api';

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration_months: number;
  type: string;
  active: boolean;
};

const DURATION_LABEL: Record<number, string> = {
  1: 'mês',
  3: 'trimestre',
  6: 'semestre',
  12: 'ano',
};

const FEATURES_INDIVIDUAL = [
  'Acesso a todos os restaurantes parceiros',
  'Sem limite de uso mensal',
  'QR Code exclusivo de membro',
  'Atendimento prioritário VIP',
  'Cancele quando quiser',
];

const FEATURES_FAMILY = [
  'Tudo do plano individual',
  'Até 4 membros da família',
  'QR Codes individuais por membro',
  'Melhor custo-benefício',
];

function monthlyPrice(total: number, months: number): string {
  return (total / months).toFixed(2).replace('.', ',');
}

export default function PlansScreen() {
  const { user, token } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [planType, setPlanType] = useState<'individual' | 'family'>('individual');

  useEffect(() => {
    fetch(`${API_URL}/api/membership-plans`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPlans(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visiblePlans = plans
    .filter(p => p.active && p.type === planType)
    .sort((a, b) => a.duration_months - b.duration_months);

  const handleSubscribe = async (plan: Plan) => {
    if (!user || !token) {
      Alert.alert(
        'Login necessário',
        'Faça login para assinar um plano.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Entrar', onPress: () => router.push('/login') },
        ]
      );
      return;
    }

    setCheckoutLoading(plan.id);
    try {
      const res = await fetch(`${API_URL}/api/checkout/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: plan.id,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar checkout');

      if (data.init_point) {
        await WebBrowser.openBrowserAsync(data.init_point);
      } else {
        throw new Error('URL de pagamento não disponível');
      }
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível iniciar o pagamento.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const isPopular = (plan: Plan) => plan.duration_months === 12;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Crown color={Colors.dark.tint} size={32} />
        <Text style={styles.title}>Escolha seu Plano</Text>
        <Text style={styles.subtitle}>
          Acesso ilimitado aos melhores restaurantes parceiros.
        </Text>
      </View>

      {/* Toggle individual / família */}
      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleBtn, planType === 'individual' && styles.toggleBtnActive]}
          onPress={() => setPlanType('individual')}
        >
          <Text style={[styles.toggleText, planType === 'individual' && styles.toggleTextActive]}>
            Individual
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, planType === 'family' && styles.toggleBtnActive]}
          onPress={() => setPlanType('family')}
        >
          <Text style={[styles.toggleText, planType === 'family' && styles.toggleTextActive]}>
            Família
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.dark.tint} style={{ marginVertical: 40 }} />
      ) : visiblePlans.length === 0 ? (
        <Text style={styles.empty}>Nenhum plano disponível.</Text>
      ) : (
        visiblePlans.map(plan => {
          const price = parseFloat(plan.price);
          const popular = isPopular(plan);
          const isLoadingThis = checkoutLoading === plan.id;
          const features = planType === 'family' ? FEATURES_FAMILY : FEATURES_INDIVIDUAL;

          return (
            <View
              key={plan.id}
              style={[styles.card, popular && styles.cardPopular]}
            >
              {popular && (
                <View style={styles.popularBanner}>
                  <Text style={styles.popularBannerText}>MAIS VANTAJOSO</Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                {popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>⭐ POPULAR</Text>
                  </View>
                )}
              </View>

              <Text style={styles.planDesc}>{plan.description}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.currency}>R$</Text>
                <Text style={styles.priceMain}>{monthlyPrice(price, plan.duration_months)}</Text>
                <Text style={styles.pricePer}>/mês</Text>
              </View>

              {plan.duration_months > 1 && (
                <Text style={styles.priceTotal}>
                  Total: R$ {price.toFixed(2).replace('.', ',')} por {DURATION_LABEL[plan.duration_months] ?? `${plan.duration_months} meses`}
                </Text>
              )}

              <View style={styles.features}>
                {features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Check size={15} color={Colors.dark.tint} />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                style={styles.subscribeBtn}
                onPress={() => handleSubscribe(plan)}
                disabled={!!checkoutLoading}
              >
                {popular ? (
                  <LinearGradient
                    colors={[Colors.dark.tint, '#00b360']}
                    style={styles.gradientBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoadingThis
                      ? <ActivityIndicator color="#000" />
                      : <Text style={styles.btnTextDark}>Assinar Agora</Text>}
                  </LinearGradient>
                ) : (
                  <View style={styles.outlineBtn}>
                    {isLoadingThis
                      ? <ActivityIndicator color={Colors.dark.tint} />
                      : <Text style={styles.btnTextLight}>Assinar</Text>}
                  </View>
                )}
              </Pressable>
            </View>
          );
        })
      )}

      <View style={styles.secureRow}>
        <ShieldCheck size={14} color={Colors.dark.icon} />
        <Text style={styles.secureText}>Pagamento 100% seguro via Mercado Pago</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
    gap: 8,
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 26,
    color: '#fff',
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: Colors.dark.tint,
  },
  toggleText: {
    fontFamily: Typography.label,
    fontSize: 14,
    color: Colors.dark.icon,
  },
  toggleTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardPopular: {
    borderColor: 'rgba(0,255,136,0.4)',
  },
  popularBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,255,136,0.08)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  popularBannerText: {
    fontFamily: Typography.mono,
    fontSize: 10,
    color: Colors.dark.tint,
    letterSpacing: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  planName: {
    fontFamily: Typography.header,
    fontSize: 18,
    color: '#fff',
  },
  popularBadge: {
    backgroundColor: 'rgba(0,255,136,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  popularBadgeText: {
    color: Colors.dark.tint,
    fontFamily: Typography.mono,
    fontSize: 10,
  },
  planDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  currency: {
    color: '#fff',
    fontFamily: Typography.label,
    fontSize: 16,
    marginBottom: 6,
    marginRight: 2,
  },
  priceMain: {
    color: '#fff',
    fontFamily: Typography.header,
    fontSize: 42,
    lineHeight: 44,
  },
  pricePer: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  priceTotal: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 12,
    marginBottom: 16,
  },
  features: {
    marginBottom: 20,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    color: '#ccc',
    fontFamily: Typography.body,
    fontSize: 13,
    flex: 1,
  },
  subscribeBtn: {
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    borderRadius: 12,
  },
  btnTextDark: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 16,
  },
  btnTextLight: {
    color: Colors.dark.tint,
    fontFamily: Typography.header,
    fontSize: 16,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  secureText: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 12,
  },
  empty: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
  },
});
