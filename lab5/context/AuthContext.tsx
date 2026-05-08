import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (email: string, password: string) => {
        // Mock: будь-які дані — успішний вхід
        setIsAuthenticated(true);
    };

    const register = (email: string, password: string, name: string) => {
        // Mock: будь-які дані — успішна реєстрація
        setIsAuthenticated(true);
    };

    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}