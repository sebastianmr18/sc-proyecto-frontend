// app/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import handleLogin from '@/app/api/users/login/handleLogin';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthContextType {
    user: User | null;
    fetchUserProfile: () => Promise<void>;
    updateUserProfile: (updatedData: any) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuth: boolean) => void;
    isAdmin: boolean;
}

interface User {
    email: string;
    user_id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    contact_number?: string;
    address?: string;
    role?: string;
    profile_picture?: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

    useEffect(() => {
        const storedAccessToken = Cookies.get("accessToken");
        const storedUser = Cookies.get("user");        

        if (storedUser && storedAccessToken) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));            
        }
        //setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await handleLogin(email, password);
            if (response.access && response.refresh) {
                Cookies.set('accessToken', response.access, {
                    secure: true,
                    httpOnly: false,
                    sameSite: 'strict',
                    expires: 1 / 24, // 1 hora
                });
                Cookies.set('refreshToken', response.refresh, {
                    secure: true,
                    httpOnly: false,
                    sameSite: 'strict',
                    expires: 7, // 7 días
                });
                Cookies.set('user', JSON.stringify(response.user), {
                    secure: true,
                    sameSite: 'strict',
                    expires: 7,
                });
                setIsAuthenticated(true);
                setUser(response.user);
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);            
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove("user");
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login');
    };

    const fetchUserProfile = async () => {
        try {
            const token = Cookies.get('accessToken');            
            if (token) {
                const response = await axios.get(`${NEXT_PUBLIC_URL}/auth/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
                setIsAuthenticated(true);
                Cookies.set("user", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            logout()
        }
    };

    const updateUserProfile = async (updatedData: any) => {
        try {
            const token = Cookies.get("accessToken");             
            if (token) {
                const response = await axios.put(`${NEXT_PUBLIC_URL}/auth/users/me/`, updatedData,
                    {headers: {Authorization: `Bearer ${token}`}
                });
                console.log(response)
                setUser(response.data);
                setIsAuthenticated(true);
                Cookies.set("user", JSON.stringify(response.data));
            } else {
                throw new Error('No hay token para actualizar el perfil');
            }
        } catch (error) {
            console.error('Failed to update user profile', error);            
        }
    };

    const isAdmin = user?.role === 'administrador';


    return (
        <AuthContext.Provider value={{ user, fetchUserProfile, updateUserProfile, login, logout, isAuthenticated, setIsAuthenticated, isAdmin }}>
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
