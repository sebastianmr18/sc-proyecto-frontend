// components/HeroSection.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();
    return (
        <section className="bg-neutral-400 text-center p-[60px]">
            <div className="text-[2.5rem] mb-4">
                <h1>Bienvenido al mejor alquiler de canchas de Cali</h1>
                <p
                    className='text-[1.2rem] mb-8'
                >Reserva tu cancha para ti y tu equipo de forma sencilla. Paga en nuestra pagina o en la cancha, tu eliges!</p>
                <button 
                    onClick={() => 
                        router.push('/courts')
                    }
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    >Explora nuestas canchas disponibles</button>
            </div>
        </section>
    );
};

export default HeroSection;
