"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingScreen from "@/app/_components/LoadingScreen";
import useSidebarStore from "../globals/SidebarState";
import Sidebar from "./components/Sidebar";
import { useRouter} from "next/navigation";
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
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarStore();    
    const router = useRouter();

    const handleReserveCourt = (court_id: any) => {        
        router.push(`/reserve/${court_id}`);        
    }
    useEffect(() => {
        const getCourts = async () => {
            try {
                const response = await axios.get("/api/courts");                
                setCourts(response.data);
            } catch (error) {
                console.error("Error al obtener las canchas", error);
            }
        }
        const getCourtsImage = async () => {
            try {
                const response = await axios.get("/api/court_images");                
                setCourtsImage(response.data);
            } catch (error) {                   
                console.error("Error al obtener las imágenes de las canchas", error);             
            }
        }
        const fetchData = async () => {
            await getCourts();
            await getCourtsImage();
            setLoading(false);
        }

        fetchData();
        return () => {
            closeSidebar()
        }        
    }, [closeSidebar]);

    const filteredCourts = Array.isArray(courts) ? courts.filter(court => {        
        return (
            (!locationFilter || court.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
            court.surface_type.toLowerCase().includes(surfaceTypeFilter.toLowerCase()) &&
            court.hourly_rate >= priceFilter[0] && court.hourly_rate <= priceFilter[1] &&
            court.capacity >= capacityFilter[0] && court.capacity <= capacityFilter[1] &&
            court.sport.toLowerCase().includes(sportFilter.toLowerCase())
        );
    }) : [];
    

    if (loading) return <LoadingScreen />;

    return (
        <div className='bg-gradient-to-br from-blue-300 to-blue-800'>
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
                    {filteredCourts.length > 0 ? (<p className="page-subtitle">A la izquierda encontrarás los filtros para buscar la cancha que más se ajuste a tus necesidades.</p>)
                    : (<p className="page-subtitle">No hay canchas disponibles</p>)}
                    <div className="courts-grid">                    
                        {filteredCourts.map(court => {
                            const courtImage = courtsImage.find(image => image.court === court.court_id);
                            const imageSrc = courtImage ? courtImage.image : '/assets/default-court-image.jpg';

                            return (
                                <div key={court.court_id} className="court-card"> 
                                    <div className="image-container">
                                        <Image className="court-image" src={imageSrc} alt="Imagen de la cancha" height={200} width={200} />
                                    </div>
                                    <div className="court-info">
                                        <h2 className="court-name">{court.name}</h2> 
                                        <p className="court-details"><b>Ubicación:</b> {court.location}</p> 
                                        <p className="court-details"><b>Tipo de superficie:</b> {court.surface_type}</p> 
                                        <p className="court-details"><b>Deporte:</b> {court.sport}</p> 
                                        <p className="court-details"><b>Precio por hora:</b> ${court.hourly_rate}</p> 
                                        <p className="court-details"><b>Capacidad:</b> {court.capacity}</p> 
                                        <p className="court-details"><b>Disponibilidad:</b> {court.availability ? "Disponible" : "No disponible"}</p>
                                    </div>
                                    <div className="button-container">
                                        <button 
                                            className={`reserve-button ${court.availability ? '' : 'disabled'}`}
                                            disabled={!court.availability}
                                            onClick={() => handleReserveCourt(court.court_id)}                                                                           
                                        >
                                            {court.availability ? 'Reservar ahora!' : 'No disponible :('}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtsPage;