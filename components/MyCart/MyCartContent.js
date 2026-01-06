import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Item from './Item';

function MyCartContent({ params, clearOnCheckout }) {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState([]);
  const insertedRef = useRef(false);

  // Fetch orders and join with Coffee to get name and image
  const fetchOrders = async () => {
    const result = await db.getAllAsync(`
      SELECT Orders.*, Coffee.name
      FROM Orders
      JOIN Coffee ON Orders.coffee_id = Coffee.id
      ORDER BY Orders.id DESC
    `);
    setOrders(result);
  };

  useEffect(() => {
    // Insert new order if params exist and not already inserted
    if (
      params.coffeeId &&
      !insertedRef.current &&
      params.quantity &&
      params.totalPrice
    ) {
      insertedRef.current = true;
      db.runAsync(
        'INSERT INTO Orders (customer_id, coffee_id, order_date, total_amount, quantity, shot, size, ice, sel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          1, // dummy customer_id
          Number(params.coffeeId),
          new Date().toISOString(),
          Number(params.totalPrice),
          Number(params.quantity),
          params.shot || '',
          params.size || '',
          params.ice || '',
          params.select || '',
        ]
      )
      .then(fetchOrders)
      .catch(e => { console.log('Insert error', e, params); fetchOrders(); });
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleted = () => {
    fetchOrders();
  };

  const handleQuantityChange = async (id, newQty) => {
    if (newQty < 1) return;
    await db.runAsync('UPDATE Orders SET quantity = ? WHERE id = ?', [newQty, id]);
    fetchOrders();
  };

  // Clear orders from state (used after checkout)
  useEffect(() => {
    if (clearOnCheckout) setOrders([]);
  }, [clearOnCheckout]);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Item
            order={item}
            onDeleted={handleDeleted}
            onQuantityChange={handleQuantityChange}
          />
        )}
      />
    </View>
  );
}

export default MyCartContent;

const styles = StyleSheet.create({
  container: { flex: 1,},
}); 