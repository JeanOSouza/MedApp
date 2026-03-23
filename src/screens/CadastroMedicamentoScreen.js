import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing } from '../theme';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CadastroMedicamentoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [uso, setUso] = useState('');
  const [horario, setHorario] = useState('');
  const [tempo, setTempo] = useState('');
  const [dataInicio, setDataInicio] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cadastro de Medicamentos</Text>
        <Input label="Nome do medicamento:" value={nome} onChangeText={setNome} />
        <Input label="Uso diário:" value={uso} onChangeText={setUso} />
        <Input label="Horário da dosagem:" value={horario} onChangeText={setHorario} />
        <Input label="Tempo para a próxima dosagem:" value={tempo} onChangeText={setTempo} />
        <Input label="Data de inicio:" value={dataInicio} onChangeText={setDataInicio} keyboardType="numeric" />
        <Button title="Salvar Medicamento" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: spacing.lg },
  title: { fontSize: 20, fontWeight: '700', color: colors.secondary, fontStyle: 'italic', marginBottom: spacing.lg, textAlign: 'center' },
});
