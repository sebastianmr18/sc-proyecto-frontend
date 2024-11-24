// components/TestimonialSection.tsx
import React from 'react';

const testimonials = [
    { name: 'Carlos Pérez', comment: '¡Excelente servicio y muy fácil de usar!' },
    { name: 'Laura Gómez', comment: 'Las promociones me han ahorrado mucho dinero.' },
    { name: 'Juan Rivera', comment: 'Recomiendo esta plataforma a todos mis amigos.' }
];

const TestimonialSection = () => {
    return (
        <section className="bg-[#f0f8ff] p-10">
            <h2>Testimonios de Usuarios</h2>
            <div className="flex flex-col gap-5">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="text-center italic">
                        <p>&quot;{testimonial.comment}&quot;</p>
                        <h4>- {testimonial.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
