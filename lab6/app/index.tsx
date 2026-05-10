import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4F86C6" />
            </View>
        );
    }

    return user ? <Redirect href="/(app)/home" /> : <Redirect href="/(auth)/login" />;
}