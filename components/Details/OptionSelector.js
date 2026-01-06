import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OptionSelector({ label, options, value, setValue, renderIcon }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.optionBtn, value === opt.value && styles.optionBtnActive]}
            onPress={() => setValue(opt.value)}
          >
            {/* Icon placeholder */}
            {renderIcon ? renderIcon(opt) : null}
            <Text style={[styles.optionText, value === opt.value && styles.optionTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  label: { fontSize: 16, color: '#2C3A47', fontWeight: '500' },
  optionsRow: { flexDirection: 'row', alignItems: 'center' },
  optionBtn: { padding: 8, borderWidth: 1, borderColor: '#aaa', borderRadius: 8, marginHorizontal: 4 },
  optionBtnActive: { backgroundColor: '#2C3A47', borderColor: '#2C3A47' },
  optionText: { color: '#2C3A47', fontWeight: '500' },
  optionTextActive: { color: '#fff' },
}); 