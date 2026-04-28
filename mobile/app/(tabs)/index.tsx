import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Star, Heart, QrCode, MapPin, Sparkles, Crown, ChevronRight } from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL, apiPost, apiDelete } from '@/utils/api';

const CATEGORIES = ['Tudo', 'Japonesa', 'Italiana', 'Churrasco', 'Francesa', 'Vegano', 'Brasileira'];

const PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HomeScreen() {
  const { user, token } = useAuth();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('Tudo');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/restaurants`);
      const data = await res.json();
      if (Array.isArray(data)) setRestaurants(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/user/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setFavorites(new Set(data.map((f: any) => f.restaurantId)));
      }
    } catch (e) {}
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchData(), fetchFavorites()]);
    setRefreshing(false);
  };

  const toggleFavorite = async (restaurantId: number) => {
    if (!user) {
      Alert.alert('Login necessário', 'Faça login para salvar favoritos.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Entrar', onPress: () => router.push('/login') },
      ]);
      return;
    }
    const isFav = favorites.has(restaurantId);
    setFavorites(prev => {
      const next = new Set(prev);
      isFav ? next.delete(restaurantId) : next.add(restaurantId);
      return next;
    });
    if (isFav) {
      await apiDelete(`/api/user/favorites/${restaurantId}`, token);
    } else {
      const { ok } = await apiPost('/api/user/favorites', { restaurantId }, token);
      if (!ok) setFavorites(prev => { const n = new Set(prev); n.delete(restaurantId); return n; });
    }
  };

  const filtered = useMemo(() =>
    category === 'Tudo'
      ? restaurants
      : restaurants.filter(r => r.cuisine?.toLowerCase().includes(category.toLowerCase())),
    [restaurants, category]
  );

  const featured = useMemo(() => restaurants.filter(r => r.highlighted), [restaurants]);
  const listItems = useMemo(() => filtered.slice(0, 6), [filtered]);

  const handleQrPress = () => user ? router.push('/qrcode') : router.push('/login');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {/* Logo + saudação */}
          <View style={styles.headerLeft}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={styles.greeting}>
                {user ? `${greeting()}, ${user.name.split(' ')[0]}!` : `${greeting()}!`}
              </Text>
              <View style={styles.locationRow}>
                <MapPin size={12} color={Colors.dark.tint} />
                <Text style={styles.locationText}>São Paulo, SP</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.profileBtn}
            onPress={() => router.push(user ? '/(tabs)/two' : '/login')}
          >
            {user ? (
              <LinearGradient colors={[Colors.dark.tint, '#00b360']} style={styles.profileGrad}>
                <Text style={styles.profileInitial}>{user.name[0].toUpperCase()}</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.profileLoginText}>Entrar</Text>
            )}
          </Pressable>
        </View>

        {/* Search */}
        <BlurView intensity={30} style={styles.searchContainer}>
          <Search color={Colors.dark.icon} size={17} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Buscar restaurante ou cozinha..."
            placeholderTextColor={Colors.dark.icon}
            style={styles.searchInput}
            onFocus={() => router.push('/(tabs)/explore')}
          />
        </BlurView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.tint} />}
      >
        {/* Banner contextual */}
        {user ? (
          <Pressable style={styles.memberBanner} onPress={handleQrPress}>
            <LinearGradient colors={['#1a1a1a', '#222']} style={styles.memberBannerInner}>
              <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                <Text style={styles.memberBannerTitle}>
                  <Crown size={14} color={Colors.dark.tint} /> Membro Ativo
                </Text>
                <Text style={styles.memberBannerSub}>Toque para ver seu QR Code de membro</Text>
              </View>
              <QrCode size={28} color={Colors.dark.tint} />
            </LinearGradient>
          </Pressable>
        ) : (
          <Pressable style={styles.subscribeBanner} onPress={() => router.push('/plans')}>
            <LinearGradient
              colors={[Colors.dark.tint, '#00b360']}
              style={styles.bannerGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <View style={{ backgroundColor: 'transparent' }}>
                <Text style={styles.bannerTitle}>Seja Membro VIP</Text>
                <Text style={styles.bannerSub}>A partir de R$ 33/mês • Cancele quando quiser</Text>
              </View>
              <View style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Ver Planos</Text>
                <ChevronRight size={14} color="#000" />
              </View>
            </LinearGradient>
          </Pressable>
        )}

        {/* Stats (só para não-membros) */}
        {!user && (
          <View style={styles.statsRow}>
            {[['2.847', 'Membros'], ['6', 'Restaurantes'], ['SP', 'Cidade']].map(([val, label]) => (
              <View key={label} style={styles.statItem}>
                <Text style={styles.statValue}>{val}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {CATEGORIES.map(cat => (
            <Pressable
              key={cat}
              style={[styles.categoryChip, cat === category && styles.categoryChipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, cat === category && styles.categoryTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Destaques */}
        {featured.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Sparkles size={16} color={Colors.dark.tint} />
              <Text style={styles.sectionTitle}>Em Destaque</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, gap: 14 }}
            >
              {featured.map((item, idx) => (
                <Pressable key={item.id} style={styles.featuredCard}>
                  <Image
                    source={{ uri: item.image || PLACEHOLDERS[idx % PLACEHOLDERS.length] }}
                    style={styles.featuredImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.85)']}
                    style={styles.featuredOverlay}
                  />
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>2x1</Text>
                  </View>
                  <Pressable
                    style={styles.featuredHeart}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      size={18}
                      color={favorites.has(item.id) ? Colors.dark.secondary : '#fff'}
                      fill={favorites.has(item.id) ? Colors.dark.secondary : 'transparent'}
                    />
                  </Pressable>
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.featuredMeta}>
                      <Text style={styles.featuredCuisine}>{item.cuisine}</Text>
                      <View style={styles.ratingPill}>
                        <Star size={11} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>4.9</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        {/* Todos os Restaurantes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {category === 'Tudo' ? 'Todos os Restaurantes' : category}
          </Text>
          <Text style={styles.sectionCount}>{filtered.length} locais</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.dark.tint} style={{ marginVertical: 30 }} />
        ) : listItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum restaurante nessa categoria ainda.</Text>
          </View>
        ) : (
          listItems.map((item, idx) => (
            <View key={item.id} style={styles.listRow}>
              <Image
                source={{ uri: item.image || PLACEHOLDERS[idx % PLACEHOLDERS.length] }}
                style={styles.listThumb}
              />
              <View style={styles.listInfo}>
                <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.listCuisine}>{item.cuisine}</Text>
                <View style={styles.listBenefitRow}>
                  <View style={styles.benefitBadge}>
                    <Text style={styles.benefitText}>2x1 disponível</Text>
                  </View>
                </View>
              </View>
              <Pressable
                style={styles.heartBtn}
                onPress={() => toggleFavorite(item.id)}
                hitSlop={8}
              >
                <Heart
                  size={20}
                  color={favorites.has(item.id) ? Colors.dark.secondary : Colors.dark.icon}
                  fill={favorites.has(item.id) ? Colors.dark.secondary : 'transparent'}
                />
              </Pressable>
            </View>
          ))
        )}

        {filtered.length > 6 && (
          <Pressable style={styles.showMoreBtn} onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.showMoreText}>Ver todos os {filtered.length} restaurantes</Text>
            <ChevronRight size={16} color={Colors.dark.tint} />
          </Pressable>
        )}
      </ScrollView>

      {/* FAB QR */}
      <View style={styles.fabContainer}>
        <LinearGradient colors={[Colors.dark.tint, '#00b360']} style={styles.fab}>
          <Pressable style={styles.fabBtn} onPress={handleQrPress}>
            <QrCode color="#000" size={26} />
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: { paddingTop: 8, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: Colors.dark.background },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, backgroundColor: 'transparent' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'transparent' },
  logo: { width: 36, height: 44 },
  greeting: { fontFamily: Typography.header, fontSize: 18, color: '#fff' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  locationText: { fontFamily: Typography.body, fontSize: 12, color: Colors.dark.icon },
  profileBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.dark.surface, borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  profileGrad: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  profileInitial: { fontFamily: Typography.header, fontSize: 18, color: '#000' },
  profileLoginText: { fontFamily: Typography.label, fontSize: 11, color: Colors.dark.tint },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, paddingHorizontal: 15, height: 46, overflow: 'hidden' },
  searchInput: { flex: 1, color: '#fff', fontFamily: Typography.body, fontSize: 14 },
  scrollContent: { paddingBottom: 120 },

  subscribeBanner: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, overflow: 'hidden' },
  bannerGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 14 },
  bannerTitle: { color: '#000', fontFamily: Typography.header, fontSize: 16 },
  bannerSub: { color: 'rgba(0,0,0,0.6)', fontFamily: Typography.body, fontSize: 12, marginTop: 2 },
  bannerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 2 },
  bannerBtnText: { color: '#000', fontFamily: Typography.header, fontSize: 13 },

  memberBanner: { marginHorizontal: 20, marginBottom: 16, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)' },
  memberBannerInner: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  memberBannerTitle: { fontFamily: Typography.header, fontSize: 14, color: Colors.dark.tint, marginBottom: 4 },
  memberBannerSub: { fontFamily: Typography.body, fontSize: 12, color: Colors.dark.icon },

  statsRow: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, backgroundColor: Colors.dark.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#222' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: Typography.header, fontSize: 20, color: Colors.dark.tint },
  statLabel: { fontFamily: Typography.body, fontSize: 11, color: Colors.dark.icon, marginTop: 2 },

  categories: { marginBottom: 20 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.dark.surface, borderWidth: 1, borderColor: '#333' },
  categoryChipActive: { backgroundColor: Colors.dark.tint, borderColor: Colors.dark.tint },
  categoryText: { color: Colors.dark.icon, fontFamily: Typography.label, fontSize: 13 },
  categoryTextActive: { color: '#000', fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 14, gap: 8 },
  sectionTitle: { fontFamily: Typography.header, fontSize: 18, color: '#fff', flex: 1 },
  sectionCount: { fontFamily: Typography.body, fontSize: 13, color: Colors.dark.icon },

  featuredCard: { width: 260, borderRadius: 20, overflow: 'hidden', marginBottom: 4 },
  featuredImage: { width: '100%', height: 170 },
  featuredOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 110 },
  featuredBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: Colors.dark.tint, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  featuredBadgeText: { color: '#000', fontFamily: Typography.header, fontSize: 11 },
  featuredHeart: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.4)', padding: 7, borderRadius: 20 },
  featuredInfo: { position: 'absolute', bottom: 14, left: 14, right: 14 },
  featuredName: { fontFamily: Typography.header, fontSize: 16, color: '#fff', marginBottom: 4 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featuredCuisine: { fontFamily: Typography.body, fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  ratingPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8, gap: 4 },
  ratingText: { color: '#FFD700', fontFamily: Typography.header, fontSize: 12 },

  listRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.dark.surface, marginHorizontal: 20, marginBottom: 10, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#222', gap: 12 },
  listThumb: { width: 68, height: 68, borderRadius: 12 },
  listInfo: { flex: 1 },
  listName: { fontFamily: Typography.header, color: '#fff', fontSize: 15, marginBottom: 3 },
  listCuisine: { fontFamily: Typography.body, color: Colors.dark.icon, fontSize: 12, marginBottom: 6 },
  listBenefitRow: { flexDirection: 'row' },
  benefitBadge: { backgroundColor: 'rgba(0,255,136,0.08)', borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  benefitText: { fontFamily: Typography.mono, fontSize: 10, color: Colors.dark.tint },
  heartBtn: { padding: 6 },

  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontFamily: Typography.body, color: Colors.dark.icon, fontSize: 14 },

  showMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 6, marginBottom: 10, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: '#333', gap: 6 },
  showMoreText: { fontFamily: Typography.label, fontSize: 14, color: Colors.dark.tint },

  fabContainer: { position: 'absolute', bottom: 28, alignSelf: 'center' },
  fab: { width: 60, height: 60, borderRadius: 30, padding: 3, elevation: 8, shadowColor: Colors.dark.tint, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12 },
  fabBtn: { flex: 1, borderRadius: 28, backgroundColor: Colors.dark.tint, alignItems: 'center', justifyContent: 'center' },
});
