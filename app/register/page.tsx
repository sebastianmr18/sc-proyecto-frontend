//app/register/page.tsx
"use client";

import { useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { withAuthRedirect } from '@/app/_utils/withAuthRedirect';

const Register = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);  // Estado para verificar si las contraseñas coinciden
    const router = useRouter();

    // Función para actualizar el estado de los campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };

            // Comprobar si las contraseñas coinciden después de actualizar el valor
            if (name === 'password' || name === 'confirm_password') {
                setPasswordsMatch(updatedFormData.password === updatedFormData.confirm_password);
            }

            return updatedFormData;
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!passwordsMatch) {
            // Si las contraseñas no coinciden, mostrar un error
            setErrorMessage('Las contraseñas no coinciden');
            return;
        } else {
            try {
                // Enviar el formulario a la ruta de registro
                const response = await axios.post('auth/users/register/', formData);
                console.log('User Registered', response.data);
                router.push(`/auth/users/activation-pending`);
            } catch (error: any) {
                if (error.response) {
                    // Si el backend devuelve un error de validación, manejamos los errores específicos
                    const errorData = error.response.data;
                    if (errorData.user_id) {
                        // Manejo de error, user_id repetido
                        setErrorMessage(errorData.user_id[0]); // Mostrar el error relacionado con el user_id
                    } else if (errorData.password) {
                        //Manejo de error, password que no cumple con las reglas
                        setErrorMessage(errorData.password[0]); // Mostrar el error relacionado con la contraseña
                    } else {
                        // Si hay un error genérico, mostrar un mensaje genérico
                        setErrorMessage('Error al registrar el usuario');
                    }
                } else {
                    // En caso de que el error no venga del backend, mostrar un error general
                    setErrorMessage('Error al registrar el usuario');
                }
                console.log('Error', error);
            }
        }

    };

    // Función para comprobar si el formulario es válido
    const isFormValid = () => {
        return (
            formData.password.length >= 8 &&
            formData.confirm_password.length >= 8 &&
            passwordsMatch &&
            formData.user_id &&
            formData.email &&
            formData.first_name &&
            formData.last_name
        );
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
                    {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
                    {!passwordsMatch && (
                        <p className='text-red-500 text-center mb-4'>Las contraseñas no coinciden.</p>
                    )}
                    <button 
                        type="submit"
                        className='w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 transition duration-200 shadow-md'
                        disabled={isFormValid() ? false : true}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </>
    )
};

export default withAuthRedirect(Register);