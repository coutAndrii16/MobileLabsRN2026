import { useAuth } from '@/context/auth-context';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleReset = async () => {
        if (!email.trim()) {
            Alert.alert('Помилка', 'Введіть ваш email');
            return;
        }
        setLoading(true);
        try {
            await resetPassword(email.trim());
            setSent(true);
        } catch (e: any) {
            const msg =
                e.code === 'auth/user-not-found'
                    ? 'Користувача з таким email не знайдено'
                    : 'Помилка. Перевірте email та спробуйте ще раз.';
            Alert.alert('Помилка', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>
                <Pressable style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backText}>← Назад</Text>
                </Pressable>

                <View style={styles.header}>
                    <Text style={styles.logo}>📧</Text>
                    <Text style={styles.title}>Відновлення паролю</Text>
                    <Text style={styles.subtitle}>
                        Введіть email, і ми надішлемо посилання для скидання паролю
                    </Text>
                </View>

                {sent ? (
                    <View style={styles.successCard}>
                        <Text style={styles.successIcon}>✅</Text>
                        <Text style={styles.successTitle}>Лист надіслано!</Text>
                        <Text style={styles.successText}>
                            Перевірте вашу поштову скриньку та перейдіть за посиланням для відновлення паролю.
                        </Text>
                        <Pressable style={styles.btn} onPress={() => router.replace('/(auth)/login')}>
                            <Text style={styles.btnText}>Повернутись до входу</Text>
                        </Pressable>
                    </View>
                ) : (
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
                        <Pressable
                            style={[styles.btn, loading && styles.btnDisabled]}
                            onPress={handleReset}
                            disabled={loading}>
                            <Text style={styles.btnText}>{loading ? 'Надсилання...' : 'Надіслати листа'}</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F0F6FF' },
    container: { flex: 1, padding: 24 },
    backBtn: { marginTop: 48, marginBottom: 16 },
    backText: { color: '#4F86C6', fontSize: 16, fontWeight: '600' },
    header: { alignItems: 'center', marginBottom: 32 },
    logo: { fontSize: 56, marginBottom: 12 },
    title: { fontSize: 24, fontWeight: '700', color: '#1A2B4A', textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#6B7A99', marginTop: 8, textAlign: 'center', lineHeight: 20 },
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
    label: { fontSize: 13, fontWeight: '600', color: '#3A4A6B', marginBottom: 6 },
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
        marginTop: 20,
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    successCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#4F86C6',
        shadowOpacity: 0.1,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    successIcon: { fontSize: 48, marginBottom: 16 },
    successTitle: { fontSize: 20, fontWeight: '700', color: '#1A2B4A', marginBottom: 8 },
    successText: { fontSize: 14, color: '#6B7A99', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
});