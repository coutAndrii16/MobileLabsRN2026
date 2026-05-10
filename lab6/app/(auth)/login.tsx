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

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
            return;
        }
        setLoading(true);
        try {
            await login(email.trim(), password);
            router.replace('/(app)/home');
        } catch (e: any) {
            const msg =
                e.code === 'auth/invalid-credential'
                    ? 'Невірний email або пароль'
                    : e.code === 'auth/user-not-found'
                        ? 'Користувача не знайдено'
                        : 'Помилка входу. Спробуйте ще раз.';
            Alert.alert('Помилка', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.logo}>🔐</Text>
                    <Text style={styles.title}>Вхід</Text>
                    <Text style={styles.subtitle}>Увійдіть до свого акаунту</Text>
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
                        placeholder="••••••••"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Link href="/(auth)/forgot-password" asChild>
                        <Pressable>
                            <Text style={styles.forgotText}>Забули пароль?</Text>
                        </Pressable>
                    </Link>

                    <Pressable
                        style={[styles.btn, loading && styles.btnDisabled]}
                        onPress={handleLogin}
                        disabled={loading}>
                        <Text style={styles.btnText}>{loading ? 'Вхід...' : 'Увійти'}</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Немає акаунту? </Text>
                    <Link href="/(auth)/register" asChild>
                        <Pressable>
                            <Text style={styles.linkText}>Зареєструватись</Text>
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
    forgotText: { color: '#4F86C6', fontSize: 13, textAlign: 'right', marginTop: 8 },
    btn: {
        backgroundColor: '#4F86C6',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { color: '#6B7A99', fontSize: 14 },
    linkText: { color: '#4F86C6', fontWeight: '700', fontSize: 14 },
});