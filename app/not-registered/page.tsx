"use client";
import { useRouter } from 'next/navigation';
import '@/public/styles/not-registered.css';

export default function NotRegistered() {
    const router = useRouter();
    return (
        <div className="card-container">
            <div className="card">
                <h3 className="card-title">Bienvenido a la app de reservas</h3>
                <p className="card-subtitle">Para realizar una reserva, ingresa a tu cuenta</p>
                <button className="card-button" onClick={() => router.push('/login')}>Ingresar</button>
                <p className="card-subtitle">O registra una nueva cuenta</p>
                <button className="card-button" onClick={() => router.push('/register')}>Registrarse</button>
            </div>
        </div>
    );
}