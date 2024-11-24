// components/CallToAction.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
    const router = useRouter();
    return (
        <section className="bg-[#ffdead] text-center p-[60px]">
            <h2 className='text-[2rem]'>¿Listo para unirte?</h2>
            <p className='text-[1.2rem]'>Regístrate ahora y disfruta de todas las ventajas de nuestra plataforma.</p>
            <button 
                onClick={() => router.push('/register')}
                className='text-base bg-[#ffa500] text-[white] cursor-pointer px-5 py-2.5 border-[none]'
                >Regístrate</button>
        </section>
    );
};

export default CallToAction;
