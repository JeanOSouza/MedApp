// Logo.js corrigido
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Logo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;
  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.iconWrapper}>
        {/* Pílula completa usando overflow: hidden para criar o efeito diagonal */}
        <View style={styles.pill}>
          {/* Metade de cima: verde escuro à esquerda + verde claro à direita */}
          <View style={styles.topHalf}>
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
          </View>
          {/* Metade de baixo: azul sólido */}
          <View style={styles.bottomHalf} />
        </View>
      </View>
      <Text style={styles.text}>
        <Text style={{ color: colors.primary }}>Med</Text>
        <Text style={{ color: colors.secondary }}>App</Text>
      </Text>
    </View>
  );
}

const PILL_W = 28;
const PILL_H = 48;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  iconWrapper: { width: PILL_W, height: PILL_H },

  // A pílula inteira com overflow hidden para recortar os cantos
  pill: {
    width: PILL_W,
    height: PILL_H,
    borderRadius: PILL_W / 2,
    overflow: 'hidden',
  },

  // Metade superior (verde escuro + verde claro lado a lado)
  topHalf: {
    width: PILL_W,
    height: PILL_H / 2,
    flexDirection: 'row',
  },
  topLeft: {
    flex: 1,
    backgroundColor: '#1DB954', // verde escuro
  },
  topRight: {
    flex: 1,
    backgroundColor: '#90EFC5', // verde claro
  },

  // Metade inferior (azul)
  bottomHalf: {
    width: PILL_W,
    height: PILL_H / 2,
    backgroundColor: '#1A5FBF', // azul
  },

  text: { fontSize: 22, fontWeight: '700' },
});