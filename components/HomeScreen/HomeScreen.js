import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CoffeeList from './CoffeeList';
import Header from './Header';
import LoyaltyCard from './LoyaltyCard';

function HomeScreenContent() {
  const db = useSQLiteContext();
  const [coffees, setCoffees] = useState([]);
  const [customer, setCustomer] = useState(null);

  const fetchCustomer = async () => {
    const user = await db.getFirstAsync('SELECT name, num_badges FROM Customer WHERE id = 1');
    if (user) setCustomer(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allCoffees = await db.getAllAsync('SELECT * FROM Coffee');
      setCoffees(allCoffees);
      await fetchCustomer();
    };
    fetchData();
  }, [db]);

  const handleReset = async (num_badges) => {
    await db.runAsync('UPDATE Customer SET num_badges = ? WHERE id = 1', [num_badges]);
    await fetchCustomer();
  };

  return (
    <View style={styles.screen}>
      <Header name={customer?.name || ''} />
      <LoyaltyCard current={customer?.num_badges || 0} total={8} onReset={handleReset} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coffeeSectionContainer}>
          <Text style={styles.coffeeSectionHeader}>Today's Offers</Text>
          <CoffeeList coffees={coffees} />
        </View>
      </ScrollView>
    </View>
  );
}

export default function HomeScreen() {
  return <HomeScreenContent />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  coffeeSectionContainer: {
    backgroundColor: '#C7A17A',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#C7A17A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  coffeeSectionHeader: {
    color: '#3b2e19',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 12,
    marginLeft: 4,
  },
});
