import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { QrCode, ShieldCheck, X } from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function QrCodeScreen() {
  const { user } = useAuth();

  const memberId = user?.id
    ? `EMPAR-${user.id.slice(0, 8).toUpperCase()}`
    : 'EMPAR-????????';

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeBtn} onPress={() => router.back()}>
        <X color={Colors.dark.icon} size={22} />
      </Pressable>

      <Text style={styles.title}>Seu QR de Membro</Text>
      <Text style={styles.subtitle}>
        Apresente este código ao atendente do restaurante parceiro.
      </Text>

      <LinearGradient
        colors={['rgba(0,255,136,0.08)', 'rgba(0,255,136,0.02)']}
        style={styles.card}
      >
        <View style={styles.qrPlaceholder}>
          <QrCode color={Colors.dark.tint} size={120} strokeWidth={1.2} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.memberLabel}>Número de Membro</Text>
        <Text style={styles.memberId}>{memberId}</Text>

        {user && (
          <>
            <Text style={styles.nameLabel}>{user.name}</Text>
            <Text style={styles.emailLabel}>{user.email}</Text>
          </>
        )}
      </LinearGradient>

      <View style={styles.secureRow}>
        <ShieldCheck size={14} color={Colors.dark.icon} />
        <Text style={styles.secureText}>
          Código exclusivo e intransferível. Válido apenas para o titular.
        </Text>
      </View>

      <Text style={styles.hint}>
        Dica: apresente junto a um documento de identidade.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    backgroundColor: Colors.dark.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.25)',
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  memberLabel: {
    fontFamily: Typography.label,
    fontSize: 11,
    color: Colors.dark.icon,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  memberId: {
    fontFamily: Typography.mono,
    fontSize: 22,
    color: Colors.dark.tint,
    letterSpacing: 2,
    marginBottom: 12,
  },
  nameLabel: {
    fontFamily: Typography.header,
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  emailLabel: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Colors.dark.icon,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 10,
    gap: 6,
  },
  secureText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Colors.dark.icon,
    flex: 1,
  },
  hint: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
  },
});
