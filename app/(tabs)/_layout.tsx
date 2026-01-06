import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b4c58',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🎁</Text>,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Order History',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🧾</Text>,
        }}
      />
    </Tabs>
  );
} 