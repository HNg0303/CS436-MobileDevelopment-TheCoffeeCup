import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const profileImage = require('../../assets/images/Profile/htrang.jpg');

const InfoRowEdit = ({ icon, label, value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <TextInput
          style={[
            styles.infoValueInput,
            isFocused && styles.infoValueInputFocused
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#aaa"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

export default function ProfileEditView({ name, setName, email, setEmail, phone, setPhone, address, setAddress, onSave }) {
  const [nameFocused, setNameFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  return (
    <>
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <TextInput
          style={[
            styles.profileName,
            styles.editableText,
            nameFocused && styles.editableTextFocused
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#aaa"
          textAlign="center"
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />
        <TextInput
          style={[
            styles.profileLocation,
            styles.editableText,
            addressFocused && styles.editableTextFocused
          ]}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          placeholderTextColor="#aaa"
          textAlign="center"
          onFocus={() => setAddressFocused(true)}
          onBlur={() => setAddressFocused(false)}
        />
      </View>
      <View style={styles.infoSection}>
        <InfoRowEdit
          icon="📞"
          label="Mobile Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <InfoRowEdit
          icon="✉️"
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <InfoRowEdit
          icon="📍"
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileSection: { alignItems: 'center', marginBottom: 24 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  profileName: { fontSize: 24, fontWeight: 'bold', marginBottom: 0 },
  profileLocation: { fontSize: 16, color: '#00bfa5', marginBottom: 0 },
  editableText: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: 0,
  },
  editableTextFocused: {
    borderBottomWidth: 1,
    borderColor: '#C7A17A',
    backgroundColor: '#f7f6f2',
  },
  infoSection: { paddingHorizontal: 16, marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  infoIcon: { fontSize: 24, marginRight: 16, color: '#00bfa5' },
  infoLabel: { fontSize: 12, color: '#888' },
  infoValueInput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 0,
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: 0,
    minWidth: 120,
  },
  infoValueInputFocused: {
    borderBottomWidth: 1,
    borderColor: '#C7A17A',
    backgroundColor: '#f7f6f2',
  },
  saveBtn: {
    backgroundColor: '#C7A17A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#C7A17A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 180,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
}); 