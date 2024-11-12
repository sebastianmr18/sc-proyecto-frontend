"use client";
import HeroSection from "./components/HeroSection";
import FeatureList from "./components/FeatureList";
import TestimonialSection from "./components/TestimonialSection";
import CallToAction from "./components/CallToAction";
import FAQSection from "./components/FAQSection";
import WeeklyOffers from "./components/WeeklyOffers";

export default function Home() {
  const offers = [
    { id: 1, title: 'Descuento en Canchas', description: '50% de descuento en reservaciones en horarios nocturnos.', price: 150 },
    { id: 2, title: 'Paquete Familiar', description: 'Reserva de 3 horas con equipo incluido.', price: 200 },
    { id: 3, title: 'Descuento de Fin de Semana', description: '20% de descuento en reservas sábados y domingos.', price: 120 },
];  
  return (
    <div>
      <main>
        <HeroSection />
        <FeatureList />
        <WeeklyOffers offers={offers} />        
        <TestimonialSection />
        <CallToAction />
        <FAQSection />
      </main>
    </div>
  );
}