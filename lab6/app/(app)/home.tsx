import { useAuth } from '@/context/auth-context';
import { Link, router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const { user, profile, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Вийти',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                    router.replace('/(auth)/login');
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Привіт, {profile?.name ?? 'Користувач'} 👋
                </Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            {profile ? (
                <View style={styles.profileCard}>
                    <Text style={styles.cardTitle}>📋 Ваш профіль</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>👤</Text>
                        <View>
                            <Text style={styles.infoLabel}>Ім'я</Text>
                            <Text style={styles.infoValue}>{profile.name || '—'}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🎂</Text>
                        <View>
                            <Text style={styles.infoLabel}>Вік</Text>
                            <Text style={styles.infoValue}>{profile.age || '—'}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🏙️</Text>
                        <View>
                            <Text style={styles.infoLabel}>Місто</Text>
                            <Text style={styles.infoValue}>{profile.city || '—'}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyIcon}>📝</Text>
                    <Text style={styles.emptyTitle}>Профіль не заповнено</Text>
                    <Text style={styles.emptyText}>Додайте своє ім'я, вік та місто</Text>
                </View>
            )}

            <View style={styles.actions}>
                <Link href="/(app)/profile" asChild>
                    <Pressable style={styles.actionBtn}>
                        <Text style={styles.actionIcon}>✏️</Text>
                        <Text style={styles.actionText}>Редагувати профіль</Text>
                    </Pressable>
                </Link>

                <Pressable style={[styles.actionBtn, styles.logoutBtn]} onPress={handleLogout}>
                    <Text style={styles.actionIcon}>🚪</Text>
                    <Text style={[styles.actionText, styles.logoutText]}>Вийти</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F6FF' },
    content: { padding: 24, paddingTop: 60 },
    header: { marginBottom: 28 },
    greeting: { fontSize: 26, fontWeight: '800', color: '#1A2B4A' },
    email: { fontSize: 14, color: '#6B7A99', marginTop: 4 },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#4F86C6',
        shadowOpacity: 0.1,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#1A2B4A', marginBottom: 16 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 6 },
    infoIcon: { fontSize: 22, width: 32, textAlign: 'center' },
    infoLabel: { fontSize: 11, color: '#9BA8C0', fontWeight: '600', textTransform: 'uppercase' },
    infoValue: { fontSize: 15, color: '#1A2B4A', fontWeight: '600', marginTop: 2 },
    divider: { height: 1, backgroundColor: '#F0F4FC', marginVertical: 4 },
    emptyCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
    },
    emptyIcon: { fontSize: 40, marginBottom: 12 },
    emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1A2B4A' },
    emptyText: { fontSize: 13, color: '#6B7A99', marginTop: 4 },
    actions: { gap: 12 },
    actionBtn: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    logoutBtn: { backgroundColor: '#FFF0F0' },
    actionIcon: { fontSize: 20 },
    actionText: { fontSize: 15, fontWeight: '600', color: '#1A2B4A' },
    logoutText: { color: '#E05A5A' },
});