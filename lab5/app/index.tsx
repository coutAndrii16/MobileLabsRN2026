import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Root() {
    const { isAuthenticated } = useAuth();
    return <Redirect href={isAuthenticated ? '/(app)' : '/login'} />;
}