import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Image, 
  Pressable, 
  TextInput,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Search, 
  User, 
  MapPin, 
  Star, 
  LayoutGrid,
  Heart,
  QrCode
} from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';

const CATEGORIES = ['Tudo', 'Japonesa', 'Italiana', 'Churrasco', 'Vegano'];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>CLUB <Text style={{ color: Colors.dark.tint }}>EMPAR</Text></Text>
          <Pressable style={styles.profileBtn}>
            <User color={Colors.dark.text} size={20} />
          </Pressable>
        </View>
        
        {/* Search Bar */}
        <BlurView intensity={30} style={styles.searchContainer}>
          <Search color={Colors.dark.icon} size={18} style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Buscar restaurante..."
            placeholderTextColor={Colors.dark.icon}
            style={styles.searchInput}
          />
        </BlurView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map((cat, i) => (
            <Pressable 
              key={cat} 
              style={[
                styles.categoryChip, 
                i === 0 && { backgroundColor: Colors.dark.tint }
              ]}
            >
              <Text style={[
                styles.categoryText,
                i === 0 && { color: '#000', fontWeight: 'bold' }
              ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Restaurantes Próximos</Text>
        
        {/* Horizontal Restaurant Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalGrid}>
          {[1, 2, 3].map((item) => (
            <Pressable key={item} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image 
                  source={{ uri: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop` }} 
                  style={styles.cardImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.imageOverlay}
                />
                <View style={styles.badge2x1}>
                  <Text style={styles.badgeText}>2x1</Text>
                </View>
              </View>
              
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>Oma Patissier</Text>
                <View style={styles.cardSub}>
                  <Text style={styles.cardType}>Japonesa • $$$</Text>
                  <View style={styles.rating}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Novidades</Text>
        
        {/* Vertical Items */}
        {[1, 2].map((item) => (
          <View key={item} style={styles.listRow}>
             <Image 
              source={{ uri: `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop` }} 
              style={styles.listThumb} 
            />
            <View style={styles.listInfo}>
              <Text style={styles.listName}>Bar Shisido</Text>
              <Text style={styles.listDesc}>Coquetelaria Autoral</Text>
            </View>
            <Heart size={20} color={Colors.dark.secondary} />
          </View>
        ))}
      </ScrollView>

      {/* Floating QR Button */}
      <View style={styles.fabContainer}>
         <LinearGradient
            colors={[Colors.dark.tint, '#00b360']}
            style={styles.fab}
          >
            <Pressable style={styles.fabBtn}>
              <QrCode color="#000" size={28} />
            </Pressable>
          </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.dark.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
    letterSpacing: 1,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontFamily: Typography.body,
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  categories: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.surface,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryText: {
    color: '#fff',
    fontFamily: Typography.label,
    fontSize: 13,
  },
  sectionTitle: {
    fontFamily: Typography.header,
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  horizontalGrid: {
    paddingLeft: 20,
  },
  card: {
    width: 280,
    marginRight: 15,
    backgroundColor: 'transparent',
  },
  cardImageContainer: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  badge2x1: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 12,
  },
  cardInfo: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  cardName: {
    fontFamily: Typography.header,
    fontSize: 16,
    color: '#fff',
  },
  cardSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'transparent',
  },
  cardType: {
    fontFamily: Typography.label,
    color: Colors.dark.icon,
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  listThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  listInfo: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: 'transparent',
  },
  listName: {
    fontFamily: Typography.header,
    color: '#fff',
    fontSize: 16,
  },
  listDesc: {
    fontFamily: Typography.body,
    color: Colors.dark.icon,
    fontSize: 12,
    marginTop: 2,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 3,
    elevation: 8,
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fabBtn: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: Colors.dark.tint,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
