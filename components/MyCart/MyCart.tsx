import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { handleCheckout } from './MyCartCheckout';
import MyCartContent from './MyCartContent';
import Header from './MyCartHeader';
import MyCartTotalBar from './MyCartTotalBar';

function MyCartInner({ params }: { params: any }) {
  const db = useSQLiteContext();
  const [clearOnCheckout, setClearOnCheckout] = useState(false);
  const router = useRouter();

  const onCheckout = async () => {
    await handleCheckout(db, () => {
      setClearOnCheckout(true);
      // @ts-ignore
      router.replace('OrderSuccess');
    });
  };


  return (
    <>
      <Header />
      <MyCartContent params={params} clearOnCheckout={clearOnCheckout} />
      <MyCartTotalBar onCheckout={onCheckout} />
    </>
  );
}

export default function MyCart() {
  const params = useLocalSearchParams();
  console.log(params.coffeeId);
  return <MyCartInner params={params} />;
}
