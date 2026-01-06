import { useRouter } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileEditView from './ProfileEditView';
import ProfileView from './ProfileView';

function ProfileContent() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await db.getFirstAsync('SELECT * FROM Customer WHERE id = 1');
      setCustomer(customerData);
      setName(customerData?.name || '');
      setEmail(customerData?.email || '');
      setPhone(customerData?.phone || '');
      setAddress(customerData?.address || '');
    };
    fetchData();
  }, [db]);

  if (!customer) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await db.runAsync(
        'UPDATE Customer SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [name, email, phone, address, customer.id]
      );
      setCustomer({ ...customer, name, email, phone, address });
      setIsEditing(false);
      alert('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButton}>{'<--'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        {!isEditing && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.headerButton}>{'✏️'}</Text>
          </TouchableOpacity>
        )}
        {isEditing && <View style={{ width: 32 }} />}
      </View>
      {isEditing ? (
        <ProfileEditView
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          onSave={handleSave}
        />
      ) : (
        <ProfileView customer={customer} />
      )}
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <SQLiteProvider databaseName="CodeCup.db" assetSource={{ assetId: require('../../database/CodeCup.db') }}>
      <ProfileContent />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 48 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
  headerButton: { fontSize: 24 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
});
