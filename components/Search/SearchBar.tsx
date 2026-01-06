import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#888"
      />
      <FontAwesome name="search" size={20} color="#fff" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b2e19',
    borderRadius: 24,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },
  icon: {
    marginLeft: 8,
  },
}); 