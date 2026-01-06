import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type LoyaltyBadgeProps = {
  current?: number;
  total?: number;
  onReset?: (newBadges?: number) => void;
};

const LoyaltyBadge = ({ current = 4, total = 8, onReset }: LoyaltyBadgeProps) => {
  const isFull = current >= total;
  const CardWrapper = isFull ? TouchableOpacity : View;
  return (
    <View style={styles.outerContainer}>
      <CardWrapper
        style={[styles.container, isFull && styles.resetAvailable]}
        {...(isFull ? { onPress: () => onReset && onReset(current % total) } : {})}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>Loyalty card</Text>
        <View style={styles.progressRow}>
          <View style={styles.badges}>
            {[...Array(total)].map((_, i) => (
              <Text key={i} style={i < current ? styles.filled : styles.empty}>☕</Text>
            ))}
          </View>
        </View>
        {isFull && (
          <Text style={styles.resetHint}>Tap to reset</Text>
        )}
      </CardWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#C7A17A',
    borderRadius: 20,
    padding: 6,
    marginVertical: 12,
    marginHorizontal: 24,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#C7A17A',
    shadowColor: '#C7A17A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: '#b08b5c',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badges: {
    flexDirection: 'row',
  },
  filled: {
    color: '#C7A17A',
    fontSize: 22,
    marginHorizontal: 2,
  },
  empty: {
    color: '#b08b5c',
    fontSize: 22,
    marginHorizontal: 2,
    opacity: 0.3,
  },
  resetAvailable: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    opacity: 0.95,
  },
  resetHint: {
    color: '#4CAF50',
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default LoyaltyBadge; 