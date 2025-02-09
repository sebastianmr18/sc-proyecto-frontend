import { ArrowRight, Calendar, Clock, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
    const router = useRouter();
    const handleNavigateToCourts = () => {
        router.push('/courts');
    };

    return (
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Patrón de fondo decorativo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute h-96 w-96 -left-16 -top-16 bg-white rounded-full blur-3xl"></div>
                <div className="absolute h-96 w-96 -right-16 -bottom-16 bg-blue-300 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-8">
                        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                            Tu Cancha Perfecta<br />
                            <span className="text-blue-300">A Un Click de Distancia</span>
                        </h1>

                        <p className="text-xl text-blue-100 max-w-2xl">
                            Descubre la forma más fácil de reservar canchas en Cali.
                            Únete a miles de deportistas que ya confían en nosotros.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleNavigateToCourts}
                                className="group flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                            >
                                Reserva Ahora
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-end">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                            <div className="flex gap-4 items-center text-blue-100">
                                <Calendar className="w-6 h-6" />
                                <p>Reserva cualquier día</p>
                            </div>
                            <div className="flex gap-4 items-center text-blue-100">
                                <Clock className="w-6 h-6" />
                                <p>Horarios flexibles</p>
                            </div>
                            <div className="flex gap-4 items-center text-blue-100">
                                <CreditCard className="w-6 h-6" />
                                <p>Pago seguro online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;