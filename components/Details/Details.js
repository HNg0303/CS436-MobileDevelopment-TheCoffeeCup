import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { product_images } from '../images';
import CheckoutButton from './CheckoutButton';
import CoffeeImage from './CoffeeImage';
import CoffeeInfo from './CoffeeInfo';
import DetailsHeader from './DetailsHeader';
import OptionSelector from './OptionSelector';
import QuantitySelector from './QuantitySelector';
import TotalAmount from './TotalAmount';


const SHOT_OPTIONS = [
  { label: 'Single', value: 'single', price: 0 },
  { label: 'Double', value: 'double', price: 0.5 },
];
const SIZE_OPTIONS = [
  { label: 'S', value: 'small', price: 0 },
  { label: 'M', value: 'medium', price: 0.5 },
  { label: 'L', value: 'large', price: 1 },
];
const ICE_OPTIONS = [
  { label: '25%', value: '25%' },
  { label: '50%', value: '50%' },
  { label: 'Full Ice', value: 'Full Ice' },
];

// Standalone fetchCoffee function
async function fetchCoffee(db, coffeeId){
  try {
    const result = await db.getFirstAsync('SELECT * FROM Coffee WHERE id = ?', [Number(coffeeId)]);
    return result;
  } catch (e) {
    console.log("Error in fetching coffee: ", e);
    return null;
  }
}

// This is the component that uses the db context
function DetailsContent({ coffeeId }) {
  const db = useSQLiteContext();
  const router = useRouter();
  const [coffee, setCoffee] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shot, setShot] = useState('single');
  const [size, setSize] = useState('small');
  const [ice, setIce] = useState('25%');
  const [select, setSelect] = useState('hot'); // Default select value

  useEffect(() => {
    if (!coffeeId) return;
    async function getCoffee() {
      const result = await fetchCoffee(db, coffeeId);
      setCoffee(result);
    } 
    getCoffee();
  }, [coffeeId, db]);

  if (!coffee) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DetailsHeader />
        <View>
          <CoffeeInfo name="" description="Loading..." />
        </View>
      </View>
    );
  }

  // Calculate price
  const basePrice = coffee.price || 0;
  const shotPrice = SHOT_OPTIONS.find(opt => opt.value === shot)?.price || 0;
  const sizePrice = SIZE_OPTIONS.find(opt => opt.value === size)?.price || 0;
  const total = ((basePrice + shotPrice + sizePrice) * quantity).toFixed(2);

  const handleCheckout = () => {
    router.push({
      pathname: '/MyCart',
      params: {
        coffeeId: coffee.id,
        name: coffee.name,
        image: coffee.image,
        quantity,
        shot,
        size,
        ice,
        select,
        totalPrice: total,
      },
    });
  };

  return (
    <View style={styles.Container}>
      {/* Image Container */}
      <View style={styles.ImageContainer}>
        <DetailsHeader />
        <CoffeeImage image={product_images[coffee.name]} />
        {/* Floating Heart Button */}
      </View>
      {/* Customization Container */}
      <View style={styles.CustomizationContainer}>
        <CoffeeInfo name={coffee.name} description={coffee.description} />
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <OptionSelector
          label="Shot"
          options={SHOT_OPTIONS}
          value={shot}
          setValue={setShot}
          renderIcon={(opt, active) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
              <MaterialCommunityIcons
                name="water-outline"
                size={32}
                color={active ? '#111' : '#ccc'}
                style={{ opacity: active ? 1 : 0.4 }}
              />
              {opt.value === 'double' && (
                <MaterialCommunityIcons
                  name="water-outline"
                  size={32}
                  color={active ? '#111' : '#ccc'}
                  style={{ marginLeft: -10, opacity: active ? 1 : 0.4 }}
                />
              )}
            </View>
          )}
        />
        <OptionSelector
          label="Size"
          options={SIZE_OPTIONS}
          value={size}
          setValue={setSize}
          renderIcon={(opt, active) => (
            <MaterialCommunityIcons
              name={
                opt.value === 'small'
                  ? 'cup-outline'
                  : opt.value === 'medium'
                  ? 'cup'
                  : 'cup-water'
              }
              size={36}
              color={active ? '#111' : '#ccc'}
              style={{ marginHorizontal: 8, opacity: active ? 1 : 0.4 }}
            />
          )}
        />
        <OptionSelector
          label="Ice"
          options={ICE_OPTIONS}
          value={ice}
          setValue={setIce}
          renderIcon={(opt, active) => {
            let cubes = 1;
            if (opt.value === '50%') cubes = 2;
            if (opt.value === 'Full Ice') cubes = 3;
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                {[...Array(cubes)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="cube"
                    size={22}
                    color={active ? '#111' : '#ccc'}
                    style={{ marginRight: 2, opacity: active ? 1 : 0.4 }}
                  />
                ))}
              </View>
            );
          }}
        />
        <TotalAmount total={total} />
        <CheckoutButton onPress={handleCheckout} />
      </View>
    </View>
  );
}

// This is the exported page component
export default function Details() {
  const { coffeeId } = useLocalSearchParams();
  return <DetailsContent coffeeId={Number(coffeeId)} />;
}

const styles = StyleSheet.create({
  Container: {
    flex: 1, 
    backgroundColor: '#C7A17A', 
    padding: 16 
  },
  ImageContainer: {
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    position: 'relative',
    minHeight: 260,
  },
  CustomizationContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  HeartContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  }
});