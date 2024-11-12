"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import Link from 'next/link';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
        } catch (error) {
            setErrorMessage('Email o contraseña incorrectos');
        }
        
    }

    return (
        <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md'>
            <h1 className='text-2xl text-center mb-4'>
                Login de usuario
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='Correo Electrónico'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                    required
                />
                {errorMessage && <p className='text-red-500 text-center pd-4'>{errorMessage}</p>}
                <button type='submit' disabled={formData.email === '' || formData.password === ''}
                    className='w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 transition duration-200 shadow-md'>
                    Ingresar
                </button>
            </form>
            <p className='text-center pt-4'>
                ¿No tienes cuenta? <Link href="/register" className='text-blue-500 underline hover:text-blue-700'>Registrate</Link>
            </p>
        </div>
    )
}


export default Login;