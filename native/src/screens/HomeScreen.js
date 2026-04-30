import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import api from "../../service/api";

// --- COMPONENTE DO CARD ---
function MedCard({ med, onDelete, onCheck, proximaDose }) {
  return (
    <View style={[styles.card, med.status === "atrasado" && styles.cardHL]}>
      <View style={styles.cardRow}>
        <View style={styles.img}>
          <Ionicons name="medical" size={22} color={colors.primary} />
        </View>

        <View style={styles.info}>
          <Text style={styles.medName}>{med.nome_medicacao}</Text>
          <Text style={styles.medDesc}>
            {med.dosagem} - {med.descricao}
          </Text>

          {/* Exibindo a Próxima Dose calculada */}
          <Text
            style={[
              styles.medDesc,
              {
                fontWeight: "500",
                color: "#255803",
                textAlign: "left",
              },
            ]}
          >
            Próxima: {proximaDose}
          </Text>

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

function Tomados({ hist, med }) {
  const dataObjeto = hist.data_tomada ? new Date(hist.data_tomada) : new Date();
  const hora = dataObjeto.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dia = dataObjeto.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.medName}>{med.nome_medicacao}</Text>
        <Text style={styles.medDesc}>
          Tomado em: {dia} às {hora}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [tab, setTab] = useState("ativos");
  const [search, setSearch] = useState("");
  const [meds, setMeds] = useState([]);
  const [hist, setHist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getProximaDose = (medicamento) => {
    if (!medicamento || !medicamento.frequencia) {
      return "---";
    }

    // 1. Procurar a última vez que este medicamento aparece no histórico
    // Assumindo que o histórico vem ordenado do mais recente para o mais antigo
    const ultimaTomada = hist.find(
      (h) => String(h.id_medicacao) === String(medicamento.id_medicacao),
    );

    let dataReferencia;

    if (ultimaTomada && ultimaTomada.data_tomada) {
      // Se encontrou no histórico, calcula a partir da data que foi tomado
      dataReferencia = new Date(ultimaTomada.data_tomada);
    } else if (medicamento.inicio_medicacao) {
      // Se nunca foi tomado, usa a data de início definida no cadastro
      dataReferencia = new Date(medicamento.inicio_medicacao);
    } else {
      return "Não iniciou";
    }

    try {
      // 2. Adiciona a frequência (em horas) à data de referência
      const horasParaAdicionar = parseInt(medicamento.frequencia);
      const proximaDoseData = new Date(
        dataReferencia.getTime() + horasParaAdicionar * 60 * 60 * 1000,
      );

      // 3. Formata a exibição
      const agora = new Date();
      const eHoje =
        proximaDoseData.toLocaleDateString() === agora.toLocaleDateString();

      return proximaDoseData.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        day: eHoje ? undefined : "2-digit",
        month: eHoje ? undefined : "2-digit",
      });
    } catch (error) {
      console.log("Erro no cálculo:", error);
      return "---";
    }
  };

  const loadMedicacoes = async () => {
    try {
      const response = await api.get("medicamentos");
      setMeds(response.data);
    } catch (error) {
      console.log("Erro meds:", error);
    }
  };

  const loadHistorico = async () => {
    try {
      const response = await api.get("historico/todos");
      setHist(response.data);
    } catch (error) {
      console.log("Erro hist:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadMedicacoes(), loadHistorico()]);
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  async function marcarComoTomado(id) {
    try {
      await api.post(`/medicamentosHist/${id}`);
      Alert.alert("Sucesso", "Dose registrada!");
      onRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function deletarMedicacao(id) {
    Alert.alert("Excluir", "Deseja excluir?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          await api.delete(`/medicamentosApagar/${id}`);
          loadMedicacoes();
        },
      },
    ]);
  }

  const filteredMeds = meds.filter((m) =>
    m.nome_medicacao?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Header />

      {/* Busca e Tabs (Omitidos aqui para brevidade, mantenha os seus) */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
            TOMADOS
          </Text>
        </TouchableOpacity>
      </View>

      <ScreenWrapper refreshing={refreshing} onRefreshAction={onRefresh}>
        {tab === "ativos"
          ? filteredMeds.map((item) => (
              <MedCard
                key={item.id_medicacao}
                med={item}
                onDelete={deletarMedicacao}
                onCheck={marcarComoTomado}
                proximaDose={getProximaDose(item)}
              />
            ))
          : hist.map((item) => {
              const dadosMed = meds.find(
                (m) => String(m.id_medicacao) === String(item.id_medicacao),
              );
              return (
                <Tomados
                  key={item.id_historico}
                  hist={item}
                  med={dadosMed || { nome_medicacao: "Removido" }}
                />
              );
            })}
      </ScreenWrapper>
    </View>
  );
}

// ... (Mantenha seus styles originais)
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

  addBtn: {
    alignContent: "center",
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
