import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { 
    question: '¿Cómo puedo registrarme?',
    answer: 'El proceso de registro es muy sencillo. Solo necesitas hacer clic en el botón "Registrarse", proporcionar tu correo electrónico y crear una contraseña. También puedes registrarte usando tu cuenta de Google o Facebook.'
  },
  { 
    question: '¿Puedo cancelar una reserva?',
    answer: 'Sí, puedes cancelar tu reserva hasta 24 horas antes de la hora programada sin ningún cargo. Las cancelaciones posteriores están sujetas a nuestra política de reembolso.'
  },
  { 
    question: '¿Hay tarifas adicionales?',
    answer: 'No hay tarifas ocultas. El precio que ves es el precio final. Incluimos todos los cargos y comisiones en el precio mostrado antes de confirmar tu reserva.'
  },
  { 
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos todas las tarjetas de crédito y débito principales, transferencias bancarias, y pagos a través de PSE. También puedes pagar en efectivo directamente en la cancha.'
  },
  { 
    question: '¿Tienen programa de lealtad?',
    answer: 'Sí, nuestro programa de lealtad te permite ganar puntos por cada reserva que realices. Estos puntos se pueden canjear por descuentos en futuras reservas o productos de nuestros socios.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-600 text-lg">
            Encuentra respuestas a las preguntas más comunes
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="p-6 pt-0 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;