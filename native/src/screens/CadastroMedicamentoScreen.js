import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importações do projeto
import api from "../../service/api";
import { colors, spacing } from "../theme";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

export default function CadastroMedicamentoScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [uso, setUso] = useState(""); // Ex: 500mg
  const [horario, setHorario] = useState(""); // Ex: 08:00
  const [tempo, setTempo] = useState(""); // Ex: 8 em 8 horas
  const [dataInicio, setDataInicio] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    // 1. Validação básica
    if (!nome || !horario || !dataInicio) {
      Alert.alert("Erro", "Nome, Horário e Data de Início são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      // 2. Recuperar o Token do usuário logado
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        navigation.navigate("Login");
        return;
      }

      // 3. Enviar para o backend
      const response = await api.post(
        "/medicamentos",
        {
          nome_medicacao: nome,
          dosagem: uso,
          descricao: descricao,
          inicio_medicacao: dataInicio,
          // Se o seu backend exigir horário e frequência separados, envie aqui
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Envia o token de segurança
        },
      );

      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
      navigation.goBack(); // Volta para a Home/Listagem
    } catch (error) {
      console.log(
        "Erro ao salvar medicamento:",
        error.response?.data || error.message,
      );
      Alert.alert("Erro", "Não foi possível salvar o medicamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Cadastro de Medicamentos</Text>

        <Input
          label="Nome do medicamento:"
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Amoxicilina"
        />

        <Input
          label="Descrição (Opcional):"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Tomar após o almoço"
        />

        <Input
          label="Dosagem (Uso):"
          value={uso}
          onChangeText={setUso}
          placeholder="Ex: 500mg ou 1 comprimido"
        />

        <Input
          label="Horário da dosagem:"
          value={horario}
          onChangeText={setHorario}
          placeholder="Ex: 08:00"
        />

        <Input
          label="Frequência / Intervalo:"
          value={tempo}
          onChangeText={setTempo}
          placeholder="Ex: 8 em 8 horas"
        />

        <Input
          label="Data de início:"
          value={dataInicio}
          onChangeText={setDataInicio}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
        />

        {loading ? (
          <ActivityIndicator
            color={colors.secondary}
            style={{ marginTop: spacing.md }}
          />
        ) : (
          <Button
            title="Salvar Medicamento"
            onPress={handleSalvar}
            style={{ marginTop: spacing.md }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: spacing.lg },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.secondary,
    fontStyle: "italic",
    marginBottom: spacing.lg,
    textAlign: "center",
  },
});
