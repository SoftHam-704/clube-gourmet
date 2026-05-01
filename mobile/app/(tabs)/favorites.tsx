import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { Heart, Trash2, LogIn, Utensils } from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { apiGet, apiDelete } from '@/utils/api';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop';

export default function FavoritesScreen() {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await apiGet('/api/user/favorites', token);
      if (Array.isArray(data)) setFavorites(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(useCallback(() => { fetchFavorites(); }, [fetchFavorites]));

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
  };

  const handleRemove = (restaurantId: number, name: string) => {
    Alert.alert(
      'Remover favorito',
      `Remover "${name}" dos seus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            setFavorites(prev => prev.filter(f => f.restaurantId !== restaurantId));
            await apiDelete(`/api/user/favorites/${restaurantId}`, token);
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.noAuthWrap}>
          <LinearGradient
            colors={['rgba(0,255,136,0.08)', 'transparent']}
            style={styles.noAuthGlow}
          />
          <View style={styles.iconCircle}>
            <Heart color={Colors.dark.tint} size={32} strokeWidth={1.5} />
          </View>
          <Text style={styles.noAuthTitle}>Seus Favoritos</Text>
          <Text style={styles.noAuthDesc}>
            Salve os restaurantes que você mais curte e acesse-os rapidamente de qualquer lugar.
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
            <Text style={styles.signupBtnText}>
              Não tem conta?{' '}
              <Text style={{ color: Colors.dark.tint }}>Criar gratuitamente</Text>
            </Text>
          </Pressable>

          <View style={styles.featureRow}>
            {['Listas pessoais', 'Sync entre devices', 'Acesso rápido'].map(feat => (
              <View key={feat} style={styles.featurePill}>
                <Text style={styles.featurePillText}>{feat}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.title}>Favoritos</Text>
          <Text style={styles.subtitle}>
            {loading && !refreshing
              ? 'Carregando...'
              : favorites.length === 0
              ? 'Nenhum salvo ainda'
              : `${favorites.length} restaurante${favorites.length !== 1 ? 's' : ''} salvos`}
          </Text>
        </View>
        <View style={styles.heartBadge}>
          <Heart size={16} color={Colors.dark.secondary} fill={favorites.length > 0 ? Colors.dark.secondary : 'transparent'} />
          {favorites.length > 0 && (
            <Text style={styles.heartCount}>{favorites.length}</Text>
          )}
        </View>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={Colors.dark.tint} style={{ marginTop: 60 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.dark.tint}
            />
          }
        >
          {favorites.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Utensils size={36} color="#333" strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyTitle}>Lista vazia</Text>
              <Text style={styles.emptyDesc}>
                Ao explorar os restaurantes, toque no coração para salvar seus preferidos aqui.
              </Text>
              <Pressable
                style={styles.exploreBtn}
                onPress={() => router.push('/(tabs)/explore')}
              >
                <LinearGradient
                  colors={[Colors.dark.tint, '#00b360']}
                  style={styles.exploreBtnGrad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.exploreBtnText}>Explorar restaurantes</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : (
            favorites.map(item => {
              const name = item.restaurantName || item.name || 'Restaurante';
              const cuisine = item.restaurantCuisine || item.cuisine || 'Gastronomia';
              const image = item.restaurantImage || item.image || PLACEHOLDER;
              return (
                <View key={item.id ?? item.restaurantId} style={styles.card}>
                  <Image source={{ uri: image }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.cardCuisine}>{cuisine}</Text>
                    <View style={styles.benefitBadge}>
                      <Text style={styles.benefitText}>2x1 disponível</Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.removeBtn}
                    onPress={() => handleRemove(item.restaurantId, name)}
                    hitSlop={10}
                  >
                    <Trash2 color={Colors.dark.secondary} size={17} />
                  </Pressable>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
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
    height: 300,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,255,136,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
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
    paddingVertical: 4,
  },
  signupBtnText: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 14,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
  featurePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: '#333',
  },
  featurePillText: {
    fontFamily: Typography.label,
    fontSize: 12,
    color: Colors.dark.icon,
  },
  /* --- header --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 26,
    color: '#fff',
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    marginTop: 2,
  },
  heartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(212,0,75,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,0,75,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  heartCount: {
    fontFamily: Typography.header,
    fontSize: 13,
    color: Colors.dark.secondary,
  },
  /* --- list --- */
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#222',
    gap: 12,
  },
  cardImage: {
    width: 76,
    height: 76,
    borderRadius: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardName: {
    fontFamily: Typography.header,
    fontSize: 15,
    color: '#fff',
    marginBottom: 3,
  },
  cardCuisine: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Colors.dark.icon,
    marginBottom: 8,
  },
  benefitBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,255,136,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  benefitText: {
    fontFamily: Typography.mono,
    fontSize: 10,
    color: Colors.dark.tint,
  },
  removeBtn: {
    padding: 10,
    backgroundColor: 'rgba(212,0,75,0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,0,75,0.15)',
  },
  /* --- empty authenticated --- */
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
    gap: 12,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: Typography.header,
    fontSize: 20,
    color: '#fff',
  },
  emptyDesc: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  exploreBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 4,
  },
  exploreBtnGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtnText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 15,
  },
});
