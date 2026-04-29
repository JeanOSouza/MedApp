import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { colors, spacing } from "../theme";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Header from "../components/Header";

const racaOpts = [
  { value: "branca", label: "Branca" },
  { value: "parda", label: "Parda" },
  { value: "preta", label: "Preta" },
  { value: "amarela", label: "Amarela" },
];
const generoOpts = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
];

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [raca, setRaca] = useState("");
  const [genero, setGenero] = useState("");
  const [termos, setTermos] = useState(false);

  const handleNextStep = () => {
    if (!nome || !data || !raca || !genero) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar.");
      return;
    }
    if (!termos) {
      Alert.alert("Erro", "Você deve aceitar os termos de uso.");
      return;
    }

    // Passando os dados para a próxima tela
    navigation.navigate("Cadastro2", {
      formData: { nome, data, raca, genero },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoArea}>
          <Logo />
          <Text style={styles.title}>Faça seu cadastro</Text>
        </View>

        <Input
          label="Nome completo"
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: João Silva"
        />

        <Input
          label="Data de nascimento"
          value={data}
          onChangeText={setData}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
        />

        <Select
          label="Cor/ raça"
          value={raca}
          options={racaOpts}
          onSelect={setRaca}
        />

        <Select
          label="Gênero"
          value={genero}
          options={generoOpts}
          onSelect={setGenero}
        />

        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setTermos(!termos)}
        >
          <View style={[styles.checkbox, termos && styles.checked]} />
          <Text style={styles.termsText}>
            Concordo com os Termos e a Política de Privacidade.
          </Text>
        </TouchableOpacity>

        <Button
          title="Próximo passo"
          onPress={handleNextStep}
          style={{ marginBottom: spacing.md }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginRow}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.link}>Iniciar sessão</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, fontSize: 20, },
  scroll: { flexGrow: 1, padding: spacing.lg },
  logoArea: { alignItems: "center", marginBottom: spacing.lg, gap: spacing.sm, padding: 25 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.secondary,
    fontStyle: "italic",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 3,
    marginTop: 2,
  },
  checked: { backgroundColor: colors.secondary },
  termsText: { flex: 1, fontSize: 15, color: colors.secondary },
  loginRow: { alignItems: "center" },
  loginText: { fontSize: 15, color: colors.textLight },
  link: { color: colors.secondary, fontWeight: "600" },
});
