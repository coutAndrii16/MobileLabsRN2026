import { Products } from '@/constants/products';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const product = Products.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Товар не знайдено</Text>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>← Назад</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
            <View style={styles.body}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} ₴</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F4F5' },
    content: { paddingBottom: 40 },
    image: { width: '100%', height: 280 },
    body: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 16,
        padding: 20,
        gap: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    name: { fontSize: 22, fontWeight: '700', color: '#11181C' },
    price: { fontSize: 20, fontWeight: '700', color: '#0a7ea4' },
    description: { fontSize: 15, color: '#445059', lineHeight: 22 },
    notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    notFoundText: { fontSize: 18, color: '#11181C' },
    backBtn: {
        backgroundColor: '#0a7ea4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backBtnText: { color: '#fff', fontWeight: '600' },
});