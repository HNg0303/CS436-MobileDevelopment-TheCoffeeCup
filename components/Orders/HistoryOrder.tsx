import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const HistoryOrder = () => {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    // Join OrderHistory with Customer and Coffee
    const completed = await db.getAllAsync(`
      SELECT oh.id, oh.completed_at, oh.total_amount, c.name as coffeeName, c.type as coffeeType, cust.address
      FROM OrderHistory oh
      JOIN Coffee c ON oh.coffee_id = c.id
      JOIN Customer cust ON oh.customer_id = cust.id
      WHERE oh.status = 'completed'
      ORDER BY oh.completed_at DESC
    `);
    setOrders(completed);
  };

  useEffect(() => {
    fetchOrders();
  }, [db]);

  return (
    <View style={{ flex: 1 }}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.orderItem}>
              <View style={styles.row}>
                <Text style={styles.date}>{formatDate(item.completed_at)}</Text>
                <Text style={styles.price}>${item.total_amount?.toFixed(2) ?? '0.00'}</Text>
              </View>
              <View style={styles.row}>
                <MaterialCommunityIcons name="coffee" size={18} color="#90A4AE" style={{ marginRight: 4 }} />
                <Text style={styles.coffee}>{item.coffeeName} <Text style={styles.coffeeType}>({item.coffeeType})</Text></Text>
              </View>
              <View style={styles.row}>
                <MaterialCommunityIcons name="map-marker" size={18} color="#90A4AE" style={{ marginRight: 4 }} />
                <Text style={styles.address}>{item.address}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.placeholder}>No order history yet.</Text>
      )}
    </View>
  );
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' | ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

const styles = StyleSheet.create({
  orderItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  date: { color: '#B0BEC5', fontSize: 13, flex: 1 },
  price: { color: '#263238', fontWeight: 'bold', fontSize: 16 },
  coffee: { color: '#263238', fontSize: 15, fontWeight: '500' },
  coffeeType: { color: '#90A4AE', fontSize: 14, fontWeight: '400' },
  address: { color: '#607D8B', fontSize: 13, flexShrink: 1 },
  placeholder: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 32 },
});

export default HistoryOrder; 