import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router, useFocusEffect } from 'expo-router';
import {
  LogIn,
  LogOut,
  QrCode,
  Crown,
  Heart,
  Gift,
  ChevronRight,
  UserPlus,
  Settings,
  Star,
} from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { apiGet } from '@/utils/api';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiGet('/api/user/dashboard', token);
      if (data && !data.error) setDashboard(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(useCallback(() => { fetchDashboard(); }, [fetchDashboard]));

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboard();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const subscription = dashboard?.subscription;
  const hasActiveSub = subscription?.status === 'active';
  const favCount = dashboard?.favorites?.length ?? 0;
  const benefitsUsed = dashboard?.totalBenefitsRedeemed ?? 0;

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.noAuthWrap}>
          <LinearGradient
            colors={['rgba(0,255,136,0.06)', 'transparent']}
            style={styles.noAuthGlow}
          />
          <View style={styles.avatarGhost}>
            <Text style={styles.avatarGhostText}>?</Text>
          </View>
          <Text style={styles.noAuthTitle}>Minha Conta</Text>
          <Text style={styles.noAuthDesc}>
            Faça login para acessar seu perfil, QR Code de membro e gerenciar sua assinatura.
          </Text>

          <Pressable style={styles.loginBtn} onPress={() => router.push('/login')}>
            <LinearGradient
              colors={[Colors.dark.tint, '#00b360']}
              style={styles.loginBtnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <LogIn color="#000" size={18} />
              <Text style={styles.loginBtnText}>Entrar na conta</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.signupBtn} onPress={() => router.push('/signup')}>
            <UserPlus color={Colors.dark.tint} size={16} />
            <Text style={styles.signupBtnText}>Criar conta grátis</Text>
          </Pressable>

          <View style={styles.benefitsList}>
            {[
              { icon: QrCode, text: 'QR Code de membro exclusivo' },
              { icon: Star, text: 'Acesso a restaurantes parceiros' },
              { icon: Gift, text: 'Benefícios e desconto 2x1' },
            ].map(({ icon: Icon, text }) => (
              <View key={text} style={styles.benefitItem}>
                <Icon size={14} color={Colors.dark.tint} />
                <Text style={styles.benefitItemText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.dark.tint} />
        }
      >

        {/* Hero / Avatar */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(0,255,136,0.12)', 'transparent']}
            style={styles.heroGlow}
          />
          <LinearGradient colors={[Colors.dark.tint, '#00b360']} style={styles.avatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          {hasActiveSub && (
            <View style={styles.memberPill}>
              <Crown size={12} color={Colors.dark.tint} />
              <Text style={styles.memberPillText}>Membro Ativo</Text>
            </View>
          )}
        </View>

        {/* QR Code — CTA principal */}
        <Pressable style={styles.qrCard} onPress={() => router.push('/qrcode')}>
          <LinearGradient
            colors={[Colors.dark.tint, '#00c96f']}
            style={styles.qrCardGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.qrCardLeft}>
              <Text style={styles.qrCardTitle}>Meu QR Code</Text>
              <Text style={styles.qrCardSub}>Apresente na entrada do restaurante</Text>
            </View>
            <View style={styles.qrIconWrap}>
              <QrCode color="#000" size={30} />
            </View>
          </LinearGradient>
        </Pressable>

        {/* Subscription card */}
        {loading ? (
          <ActivityIndicator color={Colors.dark.tint} style={{ marginVertical: 20 }} />
        ) : (
          <View style={[styles.subCard, hasActiveSub && styles.subCardActive]}>
            <View style={styles.subCardHeader}>
              <Crown color={hasActiveSub ? Colors.dark.tint : Colors.dark.icon} size={18} />
              <Text style={styles.subCardTitle}>Assinatura</Text>
              <View style={[styles.statusBadge, hasActiveSub ? styles.statusActive : styles.statusInactive]}>
                <Text style={[styles.statusText, { color: hasActiveSub ? Colors.dark.tint : Colors.dark.icon }]}>
                  {hasActiveSub ? 'ATIVO' : 'INATIVO'}
                </Text>
              </View>
            </View>

            {hasActiveSub ? (
              <View style={styles.subInfo}>
                <Text style={styles.planName}>{subscription.planName}</Text>
                <Text style={styles.planExpiry}>
                  Válido até {subscription.endDate
                    ? new Date(subscription.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                    : '—'}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.noSubDesc}>
                  Assine um plano para acessar os restaurantes parceiros com benefícios exclusivos como 2x1 e descontos especiais.
                </Text>
                <Pressable style={styles.assinarBtn} onPress={() => router.push('/plans')}>
                  <LinearGradient
                    colors={[Colors.dark.tint, '#00b360']}
                    style={styles.assinarBtnGrad}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.assinarBtnText}>Ver planos a partir de R$ 33/mês</Text>
                    <ChevronRight size={16} color="#000" />
                  </LinearGradient>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Heart color="#FFD700" size={20} />
            <Text style={styles.statValue}>{favCount}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Gift color="#FFD700" size={20} />
            <Text style={styles.statValue}>{benefitsUsed}</Text>
            <Text style={styles.statLabel}>Benefícios usados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Star color="#FFD700" size={20} />
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>

        {/* Action menu */}
        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem} onPress={() => router.push('/plans')}>
            <View style={[styles.menuIcon, { backgroundColor: 'rgba(0,255,136,0.08)' }]}>
              <Crown size={17} color={Colors.dark.tint} />
            </View>
            <Text style={styles.menuText}>Gerenciar assinatura</Text>
            <ChevronRight color={Colors.dark.icon} size={18} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: 'rgba(255,255,255,0.04)' }]}>
              <Settings size={17} color={Colors.dark.icon} />
            </View>
            <Text style={styles.menuText}>Configurações</Text>
            <ChevronRight color={Colors.dark.icon} size={18} />
          </Pressable>
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut color={Colors.dark.secondary} size={18} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  /* --- no-auth --- */
  noAuthWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 14,
  },
  noAuthGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
  },
  avatarGhost: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.dark.surface,
    borderWidth: 2,
    borderColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarGhostText: {
    fontFamily: Typography.header,
    fontSize: 32,
    color: '#444',
  },
  noAuthTitle: {
    fontFamily: Typography.header,
    fontSize: 24,
    color: '#fff',
  },
  noAuthDesc: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  loginBtn: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
  },
  loginBtnGrad: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loginBtnText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 16,
  },
  signupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  signupBtnText: {
    color: Colors.dark.tint,
    fontFamily: Typography.header,
    fontSize: 15,
  },
  benefitsList: {
    width: '100%',
    gap: 10,
    marginTop: 8,
    backgroundColor: Colors.dark.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitItemText: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },

  /* --- hero --- */
  heroSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    elevation: 8,
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  avatarInitials: {
    fontFamily: Typography.header,
    fontSize: 32,
    color: '#000',
  },
  userName: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    marginBottom: 10,
  },
  memberPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,255,136,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  memberPillText: {
    fontFamily: Typography.label,
    fontSize: 12,
    color: Colors.dark.tint,
  },

  /* --- QR card --- */
  qrCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  qrCardGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  qrCardLeft: {
    gap: 3,
  },
  qrCardTitle: {
    fontFamily: Typography.header,
    fontSize: 17,
    color: '#000',
  },
  qrCardSub: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  qrIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* --- subscription card --- */
  subCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  subCardActive: {
    borderColor: 'rgba(0,255,136,0.25)',
  },
  subCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  subCardTitle: {
    fontFamily: Typography.header,
    fontSize: 15,
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusActive: {
    backgroundColor: 'rgba(0,255,136,0.08)',
    borderColor: 'rgba(0,255,136,0.2)',
  },
  statusInactive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: '#333',
  },
  statusText: {
    fontFamily: Typography.mono,
    fontSize: 10,
  },
  subInfo: {
    gap: 4,
  },
  planName: {
    fontFamily: Typography.header,
    fontSize: 20,
    color: Colors.dark.tint,
  },
  planExpiry: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  noSubDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    lineHeight: 20,
    marginBottom: 14,
  },
  assinarBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  assinarBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  assinarBtnText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 14,
  },

  /* --- stats --- */
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 4,
  },
  statValue: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
  },
  statLabel: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Colors.dark.icon,
    textAlign: 'center',
  },

  /* --- menu --- */
  menuSection: {
    marginHorizontal: 20,
    backgroundColor: Colors.dark.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontFamily: Typography.label,
    fontSize: 15,
    color: '#fff',
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#1e1e1e',
    marginLeft: 66,
  },

  /* --- logout --- */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212,0,75,0.2)',
    backgroundColor: 'rgba(212,0,75,0.05)',
  },
  logoutText: {
    fontFamily: Typography.label,
    fontSize: 15,
    color: Colors.dark.secondary,
  },
});
