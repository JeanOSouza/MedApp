import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme";
import api from "../../service/api";
import Header from "../components/Header";

export default function HistoricoMedicamentoScreen({ route }) {
  const { medicamento } = route.params;

  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    loadHistorico();
  }, []);

  async function loadHistorico() {
    try {
      const response = await api.get(`/historico/${medicamento.id_medicacao}`);

      setHistorico(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Histórico - {medicamento.nome_medicacao}</Text>

      <FlatList
        data={historico}
        keyExtractor={(item) => item.id_historico.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.hora}>
              {new Date(item.data_tomada).toLocaleString()}
            </Text>

            {item.observacao && <Text>{item.observacao}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 40,
    flexGrow: 1, // Crucial para o RefreshControl funcionar
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  hora: {
    fontSize: 18,
    fontWeight: "bold",
  },

  status: {
    marginTop: 4,
    marginBottom: 4,
    color: "green",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
  },
});
