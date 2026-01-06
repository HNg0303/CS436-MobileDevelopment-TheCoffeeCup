import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartPreviewPopover({ visible, onClose }) {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!visible) return;
    const fetchOrders = async () => {
      const result = await db.getAllAsync(`
        SELECT Orders.*, Coffee.name
        FROM Orders
        JOIN Coffee ON Orders.coffee_id = Coffee.id
        ORDER BY Orders.id DESC
      `);
      setOrders(result);
    };
    fetchOrders();
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.popover}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cart Preview</Text>
        <TouchableOpacity onPress={onClose}><Text style={styles.closeBtn}>×</Text></TouchableOpacity>
      </View>
      {orders.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>x{item.quantity}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
    top: 48,
    right: 8,
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 12,
    zIndex: 1000,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  closeBtn: { fontSize: 20, color: '#888', paddingHorizontal: 8 },
  empty: { color: '#888', textAlign: 'center', marginVertical: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  itemName: { fontSize: 15 },
  itemQty: { fontSize: 15, fontWeight: 'bold' },
}); 