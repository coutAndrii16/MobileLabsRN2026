import { useAuth } from '@/context/auth-context';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ProfileScreen() {
    const { profile, saveProfile, deleteAccount } = useAuth();

    const [name, setName] = useState(profile?.name ?? '');
    const [age, setAge] = useState(profile?.age ?? '');
    const [city, setCity] = useState(profile?.city ?? '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Помилка', "Введіть ваше ім'я");
            return;
        }
        setSaving(true);
        try {
            await saveProfile({ name: name.trim(), age: age.trim(), city: city.trim() });
            Alert.alert('Готово', 'Профіль збережено!', [
                { text: 'OK', onPress: () => router.replace('/(app)/home') },
            ]);
        } catch {
            Alert.alert('Помилка', 'Не вдалося зберегти профіль');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            '⚠️ Видалити акаунт',
            'Ця дія є незворотньою. Всі ваші дані будуть видалені.',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: confirmDelete,
                },
            ]
        );
    };

    const confirmDelete = () => {
        Alert.prompt(
            'Підтвердження',
            'Введіть ваш пароль для підтвердження видалення акаунту:',
            async (password) => {
                if (!password) return;
                try {
                    await deleteAccount(password);
                    router.replace('/(auth)/login');
                } catch (e: any) {
                    const msg =
                        e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential'
                            ? 'Невірний пароль'
                            : 'Помилка видалення акаунту';
                    Alert.alert('Помилка', msg);
                }
            },
            'secure-text'
        );
    };

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.topBar}>
                    <Pressable onPress={() => router.back()}>
                        <Text style={styles.backText}>← Назад</Text>
                    </Pressable>
                </View>

                <View style={styles.header}>
                    <Text style={styles.avatar}>👤</Text>
                    <Text style={styles.title}>Мій профіль</Text>
                    <Text style={styles.subtitle}>Заповніть інформацію про себе</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Ім'я *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введіть ваше ім'я"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Вік</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Наприклад: 22"
                        placeholderTextColor="#aaa"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        maxLength={3}
                    />

                    <Text style={styles.label}>Місто</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Наприклад: Київ"
                        placeholderTextColor="#aaa"
                        value={city}
                        onChangeText={setCity}
                    />

                    <Pressable
                        style={[styles.saveBtn, saving && styles.btnDisabled]}
                        onPress={handleSave}
                        disabled={saving}>
                        <Text style={styles.saveBtnText}>{saving ? 'Збереження...' : '💾 Зберегти профіль'}</Text>
                    </Pressable>
                </View>

                <View style={styles.dangerZone}>
                    <Text style={styles.dangerTitle}>⚠️ Небезпечна зона</Text>
                    <Text style={styles.dangerDesc}>
                        Видалення акаунту є незворотньою дією. Всі ваші дані будуть безповоротно видалені.
                    </Text>
                    <Pressable style={styles.deleteBtn} onPress={handleDeleteAccount}>
                        <Text style={styles.deleteBtnText}>🗑️ Видалити акаунт</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F0F6FF' },
    container: { flexGrow: 1, padding: 24 },
    topBar: { marginTop: 48, marginBottom: 8 },
    backText: { color: '#4F86C6', fontSize: 16, fontWeight: '600' },
    header: { alignItems: 'center', marginBottom: 28 },
    avatar: { fontSize: 56, marginBottom: 12 },
    title: { fontSize: 26, fontWeight: '700', color: '#1A2B4A' },
    subtitle: { fontSize: 14, color: '#6B7A99', marginTop: 4 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#4F86C6',
        shadowOpacity: 0.1,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    label: { fontSize: 13, fontWeight: '600', color: '#3A4A6B', marginBottom: 6, marginTop: 12 },
    input: {
        borderWidth: 1.5,
        borderColor: '#D0DCF0',
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        color: '#1A2B4A',
        backgroundColor: '#F7FAFF',
    },
    saveBtn: {
        backgroundColor: '#4F86C6',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 24,
    },
    btnDisabled: { opacity: 0.6 },
    saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    dangerZone: {
        backgroundColor: '#FFF5F5',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1.5,
        borderColor: '#FFD5D5',
    },
    dangerTitle: { fontSize: 16, fontWeight: '700', color: '#C0392B', marginBottom: 8 },
    dangerDesc: { fontSize: 13, color: '#8B4545', lineHeight: 18, marginBottom: 16 },
    deleteBtn: {
        backgroundColor: '#E74C3C',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    deleteBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});