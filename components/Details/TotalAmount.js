import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TotalAmount({ total }) {
  return (
    <View style={styles.totalRow}>
      <Text style={styles.totalLabel}>Total Amount</Text>
      <Text style={styles.totalValue}>${total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  totalLabel: { fontSize: 18, color: '#2C3A47', fontWeight: 'bold' },
  totalValue: { fontSize: 18, color: '#2C3A47', fontWeight: 'bold' },
}); 