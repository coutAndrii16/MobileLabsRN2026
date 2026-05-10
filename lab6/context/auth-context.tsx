import { auth, db } from '@/config/firebase';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
    name: string;
    age: string;
    city: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    saveProfile: (data: Omit<UserProfile, 'email'>) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    deleteAccount: (password: string) => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await loadProfile(firebaseUser.uid);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loadProfile = async (uid: string) => {
        try {
            const docRef = doc(db, 'users', uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                setProfile(snap.data() as UserProfile);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    const register = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const saveProfile = async (data: Omit<UserProfile, 'email'>) => {
        if (!user) throw new Error('Not authenticated');
        const docRef = doc(db, 'users', user.uid);
        const profileData: UserProfile = { ...data, email: user.email! };
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            await updateDoc(docRef, { ...profileData });
        } else {
            await setDoc(docRef, profileData);
        }
        setProfile(profileData);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const deleteAccount = async (password: string) => {
        if (!user || !user.email) throw new Error('Not authenticated');
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(user);
    };

    const refreshProfile = async () => {
        if (user) await loadProfile(user.uid);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                register,
                login,
                logout,
                saveProfile,
                resetPassword,
                deleteAccount,
                refreshProfile,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}