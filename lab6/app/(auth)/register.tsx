import { useAuth } from '@/context/auth-context';
import { Link, router } from 'expo-router';
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

export default function RegisterScreen() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email.trim() || !password.trim() || !confirm.trim()) {
            Alert.alert('Помилка', 'Заповніть всі поля');
            return;
        }
        if (password !== confirm) {
            Alert.alert('Помилка', 'Паролі не співпадають');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Помилка', 'Пароль має містити мінімум 6 символів');
            return;
        }
        setLoading(true);
        try {
            await register(email.trim(), password);
            router.replace('/(app)/profile');
        } catch (e: any) {
            const msg =
                e.code === 'auth/email-already-in-use'
                    ? 'Цей email вже зареєстровано'
                    : e.code === 'auth/invalid-email'
                        ? 'Невірний формат email'
                        : 'Помилка реєстрації. Спробуйте ще раз.';
            Alert.alert('Помилка', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.logo}>✨</Text>
                    <Text style={styles.title}>Реєстрація</Text>
                    <Text style={styles.subtitle}>Створіть новий акаунт</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@email.com"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>Пароль</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Мінімум 6 символів"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.label}>Підтвердити пароль</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Повторіть пароль"
                        placeholderTextColor="#aaa"
                        value={confirm}
                        onChangeText={setConfirm}
                        secureTextEntry
                    />

                    <Pressable
                        style={[styles.btn, loading && styles.btnDisabled]}
                        onPress={handleRegister}
                        disabled={loading}>
                        <Text style={styles.btnText}>{loading ? 'Реєстрація...' : 'Зареєструватись'}</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Вже є акаунт? </Text>
                    <Link href="/(auth)/login" asChild>
                        <Pressable>
                            <Text style={styles.linkText}>Увійти</Text>
                        </Pressable>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F0F6FF' },
    container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 32 },
    logo: { fontSize: 56, marginBottom: 12 },
    title: { fontSize: 28, fontWeight: '700', color: '#1A2B4A' },
    subtitle: { fontSize: 14, color: '#6B7A99', marginTop: 4 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
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
    btn: {
        backgroundColor: '#4F86C6',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 24,
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { color: '#6B7A99', fontSize: 14 },
    linkText: { color: '#4F86C6', fontWeight: '700', fontSize: 14 },
});