import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Pérez',
    role: 'Jugador Amateur',
    image: '/api/placeholder/80/80',
    comment: 'La mejor plataforma para reservar canchas. El proceso es súper sencillo y el soporte es excelente.',
    rating: 5
  },
  {
    name: 'Laura Gómez',
    role: 'Organizadora de Torneos',
    image: '/api/placeholder/80/80',
    comment: 'Las promociones y el programa de lealtad son increíbles. He ahorrado mucho dinero desde que empecé a usar la plataforma.',
    rating: 5
  },
  {
    name: 'Juan Rivera',
    role: 'Entrenador',
    image: '/api/placeholder/80/80',
    comment: 'Recomiendo esta plataforma a todos mis estudiantes. La flexibilidad de horarios y la facilidad de uso son incomparables.',
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-blue-700">
            Miles de deportistas confían en nosotros para sus reservas semanales
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative"
            >
              <div className="flex gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;