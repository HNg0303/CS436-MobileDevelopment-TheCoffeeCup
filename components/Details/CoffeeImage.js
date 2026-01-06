import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function CoffeeImage({ image }) {
  return image ? (
    <Image source={image} style={styles.image} resizeMode="contain" />
  ) : (
    <View style={styles.imagePlaceholder} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },imagePlaceholder: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#eee',
    flex: 1,
  },
}); 