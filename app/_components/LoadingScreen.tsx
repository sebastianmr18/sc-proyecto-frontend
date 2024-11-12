// app/components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <h2>Cargando...</h2> {/* Aquí puedes poner un spinner o cualquier animación de carga */}
        </div>
    );
};

export default LoadingScreen;
