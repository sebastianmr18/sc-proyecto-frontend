//app/register/page.tsx
"use client";

import { useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { withAuthRedirect } from '@/app/_utils/withAuthRedirect';
import '@/public/styles/register.css';

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
                const response = await axios.post('api/users/register/', formData);
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
        <div className='form-container'>
            <div className='form-card'>
                <h1 className='form-title'>
                    ¡Crea tu cuenta ahora!
                </h1>
                <p className='form-subtitle'>Rápido, sencillo y seguro.</p>

                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-group'>
                        <label htmlFor='user_id' className="form-label">
                            Número de identificación
                        </label>                    
                        <input
                            type="number"
                            name="user_id"
                            value={formData.user_id}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>          
                        <input
                            type="email"
                            name="email"            
                            value={formData.email}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="first_name" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="first_name"                        
                            value={formData.first_name}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="last_name" className="form-label">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="last_name"                        
                            value={formData.last_name}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"                        
                            value={formData.password}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="confirm_password" className="form-label">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            name="confirm_password"                        
                            value={formData.confirm_password}
                            className='form-input'
                            onChange={handleChange}
                            required
                        />                    
                    </div>
                    {errorMessage && <p className='form-error'>{errorMessage}</p>}
                    {!passwordsMatch && (
                        <p className='form-error'>Las contraseñas no coinciden.</p>
                    )}
                    <button 
                        type="submit"
                        className='form-button'
                        disabled={isFormValid() ? false : true}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withAuthRedirect(Register);