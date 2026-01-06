import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { product_images } from '../images';

export default function HorizontalDrinkList({ type, search }: { type?: string, search?: string }) {
  const db = useSQLiteContext();
  const [drinks, setDrinks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDrinks = async () => {
      let result: any[] = [];
      if (search) {
        result = await db.getAllAsync('SELECT * FROM coffee WHERE name LIKE ? LIMIT 5', [`%${search}%`]);
      } else if (type) {
        result = await db.getAllAsync('SELECT * FROM coffee WHERE type = ?', [type]);
      }
      setDrinks(result);
    };
    fetchDrinks();
  }, [db, type, search]);

  const handlePress = (item: any) => {
    router.push({ pathname: '/Details', params: { coffeeId: item.id } });
  };

  if (!drinks.length) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.section}>
        <Text style={styles.header}>{search ? 'Search Results' : type}</Text>
        <FlatList
          data={drinks}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
              <Image source={product_images[item.name]} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
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
  price: { fontSize: 12, color: '#888' },
}); 