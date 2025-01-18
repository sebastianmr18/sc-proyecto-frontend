"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import { withAuthRedirect } from '@/app/_utils/withAuthRedirect';
import '@/public/styles/login.css';
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react';

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

    const isValidForm = formData.email !== '' && formData.password !== '';

    const renderErrorMessage = () => (
      showErrorMessage && (
        <div className="error-message">
          <div className='error-icon'>
            <svg className="icon-error" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>            
          </div>
          <div className="error-text">
            <p>Email o contraseña incorrectos</p>
          </div>
        </div>
      )
    );

    const renderSubmitButton = () => (
      <button type='submit' disabled={isValidForm && isSubmitting} className="submit-button">
        {isSubmitting ? (
          <>
            <Loader className="loader" />
            <span>Cargando...</span>
          </>
        ) : (
          <>
            <span>Iniciar sesión</span>
            <ArrowRight className="arrow-icon" />
          </>
        )}
      </button>
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(formData.email, formData.password);
            console.clear();
            router.push('/dashboard');
        }
        catch (error) {
            if (error instanceof Error) {
                setShowErrorMessage(true);                
            }
        } finally {
            console.clear();
            setIsSubmitting(false);
        }
    }

        return (
          <div className="login-container">
            <div className="login-wrapper">
              {/* Card del formulario */}
              <div className="login-card">
                {/* Header */}
                <div className="login-header">
                  <h1 className="login-title">¡Bienvenido de nuevo!</h1>
                  <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
                </div>
      
                {/* Formulario */}
                <div className="login-form-container">
                  <form onSubmit={handleSubmit} className="login-form">
                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Correo Electrónico
                      </label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <Mail className="icon" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="input-field"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>
      
                    {/* Contraseña */}
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <Lock className="icon" />
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="input-field"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    {renderErrorMessage()}
                    {renderSubmitButton()}                    
                  </form>
      
                  {/* Register Link */}
                  <div className="register-link">
                    <p>
                      ¿No tienes cuenta?{' '}
                      <button
                        onClick={() => router.push('/register')}
                        className="link-button"
                      >
                        Regístrate aquí
                      </button>
                    </p>
                  </div>
                </div>
              </div>
      
              {/* Footer */}
              <p className="login-footer">
                Al iniciar sesión, aceptas nuestros{' '}
                <button onClick={() => router.push('/terms')} className="link-button">
                  términos y condiciones
                </button>
              </p>
            </div>
          </div>
        );
    };
    
    export default withAuthRedirect(Login);