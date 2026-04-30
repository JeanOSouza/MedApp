import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";
import Logo from "./Logo";

export default function Header() {
  return (
    <View style={styles.container}>
      <Logo size="md" />
      <View style={styles.right}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    paddingTop: 45,
  },
  right: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
