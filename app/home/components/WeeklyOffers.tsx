// app/components/WeeklyOffers.tsx
import React from 'react';

// Define el tipo para una oferta
interface Offer {
    id: number;
    title: string;
    description: string;
    price: number;
}

interface WeeklyOffersProps {
    offers: Offer[];
}

const WeeklyOffers: React.FC<WeeklyOffersProps> = ({ offers }) => {
    return (
        <section 
            className="bg-[#f8f9fa] mt-5 p-5 rounded-lg">
            <h2 className='text-center mb-5'>Ofertas de la Semana</h2>
            <div className="flex gap-5 flex-wrap justify-center">
                {offers.map((offer) => (
                    <div 
                        key={offer.id} 
                        className="bg-white border w-[200px] text-center p-[15px] rounded-lg border-solid border-[#ddd]"
                    >
                        <h3 className='mx-0 my-2.5'>{offer.title}</h3>
                        <p>{offer.description}</p>
                        <p className="font-[bold] text-[#e74c3c]">Desde: ${offer.price}</p>
                        <button 
                            className="bg-[#3498db] text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#2980b9]"
                        >¡Aprovechar!</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WeeklyOffers;
