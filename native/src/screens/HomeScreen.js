import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper"
import api from "../../service/api";

function MedCard({ med, onDelete, onCheck }) {
  return (
    <View style={[styles.card, med.status === "atrasado" && styles.cardHL]}>
      <View style={styles.cardRow}>
        <View style={styles.img}>
          <Ionicons name="medical" size={22} color={colors.primary} />
        </View>

        <View style={styles.info}>
          <Text style={styles.medName}>{med.nome_medicacao}</Text>
          <Text style={styles.medName}>{med.dosagem}</Text>
          <Text style={styles.medDesc}>{med.descricao}</Text>
          {/* <Text style={styles.medDesc}>{med.frequencia}</Text>*/}
          {med.status === "atrasado" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Atrasado</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnGreen}
          onPress={() => onCheck(med.id_medicacao)}
        >
          <Ionicons name="checkmark" size={16} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRed}
          onPress={() => onDelete(med.id_medicacao)}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Função que busca os dados no banco (Sequelize/SQLite)
 const atualizarTudo = async () => {
    console.log("Atualizando dados do app...");
    await Promise.all([
      loadMedicacoes(),
      loadHistorico()
    ]);
  };

function Tomados({ hist, med }) {
  const dataObjeto = hist.data_tomada ? new Date(hist.data_tomada) : new Date();
  const dataValida = !isNaN(dataObjeto.getTime());
  const hora = dataValida
    ? dataObjeto.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";
  const dia = dataValida
    ? dataObjeto.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })
    : "00/00";
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.info}>
          <Text style={styles.medName}>{med.nome_medicacao}</Text>
          <Text style={styles.medDesc}>
            Tomado em : {dia} às {hora}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [tab, setTab] = useState("ativos");
  const [search, setSearch] = useState("");
  const [meds, setMeds] = useState([]);
  const [hist, setHist] = useState([]);

  const loadMedicacoes = async () => {
    try {
      const response = await api.get("medicamentos");
      setMeds(response.data);
    } catch (error) {
      console.log("Erro ao buscar medicamentos:", error);
    }
  };
  useEffect(() => {
    loadMedicacoes();
    medicamentosTomados();
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    try {
      const response = await api.get("historico/todos");
      console.log("Dados Carregados:", response.data);
      setHist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const medicamentosTomados = async () => {
    try {
      const response = await api.get("historico/todos");
      setHist(response.data);
    } catch (error) {
      console.log("Erro ao buscar dosagens:", error);
    }
  };
  useEffect(() => {
    if (tab === "tomados") {
      medicamentosTomados();
    }
  }, []);

  async function marcarComoTomado(id) {
    try {
      await api.post(`/medicamentosHist/${id}`);

      Alert.alert("Sucesso");
      await loadMedicacoes();

      const resHist = await api.get("medicamentos");
      setHist(resHist.data);

      if (tab === "tomados") {
        const response = await api.get("historico/todos");
        setHist(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deletarMedicacao(id) {
    Alert.alert("Excluir", "Deseja excluir este medicamento?", [
      { text: "Cancelar" },
      {
        text: "Sim",
        onPress: async () => {
          try {
            // Use CRASE (`) para que o ${id} funcione corretamente
            await api.delete(`/medicamentosApagar/${id}`);
            loadMedicacoes(); // Recarrega a lista após apagar
          } catch (error) {
            console.log(
              "Erro ao deletar:",
              error.response?.data || error.message,
            );
          }
        },
      },
    ]);
  }
  // 🔍 Filtro para a aba de histórico
  const ultimosTomados = meds.filter((m) => {
    // Verifica se existe algum registro no array 'hist' para este medicamento
    const jaFoiTomado = hist.some((h) => h.id_medicacao === m.id_medicacao);

    const matchesSearch = m.nome_medicacao
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return jaFoiTomado && matchesSearch;
  });

  // 🔍 filtro + busca
  const filteredMeds = meds.filter((m) =>
    m.nome_medicacao?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Header />

      {/* Localização */}
      <View style={styles.locRow}>
        <Ionicons name="location-outline" size={15} color={colors.primary} />
        <Text style={styles.locText}>Viçosa</Text>
      </View>

      {/* Busca */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar medicamento"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "ativos" && styles.tabActive]}
          onPress={() => setTab("ativos")}
        >
          <Text
            style={[styles.tabText, tab === "ativos" && styles.tabTextActive]}
          >
            ATIVOS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === "tomados" && styles.tabActive]}
          onPress={() => setTab("tomados")}
        >
          <Text
            style={[styles.tabText, tab === "tomados" && styles.tabTextActive]}
          >
            TOMADO
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <ScreenWrapper onRefreshAction={atualizarTudo}>

      <FlatList
        data={tab === "ativos" ? filteredMeds : hist}
        keyExtractor={(item) => String(item.id_historico || item.id_medicacao)}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: colors.textMuted }}>
              Nao há medicamentos {tab === "ativos" ? "cadastrados" : "tomados"}
              .
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          if (tab === "ativos") {
            return (
              <MedCard
              med={item}
              onDelete={deletarMedicacao}
              onCheck={marcarComoTomado}
              />
            );
          } else {
            const dadosMed = meds.find(
              (m) => String(m.id_medicacao) === String(item.id_medicacao),
            );
            
            return (
              <Tomados
              hist={item}
              med={
                dadosMed || {
                  nome_medicacao: "Medicamento não encontrado...",
                }
              }
              />
            );
          }
        }}
      />
 </ScreenWrapper>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  locRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: spacing.sm,
  },

  locText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "500",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 46,
    gap: spacing.sm,
    marginBottom: 20,
    marginTop: 10,
    elevation: 2,
  },

  searchInput: { flex: 1, fontSize: 14, color: colors.text },

  tabs: {
    flexDirection: "row",
    backgroundColor: colors.cardBlue,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.md,
  },

  tab: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
  },

  tabActive: { backgroundColor: colors.secondary },

  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textLight,
  },

  tabTextActive: { color: "#fff" },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },

  card: {
    backgroundColor: colors.cardBlue,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  cardHL: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },

  cardRow: { flexDirection: "row", gap: spacing.sm },

  img: {
    width: 46,
    height: 46,
    borderRadius: radius.sm,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  info: { flex: 1 },

  medName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
    fontStyle: "italic",
  },

  medDesc: { fontSize: 14, color: colors.text, marginTop: 2 },

  badge: {
    backgroundColor: colors.error,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 4,
  },

  badgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  actions: {
    flexDirection: "row",
    gap: spacing.lg,
    marginTop: spacing.lg,
    justifyContent: "flex-end",
  },

  btnGreen: {
    width: 100,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  btnRed: {
    width: 100,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
});
