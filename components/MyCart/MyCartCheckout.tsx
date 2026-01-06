import { SQLiteDatabase } from 'expo-sqlite';
import { Alert } from 'react-native';

export async function handleCheckout(db: SQLiteDatabase, onCheckoutSuccess?: () => void): Promise<void> {
  // Check for existing pending orders
  const pendingOrders = await db.getAllAsync("SELECT * FROM OrderHistory WHERE status = 'pending'");
  if (pendingOrders.length > 0) {
    Alert.alert('Pending Order', 'You already have a pending order. Please wait until it is processed before placing a new order.');
    return;
  }

  // Get all current orders from Orders table
  const orders = await db.getAllAsync('SELECT * FROM Orders');
  const now = new Date().toISOString();

  // Insert each order into OrderHistory with status 'pending'
  for (const order of orders) {
    const o = order as any;
    await db.runAsync(
      `INSERT INTO OrderHistory (customer_id, coffee_id, quantity, total_amount, completed_at, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        o.customer_id,
        o.coffee_id,
        o.quantity,
        o.total_amount,
        now,
        'pending',
      ]
    );
  }

  // Clear Orders table
  await db.runAsync('DELETE FROM Orders');
  Alert.alert('Order placed!');

  // Navigate to Orders page if callback provided
  if (onCheckoutSuccess) onCheckoutSuccess();
} 