import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Logo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;
  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.iconWrapper}>
        <View style={styles.pillTop} />
        <View style={styles.pillBottom} />
      </View>
      <Text style={styles.text}>
        <Text style={{ color: colors.primary }}>Med</Text>
        <Text style={{ color: colors.secondary }}>App</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconWrapper: { width: 28, height: 36, alignItems: 'center' },
  pillTop: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.secondary },
  pillBottom: { width: 13, height: 20, borderRadius: 6, backgroundColor: colors.primary, marginTop: -4 },
  text: { fontSize: 24, fontWeight: '700' },
});
