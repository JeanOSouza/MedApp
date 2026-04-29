import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme";
import Header from "../components/Header";

export default function MedicamentosAtuaisScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Medicamentos Atuais</Text>
        <View style={styles.card}>
          <View style={styles.img}>
            <Ionicons name="medical" size={28} color="#fff" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>Insulina 100 UI/mL</Text>
            <Text style={styles.uso}>Uso:</Text>
            <Text style={styles.desc}>
              Controle da glicemia em pacientes com...
            </Text>
            <Text style={styles.tipo}>Uso contínuo</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.secondary,
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
  },
  img: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "700", color: "#fff", marginBottom: 4 },
  uso: { fontSize: 12, color: "rgba(255,255,255,0.7)" },
  desc: { fontSize: 12, color: "rgba(255,255,255,0.9)", lineHeight: 18 },
  tipo: { fontSize: 12, color: colors.accent, marginTop: 4, fontWeight: "600" },
});
