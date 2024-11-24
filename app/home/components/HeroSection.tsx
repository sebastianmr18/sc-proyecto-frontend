// components/HeroSection.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();
    return (
        <section className="bg-neutral-400 text-center p-[60px]">
            <div className="text-[2.5rem] mb-4">
                <h1>Bienvenido a Nuestra Plataforma</h1>
                <p
                    className='text-[1.2rem] mb-8'
                >Conecta con nuestras funciones y encuentra el servicio perfecto para ti.</p>
                <button 
                    onClick={() => 
                        router.push('/register')
                    }
                    className='text-base px-5 py-2.5 hover:bg-neutral-300 rounded-lg'
                    >Explora ahora</button>
            </div>
        </section>
    );
};

export default HeroSection;
