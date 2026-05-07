import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, Star, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react-native';
import { useFocusEffect } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { API_URL } from '@/utils/api';

const CATEGORIES = [
  { label: 'Tudo', emoji: '🍽️' },
  { label: 'Japonesa', emoji: '🍱' },
  { label: 'Italiana', emoji: '🍝' },
  { label: 'Churrasco', emoji: '🥩' },
  { label: 'Francesa', emoji: '🥂' },
  { label: 'Vegano', emoji: '🥗' },
  { label: 'Brasileira', emoji: '🇧🇷' },
  { label: 'Árabe', emoji: '🫔' },
];

const PLACEHOLDER = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop';

export default function ExploreScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tudo');

  const load = useCallback(async () => {
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

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const filtered = useMemo(() => {
    return restaurants.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        r.name?.toLowerCase().includes(q) ||
        r.cuisine?.toLowerCase().includes(q) ||
        r.address?.toLowerCase().includes(q);
      const matchCat = category === 'Tudo' ||
        r.cuisine?.toLowerCase().includes(category.toLowerCase());
      return matchSearch && matchCat;
    });
  }, [restaurants, search, category]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.title}>Explorar</Text>
            <Text style={styles.subtitle}>
              {loading ? 'Carregando...' : `${restaurants.length} restaurantes disponíveis`}
            </Text>
          </View>
          <View style={styles.filterBtn}>
            <SlidersHorizontal size={17} color={Colors.dark.tint} />
          </View>
        </View>

        <BlurView intensity={30} style={styles.searchBar}>
          <Search color={Colors.dark.icon} size={17} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Buscar por nome, culinária..."
            placeholderTextColor={Colors.dark.icon}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          )}
        </BlurView>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      >
        {CATEGORIES.map(cat => (
          <Pressable
            key={cat.label}
            style={[styles.chip, cat.label === category && styles.chipActive]}
            onPress={() => setCategory(cat.label)}
          >
            <Text style={styles.chipEmoji}>{cat.emoji}</Text>
            <Text style={[styles.chipText, cat.label === category && styles.chipTextActive]}>
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.dark.tint} style={{ marginTop: 60 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.dark.tint} />
          }
        >
          {search.length > 0 && (
            <View style={styles.resultHeader}>
              <Text style={styles.resultText}>
                {filtered.length === 0
                  ? 'Nenhum resultado para '
                  : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para `}
                <Text style={{ color: Colors.dark.tint }}>"{search}"</Text>
              </Text>
            </View>
          )}

          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>Nada encontrado</Text>
              <Text style={styles.emptyDesc}>
                Tente outros termos ou mude de categoria.
              </Text>
              <Pressable style={styles.resetBtn} onPress={() => { setSearch(''); setCategory('Tudo'); }}>
                <Text style={styles.resetBtnText}>Limpar filtros</Text>
              </Pressable>
            </View>
          ) : (
            filtered.map(item => (
              <Pressable key={item.id} style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image || PLACEHOLDER }}
                    style={styles.cardImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.imageOverlay}
                  />
                  {/* Badges */}
                  <View style={styles.badgesRow}>
                    <View style={styles.benefitBadge}>
                      <Text style={styles.benefitBadgeText}>2x1</Text>
                    </View>
                    {item.highlighted && (
                      <View style={styles.highlightBadge}>
                        <Sparkles size={10} color={Colors.dark.tint} />
                        <Text style={styles.highlightBadgeText}>Destaque</Text>
                      </View>
                    )}
                  </View>
                  {/* Rating pill on image */}
                  <View style={styles.ratingOverlay}>
                    <Star size={11} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                    {item.city_slug && (
                      <View style={styles.cityRow}>
                        <MapPin size={11} color={Colors.dark.icon} />
                        <Text style={styles.cityText}>{item.city_slug.replace('-', ' ').toUpperCase()}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardCuisine}>{item.cuisine || 'Gastronomia'}</Text>
                  {item.description && (
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
                  )}
                </View>
              </Pressable>
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
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
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
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: Typography.body,
    fontSize: 14,
  },
  clearBtn: {
    color: Colors.dark.icon,
    fontFamily: Typography.label,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  chipsScroll: {
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    gap: 6,
  },
  chipActive: {
    backgroundColor: Colors.dark.tint,
    borderColor: Colors.dark.tint,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipText: {
    color: Colors.dark.icon,
    fontFamily: Typography.label,
    fontSize: 13,
  },
  chipTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 16,
  },
  resultHeader: {
    marginBottom: 4,
  },
  resultText: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 190,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  badgesRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 6,
  },
  benefitBadge: {
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  benefitBadgeText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 12,
  },
  highlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.3)',
  },
  highlightBadgeText: {
    color: Colors.dark.tint,
    fontFamily: Typography.label,
    fontSize: 11,
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFD700',
    fontFamily: Typography.header,
    fontSize: 12,
  },
  cardBody: {
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardName: {
    fontFamily: Typography.header,
    fontSize: 17,
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cityText: {
    fontFamily: Typography.mono,
    fontSize: 10,
    color: Colors.dark.icon,
  },
  cardCuisine: {
    fontFamily: Typography.label,
    fontSize: 12,
    color: Colors.dark.tint,
    marginBottom: 6,
  },
  cardDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    lineHeight: 19,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 48,
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
  },
  resetBtn: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  resetBtnText: {
    color: Colors.dark.tint,
    fontFamily: Typography.label,
    fontSize: 14,
  },
});
