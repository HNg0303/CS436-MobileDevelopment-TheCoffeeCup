import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { product_images } from '../images';

function RedeemContent() {
  const db = useSQLiteContext();
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialPoints = params.loyaltyPoints ? Number(params.loyaltyPoints) : 0;
  const [rewards, setRewards] = useState<any[]>([]);
  const [customerPoints, setCustomerPoints] = useState(initialPoints);
  const [modalVisible, setModalVisible] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState<any>(null);

  const fetchData = async () => {
    // Join Rewards with Coffee for image and name
    const rewardsData = await db.getAllAsync(`
      SELECT r.*, c.name as coffeeName
      FROM Rewards r
      JOIN Coffee c ON r.coffee_id = c.id
    `);
    setRewards(rewardsData);

    // Only fetch points if not provided by params
    if (!params.loyaltyPoints) {
      const customerData: any = await db.getFirstAsync('SELECT loyalty_points FROM Customer WHERE id = 1');
      if (customerData) {
        setCustomerPoints(customerData.loyalty_points);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [db]);

  const handleRedeem = async (reward: any) => {
    if (customerPoints < reward.points_required) {
      Alert.alert('Redemption Failed', 'You do not have enough points to redeem this item.');
      return;
    }
    setRedeemedReward(reward);
    setModalVisible(true);
  };

  const confirmRedeem = async () => {
    if (!redeemedReward) return;
    // Deduct points
    const newPoints = customerPoints - redeemedReward.points_required;
    await db.runAsync('UPDATE Customer SET loyalty_points = ? WHERE id = 1', [newPoints]);
    // Insert into Orders with amount 0
    await db.runAsync(
      'INSERT INTO Orders (customer_id, coffee_id, quantity, total_amount, order_date, shot, size, ice, sel) VALUES (?, ?, ?, ?, datetime("now"), ?, ?, ?, ?)',
      [1, redeemedReward.coffee_id, 1, 0, 'single', 'small', '25%', 'hot']
    );
    setModalVisible(false);
    setRedeemedReward(null);
    fetchData();
    // Navigate to cart
    router.replace('/MyCart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>{'<--'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Redeem</Text>
      </View>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const canRedeem = customerPoints >= item.points_required;
          return (
            <View style={styles.rewardItem}>
              <Image source={product_images[item.coffeeName] || require('../../assets/images/Redeem/redeem.png')} style={styles.rewardImage} />
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardName}>{item.coffeeName}</Text>
                <Text style={styles.rewardDesc}>Valid until 05.07.25</Text>
              </View>
              <TouchableOpacity
                style={[styles.redeemButton, !canRedeem && styles.disabledButton]}
                onPress={() => handleRedeem(item)}
                disabled={!canRedeem}
              >
                <Text style={styles.redeemButtonText}>{item.points_required} pts</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Redeem successfully!</Text>
            <Text style={styles.modalText}>Check your cart for your reward.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={confirmRedeem}>
              <Text style={styles.modalButtonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function RedeemScreen() {
  return <RedeemContent />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 48 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
  backButton: { fontSize: 24, color: '#222' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#222', marginLeft: 16 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  rewardImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  rewardInfo: { flex: 1 },
  rewardName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  rewardDesc: { fontSize: 14, color: '#888', marginTop: 4 },
  redeemButton: { backgroundColor: '#3b4c58', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16 },
  disabledButton: { backgroundColor: '#cccccc' },
  redeemButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', width: 280 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#3b4c58' },
  modalText: { fontSize: 16, color: '#222', marginBottom: 20 },
  modalButton: { backgroundColor: '#3b4c58', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 24 },
  modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 