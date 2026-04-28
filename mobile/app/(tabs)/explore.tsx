import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Search, Star, MapPin } from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { API_URL } from '@/utils/api';

const CATEGORIES = ['Tudo', 'Japonesa', 'Italiana', 'Churrasco', 'Francesa', 'Vegano', 'Brasileira', 'Árabe'];

const PLACEHOLDER = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop';

export default function ExploreScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tudo');

  useEffect(() => {
    fetch(`${API_URL}/api/restaurants`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRestaurants(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <BlurView intensity={30} style={styles.searchBar}>
          <Search color={Colors.dark.icon} size={17} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Buscar restaurante ou cozinha..."
            placeholderTextColor={Colors.dark.icon}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
        </BlurView>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {CATEGORIES.map(cat => (
          <Pressable
            key={cat}
            style={[styles.chip, cat === category && styles.chipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.chipText, cat === category && styles.chipTextActive]}>
              {cat}
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
        >
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nenhum restaurante encontrado</Text>
              <Text style={styles.emptyDesc}>Tente outros termos ou categorias.</Text>
            </View>
          ) : (
            filtered.map(item => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{ uri: item.image || PLACEHOLDER }}
                  style={styles.cardImage}
                />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2x1</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardCuisine}>{item.cuisine || 'Gastronomia'}</Text>
                    {item.city_slug && (
                      <View style={styles.cityRow}>
                        <MapPin size={11} color={Colors.dark.icon} />
                        <Text style={styles.cityText}>{item.city_slug.toUpperCase()}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.rating}>
                    <Star size={13} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                    <Text style={styles.ratingCount}>(142)</Text>
                  </View>
                </View>
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
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 26,
    color: '#fff',
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: Typography.body,
    fontSize: 14,
  },
  chips: {
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: '#333',
  },
  chipActive: {
    backgroundColor: Colors.dark.tint,
    borderColor: Colors.dark.tint,
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
    paddingBottom: 100,
    gap: 14,
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 12,
  },
  cardBody: {
    padding: 14,
  },
  cardName: {
    fontFamily: Typography.header,
    fontSize: 17,
    color: '#fff',
    marginBottom: 6,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardCuisine: {
    fontFamily: Typography.label,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cityText: {
    fontFamily: Typography.mono,
    fontSize: 11,
    color: Colors.dark.icon,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontFamily: Typography.header,
    fontSize: 13,
  },
  ratingCount: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyTitle: {
    fontFamily: Typography.header,
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  emptyDesc: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
  },
});
