// app/profile/Profile.tsx
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/_context/authContext';
import withAuth from '@/app/_utils/withAuth';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Profile = ({ params }: { params: { user_id: any } }) => {
    const { user, fetchUserProfile, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        user_id: user?.user_id || 0,
        email: user?.email || '',
        first_name: user?.first_name || '',
        middle_name: user?.middle_name || '',
        last_name: user?.last_name || '',
        second_last_name: user?.second_last_name || '',
        contact_number: user?.contact_number || '',
        address: user?.address || '',
        profile_picture: user?.profile_picture || '',
    });
    const [reservations, setReservations] = useState<any[]>([]);
    const [courts, setCourts] = useState<any[]>([]);
    const [reservationsLoaded, setReservationsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {       
        const getCourts = async () => {
            try {
                const response = await axios.get("/api/courts");
                setCourts(response.data);
            } catch (error) {
                console.error("Error al obtener las canchas", error);
            }
        }; 
        const fetchData = async () => {            
            await getCourts();            
        }

        if (!user) {
            fetchUserProfile();
        } else if (user) {
            setFormData({
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                middle_name: user.middle_name || '',
                last_name: user.last_name,
                second_last_name: user.second_last_name || '',
                contact_number: user.contact_number || '',
                address: user.address || '',
                profile_picture: user.profile_picture || '',
            }); 
            fetchData();
        }       
    }, [user, fetchUserProfile]);

    const getReservationsByUserId = async () => {            
        try {
            setReservations([]);
            const response = await axios.get(`/api/reservations/`);
            const reservations = response.data;        
            reservations.forEach((reservation: any) => {
                if (reservation.user === user?.user_id.toString()) {
                    console.log('Reservación encontrada:', reservation);
                    setReservations((prevReservations) => [...prevReservations, reservation]);
                }
            });
            setReservationsLoaded(true);
            console.log("Reservaciones encontradas:", reservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const handleLoadReservations = async () => {
        await getReservationsByUserId();
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)
        await updateUserProfile(formData);
        setIsEditing(false)
        try {
            const response = await axios.post('/api/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile updated successfully', response.data);
        } catch (error) {
            console.error('Error updating profile', error);
        }        
    }

    const handleReviewButton = (court_id: any) => {
        router.push(`/review/${court_id}`);
    }

    if (!user) return <p>Loading...</p>;

    return (
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 p-8'>
            <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-12">
                {/* Información del Usuario */}
                <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Información del Usuario</h3>
                        <div className="flex justify-center mb-6">
                            <Image
                                className="rounded-full shadow-md"
                                src={user.profile_picture || '/assets/default-avatar.jpg'}
                                alt="Profile"
                                height={200}
                                width={200}
                            />
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Email", value: user.email, type: "email" },
                                { label: "ID", value: user.user_id, type: "text" },
                                { label: "Primer nombre", value: user.first_name, type: "text" },
                                { label: "Segundo nombre", value: user.middle_name, type: "text" },
                                { label: "Apellido", value: user.last_name, type: "text" },
                                { label: "Segundo apellido", value: user.second_last_name, type: "text" },
                                { label: "Número de contacto", value: user.contact_number, type: "text" },
                                { label: "Dirección", value: user.address, type: "text" },
                            ].map((item, index) => (
                                <p key={index} className="text-lg">
                                    <strong>{item.label}:</strong> {item.value}
                                </p>
                            ))}
                        </div>
                    </div>
        
                    {/* Formulario de Edición */}
                    <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Editar Perfil</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {[
                                { label: "Cédula", name: "user_id", type: "text", disabled: true },
                                { label: "Email", name: "email", type: "email", disabled: true },
                                { label: "Primer nombre", name: "first_name", type: "text" },
                                { label: "Segundo nombre", name: "middle_name", type: "text" },
                                { label: "Apellido", name: "last_name", type: "text" },
                                { label: "Segundo apellido", name: "second_last_name", type: "text" },
                                { label: "Número de contacto", name: "contact_number", type: "text", maxLength: 10 },
                                { label: "Imagen de perfil", name: "profile_picture", type: "file", accept: "image/*" },
                            ].map((field, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="font-semibold text-gray-600 mb-1">{field.label}</label>
                                    <input
                                        {...field}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        className={`p-3 border rounded-lg ${
                                            field.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                                        }`}
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
        
                {/* Sección de Reservaciones */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Reservaciones</h3>
                    <button
                        onClick={handleLoadReservations}
                        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:text-gray-600"
                        disabled={reservationsLoaded}
                    >
                        Cargar Reservaciones
                    </button>
                    {reservationsLoaded && reservations.length === 0 ? (
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">No tienes reservaciones.</p>
                            <a href="/courts" className="text-blue-500 underline">Haz una reserva aquí</a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                            {reservations
                                .sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime())
                                .map((reservation) => {
                                    const court = courts.find(c => c.court_id === reservation.court);
                                    return (
                                        <div key={reservation.reservation_id} className="bg-white rounded-xl shadow-lg p-5">
                                            <h5 className="text-lg font-semibold mb-2 text-gray-800">
                                                Reserva #{reservation.reservation_id}
                                            </h5>
                                            <p className="text-sm text-gray-600">
                                                <strong>Cancha:</strong> {court?.name || "Cancha no encontrada"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Inicio:</strong> {new Date(reservation.start_datetime).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Duración:</strong> {reservation.duration_hours} hora(s)
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Estado:</strong> {reservation.status}
                                            </p>
                                            <div className="mt-4 flex gap-2">
                                                {new Date(reservation.start_datetime) > new Date() ? (
                                                    <>
                                                        <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg">
                                                            Modificar
                                                        </button>
                                                        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg cursor-not-allowed">
                                                            Reserva vencida
                                                        </button>
                                                        <button
                                                        className='flex-1 bg-orange-500 text-white py-2 rounded-lg'                                                        
                                                        onClick={handleReviewButton.bind(null, reservation.court)}
                                                        >
                                                        Calificar
                                                        </button>                                                
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default withAuth(Profile);