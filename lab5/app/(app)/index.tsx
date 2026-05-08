import { Products, type Product } from '@/constants/products';
import { useAuth } from '@/context/AuthContext';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

function ProductCard({ item }: { item: Product }) {
    return (
        <Link href={`/details/${item.id}`} asChild>
            <Pressable style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.price}>{item.price.toLocaleString('uk-UA')} ₴</Text>
                </View>
            </Pressable>
        </Link>
    );
}

export default function CatalogScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <FlatList
                data={Products}
                keyExtractor={(p) => p.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <ProductCard item={item} />}
                ListFooterComponent={
                    <Pressable style={styles.logoutBtn} onPress={logout}>
                        <Text style={styles.logoutText}>Вийти</Text>
                    </Pressable>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F4F5' },
    list: { padding: 12, paddingBottom: 32 },
    row: { gap: 12, marginBottom: 12 },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },
    image: { width: '100%', height: 130 },
    info: { padding: 10, gap: 4 },
    name: { fontSize: 13, fontWeight: '600', color: '#11181C' },
    price: { fontSize: 14, fontWeight: '700', color: '#0a7ea4' },
    logoutBtn: {
        marginTop: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    logoutText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});