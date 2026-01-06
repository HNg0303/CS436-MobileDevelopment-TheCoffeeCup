import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartPreviewPopover from './CartPreviewPopover';

export default function DetailsHeader() {
  const router = useRouter();
  const [showPreview, setShowPreview] = React.useState(false);
  const previewBtnRef = useRef();

  return (
    <View style={styles.headerRow}>
      <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
        <Text style={styles.icon}>{'<-'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Details</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          ref={previewBtnRef}
          style={styles.iconBtn}
          onPress={() => setShowPreview(v => !v)}
        >
          <Text style={styles.icon}>{'👁️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/MyCart')}>
          <Text style={styles.icon}>{'🛒'}</Text>
        </TouchableOpacity>
      </View>
      {showPreview && (
        <CartPreviewPopover
          visible={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  iconBtn: { padding: 8 },
  backbutton: { padding: 8 },
  icon: { fontSize: 24, color: '#2C3A47', fontWeight: 'bold' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3A47',
    marginHorizontal: 8,
  },
}); 