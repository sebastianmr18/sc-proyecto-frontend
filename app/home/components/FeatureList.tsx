import { Calendar, Star, Bell, History, Headphones, Shield, Users, Trophy } from 'lucide-react';

const features = [
  { 
    icon: Calendar,
    title: 'Reserva Instantánea', 
    description: 'Sistema de reservas en tiempo real. Confirma tu cancha en segundos.',
    color: 'bg-blue-500'
  },
  { 
    icon: Star,
    title: 'Promociones Exclusivas', 
    description: 'Accede a descuentos especiales y ofertas para usuarios frecuentes.',
    color: 'bg-yellow-500'
  },
  { 
    icon: Bell,
    title: 'Notificaciones Smart', 
    description: 'Te mantenemos informado sobre tus reservas y ofertas especiales.',
    color: 'bg-green-500'
  },
  { 
    icon: History,
    title: 'Historial Detallado', 
    description: 'Accede a tu histórico de reservas y estadísticas de uso.',
    color: 'bg-purple-500'
  },
  { 
    icon: Headphones,
    title: 'Soporte 24/7', 
    description: 'Equipo de soporte disponible todos los días a cualquier hora.',
    color: 'bg-red-500'
  },
  { 
    icon: Shield,
    title: 'Reserva Garantizada', 
    description: 'Tu dinero está seguro con nuestra política de garantía.',
    color: 'bg-indigo-500'
  },
  { 
    icon: Users,
    title: 'Torneos y Eventos', 
    description: 'Organiza o participa en torneos y eventos especiales.',
    color: 'bg-orange-500'
  },
  { 
    icon: Trophy,
    title: 'Programa de Lealtad', 
    description: 'Gana puntos por cada reserva y canjéalos por premios.',
    color: 'bg-teal-500'
  }
];

const FeatureList = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Todo lo que necesitas para jugar
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre por qué miles de deportistas eligen nuestra plataforma para sus reservas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;