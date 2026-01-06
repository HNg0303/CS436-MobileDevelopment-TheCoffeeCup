import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyCartTotalBar({ onCheckout, onCheckoutSuccess }: { onCheckout: () => void, onCheckoutSuccess?: () => void }) {
  const db = useSQLiteContext();
  const [total, setTotal] = useState(0);

  const fetchTotal = async () => {
    const result = await db.getAllAsync('SELECT SUM(quantity * total_amount) as total FROM Orders') as any[];
    setTotal(result[0]?.total ? parseFloat(result[0].total) : 0);
  };

  useEffect(() => {
    fetchTotal();
    const interval = setInterval(fetchTotal, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const handleCheckoutPress = async () => {
    await onCheckout();
    if (onCheckoutSuccess) onCheckoutSuccess();
  };

  return (
    <View style={styles.totalBar}>
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckoutPress}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  totalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4b2e1e',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#3a2417',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#ffb366',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  checkoutText: {
    color: '#4b2e1e',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 