import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { product_images } from '../images';



const AUTO_SCROLL_INTERVAL = 8000;

// Custom hook to fetch coffees from database
export function useCoffees() {
  const db = useSQLiteContext();
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        setLoading(true);
        const result = await db.getAllAsync('SELECT * FROM Coffee');
        setCoffees(result || []);
      } catch (error) {
        console.error('Error fetching coffees:', error);
        setCoffees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCoffees();
  }, [db]);

  return { coffees, loading };
}

export default function CoffeeList({ coffees: coffeesProp, onSelect }) {
  // Use prop if provided, otherwise fetch
  const { coffees: fetchedCoffees, loading } = useCoffees();
  const coffees = coffeesProp ?? fetchedCoffees;
  const isLoading = coffeesProp ? false : loading;
  const router = useRouter();
  
  // Extract unique types from the coffee list
  const types = Array.from(new Set((coffees || []).map(item => item.type)));
  const [currentTypeIdx, setCurrentTypeIdx] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentTypeIdx >= types.length) {
      setCurrentTypeIdx(0);
    }
  }, [types, currentTypeIdx]);

  // Auto-scroll between types
  useEffect(() => {
    if (types.length < 2) return;
    const interval = setInterval(() => {
      setCurrentTypeIdx(idx => {
        const nextIdx = (idx + 1) % types.length;
        return nextIdx;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [types]);

  // Scroll to selected type when changed
  useEffect(() => {
    if (scrollRef.current && types.length > 0 && currentTypeIdx < types.length) {
      scrollRef.current.scrollToIndex({ index: currentTypeIdx, animated: true });
    }
  }, [currentTypeIdx, types]);

  const onAddToCart = (coffee) => {
    router.push({ pathname: 'Details', params: {coffeeId: coffee.id} });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading coffees...</Text>
      </View>
    );
  }

  if (!types.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No coffees available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.typeButtons}>
        {types.map((type, idx) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, idx === currentTypeIdx && styles.activeTypeButton]}
            onPress={() => setCurrentTypeIdx(idx)}
          >
            <Text style={[styles.typeButtonText, idx === currentTypeIdx && styles.activeTypeButtonText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.horizontalScrollWrap}>
        {/* Render 2x2 grid for selected type */}
        {types.length > 0 && (
          (() => {
            const items = coffees.filter(item => item.type === types[currentTypeIdx]).slice(0, 4);
            const row1 = items.slice(0, 2);
            const row2 = items.slice(2, 4);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.categoryTitle}>{types[currentTypeIdx]}</Text>
                <View style={styles.grid}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {row1.map(item => (
                      <View style={styles.cardGrid} key={item.id || item.name}>
                        <Image source={product_images[item.name]} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.footer}>
                          <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(item)}>
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {row2.map(item => (
                      <View style={styles.cardGrid} key={item.id || item.name}>
                        <Image source={product_images[item.name]} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.footer}>
                          <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(item)}>
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })()
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2C3A47',
    marginVertical: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2C3A47',
    marginVertical: 20,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 6,
  },
  activeTypeButton: {
    backgroundColor: '#2C3A47',
  },
  typeButtonText: {
    color: '#2C3A47',
    fontWeight: 'bold',
  },
  activeTypeButtonText: {
    color: '#fff',
  },
  horizontalScrollWrap: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    marginTop: 8,
    minHeight: 200,
    padding: 8,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    fontFamily: 'SpaceMono',
  },
  grid: {
    flexDirection: 'column',
    paddingVertical: 8,
  },
  cardGrid: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 8,
    shadowColor: '#C7A17A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 180,
    maxWidth: 220,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b2e19',
    marginTop: 4,
    marginBottom: 8,
    fontFamily: 'SpaceMono',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#C7A17A',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 