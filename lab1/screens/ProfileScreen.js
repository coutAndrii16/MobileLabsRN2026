import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>

            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
            <TextInput style={styles.input} placeholder="Пароль (ще раз)" secureTextEntry />
            <TextInput style={styles.input} placeholder="Прізвище" />
            <TextInput style={styles.input} placeholder="Ім'я" />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
