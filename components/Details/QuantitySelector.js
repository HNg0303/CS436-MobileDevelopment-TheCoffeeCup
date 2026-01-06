import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.qtyWrap}>
        <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
        <Text style={styles.qtyNum}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  label: { fontSize: 16, color: '#001833', fontWeight: '500' },
  qtyWrap: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { padding: 8, borderWidth: 1, borderColor: '#2C3A47', borderRadius: 8, marginHorizontal: 4 },
  qtyNum: { fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center' },
}); 