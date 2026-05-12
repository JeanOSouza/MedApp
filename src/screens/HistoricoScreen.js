import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';
import Header from '../components/Header';

export default function HistoricoScreen() {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Histórico de medicamentos</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput style={styles.searchInput} placeholder="Pesquisar medicamento" placeholderTextColor={colors.textMuted} value={search} onChangeText={setSearch} />
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.img}><Ionicons name="medical" size={22} color={colors.primary} /></View>
            <View style={styles.info}>
              <Text style={styles.medName}>Losartana 50mg</Text>
              <Text style={styles.medDesc}>Para tratamento de{'\n'}pressão alta</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Atrasado</Text></View>
            </View>
          </View>
        </View>
        {[{ date: '23 Mar', time: '16:00', status: 'tomado' }, { date: '24 Mar', time: '16:00', status: 'adiado' }].map((d, i) => (
          <View key={i} style={styles.doseCard}>
            <View style={styles.img}><Ionicons name="medical" size={18} color={colors.primary} /></View>
            <View style={styles.doseMeta}>
              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={12} color={colors.textLight} />
                <Text style={styles.metaText}>{d.date}</Text>
                <Ionicons name="time-outline" size={12} color={colors.textLight} />
                <Text style={styles.metaText}>{d.time}</Text>
              </View>
              <Text style={styles.doseStatus}>{d.status === 'tomado' ? 'Tomado na hora' : 'Adiado'}</Text>
            </View>
            <View style={[styles.statusIcon, d.status === 'tomado' ? styles.iconGreen : styles.iconGray]}>
              {d.status === 'tomado' ? <Ionicons name="checkmark" size={14} color="#fff" /> : <View style={styles.dot} />}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  title: { fontSize: 18, fontWeight: '700', color: colors.secondary, fontStyle: 'italic', marginBottom: spacing.md },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.full, paddingHorizontal: spacing.md, height: 44, gap: spacing.sm, marginBottom: spacing.md, elevation: 2 },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  card: { backgroundColor: colors.cardBlue, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.sm },
  img: { width: 46, height: 46, borderRadius: radius.sm, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  medName: { fontSize: 13, fontWeight: '700', color: colors.primary, fontStyle: 'italic' },
  medDesc: { fontSize: 12, color: colors.text, marginTop: 2 },
  badge: { backgroundColor: colors.error, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  doseCard: { backgroundColor: colors.cardBlue, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  doseMeta: { flex: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  metaText: { fontSize: 12, color: colors.textLight },
  doseStatus: { fontSize: 13, fontWeight: '600', color: colors.text },
  statusIcon: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  iconGreen: { backgroundColor: colors.secondary },
  iconGray: { backgroundColor: colors.border },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textMuted },
});
