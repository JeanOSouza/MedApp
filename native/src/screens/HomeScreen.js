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
import * as Notifications from "expo-notifications";

// --- CONFIGURAÇÃO DE NOTIFICAÇÕES ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function MedCard({ med, onDelete, onCheck, proximaDose, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("DescricaoRemedio", {
          medicamento: med,
        })
      }
    >
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
    </TouchableOpacity>
  );
}

// --- COMPONENTE DO CARD DE HISTÓRICO (TOMADOS) ---
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

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState("ativos");
  const [search, setSearch] = useState("");
  const [meds, setMeds] = useState([]);
  const [hist, setHist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // --- LÓGICA DE NOTIFICAÇÕES (AGENDAMENTO) ---
  async function solicitarPermissoes() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Aviso",
        "Ative as notificações para não esquecer seus remédios.",
      );
    }
  }

  async function agendarLembretes(listaMedicamentos) {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      if (!listaMedicamentos || listaMedicamentos.length === 0) return;

      for (const item of listaMedicamentos) {
        // 1. Pega a frequência (ex: 1, 4, 8) e converte para número
        const freqHoras = parseInt(item.frequencia) || 8;

        // 2. Define a data de referência (se for null, usa 'agora')
        const dataBruta = item.primeiraDose || item.dataInicio || new Date();
        let dataProximaDose = new Date(dataBruta);

        const agora = new Date();

        // Agendamos as próximas 3 doses
        for (let i = 0; i < 3; i++) {
          // LÓGICA DE INTERVALO:
          // Se a dose calculada já passou (ou é agora), somamos o intervalo
          // Isso garante que não agendamos notificações no passado
          while (dataProximaDose <= agora) {
            // milissegundos = horas * 60 min * 60 seg * 1000 ms
            const milissegundosDeIntervalo = freqHoras * 60 * 60 * 1000;
            dataProximaDose = new Date(
              dataProximaDose.getTime() + milissegundosDeIntervalo,
            );
          }

          await Notifications.scheduleNotificationAsync({
            content: {
              title: `💊 Hora do Remédio: ${item.nome_medicacao}`,
              body: `Dosagem: ${item.dosagem}`,
              sound: true,
              priority: "max",
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: dataProximaDose.getTime(),
              channelId: "default",
            },
          });

          console.log(
            `Dose ${i + 1} de ${item.nome_medicacao} agendada para: ${dataProximaDose.toLocaleString()}`,
          );

          // Prepara a base para a próxima dose no loop
          dataProximaDose = new Date(
            dataProximaDose.getTime() + freqHoras * 60 * 60 * 1000,
          );
        }
      }

      setTimeout(async () => {
        const agendados =
          await Notifications.getAllScheduledNotificationsAsync();
        console.log(
          `✓ SUCESSO: ${agendados.length} doses agendadas com intervalo de ${listaMedicamentos[0].frequencia}h.`,
        );
      }, 2000);
    } catch (e) {
      console.log("Erro no agendamento:", e);
    }
  }

  // --- CÁLCULO DE EXIBIÇÃO DA PRÓXIMA DOSE ---
  const getProximaDose = (medicamento) => {
    if (!medicamento || !medicamento.frequencia) return "---";

    const ultimaTomada = hist.find(
      (h) => String(h.id_medicacao) === String(medicamento.id_medicacao),
    );
    let dataReferencia = ultimaTomada
      ? new Date(ultimaTomada.data_tomada)
      : new Date(medicamento.primeiraDose || medicamento.dataInicio);

    const horasParaAdicionar = parseInt(medicamento.frequencia);
    const proximaDoseData = new Date(
      dataReferencia.getTime() + horasParaAdicionar * 60 * 60 * 1000,
    );

    const agora = new Date();
    const eHoje =
      proximaDoseData.toLocaleDateString() === agora.toLocaleDateString();

    return proximaDoseData.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      day: eHoje ? undefined : "2-digit",
      month: eHoje ? undefined : "2-digit",
    });
  };

  // --- CARREGAMENTO DE DADOS ---
  const loadMedicacoes = async () => {
    try {
      const response = await api.get("medicamentos");
      setMeds(response.data);
      if (response.data.length > 0) agendarLembretes(response.data);
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
    solicitarPermissoes();
    onRefresh();
  }, []);

  // --- AÇÕES ---
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
                navigation={navigation}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
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
  tabText: { fontSize: 13, fontWeight: "700", color: colors.textLight },
  tabTextActive: { color: "#fff" },
  card: {
    backgroundColor: colors.cardBlue,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardHL: { borderLeftWidth: 4, borderLeftColor: colors.secondary },
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
