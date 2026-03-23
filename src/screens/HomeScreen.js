import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';
import Header from '../components/Header';

const meds = [
  { id: '1', name: 'Losartana 50mg', desc: 'Para tratamento de\npressão alta', status: 'atrasado', date: '23 Mar', time: '16:00' },
  { id: '2', name: 'Metformina, uso diario', desc: 'USO: Diabetes (Tipo 1 e 2): Metformina\nPróxima dose: ⏰ 22:00', date: '23 Mar', time: '16:00' },
];

function MedCard({ med }) {
  return (
    <View style={[styles.card, med.status === 'atrasado' && styles.cardHL]}>
      <View style={styles.cardRow}>
        <View style={styles.img}><Ionicons name="medical" size={22} color={colors.primary} /></View>
        <View style={styles.info}>
          <Text style={styles.medName}>{med.name}</Text>
          <Text style={styles.medDesc}>{med.desc}</Text>
          {med.status === 'atrasado' && <View style={styles.badge}><Text style={styles.badgeText}>Atrasado</Text></View>}
          {med.date && (
            <View style={styles.meta}>
              <Ionicons name="calendar-outline" size={12} color={colors.textLight} />
              <Text style={styles.metaText}>{med.date}</Text>
              <Ionicons name="time-outline" size={12} color={colors.textLight} />
              <Text style={styles.metaText}>{med.time}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnGreen}><Ionicons name="checkmark" size={16} color="#fff" /></TouchableOpacity>
        <TouchableOpacity style={styles.btnRed}><Ionicons name="close" size={16} color="#fff" /></TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [tab, setTab] = useState('ativos');
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.locRow}>
          <Ionicons name="location-outline" size={15} color={colors.primary} />
          <Text style={styles.locText}>Viçosa</Text>
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput style={styles.searchInput} placeholder="Pesquisar medicamento" placeholderTextColor={colors.textMuted} value={search} onChangeText={setSearch} />
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, tab === 'ativos' && styles.tabActive]} onPress={() => setTab('ativos')}>
            <Text style={[styles.tabText, tab === 'ativos' && styles.tabTextActive]}>ATIVOS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'tomados' && styles.tabActive]} onPress={() => setTab('tomados')}>
            <Text style={[styles.tabText, tab === 'tomados' && styles.tabTextActive]}>TOMADOS</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionLabel}>Recentes</Text>
        {meds.map(m => <MedCard key={m.id} med={m} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: spacing.sm },
  locText: { fontSize: 13, color: colors.primary, fontWeight: '500' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.full, paddingHorizontal: spacing.md, height: 44, gap: spacing.sm, marginBottom: spacing.md, elevation: 2 },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  tabs: { flexDirection: 'row', backgroundColor: colors.cardBlue, borderRadius: radius.full, padding: 4, marginBottom: spacing.md },
  tab: { flex: 1, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: radius.full },
  tabActive: { backgroundColor: colors.secondary },
  tabText: { fontSize: 13, fontWeight: '700', color: colors.textLight },
  tabTextActive: { color: '#fff' },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  card: { backgroundColor: colors.cardBlue, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm },
  cardHL: { borderLeftWidth: 4, borderLeftColor: colors.secondary },
  cardRow: { flexDirection: 'row', gap: spacing.sm },
  img: { width: 46, height: 46, borderRadius: radius.sm, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  medName: { fontSize: 13, fontWeight: '700', color: colors.primary, fontStyle: 'italic' },
  medDesc: { fontSize: 12, color: colors.text, marginTop: 2 },
  badge: { backgroundColor: colors.error, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText: { fontSize: 11, color: colors.textLight },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, justifyContent: 'flex-end' },
  btnGreen: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
  btnRed: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center' },
});
