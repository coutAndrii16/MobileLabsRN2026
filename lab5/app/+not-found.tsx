import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Екран не знайдено' }} />
            <View style={styles.container}>
                <Text style={styles.emoji}>🔍</Text>
                <Text style={styles.title}>Екран не знайдено</Text>
                <Text style={styles.sub}>Сторінка, яку ви шукаєте, не існує.</Text>
                <Link href="/" asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnText}>На головну</Text>
                    </Pressable>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F5',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 24,
    },
    emoji: { fontSize: 56 },
    title: { fontSize: 22, fontWeight: '700', color: '#11181C' },
    sub: { fontSize: 15, color: '#687076', textAlign: 'center' },
    btn: {
        marginTop: 8,
        backgroundColor: '#0a7ea4',
        borderRadius: 10,
        paddingHorizontal: 28,
        paddingVertical: 13,
    },
    btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});