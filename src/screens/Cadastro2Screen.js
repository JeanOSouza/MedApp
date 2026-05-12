import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing } from '../theme';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Cadastro2Screen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [termos, setTermos] = useState(false);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoArea}><Logo /><Text style={styles.title}>Continuar seu cadastro</Text></View>
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <Input label="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <TouchableOpacity style={styles.termsRow} onPress={() => setTermos(!termos)}>
          <View style={[styles.checkbox, termos && styles.checked]} />
          <Text style={styles.termsText}>Concordo com os Termos e a Política de Privacidade.</Text>
        </TouchableOpacity>
        <Button title="Finalizar cadastro" onPress={() => navigation.navigate('MainTabs')} style={{ marginBottom: spacing.md }} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginRow}>
          <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.link}>Iniciar sessão</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: spacing.lg },
  logoArea: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  title: { fontSize: 18, fontWeight: '700', color: colors.secondary, fontStyle: 'italic' },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: spacing.lg },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: colors.secondary, borderRadius: 3, marginTop: 2 },
  checked: { backgroundColor: colors.secondary },
  termsText: { flex: 1, fontSize: 12, color: colors.secondary },
  loginRow: { alignItems: 'center' },
  loginText: { fontSize: 13, color: colors.textLight },
  link: { color: colors.secondary, fontWeight: '600' },
});
