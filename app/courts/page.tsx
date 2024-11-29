"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingScreen from "@/app/_components/LoadingScreen";
import useSidebarStore from "../globals/SidebarState";
import Sidebar from "./components/Sidebar";
import '@/public/styles/court-card.css';

const CourtsPage = () => {
    const [courts, setCourts] = useState([
        {
            court_id: null,
            name: "",
            location: "",
            surface_type: "",
            sport: "",
            hourly_rate: 0,
            capacity: 0,
            availability: false,
        },
    ]);
    const [courtsImage, setCourtsImage] = useState([
        {
            court_id: null,
            image: "",
            court: null,
        },
    ]);
    const [loading, setLoading] = useState(true);

    const [locationFilter, setLocationFilter] = useState("");
    const [surfaceTypeFilter, setSurfaceTypeFilter] = useState("");
    const [sportFilter, setSportFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState([0, 200]);
    const [capacityFilter, setCapacityFilter] = useState([0, 50]);

    //const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarStore();
    /*const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };*/

    useEffect(() => {
        const getCourts = async () => {
            try {
                const response = await axios.get("/api/courts");
                console.log(response.data);
                setCourts(response.data);
            } catch (error) {
                console.error("Error al obtener las canchas", error);
            }
        }
        const getCourtsImage = async () => {
            try {
                const response = await axios.get("/api/court_images");
                console.log(response.data);
                setCourtsImage(response.data);
            } catch (error) {
                console.error("Error al obtener las imagenes de las canchas", error);
            }
        }
        const fetchData = async () => {
            await getCourts();
            await getCourtsImage();
            setLoading(false);
        }
        fetchData();
    }, []);

    const filteredCourts = courts.filter(court => {
        return (
            (!locationFilter || court.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
            court.surface_type.toLowerCase().includes(surfaceTypeFilter.toLowerCase()) &&
            court.hourly_rate >= priceFilter[0] && court.hourly_rate <= priceFilter[1] &&
            court.capacity >= capacityFilter[0] && court.capacity <= capacityFilter[1] &&
            court.sport.toLowerCase().includes(sportFilter.toLowerCase())
        );
    });

    if (loading) return <LoadingScreen />;

    return (
        <div className={`layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
                toggleSidebar={toggleSidebar}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                surfaceTypeFilter={surfaceTypeFilter}
                setSurfaceTypeFilter={setSurfaceTypeFilter}
                sportFilter={sportFilter}
                setSportFilter={setSportFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                capacityFilter={capacityFilter}
                setCapacityFilter={setCapacityFilter}            
            />
            <div className="page-container">
                <h1 className="page-title">Estas son nuestras canchas sintéticas disponibles</h1>
                <div className="courts-grid">
                    {filteredCourts.length > 0 ? (
                        filteredCourts.map(court => {
                            const courtImage = courtsImage.find(image => image.court === court.court_id);
                            const imageSrc = courtImage ? courtImage.image : '/assets/default-court-image.jpg';

                            return (
                                <div key={court.court_id} className="court-card"> 
                                    <div className="image-container">
                                        <Image className="court-image" src={imageSrc} alt="Imagen de la cancha" height={200} width={200} />
                                    </div>
                                    <div className="court-info">
                                        <h2 className="court-name">{court.name}</h2> 
                                        <p className="court-details">Ubicación: {court.location}</p> 
                                        <p className="court-details">Tipo de superficie: {court.surface_type}</p> 
                                        <p className="court-details">Deporte: {court.sport}</p> 
                                        <p className="court-details">Precio por hora: ${court.hourly_rate}</p> 
                                        <p className="court-details">Capacidad: {court.capacity}</p> 
                                        <p className="court-details">Disponibilidad: {court.availability ? "Disponible" : "No disponible"}</p>
                                    </div>
                                    <div className="button-container">
                                        <button 
                                            className={`reserve-button ${court.availability ? '' : 'disabled'}`}
                                            disabled={!court.availability}
                                        >
                                            Reservar ahora!
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay canchas disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourtsPage;