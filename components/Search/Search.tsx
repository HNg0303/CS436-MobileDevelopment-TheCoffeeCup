import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FavouriteOrders from './FavouriteOrders';
import HorizontalDrinkList from './HorizontalDrinkList';
import SearchBar from './SearchBar';
import YouMayLike from './YouMayLike';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {search ? (
          <HorizontalDrinkList search={search} />
        ) : (
          <>
            <FavouriteOrders />
            <YouMayLike />
            <HorizontalDrinkList type="Coffee" />
            <HorizontalDrinkList type="Milktea" />
            <HorizontalDrinkList type="Tea" />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingTop: 24 },
}); 