import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  LogIn,
  LogOut,
  QrCode,
  Crown,
  Heart,
  Gift,
  ChevronRight,
  UserPlus,
} from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { apiGet } from '@/utils/api';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const subscription = dashboard?.subscription;
  const hasActiveSub = subscription?.status === 'active';

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.noAuthState}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>?</Text>
          </View>
          <Text style={styles.noAuthTitle}>Minha Conta</Text>
          <Text style={styles.noAuthDesc}>
            Faça login para acessar seu perfil, QR Code de membro e gerenciar sua assinatura.
          </Text>
          <Pressable style={styles.loginBtn} onPress={() => router.push('/login')}>
            <LinearGradient
              colors={[Colors.dark.tint, '#00b360']}
              style={styles.loginBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <LogIn color="#000" size={18} />
              <Text style={styles.loginBtnText}>Entrar na conta</Text>
            </LinearGradient>
          </Pressable>
          <Pressable style={styles.signupBtn} onPress={() => router.push('/signup')}>
            <UserPlus color={Colors.dark.tint} size={18} />
            <Text style={styles.signupBtnText}>Criar conta grátis</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Avatar + Info */}
        <View style={styles.profileTop}>
          <LinearGradient colors={[Colors.dark.tint, '#00b360']} style={styles.avatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* QR Code Button */}
        <Pressable style={styles.qrBtn} onPress={() => router.push('/qrcode')}>
          <LinearGradient
            colors={[Colors.dark.tint, '#00b360']}
            style={styles.qrBtnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <QrCode color="#000" size={22} />
            <Text style={styles.qrBtnText}>Ver meu QR Code de Membro</Text>
          </LinearGradient>
        </Pressable>

        {/* Subscription Card */}
        {loading ? (
          <ActivityIndicator color={Colors.dark.tint} style={{ marginVertical: 20 }} />
        ) : (
          <View style={[styles.subCard, hasActiveSub && styles.subCardActive]}>
            <View style={styles.subCardHeader}>
              <Crown
                color={hasActiveSub ? Colors.dark.tint : Colors.dark.icon}
                size={20}
              />
              <Text style={styles.subCardTitle}>
                {hasActiveSub ? 'Assinatura Ativa' : 'Sem assinatura ativa'}
              </Text>
              {hasActiveSub && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ATIVO</Text>
                </View>
              )}
            </View>

            {hasActiveSub ? (
              <>
                <Text style={styles.planName}>{subscription.planName}</Text>
                <Text style={styles.planExpiry}>
                  Válido até:{' '}
                  {subscription.endDate
                    ? new Date(subscription.endDate).toLocaleDateString('pt-BR')
                    : '—'}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.noSubDesc}>
                  Assine um plano para acessar os restaurantes parceiros com benefícios exclusivos.
                </Text>
                <Pressable style={styles.assinarBtn} onPress={() => router.push('/plans')}>
                  <Text style={styles.assinarBtnText}>Ver planos</Text>
                  <ChevronRight color={Colors.dark.tint} size={16} />
                </Pressable>
              </>
            )}
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Heart color={Colors.dark.secondary} size={22} />
            <Text style={styles.statValue}>{dashboard?.favorites?.length ?? 0}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Gift color={Colors.dark.tint} size={22} />
            <Text style={styles.statValue}>{dashboard?.totalBenefitsRedeemed ?? 0}</Text>
            <Text style={styles.statLabel}>Benefícios usados</Text>
          </View>
        </View>

        {/* Actions */}
        <Pressable style={styles.actionRow} onPress={() => router.push('/plans')}>
          <Crown color={Colors.dark.icon} size={20} />
          <Text style={styles.actionText}>Gerenciar assinatura</Text>
          <ChevronRight color={Colors.dark.icon} size={18} />
        </Pressable>

        <Pressable style={[styles.actionRow, styles.logoutRow]} onPress={handleLogout}>
          <LogOut color={Colors.dark.secondary} size={20} />
          <Text style={[styles.actionText, { color: Colors.dark.secondary }]}>Sair da conta</Text>
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
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  noAuthState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 4,
  },
  noAuthTitle: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
  },
  noAuthDesc: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    marginBottom: 8,
  },
  loginBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginBtnGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    width: '100%',
    justifyContent: 'center',
  },
  signupBtnText: {
    color: Colors.dark.tint,
    fontFamily: Typography.header,
    fontSize: 15,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontFamily: Typography.header,
    fontSize: 28,
    color: '#000',
  },
  userName: {
    fontFamily: Typography.header,
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  qrBtn: {
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
  },
  qrBtnGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  qrBtnText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 15,
  },
  subCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  subCardActive: {
    borderColor: 'rgba(0,255,136,0.3)',
  },
  subCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  subCardTitle: {
    fontFamily: Typography.header,
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  activeBadge: {
    backgroundColor: 'rgba(0,255,136,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  activeBadgeText: {
    color: Colors.dark.tint,
    fontFamily: Typography.mono,
    fontSize: 10,
  },
  planName: {
    fontFamily: Typography.header,
    fontSize: 18,
    color: Colors.dark.tint,
    marginBottom: 4,
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
    marginBottom: 12,
    lineHeight: 20,
  },
  assinarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assinarBtnText: {
    color: Colors.dark.tint,
    fontFamily: Typography.header,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
    marginVertical: 4,
  },
  statValue: {
    fontFamily: Typography.header,
    fontSize: 24,
    color: '#fff',
  },
  statLabel: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Colors.dark.icon,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.dark.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 10,
  },
  logoutRow: {
    borderColor: 'rgba(212,0,75,0.15)',
    marginTop: 4,
  },
  actionText: {
    fontFamily: Typography.label,
    fontSize: 15,
    color: '#fff',
    flex: 1,
  },
});
