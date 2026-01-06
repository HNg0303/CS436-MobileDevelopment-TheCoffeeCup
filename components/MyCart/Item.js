import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { product_images } from '../images';

function RightAction({ progress, dragX, onDelete }) {
  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value + 60 }],
  }));

  return (
    <Reanimated.View style={[styles.deleteBtn, styleAnimation]}>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.trashIcon}>🗑️</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

export default function Item({ order, onDeleted, onQuantityChange }) {
  const db = useSQLiteContext();

  const handleDelete = async () => {
    await db.runAsync('DELETE FROM Orders WHERE id = ?', [order.id]);
    if (onDeleted) onDeleted();
  };

  const handleIncrease = () => {
    onQuantityChange(order.id, order.quantity + 1);
  };

  const handleDecrease = () => {
    if (order.quantity > 1) {
      onQuantityChange(order.id, order.quantity - 1);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReanimatedSwipeable
        renderRightActions={(progress, dragX) => (
          <RightAction progress={progress} dragX={dragX} onDelete={handleDelete} />
        )}
        rightThreshold={40}
        friction={2}
        containerStyle={styles.swipeable}
        overshootRight={false}
      >
        <View style={styles.itemContainer}>
          <Image source={product_images[order.name]} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{order.name} - {order.size.toUpperCase()}</Text>
            <Text style={styles.price}>${order.total_amount.toFixed(2)}</Text>
            <Text style={styles.custom}>{order.shot} | {order.ice} | {order.sel}</Text>
          </View>
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={handleDecrease} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.qty}>{order.quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4b2e1e',
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
  },
  image: { width: 48, height: 48, borderRadius: 8, marginRight: 12 },
  imagePlaceholder: { width: 48, height: 48, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
  info: { flex: 1 },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  price: { color: '#ffb366', fontWeight: 'bold', fontSize: 14 },
  custom: { color: '#fff', fontSize: 12 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6d4c41', borderRadius: 8, padding: 4, marginHorizontal: 8 },
  qty: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginHorizontal: 8 },
  qtyBtn: { backgroundColor: '#a1887f', borderRadius: 8, padding: 4, marginHorizontal: 2 },
  qtyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  deleteBtn: { backgroundColor: '#c0392b', borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 60, height: '95%', marginVertical: 4 },
  trashIcon: { fontSize: 28, color: '#fff', textAlign: 'center' },
  swipeable: {
    // optional: style for the swipeable container
  },
});
