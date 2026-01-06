import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HistoryOrder from './HistoryOrder';
import OngoingOrder from './OngoingOrder';

const TAB_ONGOING = 0;
const TAB_HISTORY = 1;

const Orders = () => {
  const [activeTab, setActiveTab] = useState(TAB_ONGOING);

  // let OngoingOrder, HistoryOrder;
  // try { OngoingOrder = require('./OngoingOrder').default; } catch { OngoingOrder = null; }
  // try { HistoryOrder = require('./HistoryOrder').default; } catch { HistoryOrder = null; }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Order</Text>
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, activeTab === TAB_ONGOING && styles.activeTab]} onPress={() => setActiveTab(TAB_ONGOING)}>
          <Text style={[styles.tabText, activeTab === TAB_ONGOING && styles.activeTabText]}>On going</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === TAB_HISTORY && styles.activeTab]} onPress={() => setActiveTab(TAB_HISTORY)}>
          <Text style={[styles.tabText, activeTab === TAB_HISTORY && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>
      {activeTab === TAB_ONGOING ? <OngoingOrder /> : <HistoryOrder />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingTop: 48, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#222' },
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 12, borderBottomWidth: 2, borderColor: 'transparent', alignItems: 'center' },
  activeTab: { borderColor: '#222' },
  tabText: { fontSize: 16, color: '#bbb' },
  activeTabText: { color: '#222', fontWeight: 'bold' },
});

export default Orders; 