// app/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import handleLogin from '@/app/auth/users/login/handleLogin';
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    fetchUserProfile: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedAccessToken) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        const response = await handleLogin(email, password);
        if (response.access && response.refresh) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            localStorage.setItem("user", JSON.stringify(response.user));
            setIsAuthenticated(true);
            setUser(response.user);
            router.push('/dashboard');
        }
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('storedAccessToken');
            if (token) {
                const response = await axios.get(`${NEXT_PUBLIC_URL}/auth/users/me/` , {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            logout()
        }
    };


    return (
        <AuthContext.Provider value={{ user, fetchUserProfile, login, logout, isAuthenticated }}>
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
