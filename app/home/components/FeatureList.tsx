// components/FeatureList.tsx
import React from 'react';

const features = [
    { title: 'Reserva rápida', description: 'Reserva canchas en solo unos clics.' },
    { title: 'Promociones', description: 'Ofertas y descuentos exclusivos.' },
    { title: 'Notificaciones', description: 'Recibe recordatorios y actualizaciones.' },
    { title: 'Historial de reservas', description: 'Revisa tus reservas anteriores fácilmente.' },
    { title: 'Soporte 24/7', description: 'Estamos aquí para ayudarte en cualquier momento.' }
];

const FeatureList = () => {
    return (
        <section 
            className="p-10"
        >
            <h2>Nuestras Características</h2>
            <div 
                className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-white border text-center p-5 rounded-lg border-solid border-[#ddd]">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureList;
