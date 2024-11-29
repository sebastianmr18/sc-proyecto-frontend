// app/courts/components/Filters.tsx
import React from 'react';

export interface FilterProps {
    locationFilter: string;
    setLocationFilter: (locationFilter: string) => void;
    surfaceTypeFilter: string;
    setSurfaceTypeFilter: (surfaceTypeFilter: string) => void;
    sportFilter: string;
    setSportFilter: (sportFilter: string) => void;
    priceFilter: number[];
    setPriceFilter: (priceFilter: number[]) => void;
    capacityFilter: number[];
    setCapacityFilter: (capacityFilter: number[]) => void;
}

const Filters: React.FC<FilterProps> = ({
    locationFilter,
    setLocationFilter,
    surfaceTypeFilter,
    setSurfaceTypeFilter,
    sportFilter,
    setSportFilter,
    priceFilter,
    setPriceFilter,
    capacityFilter,
    setCapacityFilter,
}) => {
    return (
        <div className="filters">
            <div className='flex flex-col gap-4 filter-group'>
                <div className="flex flex-col gap-2">
                    <label htmlFor="location-filter" className="filter-label">Ubicación:</label>
                    <input
                        id="location-filter"
                        type="text"
                        placeholder="Buscar por ubicación"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="filter-input"
                    />
                </div>
                <div className="separator"></div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="surface-type-filter" className="filter-label">Tipo de superficie:</label>
                    <select
                        id="surface-type-filter"
                        value={surfaceTypeFilter}
                        onChange={(e) => setSurfaceTypeFilter(e.target.value)}
                        className="filter-input"
                    >
                        <option value="">Todos</option>
                        <option value="Pasto">Pasto</option>
                        <option value="Arena">Arena</option>
                        <option value="Arcilla">Tierra arcilla</option>
                        <option value="Ladrillo">Ladrillo</option>
                    </select>
                </div>
                <div className="separator"></div>                
                <div className='flex flex-col gap-2'>
                    <label htmlFor="sport-filter" className="filter-label">Deporte:</label>
                    <select
                        id="sport-filter"
                        value={sportFilter}
                        onChange={(e) => setSportFilter(e.target.value)}
                        className="filter-input"
                    >
                        <option value="">Todos</option>
                        <option value="Tenis">Tenis</option>
                        <option value="Voleibol">Voleibol</option>
                        <option value="Futbol">Fútbol</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>                
                <div className="separator"></div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="price-filter" className="filter-label">Precio por hora:</label>
                    <input
                        id="price-filter"
                        type="range"
                        min="0"
                        max="200"
                        value={priceFilter[1]}
                        onChange={(e) => setPriceFilter([0, parseInt(e.target.value, 10)])}
                        className="filter-range"
                    />
                    <span className="filter-price">
                        Rango: ${priceFilter[0]} - ${priceFilter[1]}</span>
                </div>
                <div className="separator"></div>                
                <div className="flex flex-col gap-2">
                    <label htmlFor="capacity-filter" className="filter-label">Capacidad:</label>
                    <input
                        id="capacity-filter"
                        type="range"
                        min="0"
                        max="50"
                        value={capacityFilter[1]}
                        onChange={(e) => setCapacityFilter([0, parseInt(e.target.value, 10)])}
                        className="filter-range"
                    />
                    <span className="filter-price">
                        Rango: {capacityFilter[0]} - {capacityFilter[1]}</span>
                </div>
            </div>
        </div>
    );    
}

export default Filters;