import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import Logo from './Logo';

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity><Ionicons name="menu" size={24} color={colors.primary} /></TouchableOpacity>
      <Logo size="sm" />
      <View style={styles.right}>
        <TouchableOpacity><Ionicons name="notifications-outline" size={22} color={colors.primary} /></TouchableOpacity>
        <View style={styles.avatar}><Ionicons name="person" size={14} color="#fff" /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.background },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
});
