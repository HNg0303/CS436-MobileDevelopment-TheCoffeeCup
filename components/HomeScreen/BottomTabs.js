import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomTabs({ active = 0, onTabPress }) {
  const tabs = [
    { icon: '🏠', label: 'Home' },
    { icon: '🔍', label: 'Search' },
    { icon: '🎁', label: 'Rewards' },
    { icon: '🧾', label: 'Order History' },
  ];
  return (
    <View style={styles.container}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab.label}
          style={[styles.tab, active === idx && styles.activeTab]}
          onPress={() => onTabPress && onTabPress(idx)}
        >
          <View style={active === idx ? styles.activePill : styles.pill}>
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, active === idx && styles.activeLabel]}>{tab.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    elevation: 8,
    marginTop: 0,
    marginBottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 24,
  },
  pill: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
  },
  activePill: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7A17A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  icon: {
    fontSize: 24,
    color: '#b08b5c',
  },
  label: {
    fontSize: 12,
    color: '#b08b5c',
    fontWeight: '400',
    marginTop: 2,
  },
  activeLabel: {
    color: '#3b2e19',
    fontWeight: 'bold',
  },
}); 