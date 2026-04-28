import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Tabs, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, Search, Heart, User, QrCode } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

function QrTabButton({ children, onPress }: any) {
  return (
    <Pressable
      onPress={() => router.push('/qrcode')}
      style={styles.qrOuter}
    >
      <LinearGradient
        colors={[Colors.dark.tint, '#00b360']}
        style={styles.qrGrad}
      >
        <QrCode color="#000" size={26} />
      </LinearGradient>
    </Pressable>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d0d0d',
          borderTopColor: '#1a1a1a',
          borderTopWidth: 1,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarButton: (props) => <QrTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  qrOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -18,
    width: 64,
    height: 64,
  },
  qrGrad: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
