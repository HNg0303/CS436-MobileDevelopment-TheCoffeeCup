import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const profileImage = require('../../assets/images/Profile/htrang.jpg'); // Placeholder

export default function Header({ name }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => router.push('MyCart')}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('Profile')}>
          <Image source={profileImage} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#C7A17A',
  },
  greeting: {
    fontSize: 10,
    color: '#b08b5c',
    fontWeight: '400',
    fontFamily: 'SpaceMono',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b2e19',
    marginTop: 2,
    fontFamily: 'SpaceMono',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#b08b5c',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    marginLeft: 16,
    color: '#3b2e19',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 16,
    marginLeft: 16,
    borderWidth: 2,
    borderColor: '#b08b5c',
    
  },
});