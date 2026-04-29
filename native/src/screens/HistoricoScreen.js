import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme";
import Header from "../components/Header";
import api from "../../service/api";
import HistoricoUso from "./MedicamentosAtuaisScreen";
import { useRoute } from "@react-navigation/native";

function CartaoHistorico({ medCad, onPress }) {
  return (
    <View style={[styles.card]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.cardRow}>
          <View style={styles.img}>
            <Ionicons name="medical" size={22} color={colors.primary} />
          </View>

          <View style={styles.info}>
            <Text style={styles.medName}>{medCad.nome_medicacao}</Text>
            <Text style={styles.medName}>{medCad.dosagem}</Text>
            <Text style={styles.medDesc}>{medCad.descricao}</Text>
            {/* <Text style={styles.medDesc}>{med.frequencia}</Text>*/}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default function HistoricoScreen() {
  const [search, setSearch] = useState("");
  const [medCad, setMedCad] = useState([]); // Iniciamos como array vazio []

  const loadRegistro = async () => {
    try {
      const response = await api.get("medicamentos");
      setMedCad(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRegistro();
  }, []);

  // Lógica de busca/filtro
  const filteredData =
    medCad.length > 0
      ? medCad.filter((item) =>
          item.nome_medicacao.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  return (
    <View style={styles.container}>
      <Header />

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

      <FlatList
        data={filteredData} // Usamos o array filtrado
        keyExtractor={(item) => String(item.id_medicacao)}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum medicamento encontrado.
          </Text>
        )}
        // Função correta para renderizar cada item
        renderItem={({ item }) => (
          <CartaoHistorico
            medCad={item}
            onPress={() => navigation.navigate("HistoricoUso")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary,
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: spacing.sm,
    marginBottom: spacing.md,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },

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

  cardRow: { flexDirection: "row", gap: spacing.md },

  img: {
    width: 70,
    height: 70,
    borderRadius: radius.sm,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  info: { flex: 1 },

  medName: {
    margin: 2,
    fontSize: 18,
    fontWeight: "500",
    color: colors.primary,
    fontStyle: "italic",
  },

  medDesc: {
    fontSize: 15,
    color: colors.text,
    marginTop: 2,
    fontWeight: "bold",
  },

  badge: {
    backgroundColor: colors.error,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 470,
  },
});
