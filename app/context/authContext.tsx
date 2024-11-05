// app/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import handleLogin from '@/app/auth/users/login/handleLogin';

interface AuthContextType {
    isAuthenticated: boolean;
    userName: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        const response = await handleLogin(email, password);
        if (response.access && response.refresh) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            setIsAuthenticated(true);
            setUserName(response.user?.first_name || ""); // Obtén el nombre de usuario aquí
            router.push('/dashboard');
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUserName(null);
        router.push('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del AuthProvider");
    }
    return context;
};
