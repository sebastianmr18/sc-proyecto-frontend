import { ArrowRight, Shield, Star, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
    const router = useRouter();
    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 py-24 px-6 overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0">
                <div className="absolute h-96 w-96 -right-16 -top-16 bg-blue-600/20 rounded-full blur-3xl"></div>
                <div className="absolute h-96 w-96 -left-16 -bottom-16 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        ¡Únete a nuestra comunidad deportiva!
                    </h2>

                    <p className="text-xl text-blue-100 mb-12">
                        Regístrate ahora y obtén acceso a promociones exclusivas, reservas prioritarias y mucho más.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                            <Shield className="w-8 h-8 text-blue-300 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">100% Seguro</h3>
                            <p className="text-blue-100 text-sm">Garantía de reserva y pago seguro</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                            <Star className="w-8 h-8 text-blue-300 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Beneficios VIP</h3>
                            <p className="text-blue-100 text-sm">Acceso a ofertas exclusivas</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                            <Clock className="w-8 h-8 text-blue-300 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Reserva 24/7</h3>
                            <p className="text-blue-100 text-sm">Disponibilidad todo el día</p>
                        </div>
                    </div>

                    <button
                        onClick={handleRegister}
                        className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                    >
                        Regístrate Ahora
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;