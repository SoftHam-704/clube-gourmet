import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      await login(email.trim().toLowerCase(), password);
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Erro ao entrar', err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>
          CLUB <Text style={{ color: Colors.dark.tint }}>EMPAR</Text>
        </Text>
        <Text style={styles.title}>Entrar na conta</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta!</Text>

        <View style={styles.inputWrap}>
          <Mail color={Colors.dark.icon} size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={Colors.dark.icon}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputWrap}>
          <Lock color={Colors.dark.icon} size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={Colors.dark.icon}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
          />
          <Pressable onPress={() => setShowPass(!showPass)} hitSlop={8}>
            {showPass
              ? <EyeOff color={Colors.dark.icon} size={18} />
              : <Eye color={Colors.dark.icon} size={18} />}
          </Pressable>
        </View>

        <Pressable style={styles.btn} onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={[Colors.dark.tint, '#00b360']}
            style={styles.btnGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isLoading
              ? <ActivityIndicator color="#000" />
              : <Text style={styles.btnText}>Entrar</Text>}
          </LinearGradient>
        </Pressable>

        <Pressable onPress={() => router.push('/signup')} style={styles.linkWrap}>
          <Text style={styles.link}>
            Não tem conta?{' '}
            <Text style={{ color: Colors.dark.tint, fontFamily: Typography.header }}>
              Criar conta grátis
            </Text>
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.linkWrap}>
          <Text style={[styles.link, { color: Colors.dark.icon }]}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  logo: {
    fontFamily: Typography.header,
    fontSize: 28,
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    fontFamily: Typography.header,
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.dark.icon,
    textAlign: 'center',
    marginBottom: 36,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: Typography.body,
    fontSize: 15,
  },
  btn: {
    height: 54,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 20,
  },
  btnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#000',
    fontFamily: Typography.header,
    fontSize: 16,
  },
  linkWrap: {
    marginBottom: 12,
  },
  link: {
    color: Colors.dark.icon,
    fontFamily: Typography.body,
    fontSize: 14,
    textAlign: 'center',
  },
});
