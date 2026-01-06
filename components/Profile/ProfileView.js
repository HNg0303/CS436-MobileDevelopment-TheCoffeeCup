import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const profileImage = require('../../assets/images/Profile/htrang.jpg');

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export default function ProfileView({ customer }) {
  return (
    <>
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{customer.name}</Text>
        <Text style={styles.profileLocation}>{customer.address}</Text>
      </View>
      <View style={styles.infoSection}>
        <InfoRow icon="📞" label="Mobile Phone" value={customer.phone} />
        <InfoRow icon="✉️" label="Email Address" value={customer.email} />
        <InfoRow icon="📍" label="Address" value={customer.address} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileSection: { alignItems: 'center', marginBottom: 24 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  profileName: { fontSize: 24, fontWeight: 'bold' },
  profileLocation: { fontSize: 16, color: '#00bfa5' },
  infoSection: { paddingHorizontal: 16, marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  infoIcon: { fontSize: 24, marginRight: 16, color: '#00bfa5' },
  infoLabel: { fontSize: 12, color: '#888' },
  infoValue: { fontSize: 16, fontWeight: 'bold' },
}); 