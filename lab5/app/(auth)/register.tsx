import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleRegister = () => {
        if (password !== confirm) {
            alert('Паролі не співпадають');
            return;
        }
        register(email, password, name);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.title}>Реєстрація</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ім'я"
                        placeholderTextColor="#9BA1A6"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9BA1A6"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Пароль"
                        placeholderTextColor="#9BA1A6"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Підтвердження паролю"
                        placeholderTextColor="#9BA1A6"
                        secureTextEntry
                        value={confirm}
                        onChangeText={setConfirm}
                    />

                    <Pressable style={styles.btn} onPress={handleRegister}>
                        <Text style={styles.btnText}>Зареєструватися</Text>
                    </Pressable>

                    <Link href="/login" style={styles.link}>
                        Вже є акаунт? Увійти
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F5',
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        gap: 14,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#11181C',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D9DBDC',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#11181C',
    },
    btn: {
        backgroundColor: '#0a7ea4',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 4,
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        color: '#0a7ea4',
        fontSize: 14,
        marginTop: 4,
    },
});