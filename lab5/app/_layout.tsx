import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

function RootNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}