import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BONUS_POINTS = 50; // Points awarded when loyalty card is full

const OngoingOrder = () => {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<any[]>([]);
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [justCompletedOrders, setJustCompletedOrders] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(5); // 5 seconds countdown for all orders
  const countdownRef = React.useRef<any>(null);

  const fetchOrders = async () => {
    // Join OrderHistory with Customer and Coffee for pending orders
    const ongoing = await db.getAllAsync(`
      SELECT oh.id, oh.completed_at, oh.total_amount, c.name as coffeeName, c.type as coffeeType, cust.address
      FROM OrderHistory oh
      JOIN Coffee c ON oh.coffee_id = c.id
      JOIN Customer cust ON oh.customer_id = cust.id
      WHERE oh.status = 'pending'
      ORDER BY oh.completed_at DESC
    `);
    setOrders(ongoing);
    setCountdown(5); // Reset countdown when orders are fetched
  };

  useEffect(() => {
    fetchOrders(); // Only on mount or after status update
  }, [db]);

  useEffect(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [orders.length]);

  useEffect(() => {
    if (countdown === 0 && orders.length > 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  const handleTimeout = async () => {
    const pendingOrders: any[] = await db.getAllAsync("SELECT * FROM OrderHistory WHERE status = 'pending'");
    if (pendingOrders.length > 0) {
      await db.runAsync("UPDATE OrderHistory SET status = 'completed' WHERE status = 'pending'");

      const customerId = 1; // Assuming customer id = 1
      let pointsEarned = 0;
      for (const order of pendingOrders) {
        const coffee: any = await db.getFirstAsync("SELECT points FROM Coffee WHERE id = ?", [order.coffee_id]);
        if (coffee && coffee.points) {
          pointsEarned += coffee.points * order.quantity;
        }
      }

      const customer: any = await db.getFirstAsync("SELECT loyalty_points, num_badges FROM Customer WHERE id = ?", [customerId]);
      if (customer) {
        const newBadges = customer.num_badges + pendingOrders.length;
        const newTotalPoints = customer.loyalty_points + pointsEarned;
        await db.runAsync("UPDATE Customer SET loyalty_points = ?, num_badges = ? WHERE id = ?", [newTotalPoints, newBadges, customerId]);
      }

      setJustCompletedOrders(pendingOrders);
      setCompletedModalVisible(true);
      setOrders([]); // All orders are completed, so clear the list
    }
    setCountdown(5); // Reset countdown after timeout
  };

  const handleCloseModal = () => {
    setCompletedModalVisible(false);
    setJustCompletedOrders([]);
    setCountdown(5); // Reset countdown when modal closes
    // No need to fetchOrders() here
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Modal to block interaction during countdown */}
      {orders.length > 0 && (
        <Modal
          visible={true}
          transparent
          animationType="none"
          onRequestClose={() => {}}
        >
          <View style={styles.blockingModalOverlay}>
            <View style={styles.countdownClock}>
              <Text style={styles.countdownText}>Processing Orders ⏰ {countdown}s</Text>
            </View>
          </View>
        </Modal>
      )}
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
        <Text style={styles.placeholder}>No ongoing orders.</Text>
      )}
      <Modal
        visible={completedModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Completed! Please check history</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={handleCloseModal}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', width: 300 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  completedOrderText: { fontSize: 16, color: '#222', marginBottom: 8 },
  countdownText: { color: '#b26a00', fontWeight: 'bold', fontSize: 16 },
  countdownClock: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  blockingModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  closeBtn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default OngoingOrder; 