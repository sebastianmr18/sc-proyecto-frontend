"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/_context/authContext';
import withAuth from '@/app/_utils/withAuth';
import DatePicker from 'react-datepicker';
import '@/public/styles/reserve.css';
import toast, { Toaster } from 'react-hot-toast';
import LoadingScreen from '@/app/_components/LoadingScreen';

const ReserveCourtPage = ({ params }: { params: { court_id: any } }) => {
    const [court, setCourt] = useState<any>(null);
    const { user } = useAuth();
    const [reservationDate, setReservationDate] = useState<Date | null>(new Date());
    const [reservationTime, setReservationTime] = useState('10:00');
    const [endReservationTime, setEndReservationTime] = useState('11:00');
    const [duration, setDuration] = useState('1');
    const minTime = '10:00';
    const maxTime = '22:00';
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>('efectivo');
    const [cardDetails, setCardDetails] = useState({ number: "", cvv: "", expiration: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);    

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (e.target.name == 'reservationTime') {
            const newTime = e.target.value;
            setReservationTime(newTime);
            const endReservationTime = calculateEndTime(newTime, duration);
            setEndReservationTime(endReservationTime);
        } else {
            const newDuration = e.target.value;
            setDuration(newDuration);
            const endReservationTime = calculateEndTime(reservationTime, newDuration);
            setEndReservationTime(endReservationTime);
        }
    }

    const calculateEndTime = (startTime: string, duration: string) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const durationHours = Number(duration);
        const totalMinutes = hours * 60 + minutes + durationHours * 60

        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;

        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }

    const combineDateAndTime = (date: Date, time: string) => {
        const formattedDate = date.toISOString().split('T')[0];
        return `${formattedDate} ${time}:00`;
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const reservation_data = {
            start_datetime: combineDateAndTime(reservationDate!, reservationTime),
            duration_hours: duration,
            status: paymentMethod === "efectivo" ? "Confirmado" : "Completado",
            is_notified: false,
            user: user?.user_id,
            court: court?.court_id,
        };

        const payment_data = {
            amount: court.hourly_rate * Number(duration),
            payment_method: paymentMethod,
            coupon: null,
            status: paymentMethod === "efectivo" ? "Pendiente" : "Exitoso",
        }

        try {
            // Paso 1: Crear reserva
            const reservationResponse = await axios.post('/api/reservations', reservation_data)
            const reservationId = reservationResponse.data.reservation_id;
                       

            const payment_load = {
                ...payment_data,
                reservation: reservationId
            }

            // Paso 2: Crear pago
            await axios.post('/api/payments', payment_load);            
            toast.success("Reserva y pago creados exitosamente!");            

        } catch (error: any) {
            toast.error("Parece que este horario ya esta reservado. Intenta con otro!");                        
        } finally {
            setIsSubmitting(false);        
            
        }
    };

    useEffect(() => {
        const getCourt = async () => {
            try {
                const response = await axios.get(`/api/courts/${params.court_id}`);
                setCourt(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCourt();        
    }, [params.court_id]);    

    return (
        <>
            {court ? (
                <div className='card-container'>
                <>                
                    <div className='card'>
                        <h3 className='card-title'>Información sobre la reserva</h3>
                        <p className="info-text">Compruebe que los datos de la <strong>cancha</strong> y del <strong>reservante</strong> sean <strong>correctos</strong>.</p>
                        <div className="card-content">
                            <div className="info-item">
                                <span className='info-label'>Nombre de la cancha:</span>
                                <span className='info-data'>{court.name}</span>
                            </div>
                            <div className="info-item">
                                <span className='info-label'>Ubicación de la cancha:</span>
                                <span className='info-data'>{court.location}</span>
                            </div>
                            <div className="info-item">
                                <span className='info-label'>Precio por hora de la cancha:</span>
                                <span className='info-data'>{court.hourly_rate}</span>
                            </div>
                            <div className="info-item">
                                <span className='info-label'>Usuario que reserva:</span>
                                <span className='info-data'>{user?.first_name}</span>
                            </div>
                            <div className="info-item">
                                <span className='info-label'>Cédula de usuario:</span>
                                <span className='info-data'>{user?.user_id?.toString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <h3 className='card-title'>Datos de reserva</h3>
                        <p className="info-text">Manejamos el siguiente horario: <strong>{minTime}</strong> - <strong>{maxTime}</strong></p>
                        <form onSubmit={handleSubmit}>
                            <div className='info-item'>
                                <label className='form-label'>Escoge tu fecha: </label>
                                <DatePicker
                                    selected={reservationDate}
                                    onChange={(date) => setReservationDate(date)}
                                    className='form-input'
                                />
                            </div>                            
                            <div className='form-group'>
                                <p className='form-label'>Horario de reserva: <strong>{reservationTime}</strong> - <strong>{endReservationTime}</strong></p>
                                <select name="reservationTime" className='select-input' onChange={handleChange}>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option>
                                    <option value="21:00">21:00</option>
                                    <option value="22:00">22:00</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label
                                    className='form-label'>Duración de la reserva</label>
                                <select name="duration" className='select-input' onChange={handleChange}>
                                    <option value="1">1 hora</option>                                    
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Metodo de pago</label>
                                <select
                                    className='select-input'
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="efectivo">Efectivo</option>
                                    <option value="tarjeta">Tarjeta de crédito</option>
                                </select>
                            </div>
                            {paymentMethod === 'efectivo' ? (
                                <p className='info-text'>
                                    Paga en efectivo, tu reserva quedará en estado <strong>CONFIRMADO</strong>. 
                                    Debes acudir a las instalaciones y pagar 
                                    con al menos 30 minutos de antelación o 
                                    tu reserva será cancelada.</p>
                            ) : (
                                <>
                                    <p className='info-text'>
                                        Paga con tarjeta, tu reserva quedará en estado <strong>COMPLETADO</strong>. 
                                        Presentate a las instalaciones al menos 15 minutos
                                        antes de la hora de tu reserva para disfrutar de nuestro servicio!</p>
                                    <div className='card-content'>                                    
                                        <div className='form-group'>
                                            <label
                                                className='card-content'
                                            >Número de tarjeta</label>
                                            <input
                                                type="number"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                placeholder="Número de tarjeta"
                                                className='form-input'
                                                required
                                            ></input>
                                        </div>
                                        <div className='form-group'>
                                            <label
                                                className='card-content'
                                            >CVV</label>
                                            <input
                                                type="password"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                placeholder="CVV"
                                                className='form-input'
                                                maxLength={3}
                                                required
                                            ></input>
                                        </div>
                                        <div className='form-group'>
                                            <label
                                                className='card-content'
                                            >Fecha de expiración</label>
                                            <input
                                                type='date'                                                
                                                value={cardDetails.expiration}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiration: e.target.value })}                                                
                                                className='form-input'
                                                required                                    
                                            ></input>
                                        </div>
                                    </div>
                                </>
                            )}
                            <button 
                                type='submit' 
                                className='submit-button'
                                disabled={isSubmitting}                            
                            >{isSubmitting ? 'Procesando...' : 'Crear reservación'}</button>                            
                        </form>
                    </div>
                    <Toaster />
                </>
                </div>
            ) : (
                <LoadingScreen/>
            )}
        </>
    )
}


export default withAuth(ReserveCourtPage)