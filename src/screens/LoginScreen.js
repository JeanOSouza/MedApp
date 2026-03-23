import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing } from '../theme';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('luslene22@gmail.com');
  const [senha, setSenha] = useState('**********');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoArea}>
          <Logo />
          <Text style={styles.subtitle}>Gerencie seus medicamentos{'\n'}com facilidade.</Text>
        </View>
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <TouchableOpacity style={styles.forgotRow}>
          <Text style={styles.forgot}>Esqueceu a senha</Text>
        </TouchableOpacity>
        <Button title="Entrar" onPress={() => navigation.navigate('MainTabs')} />
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.registerRow}>
          <Text style={styles.registerText}>Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.md },
  logoArea: { alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  subtitle: { fontSize: 16, fontWeight: '600', color: colors.secondary, textAlign: 'center', fontStyle: 'italic', lineHeight: 22 },
  forgotRow: { alignItems: 'flex-end', marginBottom: spacing.lg, marginTop: -spacing.sm },
  forgot: { color: colors.secondary, fontSize: 13, fontStyle: 'italic' },
  registerRow: { alignItems: 'center', marginTop: spacing.sm },
  registerText: { fontSize: 13, color: colors.textLight },
  link: { color: colors.secondary, fontWeight: '600' },
});
