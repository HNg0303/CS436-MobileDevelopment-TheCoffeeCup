import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoyaltyBadge from './LoyaltyBadge';

function RewardsContent() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [customer, setCustomer] = useState({ loyalty_points: 0, num_badges: 0 });
  const [history, setHistory] = useState([]);

  const fetchCustomer = async () => {
    const customerData = await db.getFirstAsync('SELECT loyalty_points, num_badges FROM Customer WHERE id = 1');
    if (customerData) setCustomer(customerData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCustomer();
      // Fetch rewards history
      const historyData = await db.getAllAsync(`
        SELECT oh.id, c.name, c.points, oh.completed_at
        FROM OrderHistory oh
        JOIN Coffee c ON oh.coffee_id = c.id
        WHERE oh.status = 'completed' AND oh.customer_id = 1
        ORDER BY oh.completed_at DESC
      `);
      setHistory(historyData);
    };
    fetchData();
  }, [db]);

  const handleReset = async (num_badges) => {
    await db.runAsync('UPDATE Customer SET num_badges = ? WHERE id = 1', [num_badges]);
    await fetchCustomer();
  };

  const onRedeem = () => {
    router.push({ pathname: '/Redeem', params: { loyaltyPoints: customer.loyalty_points } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>
      <LoyaltyBadge current={customer.num_badges} total={8} onReset={handleReset} />
      <View style={styles.pointsCard}>
        <View>
          <Text style={styles.pointsLabel}>My Points:</Text>
          <Text style={styles.pointsValue}>{customer.loyalty_points}</Text>
        </View>
        <TouchableOpacity style={styles.redeemButton} onPress={onRedeem}>
          <Text style={styles.redeemButtonText}>Redeem drinks</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.historyHeader}>History Rewards</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyItemName}>{item.name}</Text>
              <Text style={styles.historyItemDate}>{new Date(item.completed_at).toLocaleString()}</Text>
            </View>
            <Text style={styles.historyItemPoints}>+ {item.points} Pts</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function RewardsScreen() {
  return <RewardsContent />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingHorizontal: 16, paddingTop: 48 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#222' },
  pointsCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#C7A17A', borderRadius: 12, padding: 24, marginVertical: 16 },
  pointsLabel: { color: '#fff', fontSize: 16 },
  pointsValue: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  redeemButton: { backgroundColor: '#6E4121', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16 },
  redeemButtonText: { color: '#fff', fontWeight: 'bold' },
  historyHeader: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  historyItemName: { fontSize: 16, color: '#222' },
  historyItemDate: { fontSize: 12, color: '#888' },
  historyItemPoints: { fontSize: 16, fontWeight: 'bold', color: '#3b4c58' },
}); 