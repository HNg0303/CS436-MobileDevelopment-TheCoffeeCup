import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image source={require('../../assets/images/Theme/coffee_cupp.png')} style={styles.cup} />
          <Text style={styles.title}>Coffee Shop</Text>
          <Text style={styles.desc}>
            Welcome to the Coffee Cup App !
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleStart} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6B3A1B',
  },
  container: {
    flex: 1,
    backgroundColor: '#6B3A1B',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  cup: {
    width: 140,
    height: 140,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 0,
    marginBottom: 32,
    maxWidth: 350,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 18,
    width: '100%',
    marginBottom: 32,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#6B3A1B',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});