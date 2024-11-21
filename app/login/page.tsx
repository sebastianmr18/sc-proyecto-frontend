"use client";
import { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import Link from 'next/link';
import { withAuthRedirect } from '@/app/_utils/withAuthRedirect';
import '@/public/styles/form.css';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(formData.email, formData.password);
            router.push('/dashboard');
        }
        catch (error) {
            if (error instanceof Error) {
                setShowErrorMessage(true);
                console.error('Error de autenticación:', error);
            } else {
                console.error('Error desconocido:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const isValidForm = () => {
        return formData.email !== '' && formData.password !== '';
    };

    

    return (
        <div className='form-container'>
            <h1 className='welcome-message'>
                Bienvenido de nuevo!
            </h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Email */}
                <div className='w-full'>
                    <label
                        htmlFor="email"
                        className="label-input">
                        Correo Electrónico
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className='input-field'
                        required
                    />
                </div>
                {/* Contraseña */}
                <div className='w-full'>
                    <label
                        htmlFor="password"
                        className="label-input">
                        Contraseña
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className='input-field'
                        required
                    />
                </div>
                {/* Error Message */}
                {showErrorMessage && (
                    <p className="error-message">
                        {'Email o contraseña incorrectos'}
                    </p>
                )}
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isValidForm() && isSubmitting}
                    className='submit-button'
                >{isSubmitting ? 'Cargando...' : 'Iniciar sesión'}</button>
            </form>
                {/* Register Link */}
                <p className="text-center pt-6">
                    ¿No tienes cuenta?  
                    <Link href="/register" className="text-blue-500 underline hover:text-blue-700">
                        Regístrate
                    </Link>
                </p>
        </div>
    )
}


export default withAuthRedirect(Login);