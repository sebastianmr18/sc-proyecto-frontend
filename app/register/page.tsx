"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });

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
            const response = await axios.post('auth/users/', formData);
            console.log('User Registered', response.data);
            router.push(`/auth/users/activation-pending`);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <>
            <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md'>
                <h1 className='text-2xl text-center mb-4'>
                    Registro de usuario
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="user_id"
                        placeholder="Número de identificación"
                        value={formData.user_id}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />            
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
                        value={formData.first_name}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Apellido"
                        value={formData.last_name}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirmar contraseña"
                        value={formData.confirm_password}
                        className='w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-md'
                        onChange={handleChange}
                        required
                    />
                    <button type="submit"
                        className='w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 transition duration-200 shadow-md'
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </>
    )
};

export default Register;