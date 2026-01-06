import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const successImage = require('../../assets/images/OrderSuccess/success.png'); // Placeholder image

export default function OrderSuccess() {
  const router = useRouter();

  const onTrackOrder = () => {
    // @ts-ignore
    router.replace('/(tabs)/orders'); // Use replace to prevent going back to the success screen
  };

  return (
    <View style={styles.container}>
      <Image source={successImage} style={styles.image} />
      <Text style={styles.title}>Order Success</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully. For more details, go to my orders.
      </Text>
      <TouchableOpacity style={styles.trackButton} onPress={onTrackOrder}>
        <Text style={styles.trackButtonText}>Track My Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  trackButton: {
    backgroundColor: '#6E4121',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
