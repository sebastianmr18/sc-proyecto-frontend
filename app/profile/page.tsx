// app/profile/Profile.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/_context/authContext';
import withAuth from '@/app/_utils/withAuth';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
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

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            profile_picture: file,
        }));
    };


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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Información del Usuario</h3>
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            className="rounded-full"
                            src={user.profile_picture || '/assets/default-avatar.jpg'}
                            alt="Profile"
                            height={200}
                            width={200}
                        />
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                        <p className="text-lg"><strong>ID:</strong> {user.user_id}</p>
                        <p className="text-lg"><strong>Primer nombre:</strong> {user.first_name}</p>
                        <p className="text-lg"><strong>Segundo nombre:</strong> {user.middle_name}</p>
                        <p className="text-lg"><strong>Apellido:</strong> {user.last_name}</p>
                        <p className="text-lg"><strong>Segundo apellido:</strong> {user.second_last_name}</p>
                        <p className="text-lg"><strong>Número de contacto:</strong> {user.contact_number}</p>
                        <p className="text-lg"><strong>Dirección:</strong> {user.address}</p>
                    </div>
                </div>
                <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
                    <h3 className="text-xl font-bold mb-4">Editar Perfil</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Cedula</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.user_id}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Primer nombre</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Segundo nombre</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Apellido</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Segundo apellido</label>
                            <input
                                type="text"
                                name="second_last_name"
                                value={formData.second_last_name}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Número de contacto</label>
                            <input
                                type="text"
                                maxLength={10}
                                name="contact_number"
                                value={formData.contact_number}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left font-semibold">Imagen de perfil</label>
                            <input
                                type="file"
                                name="profile_picture"
                                accept='image/*'
                                value={formData.profile_picture}
                                onChange={handleInputChange || handleImageChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>        
            <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Reservaciones</h3>
                <button 
                    onClick={handleLoadReservations} 
                    className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:text-gray-600"
                    disabled={reservationsLoaded}
                >
                Cargar Reservaciones
                </button>
                {reservationsLoaded && reservations.length === 0 ? (
                    <div className='mt-4'>
                        <p className='text-gray-600'>No tienes reservaciones.</p>
                        <a href="/courts" className="text-blue-500 underline">Haz una reserva aquí</a>
                    </div>                    
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {reservations
                    .sort((b, a) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
                    .map((reservation: any) => {
                        const court = courts.find((court) => court.court_id === reservation.court);
                        const courtName = court ? court.name : "Cancha no encontrada";
                        return (
                            <div key={reservation.reservation_id}>
                                <div>
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-4">                                                                                        
                                            <h5 className="text-lg text-gray-800"><strong>Id de reserva:</strong> {reservation.reservation_id}</h5>                                        
                                            <p className="text-sm text-gray-600"><strong>Nombre de cancha:</strong> {courtName}</p>   
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Inicio: </span>
                                                {new Date(reservation.start_datetime).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Duración: </span>
                                                {reservation.duration_hours} hora(s)
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Estado: </span>
                                                {reservation.status}
                                            </p>
                                            { new Date(reservation.start_datetime) > new Date() ?
                                                <div className='mt-4 flex gap-2'>
                                                    <button
                                                        className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Modificar
                                                    </button>
                                                    <button
                                                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            : <>
                                                <div className='mt-4 flex gap-2'>
                                                    <button
                                                        className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
                                                        disabled
                                                    >
                                                        Reserva vencida
                                                    </button>
                                                    <button
                                                        className='flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg'                                                        
                                                        onClick={handleReviewButton.bind(null, reservation.court)}
                                                    >
                                                        Calificar
                                                    </button>
                                                </div>                                                    
                                                </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                )}
                
            </div>
        </div>
    );
};

export default withAuth(Profile);