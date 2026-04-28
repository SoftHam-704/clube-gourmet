import React, { useState, useEffect, useCallback } from 'react';
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
import { router } from 'expo-router';
import { Heart, Trash2, LogIn } from 'lucide-react-native';
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

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
  };

  const handleRemove = (restaurantId: number, name: string) => {
    Alert.alert(
      'Remover favorito',
      `Remover "${name}" dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const { ok } = await apiDelete(`/api/user/favorites/${restaurantId}`, token);
            if (ok) {
              setFavorites(prev => prev.filter(f => f.restaurantId !== restaurantId));
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.authState}>
          <Heart color={Colors.dark.tint} size={56} strokeWidth={1.2} />
          <Text style={styles.authTitle}>Seus favoritos</Text>
          <Text style={styles.authDesc}>
            Faça login para salvar seus restaurantes favoritos e acessá-los de qualquer dispositivo.
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
          <Pressable onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>
              Não tem conta?{' '}
              <Text style={{ color: Colors.dark.tint }}>Criar conta grátis</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        {favorites.length > 0 && (
          <Text style={styles.count}>{favorites.length} restaurante{favorites.length !== 1 ? 's' : ''}</Text>
        )}
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
              <Heart color="#333" size={48} strokeWidth={1.2} />
              <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
              <Text style={styles.emptyDesc}>
                Explore os restaurantes e toque no coração para salvar seus preferidos.
              </Text>
              <Pressable style={styles.exploreBtn} onPress={() => router.push('/(tabs)/explore')}>
                <Text style={styles.exploreBtnText}>Explorar restaurantes</Text>
              </Pressable>
            </View>
          ) : (
            favorites.map(item => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{ uri: item.restaurantImage || PLACEHOLDER }}
                  style={styles.cardImage}
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName} numberOfLines={1}>
                    {item.restaurantName || item.name}
                  </Text>
                  <Text style={styles.cardCuisine}>
                    {item.restaurantCuisine || item.cuisine || 'Gastronomia'}
                  </Text>
                </View>
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => handleRemove(item.restaurantId, item.restaurantName || item.name)}
                  hitSlop={8}
                >
                  <Trash2 color={Colors.dark.secondary} size={18} />
                </Pressable>
              </View>
            ))
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 26,
    color: '#fff',
  },
  count: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#222',
    gap: 12,
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontFamily: Typography.header,
    fontSize: 15,
    color: '#fff',
    marginBottom: 4,
  },
  cardCuisine: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  removeBtn: {
    padding: 8,
    backgroundColor: 'rgba(212,0,75,0.08)',
    borderRadius: 10,
  },
  authState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  authTitle: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
    marginTop: 8,
  },
  authDesc: {
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
  signupLink: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 14,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontFamily: Typography.header,
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  emptyDesc: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  exploreBtn: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  exploreBtnText: {
    color: Colors.dark.tint,
    fontFamily: Typography.label,
    fontSize: 14,
  },
});
