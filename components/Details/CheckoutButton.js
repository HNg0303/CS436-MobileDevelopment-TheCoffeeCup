import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CheckoutButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.checkoutBtn} onPress={onPress}>
      <Text style={styles.checkoutText}>Checkout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkoutBtn: { backgroundColor: '#6E4121', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
}); 