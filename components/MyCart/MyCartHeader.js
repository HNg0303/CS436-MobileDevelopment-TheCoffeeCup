import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    const router = useRouter();
    return (
        <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
                <Text style={styles.icon}>{'<-'}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>My Cart</Text>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.replace('/(tabs)/home')}>
                <Text style={styles.icon}>{'🏠'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    iconBtn: { padding: 8 },
    icon: { fontSize: 22, color: '#C7A17A', fontWeight: 'bold' },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#C7A17A',
        marginHorizontal: 8,
    },
});