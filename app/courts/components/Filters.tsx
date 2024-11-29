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
                <div className="flex flex-col gap-2">
                    <label htmlFor="price-filter" className="filter-label">Precio:</label>
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
            </div>
        </div>
    );    
}

export default Filters;