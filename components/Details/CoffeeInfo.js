import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function CoffeeInfo({ name, description }) {
  return (
    <>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
} 

const styles = StyleSheet.create({
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    marginTop: 4,
    color: '#2C3A47',
    fontWeight: 'bold',
    alignItems: 'center'
  },
  description: {
    fontSize: 14, 
    color: '#555', 
    marginBottom: 4
  }
})