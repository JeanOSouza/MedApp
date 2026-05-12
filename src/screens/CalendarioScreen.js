import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';

const DIAS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const SEMANAS = [[null,null,null,1,2,3,4],[5,6,7,8,9,10,11],[12,13,14,15,16,17,18],[19,20,21,22,23,24,25],[26,27,28,29,30,null,null]];
const HORARIOS = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM'];

export default function CalendarioScreen({ navigation }) {
  const [dia, setDia] = useState(30);
  const [hora, setHora] = useState('10:00 AM');

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.cal}>
          <View style={styles.mesRow}>
            <Text style={styles.mes}>Junho 2026</Text>
            <View style={styles.nav}>
              <TouchableOpacity><Ionicons name="chevron-back" size={18} color={colors.primary} /></TouchableOpacity>
              <TouchableOpacity><Ionicons name="chevron-forward" size={18} color={colors.primary} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.diasHeader}>
            {DIAS.map(d => <Text key={d} style={styles.diaHeader}>{d}</Text>)}
          </View>
          {SEMANAS.map((sem, si) => (
            <View key={si} style={styles.semana}>
              {sem.map((d, di) => (
                <TouchableOpacity key={di} style={[styles.diaCell, d === dia && styles.diaCellActive]} onPress={() => d && setDia(d)}>
                  <Text style={[styles.diaText, d === dia && styles.diaTextActive, !d && { color: 'transparent' }]}>{d || ''}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Selecionar o Horário</Text>
        <View style={styles.horasGrid}>
          {HORARIOS.map(h => (
            <TouchableOpacity key={h} style={[styles.horaSlot, h === hora && styles.horaActive]} onPress={() => setHora(h)}>
              <Text style={[styles.horaText, h === hora && styles.horaTextActive]}>{h}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Salvar" onPress={() => navigation.goBack()} style={{ marginBottom: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, paddingHorizontal: spacing.md },
  cal: { backgroundColor: '#fff', borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.lg },
  mesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  mes: { fontSize: 15, fontWeight: '700', color: colors.primary },
  nav: { flexDirection: 'row', gap: 8 },
  diasHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.xs },
  diaHeader: { width: 36, textAlign: 'center', fontSize: 12, color: colors.textLight, fontWeight: '600' },
  semana: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
  diaCell: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  diaCellActive: { backgroundColor: colors.primary },
  diaText: { fontSize: 13, color: colors.text },
  diaTextActive: { color: '#fff', fontWeight: '700' },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: spacing.md },
  horasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  horaSlot: { backgroundColor: '#fff', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, minWidth: 90, alignItems: 'center', elevation: 1 },
  horaActive: { backgroundColor: colors.primary },
  horaText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  horaTextActive: { color: '#fff' },
});
