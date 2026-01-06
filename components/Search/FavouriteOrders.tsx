import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { product_images } from '../images';

export default function FavouriteOrders() {
  const db = useSQLiteContext();
  const [favourites, setFavourites] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFavourites = async () => {
      const result = await db.getAllAsync(`
        SELECT c.*, COUNT(oh.id) as order_count
        FROM OrderHistory oh
        JOIN Coffee c ON oh.coffee_id = c.id
        WHERE oh.customer_id = 1 AND oh.status = 'completed'
        GROUP BY oh.coffee_id
        ORDER BY order_count DESC
        LIMIT 5
      `);
      setFavourites(result);
    };
    fetchFavourites();
  }, [db]);

  const handlePress = (item: any) => {
    router.push({ pathname: '/Details', params: { coffeeId: item.id } });
  };

  if (!favourites.length) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.section}>
        <Text style={styles.header}>Your Favourite Orders</Text>
        <FlatList
          data={favourites}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
              <Image source={product_images[item.name]} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.count}>{item.order_count} orders</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: '#C7A17A', borderRadius: 20, marginHorizontal: 12, marginTop: 12, padding: 8 },
  section: { marginTop: 0, marginBottom: 0 },
  header: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, marginBottom: 8, color: '#3b2e19' },
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 8, padding: 12, alignItems: 'center', width: 120, borderWidth: 2, borderColor: '#C7A17A' },
  image: { width: 60, height: 60, borderRadius: 12, marginBottom: 8 },
  name: { fontWeight: 'bold', fontSize: 12, color: '#3b2e19' },
  count: { fontSize: 12, color: '#888' },
}); 