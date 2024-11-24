// components/FAQSection.tsx
import React from 'react';

const faqs = [
    { question: '¿Cómo puedo registrarme?', answer: 'Haz clic en el botón de registro y sigue los pasos.' },
    { question: '¿Puedo cancelar una reserva?', answer: 'Sí, puedes cancelar una reserva desde tu perfil.' },
    { question: '¿Hay tarifas adicionales?', answer: 'No, todas las tarifas se muestran antes de confirmar.' }
];

const FAQSection = () => {
    return (
        <section className="p-10">
            <h2>Preguntas Frecuentes</h2>
            <div className="flex flex-col gap-5">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border p-5 rounded-lg border-solid border-[#ddd]">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
